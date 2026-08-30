/**
 * Brings every article excerpt under the length Google shows.
 *
 *   node scripts/fix-excerpts.mjs            propose, change nothing
 *   node scripts/fix-excerpts.mjs --write    apply the safe ones
 *
 * The excerpt is the meta description and the text on the index card, so this
 * is the sentence a searcher reads before deciding whether to click. Google
 * cuts it around 160 characters, and the median here is 233 — which means most
 * of them end mid-word in the one place they were meant to persuade.
 *
 * Two outcomes, deliberately separated:
 *
 *   SAFE   the excerpt ends a sentence at or before the limit, so cutting
 *          there loses a follow-up and keeps a whole thought. Applied.
 *   MANUAL the first sentence alone runs past the limit. There is no cut that
 *          leaves good prose, so it needs writing rather than trimming, and
 *          the script refuses to guess.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIR = 'src/content/blog';
const LIMIT = 158;

/**
 * A cut that lands under this has thrown away the point along with the excess.
 * "Game Freak spent thirty years making one thing." is a fine opening clause
 * and a useless search result: it never says what the article is about. Those
 * go to the rewrite pile rather than shipping as a stub.
 */
const FLOOR = 90;

const write = process.argv.includes('--write');

/** Sentence ends, ignoring the dot in "1.2TB/s" or "v5.2". */
function sentenceEnds(text) {
  const ends = [];
  for (const m of text.matchAll(/[.!?](?=\s|$)/g)) {
    const before = text[m.index - 1];
    const after = text[m.index + 2];
    if (/\d/.test(before) && /\d/.test(after ?? '')) continue;
    ends.push(m.index + 1);
  }
  return ends;
}

const safe = [];
const manual = [];
const fine = [];

for (const file of (await readdir(DIR)).filter((f) => f.endsWith('.md'))) {
  const path = join(DIR, file);
  const raw = await readFile(path, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const text = raw.replace(/\r\n?/g, '\n');

  const head = text.match(/^---\n([\s\S]*?)\n---/)?.[1];
  if (!head) continue;
  const line = head.match(/^excerpt:\s*(.*)$/m);
  if (!line) continue;

  const excerpt = line[1].trim().replace(/^["']|["']$/g, '');
  const slug = file.replace(/\.md$/, '');

  if (excerpt.length <= LIMIT) {
    fine.push(slug);
    continue;
  }

  const cut = sentenceEnds(excerpt).filter((i) => i <= LIMIT).pop();
  if (!cut) {
    manual.push({ slug, len: excerpt.length, excerpt });
    continue;
  }

  const trimmed = excerpt.slice(0, cut).trim();
  if (trimmed.length < FLOOR) {
    manual.push({ slug, len: excerpt.length, excerpt });
    continue;
  }
  safe.push({ slug, from: excerpt.length, to: trimmed.length, trimmed });

  if (write) {
    const updated = text.replace(/^excerpt:\s*.*$/m, `excerpt: ${trimmed}`);
    await writeFile(path, eol === '\r\n' ? updated.replace(/\n/g, '\r\n') : updated, 'utf8');
  }
}

console.log(`${fine.length} already fit`);
console.log(`${safe.length} cut at a sentence end${write ? ' — written' : ''}`);
console.log(`${manual.length} need rewriting by hand\n`);

for (const s of safe.slice(0, 8)) {
  console.log(`  ${s.from} → ${s.to}  ${s.slug}`);
  console.log(`     ${s.trimmed}`);
}
if (safe.length > 8) console.log(`  … and ${safe.length - 8} more\n`);

if (manual.length) {
  console.log('\nFirst sentence already too long — these need writing:');
  for (const m of manual) console.log(`  ${m.len}  ${m.slug}`);
}
