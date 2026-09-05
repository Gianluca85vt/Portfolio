/**
 * Builds the 1080x1350 portrait card Instagram needs from an article's own
 * cover, which is 1200x900 and composed for a landscape card on the blog.
 * Cropping that to portrait alone would cut the artwork badly, so the cover is
 * used as a bled background under a gradient, and the title is set fresh at a
 * size that survives a phone screen.
 *
 *   node scripts/social-card.mjs <slug>
 *
 * Writes public/img/blog/<slug>/social.jpg and prints the path.
 */
import { readFile, writeFile, access, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const W = 1080;
const H = 1350;

/** Stories are 9:16. Anything else gets letterboxed by Instagram. */
const STORY_W = 1080;
const STORY_H = 1920;

// Mirrors categoryColors in src/data/portfolio.ts. A card is not worth an
// import chain through TypeScript; if a colour drifts, the cost is one card
// carrying last season's accent.
const COLOURS = {
  Editorial: '#0F6E78',
  '3D': '#BE4C00',
  Tech: '#7621B0',
  AI: '#B600A8',
  Games: '#D6294E',
  Manga: '#C8891B',
  'Film & TV': '#5B3FBF',
  Collecting: '#9A5B2E',
};

const esc = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Reads the frontmatter without pulling in a YAML parser for four fields.
 *
 * Line endings are normalised first. These files are CRLF on Windows, and in
 * JavaScript `.` matches neither newline nor carriage return, so `(.*)$` never
 * reaches the end of a CRLF line and every field comes back empty — silently,
 * which is how this shipped a card titled with its own slug.
 */
function frontmatter(text) {
  const block = text.replace(/\r\n?/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  if (!block) return {};
  const out = {};
  for (const line of block[1].split('\n')) {
    const kv = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

/**
 * Greedy wrap against an estimated advance width. DejaVu Sans Bold runs about
 * 0.58em per character averaged over mixed-case English, close enough that a
 * line never overflows by more than a glyph. A single word longer than the
 * measure is broken rather than allowed to run off the canvas.
 */
function wrap(text, fontSize, maxWidth) {
  const limit = Math.max(8, Math.floor(maxWidth / (fontSize * 0.58)));
  const lines = [];
  let line = '';

  const push = () => {
    if (line) lines.push(line);
    line = '';
  };

  for (let word of text.split(/\s+/)) {
    while (word.length > limit) {
      push();
      lines.push(word.slice(0, limit - 1) + '-');
      word = word.slice(limit - 1);
    }
    const next = line ? `${line} ${word}` : word;
    if (next.length > limit && line) {
      push();
      line = word;
    } else {
      line = next;
    }
  }
  push();
  return lines;
}

export async function buildCard(slug, root = process.cwd()) {
  const data = frontmatter(
    await readFile(join(root, 'src/content/blog', `${slug}.md`), 'utf8')
  );

  const title = data.title;
  if (!title) throw new Error(`no title in the frontmatter of ${slug}.md`);

  const category = data.category ?? 'Games';
  const accent = COLOURS[category] ?? '#B600A8';

  // The cover may be an SVG the routine drew or a real photograph; sharp
  // rasterises both, but an SVG has to be given a density or it renders at its
  // nominal size and blurs on the way up to 1080 wide.
  const coverPath = join(root, 'public', (data.cover ?? '').replace(/^\//, ''));
  let background;
  try {
    if (!data.cover) throw new Error('no cover');
    await access(coverPath);
    background = await sharp(coverPath, { density: 300 })
      .resize(W, H, { fit: 'cover', position: 'attention' })
      .toBuffer();
  } catch {
    // No cover on disk: the flat category colour, rather than failing the whole
    // post over artwork.
    background = await sharp({
      create: { width: W, height: H, channels: 3, background: accent },
    })
      .jpeg()
      .toBuffer();
  }

  const size = title.length > 70 ? 62 : title.length > 45 ? 72 : 84;
  const lines = wrap(title, size, W - 130);
  const lineHeight = size * 1.12;

  // The text block sits low, so the crop keeps whatever the cover put in the
  // middle. It is laid out from its last baseline upward.
  const blockBottom = H - 190;
  const firstBaseline = blockBottom - (lines.length - 1) * lineHeight;

  const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#18011F" stop-opacity="0.10"/>
      <stop offset="40%"  stop-color="#18011F" stop-opacity="0.42"/>
      <stop offset="68%"  stop-color="#18011F" stop-opacity="0.90"/>
      <stop offset="100%" stop-color="#18011F" stop-opacity="0.98"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#shade)"/>

  <rect x="65" y="${firstBaseline - size - 78}" width="86" height="7" fill="${accent}"/>
  <text x="65" y="${firstBaseline - size - 34}"
        font-family="DejaVu Sans, Verdana, sans-serif" font-size="30" font-weight="bold"
        letter-spacing="5" fill="#D7E2EA" fill-opacity="0.85">${esc(category.toUpperCase())}</text>

  ${lines
    .map(
      (l, i) =>
        `<text x="65" y="${firstBaseline + i * lineHeight}" font-family="DejaVu Sans, Verdana, sans-serif" font-size="${size}" font-weight="bold" fill="#FFFFFF">${esc(l)}</text>`
    )
    .join('\n  ')}

  <text x="65" y="${H - 92}"
        font-family="DejaVu Sans, Verdana, sans-serif" font-size="34" font-weight="bold"
        letter-spacing="9" fill="#FFFFFF" fill-opacity="0.92">BACKDROP</text>
  <text x="65" y="${H - 52}"
        font-family="DejaVu Sans, Verdana, sans-serif" font-size="24"
        letter-spacing="1" fill="#D7E2EA" fill-opacity="0.5">gianlucascattarella.it</text>
</svg>`);

  const out = join(root, 'public/img/blog', slug, 'social.jpg');

  // An article that never had an image fetched has no directory here, and
  // writeFile will not make one: it throws ENOENT and takes the whole social
  // job down with it. Twelve published articles are in that state, and the
  // first edit that touched one of them found this.
  await mkdir(dirname(out), { recursive: true });

  await writeFile(
    out,
    await sharp(background)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer()
  );

  return out;
}

/**
 * The cover slide of the daily carousel.
 *
 * A front page rather than a title card: the strongest photograph of the day
 * carries it, heavily darkened, and the headlines are listed over it so someone
 * scrolling past can tell what the day held without swiping. That listing is
 * the whole reason the format works — a slide that only says "today's stories"
 * gives a reader no reason to open it.
 */
export async function buildDigestCover(articles, root = process.cwd()) {
  if (!articles.length) throw new Error('a digest needs at least one article');

  // Prefer a real photograph for the background. The drawn SVG placeholders
  // rasterise flat and read as a colour field once the scrim is over them.
  const withPhoto = articles.find((a) => a.cover && !a.cover.endsWith('.svg'));
  const source = withPhoto ?? articles[0];
  const accent = COLOURS[source.category] ?? '#B600A8';

  let background;
  try {
    if (!source.cover) throw new Error('no cover');
    const p = join(root, 'public', source.cover.replace(/^\//, ''));
    await access(p);
    background = await sharp(p, { density: 300 })
      .resize(W, H, { fit: 'cover', position: 'attention' })
      .toBuffer();
  } catch {
    background = await sharp({
      create: { width: W, height: H, channels: 3, background: '#18011F' },
    })
      .jpeg()
      .toBuffer();
  }

  const day = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  // Headlines are set smaller than on a single card because there are several,
  // and each is capped at two lines: a third line on any one of them pushes the
  // last headline off the canvas.
  const size = articles.length > 4 ? 40 : 46;
  const lineHeight = size * 1.16;

  const blocks = articles.map((a) => ({
    accent: COLOURS[a.category] ?? '#B600A8',
    category: (a.category ?? '').toUpperCase(),
    lines: wrap(a.title, size, W - 200).slice(0, 2),
  }));

  const gap = 34;
  const blockHeights = blocks.map((b) => 30 + b.lines.length * lineHeight);
  const listHeight = blockHeights.reduce((n, h) => n + h, 0) + gap * (blocks.length - 1);

  let y = H - 150 - listHeight;
  const items = blocks
    .map((b) => {
      const top = y;
      y += blockHeights[blocks.indexOf(b)] + gap;
      return `
  <rect x="65" y="${top - 4}" width="7" height="${blockHeights[blocks.indexOf(b)] - 16}" fill="${b.accent}"/>
  <text x="96" y="${top + 20}" font-family="DejaVu Sans, Verdana, sans-serif" font-size="21"
        font-weight="bold" letter-spacing="4" fill="${b.accent}">${esc(b.category)}</text>
  ${b.lines
    .map(
      (l, i) =>
        `<text x="96" y="${top + 30 + (i + 1) * lineHeight - lineHeight * 0.25}" font-family="DejaVu Sans, Verdana, sans-serif" font-size="${size}" font-weight="bold" fill="#FFFFFF">${esc(l)}</text>`
    )
    .join('\n  ')}`;
    })
    .join('\n');

  const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#18011F" stop-opacity="0.72"/>
      <stop offset="30%"  stop-color="#18011F" stop-opacity="0.86"/>
      <stop offset="100%" stop-color="#18011F" stop-opacity="0.97"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#shade)"/>

  <text x="65" y="130" font-family="DejaVu Sans, Verdana, sans-serif" font-size="76"
        font-weight="bold" letter-spacing="12" fill="#FFFFFF">BACKDROP</text>
  <rect x="65" y="158" width="${W - 130}" height="4" fill="${accent}"/>
  <text x="65" y="206" font-family="DejaVu Sans, Verdana, sans-serif" font-size="26"
        letter-spacing="3" fill="#D7E2EA" fill-opacity="0.75">${esc(day.toUpperCase())}</text>
  <text x="65" y="252" font-family="DejaVu Sans, Verdana, sans-serif" font-size="26"
        letter-spacing="3" fill="#D7E2EA" fill-opacity="0.45">${articles.length} ${articles.length === 1 ? 'STORY' : 'STORIES'} · SWIPE</text>
${items}

  <text x="65" y="${H - 62}" font-family="DejaVu Sans, Verdana, sans-serif" font-size="24"
        letter-spacing="1" fill="#D7E2EA" fill-opacity="0.5">gianlucascattarella.it — link in bio</text>
</svg>`);

  const out = join(root, 'public/img/blog/digest', `${new Date().toISOString().slice(0, 10)}.jpg`);
  await mkdir(dirname(out), { recursive: true });

  await writeFile(
    out,
    await sharp(background)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer()
  );

  return out;
}

/**
 * One frame of the evening story.
 *
 * The digest moved out of the feed because a template that looks the same every
 * day looks wrong in a grid that keeps it forever. A story keeps it for
 * twenty-four hours, where sameness is the format rather than a fault — a
 * masthead you recognise at a glance, tapped through in ten seconds.
 *
 * 9:16 rather than the feed card's 4:5. Instagram letterboxes anything else,
 * and a letterboxed story reads as a reposted feed post, which is the thing
 * this is trying to stop being.
 *
 * `index` and `total` drive the progress pips, so a viewer can see how many
 * taps are left before they decide to leave.
 */
export async function buildStoryFrame(
  { title, category, cover, score, kicker },
  index,
  total,
  root = process.cwd()
) {
  const accent = COLOURS[category] ?? '#B600A8';

  let background;
  try {
    if (!cover) throw new Error('no cover');
    const p = join(root, 'public', cover.replace(/^\//, ''));
    await access(p);
    background = await sharp(p, { density: 300 })
      .resize(STORY_W, STORY_H, { fit: 'cover', position: 'attention' })
      .toBuffer();
  } catch {
    background = await sharp({
      create: { width: STORY_W, height: STORY_H, channels: 3, background: '#18011F' },
    })
      .jpeg()
      .toBuffer();
  }

  const size = title.length > 78 ? 62 : title.length > 48 ? 70 : 80;
  const lines = wrap(title, size, STORY_W - 150);
  const lineHeight = size * 1.14;

  // The text sits in the lower third: the top is where a phone puts the account
  // name and the close button, and the very bottom is where a thumb rests.
  const blockBottom = STORY_H - 420;
  const firstBaseline = blockBottom - (lines.length - 1) * lineHeight;

  // Progress pips across the top, the way a story already reads.
  const pipGap = 8;
  const pipW = (STORY_W - 120 - pipGap * (total - 1)) / total;
  const pips = Array.from({ length: total }, (_, i) =>
    `<rect x="${60 + i * (pipW + pipGap)}" y="46" width="${pipW}" height="5" rx="2.5" fill="#FFFFFF" fill-opacity="${i <= index ? 0.95 : 0.3}"/>`
  ).join('');

  const overlay = Buffer.from(`
<svg width="${STORY_W}" height="${STORY_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#18011F" stop-opacity="0.62"/>
      <stop offset="26%"  stop-color="#18011F" stop-opacity="0.30"/>
      <stop offset="55%"  stop-color="#18011F" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#18011F" stop-opacity="0.97"/>
    </linearGradient>
  </defs>

  <rect width="${STORY_W}" height="${STORY_H}" fill="url(#shade)"/>
  ${pips}

  <text x="60" y="132" font-family="DejaVu Sans, Verdana, sans-serif" font-size="34"
        font-weight="bold" letter-spacing="9" fill="#FFFFFF" fill-opacity="0.92">BACKDROP</text>

  <rect x="60" y="${firstBaseline - size - 96}" width="94" height="7" fill="${accent}"/>
  <text x="60" y="${firstBaseline - size - 48}"
        font-family="DejaVu Sans, Verdana, sans-serif" font-size="30" font-weight="bold"
        letter-spacing="6" fill="#D7E2EA" fill-opacity="0.88">${esc((kicker ?? category).toUpperCase())}</text>

  ${lines
    .map(
      (l, i) =>
        `<text x="60" y="${firstBaseline + i * lineHeight}" font-family="DejaVu Sans, Verdana, sans-serif" font-size="${size}" font-weight="bold" fill="#FFFFFF">${esc(l)}</text>`
    )
    .join('\n  ')}

  ${
    score !== undefined
      ? `<text x="60" y="${blockBottom + 96}" font-family="DejaVu Sans, Verdana, sans-serif" font-size="56" font-weight="bold" fill="${accent}">${score}/10</text>`
      : ''
  }

  <text x="60" y="${STORY_H - 96}" font-family="DejaVu Sans, Verdana, sans-serif" font-size="27"
        letter-spacing="2" fill="#D7E2EA" fill-opacity="0.55">gianlucascattarella.it</text>
</svg>`);

  const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(new Date());
  const out = join(root, 'public/img/blog/digest', `${day}-story-${String(index).padStart(2, '0')}.jpg`);
  await mkdir(dirname(out), { recursive: true });

  await writeFile(
    out,
    await sharp(background)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 86, mozjpeg: true })
      .toBuffer()
  );

  return out;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const slug = process.argv[2];
  if (!slug) {
    console.error('usage: node scripts/social-card.mjs <slug>');
    process.exit(1);
  }
  console.log(await buildCard(slug));
}
