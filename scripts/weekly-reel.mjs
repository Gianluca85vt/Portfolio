/**
 * Saturday: one breakdown Reel on the week's best 3D piece, drawn and emailed
 * to Gianluca with its caption. He posts it by hand as a photo Reel, because
 * only the app can put a trending track under it.
 *
 *   node scripts/weekly-reel.mjs            # draw the frames and email them
 *   node scripts/weekly-reel.mjs --print    # pick and caption only, send nothing
 *
 * The growth plan of 5 October cut the Reels from seven a week to one: a
 * nightly recap of headlines is a format nobody follows, and the plan judges
 * every channel by one question, whether it brings newsletter subscribers. A
 * breakdown of a single piece — what works in the craft, what does not, and
 * his reading of it — is the one thing in the feed nobody else makes.
 *
 * The frames come from the article's own "artist's view", so the Reel says
 * exactly what the published piece says and nothing it does not.
 */
import { pathToFileURL } from 'node:url';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readFileSync, readdirSync } from 'node:fs';
import { loadArticles, romeDay, addDays, esc } from './lib/articles.mjs';
import { mailHim } from './lib/mail.mjs';
import { clip } from './newsletter-draft.mjs';

const TAGS = JSON.parse(readFileSync(new URL('../src/data/social-tags.json', import.meta.url), 'utf8'));

/** Categories whose pieces make a craft breakdown, best first. */
const ORDER = ['3D', 'Tech', 'Games', 'Film & TV', 'Manga', 'AI'];

/** "Texturing: de-repeating at the paint stage…" → ["Texturing", "de-repeating…"]. */
export function splitPoint(point) {
  const m = String(point).match(/^([^:]{2,40}):\s*(.+)$/);
  return m ? [m[1].trim(), m[2].trim()] : ['', String(point).trim()];
}

/**
 * The week's piece: one with an artist's view that names what works and what
 * does not, from the most craft-heavy category that has one, newest first.
 */
/** Pictures a Reel needs before its frames stop looking like a slideshow of one. */
export const MIN_PICTURES = 3;

/**
 * The week's piece: one with an artist's view that names what works and what
 * does not, and enough pictures to carry eight frames. Among those, the most
 * craft-heavy category first, then the newest. A week where no piece has
 * enough pictures takes the one with the most.
 *
 * The first Saturday picked a 3D piece with a single video still, and six of
 * its eight frames came out as a dark field with an orange glow, while a 3D
 * piece with four press shots sat in the same week.
 */
export function pickPiece(articles, today, picturesOf = () => []) {
  const from = addDays(today, -7);
  const fit = articles
    .filter((a) => a.date > from && a.date <= today && a.take && a.works.length && a.misses.length && ORDER.includes(a.category))
    .map((a) => ({ a, n: picturesOf(a).length }));
  const byCraft = (x, y) => ORDER.indexOf(x.a.category) - ORDER.indexOf(y.a.category) || y.a.date.localeCompare(x.a.date);
  const enough = fit.filter((x) => x.n >= MIN_PICTURES).sort(byCraft);
  if (enough.length) return enough[0].a;
  fit.sort((x, y) => y.n - x.n || byCraft(x, y));
  return fit[0]?.a ?? null;
}

/**
 * How a picture is framed the second, third and fourth time it comes round:
 * the 9:16 crop moves across a 16:9 still, then closes in. Two pictures under
 * eight frames then read as eight shots rather than as a loop.
 */
const FOCUS = ['attention', 'left', 'right', 'zoom'];

/** The frames, as content: what each one says and which picture sits under it. */
export function plan(a, pictures) {
  // A lone picture is usually a logo or a title card centred in the frame, and
  // sliding the crop to its ends finds empty background: it alternates between
  // the subject and a closer view instead.
  const focus = pictures.length === 1 ? ['attention', 'zoom'] : FOCUS;
  const pic = (i) =>
    pictures.length
      ? { image: pictures[i % pictures.length], focus: focus[Math.floor(i / pictures.length) % focus.length] }
      : { image: '', focus: 'attention' };
  const frames = [{ kicker: 'Breakdown', heading: a.title, body: '' }];
  frames.push({ kicker: a.category, heading: 'What happened', body: clip(a.excerpt, 200) });
  for (const w of a.works.slice(0, 2)) {
    const [area, text] = splitPoint(w);
    frames.push({ kicker: 'What works', heading: area || 'What works', body: clip(text, 230) });
  }
  for (const m of a.misses.slice(0, 2)) {
    const [area, text] = splitPoint(m);
    frames.push({ kicker: 'What does not', heading: area || 'What does not', body: clip(text, 230) });
  }
  frames.push({ kicker: 'My read', heading: 'As a 3D artist', body: sentences(a.take, 240) });
  frames.push({
    kicker: 'Backdrop',
    heading: 'The full breakdown is on the blog',
    body: 'Link in bio. Every Thursday the newsletter carries the week’s tools and what changed in them.',
  });
  return frames.map((f, i) => ({
    ...f,
    ...pic(i),
    body: f.body && f.body[0].toUpperCase() + f.body.slice(1),
    category: a.category,
  }));
}

