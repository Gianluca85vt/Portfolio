/**
 * Measures the things that make writing read as machine-generated, on one
 * article or on the whole archive.
 *
 *   node scripts/prose-check.mjs src/content/blog/some-piece.md
 *   node scripts/prose-check.mjs --all
 *
 * The two numbers that matter are borrowed from how AI detectors actually
 * work. Burstiness is the variation in sentence length: a person writes a
 * twelve-word sentence, then a forty-word one, then four words. A model
 * converges on a comfortable middle and stays there. Perplexity — how
 * surprising the word choices are — cannot be measured here without a model,
 * so this checks the things that can be counted instead: sentence rhythm,
 * the reversal construction, filler transitions and bold density.
 *
 * Advisory by design. It prints what is off and exits 0, because a piece can
 * break any of these rules deliberately and still be good. It exists so the
 * decision is made rather than made by accident.
 */

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

// Measured per-article across 91 published pieces in August 2026: median 0.56,
// quartiles 0.52 and 0.62, worst 0.33. A floor of 0.55 would flag forty per
// cent of the archive, which is a threshold nobody would act on. 0.48 catches
// the ninth percentile — the genuinely flat pieces — and leaves the middle
// alone.
const MIN_BURSTINESS = 0.48;

// Google shows roughly 60 characters of a title and 160 of a description before
// cutting. An audit in August 2026 found 92 of 97 titles over the line, running
// to 90 characters on average — so what a searcher actually saw was the setup
// with the point sliced off. The site appends " — Backdrop", which eats eleven
// of the sixty.
const TITLE_LIMIT = 60 - ' — Backdrop'.length;
const EXCERPT_LIMIT = 160;
const MAX_MEAN_WORDS = 30;

