/**
 * Takes a writer's placeholder out of any article that is already public.
 *
 *   node scripts/strip-placeholders.mjs          # fix in place, report
 *   node scripts/strip-placeholders.mjs --check  # exit 1 if any would change
 *
 * The Monday editorial leaves a paragraph like "[[ANEDDOTO: a memory of …]]"
 * where only Gianluca can write the line. Publishing is refused while one is
 * left (publishRefusal in src/lib/github.ts), but on 28 September and
 * 5 October two editorials went live with four of them on the page, and a
 * commit can reach main by more than one door. This is the net behind that
 * check, run by the same workflow that fixes review titles: on a published
 * article a placeholder is always wrong, so it goes.
 *
 * Drafts are left alone, since the placeholder is the point of a draft. It
 * never fails a build — it only rewrites, and only whole placeholder
 * paragraphs.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

/** A paragraph that is nothing but [[WORD: …]], on one line, and the blank line after it. */
const PARAGRAPH = /^\[\[[A-Z]+:?[^\n]*\]\][ \t]*\n(?:[ \t]*\n)?/gm;

export function stripPlaceholders(text) {
  const crlf = text.includes('\r\n');
  const lf = text.replace(/\r\n/g, '\n');
  const found = lf.match(PARAGRAPH)?.length ?? 0;
  if (!found) return { text, found };
  const out = lf.replace(PARAGRAPH, '');
  return { text: crlf ? out.replace(/\n/g, '\r\n') : out, found };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const check = process.argv.includes('--check');
  const dir = join(process.cwd(), 'src/content/blog');
  let total = 0;
  for (const file of (await readdir(dir)).filter((f) => f.endsWith('.md'))) {
    const path = join(dir, file);
    const text = await readFile(path, 'utf8');
    if (/^draft:\s*true\s*$/m.test(text)) continue;
    const { text: next, found } = stripPlaceholders(text);
    if (!found) continue;
    total += found;
    console.log(`${file}: ${found} placeholder(s)`);
    if (!check) await writeFile(path, next);
  }
  if (!total) console.log('No placeholders on any published article.');
  else if (check) process.exit(1);
  else console.log(`Removed ${total} placeholder(s).`);
}