/** Every picture a piece can lend its Reel: the cover first, then its shots. */
export function picturesOf(a, files) {
  const cover = a.cover && !a.cover.endsWith('.svg') ? [a.cover] : [];
  const shots = files
    .filter((f) => /^shot-\d+\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .map((f) => `/img/blog/${a.slug}/${f}`);
  return [...new Set([...cover, ...shots])];
}

/** Tags that name a tool, kept only when the piece is about that tool. */
const TOOL_TAGS = {
  '#blender': /\bblender\b/i,
  '#unrealengine': /\bunreal\b|\bue5\b/i,
  '#cinema4d': /\bcinema 4d\b|\bc4d\b/i,
  '#houdini': /\bhoudini\b/i,
  '#maya': /\bmaya\b/i,
  '#zbrush': /\bzbrush\b/i,
  '#substancepainter': /\bsubstance painter\b/i,
  '#nuke': /\bnuke\b/i,
  '#unity3d': /\bunity\b/i,
  '#godotengine': /\bgodot\b/i,
};

/**
 * Five tags at most (Instagram refuses a sixth): the tool the piece names
 * first, then the category's own tags with any tool tag the piece does not
 * mention taken out. "#blender" on a Cinema 4D piece reaches the wrong people.
 */
export function reelTags(a) {
  const about = `${a.title} ${a.excerpt}`;
  const named = Object.entries(TOOL_TAGS).filter(([, re]) => re.test(about)).map(([t]) => t);
  const general = (TAGS[a.category] ?? []).filter((t) => !TOOL_TAGS[t] || TOOL_TAGS[t].test(about));
  return [...new Set([...named, ...general])].slice(0, 5);
}

/** The caption to paste: the headline first, since it is what shows before "more". */
/**
 * Whole sentences from the start of a text, as many as fit in `max`. A reading
 * cut off at "since…" reads as a mistake in a caption he pastes as his own;
 * only a first sentence longer than the whole budget is cut mid-way.
 */
export function sentences(text, max) {
  const all = String(text).trim().match(/[^.!?]+[.!?]+(?=\s|$)/g) ?? [];
  let out = '';
  for (const s of all) {
    const next = `${out} ${s.trim()}`.trim();
    if (next.length > max) break;
    out = next;
  }
  return out || clip(text, max);
}

export function caption(a) {
  const areas = (list) => list.map((p) => splitPoint(p)[0]).filter(Boolean).slice(0, 3).join(', ');
  const tags = reelTags(a).join(' ');
  return [
    /[.!?…]$/.test(a.title) ? a.title : `${a.title}.`,
    '',
    sentences(a.take, 260),
    '',
    [areas(a.works) && `What works: ${areas(a.works)}.`, areas(a.misses) && `What doesn't: ${areas(a.misses)}.`].filter(Boolean).join(' '),
    '',
    'The full breakdown is on the blog, link in bio.',
    '',
    tags,
  ]
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** The files in a piece's image folder; none when it has no folder. */
function filesOf(slug, root) {
  try {
    return readdirSync(join(root, 'public/img/blog', slug));
  } catch {
    return [];
  }
}

async function main() {
  const root = process.cwd();
  const today = process.env.REEL_DAY || romeDay();
  const pictures = (x) => picturesOf(x, filesOf(x.slug, root));
  const a = pickPiece(await loadArticles(root), today, pictures);
  if (!a) {
    console.log('no piece with a full artist’s view this week — no Reel');
    return;
  }
  const images = pictures(a);
  const frames = plan(a, images);
  const text = caption(a);
  console.log(`${a.title} (${a.category}) — ${frames.length} frames, ${images.length} pictures\n\n${text}`);
  if (process.argv.includes('--print')) return;

  const { buildReelFrame } = await import('./social-card.mjs');
  const dir = await mkdtemp(join(tmpdir(), 'reel-'));
  const made = [];
  for (const [i, f] of frames.entries()) made.push(await buildReelFrame(f, i, frames.length, dir, root));

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#222;max-width:680px;">
<p><strong>Il reel della settimana è pronto:</strong> <a href="${esc(a.url)}">${esc(a.title)}</a>.</p>
<ol style="margin:0 0 12px 18px;padding:0;">
<li>Salva i ${made.length} fotogrammi allegati: sono già in ordine (reel-01, reel-02…).</li>
<li>Instagram → Reel → seleziona le foto in ordine, scegli un audio dalla scheda Tendenze e trascina ogni foto sul beat.</li>
<li>Incolla la caption qui sotto, pubblica, poi condividi il reel nella storia.</li>
</ol>
<p style="margin:14px 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#777;">Caption</p>
<div style="border:1px solid #ddd;border-radius:6px;padding:10px 12px;white-space:pre-wrap;font-family:Consolas,monospace;font-size:13px;">${esc(text)}</div>
<p style="margin:14px 0 0;color:#777;font-size:12px;">Ogni fotogramma riprende quello che dice l'articolo nella sezione "The artist's view", niente di più.</p>
</div>`;

  await mailHim({
    subject: `Reel della settimana: ${a.title}`,
    html,
    text: `Reel della settimana: ${a.title}\n${a.url}\n\nCaption:\n${text}`,
    attachments: made.map((p) => ({ filename: p.split(/[\\/]/).pop(), path: p })),
  });
  console.log(`emailed ${made.length} frames`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