// The construction Gianluca identified: a clause that exists only to be
// contradicted by the next one.
const REVERSALS = [
  /,\s+and (that's|that is|the (real|actual|interesting|whole)\b)/gi,
  /\b(it|that|this)('s| is| was) not [^.;]{3,70}[,.]\s+(it|that|this)('s| is| was)\b/gi,
  /\bNone of (this|that) is a\b/gi,
  /\b\w+ (isn't|is not) the (problem|story|point|issue|trick)\b/gi,
  /(?:^|\s)Not because [^.,]{3,50}[,.]\s*Because\b/gi,
];

// Connectives a person rarely reaches for out loud.
const FILLER = /\b(furthermore|moreover|in addition|additionally|in conclusion|it('s| is) worth noting|it should be noted|that being said|when it comes to|in today's world)\b/gi;

const HEDGE = /\b(arguably|somewhat|fairly|quite possibly|it could be argued|one might say)\b/gi;

function body(md) {
  const parts = md.split('---');
  let t = parts.length >= 3 ? parts.slice(2).join('---') : md;
  t = t.replace(/```[\s\S]*?```/g, ' ');
  t = t.replace(/<[^>]+>/g, ' ');
  return t;
}

function sentences(text) {
  const flat = text.replace(/^#.*$/gm, ' ').replace(/\s+/g, ' ');
  return flat
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim().split(/\s+/).length)
    .filter((n) => n >= 2 && n <= 90);
}

function count(re, text) {
  return (text.match(re) ?? []).length;
}

async function inspect(file) {
  const md = await readFile(file, 'utf8');
  const text = body(md);

  // Frontmatter read by splitting, not matching. A regex assembled by a
  // script is one lost backslash away from meaning something else, and the
  // failure is silent.
  const fmBlock = md.startsWith(`---`) ? md.split(`
---`)[0].slice(3) : ``;
  const fmField = (k) => {
    const line = fmBlock.split(`
`).find((l) => l.trim().startsWith(k + `:`));
    return line ? line.slice(line.indexOf(`:`) + 1).trim().replace(/^["']|["']$/g, ``) : ``;
  };
  const title = fmField(`title`);
  const excerpt = fmField(`excerpt`);

  const lens = sentences(text);

  const mean = lens.reduce((a, b) => a + b, 0) / (lens.length || 1);
  const sd = Math.sqrt(lens.reduce((a, b) => a + (b - mean) ** 2, 0) / (lens.length || 1));
  const cv = sd / (mean || 1);

  const words = text.split(/\s+/).length;
  const reversals = REVERSALS.reduce((n, re) => n + count(re, text), 0);

  return {
    file: path.basename(file),
    sentences: lens.length,
    mean,
    cv,
    short: lens.filter((n) => n < 8).length / (lens.length || 1),
    reversals,
    filler: count(FILLER, text),
    hedge: count(HEDGE, text),
    // Bold per thousand words. Every key term emboldened is an LLM fingerprint;
    // a couple of deliberate ones is editing.
    boldPer1k: (count(/\*\*[^*\n]+\*\*/g, text) / (words || 1)) * 1000,
    headings: count(/^##\s/gm, md),
    titleLength: title.length,
    // Where the informative half sits matters more than the total length: a
    // long title is fine as long as the point survives the cut.
    titleHead: title.slice(0, TITLE_LIMIT),
    excerptLength: excerpt.length,
  };
}

function report(m) {
  const warn = [];
  if (m.cv < MIN_BURSTINESS)
    warn.push(`burstiness ${m.cv.toFixed(2)} — sentences too uniform (want ${MIN_BURSTINESS}+). Break some in half, let one run long.`);
  if (m.mean > MAX_MEAN_WORDS)
    warn.push(`mean sentence ${m.mean.toFixed(1)} words — long enough to read as an essay machine.`);
  if (m.short < 0.08)
    warn.push(`only ${(m.short * 100).toFixed(0)}% of sentences are under 8 words. Short ones carry the rhythm.`);
  if (m.reversals) warn.push(`${m.reversals} setup-then-reversal construction(s) — the banned move.`);
  if (m.filler) warn.push(`${m.filler} filler connective(s) — furthermore, moreover, in conclusion.`);
  if (m.hedge > 2) warn.push(`${m.hedge} hedges — say it or cut it.`);
  if (m.boldPer1k > 6) warn.push(`bold ${m.boldPer1k.toFixed(1)} per 1000 words — too dense.`);
  if (m.titleLength > TITLE_LIMIT)
    warn.push(
      `title ${m.titleLength} chars — search cuts it after "${m.titleHead}…". Make those first ${TITLE_LIMIT} carry the point.`,
    );
  if (m.excerptLength > EXCERPT_LIMIT)
    warn.push(`excerpt ${m.excerptLength} chars — search shows about ${EXCERPT_LIMIT}. Front-load it.`);
  if (m.excerptLength && m.excerptLength < 70)
    warn.push(`excerpt only ${m.excerptLength} chars — too thin to earn a click.`);

  const head = `${m.file}  ·  ${m.sentences} sentences  ·  burstiness ${m.cv.toFixed(2)}  ·  mean ${m.mean.toFixed(1)}w  ·  ${m.headings} headings`;
  if (!warn.length) return `OK   ${head}`;
  return [`WARN ${head}`, ...warn.map((w) => `       - ${w}`)].join('\n');
}

const args = process.argv.slice(2);

if (args[0] === '--all') {
  const dir = 'src/content/blog';
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  const rows = [];
  for (const f of files) rows.push(await inspect(path.join(dir, f)));
  rows.sort((a, b) => a.cv - b.cv);
  for (const m of rows) console.log(report(m));
  const flagged = rows.filter((m) => m.cv < MIN_BURSTINESS || m.reversals || m.filler).length;
  console.log(`\n${flagged} of ${rows.length} articles flagged.`);
} else if (args[0]) {
  console.log(report(await inspect(args[0])));
} else {
  console.log('usage: node scripts/prose-check.mjs <file.md> | --all');
  process.exit(1);
}
