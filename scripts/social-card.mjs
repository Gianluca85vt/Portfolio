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
import { readFile, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const W = 1080;
const H = 1350;

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

  await writeFile(
    out,
    await sharp(background)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer()
  );

  return out;
}

if ((process.argv[1] || '').includes('social-card')) {
  const slug = process.argv[2];
  if (!slug) {
    console.error('usage: node scripts/social-card.mjs <slug>');
    process.exit(1);
  }
  console.log(await buildCard(slug));
}
