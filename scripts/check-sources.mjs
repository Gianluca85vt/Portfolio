/**
 * Whether a draft has two independent outlets behind it.
 *
 *   node scripts/check-sources.mjs <file.md>
 *   node scripts/check-sources.mjs --all
 *
 * Gianluca's rule: a story resting on one outlet does not go out. It stays a
 * draft and waits, and if a second source never arrives it dies there.
 *
 * This is advisory, and deliberately so. The first version of it lived in the
 * content schema and failed the build, which does not hold one piece back - it
 * stops the whole site deploying. On 7 September the Monday editorial published
 * without a sources field, two deployments died a minute apart, and the site
 * froze on the previous build with every later push failing behind it. A draft
 * waiting costs nothing; a red build costs everything.
 *
 * So it runs where the decision is actually made: alongside prose-check, before
 * the review email goes out, so the piece is flagged while it is still a draft
 * and can still be held.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

/**
 * Every outlet named in the frontmatter, from either field that carries one.
 *
 * `sources` is the field for reported stories and `scoreSources` for reviews,
 * and both answer the same question - a review quoting ten outlets' scores has
 * plainly read more than one of them - so both count and neither needs special
 * handling. Only the `outlet:` lines are read, which sidesteps parsing YAML
 * arrays for two keys.
 */
export function outletsIn(text) {
  const block = text.replace(/\r\n?/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  if (!block) return [];

  // Both YAML shapes in use here, because the two fields were written years
  // apart and do not agree: `sources` is block style, one key per line, while
  // every review's `scoreSources` is inline flow -
  //
  //   - { outlet: GamesRadar+, score: 9 }
  //
  // Matching only the block form read all fifteen reviews as unsourced.
  const outlets = [];
  for (const m of block[1].matchAll(/outlet:\s*([^,}\n]+)/g)) {
    outlets.push(m[1].replace(/^["']|["']$/g, '').trim().toLowerCase());
  }
  // Distinct. Two links to the same publication is one source read twice,
  // which is how a single wire story gets mistaken for corroboration.
  return [...new Set(outlets.filter(Boolean))];
}

export function report(file, text) {
  const outlets = outletsIn(text);
  const draft = /^draft:\s*true/m.test(text);
  const head = `${file}  ·  ${outlets.length} outlet${outlets.length === 1 ? '' : 's'}${
    outlets.length ? `: ${outlets.join(', ')}` : ''
  }`;

  if (outlets.length >= 2) return `OK   ${head}`;

  const what =
    outlets.length === 0
      ? 'no sources declared in the frontmatter.'
      : 'only one outlet, so nothing corroborates it.';

  return [
    `WARN ${head}`,
    `       - ${what}`,
    '       - Add sources: [{ outlet, url }, ...] before approving.',
    draft
      ? '       - It is still a draft, which is where it should stay until a second one turns up.'
      : '       - THIS IS ALREADY PUBLISHED. It went out on one source.',
  ].join('\n');
}

const args = process.argv.slice(2);

if (args[0] === '--all') {
  const dir = 'src/content/blog';
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  let flagged = 0;
  for (const f of files) {
    const line = report(f, await readFile(path.join(dir, f), 'utf8'));
    if (line.startsWith('WARN')) flagged++;
    console.log(line);
  }
  console.log(`\n${flagged} of ${files.length} articles have fewer than two outlets.`);
} else if (args[0]) {
  console.log(report(args[0], await readFile(args[0], 'utf8')));
} else {
  console.log('usage: node scripts/check-sources.mjs <file.md> | --all');
  process.exit(1);
}
