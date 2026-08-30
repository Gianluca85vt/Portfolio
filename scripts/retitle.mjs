/**
 * Applies rewritten frontmatter from a JSON map of slug → new value.
 *
 *   node scripts/retitle.mjs titles.json                          check only
 *   node scripts/retitle.mjs titles.json --write                  apply
 *   node scripts/retitle.mjs excerpts.json --field excerpt --write
 *
 * Refuses anything that would not survive a search result: past the limit for
 * the field, or empty. Quotes a value containing a colon, because an unquoted
 * one fails the YAML — the correct outcome, but a baffling error to trace back
 * from a build log to a headline.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const [, , mapFile] = process.argv;
const write = process.argv.includes('--write');

const fieldArg = process.argv.indexOf('--field');
const FIELD = fieldArg >= 0 ? process.argv[fieldArg + 1] : 'title';

// Google truncates a title around sixty characters and a description around a
// hundred and sixty.
const LIMIT = FIELD === 'title' ? 60 : 158;

if (!mapFile) {
  console.error('usage: node scripts/retitle.mjs <map.json> [--field name] [--write]');
  process.exit(1);
}

const map = JSON.parse(await readFile(mapFile, 'utf8'));
let done = 0;
let refused = 0;

for (const [slug, value] of Object.entries(map)) {
  if (!value || value.length > LIMIT) {
    console.log(`  REFUSED ${String(value?.length ?? 0).padStart(3)}  ${slug}`);
    console.log(`          ${value}`);
    refused += 1;
    continue;
  }

  const path = join('src/content/blog', `${slug}.md`);
  let raw;
  try {
    raw = await readFile(path, 'utf8');
  } catch {
    console.log(`  MISSING       ${slug}`);
    refused += 1;
    continue;
  }

  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const text = raw.replace(/\r\n?/g, '\n');

  const read = new RegExp(`^${FIELD}:\\s*(.*)$`, 'm');
  const current = text.match(read)?.[1]?.trim().replace(/^["']|["']$/g, '');
  if (current === undefined) {
    console.log(`  NO ${FIELD.toUpperCase()}  ${slug}`);
    refused += 1;
    continue;
  }

  const yaml = /[:#]/.test(value) ? `"${value.replace(/"/g, '\\"')}"` : value;
  const updated = text.replace(new RegExp(`^${FIELD}:\\s*.*$`, 'm'), `${FIELD}: ${yaml}`);

  console.log(`  ${String(current.length).padStart(3)} → ${String(value.length).padStart(3)}  ${slug}`);
  if (write) await writeFile(path, eol === '\r\n' ? updated.replace(/\n/g, '\r\n') : updated, 'utf8');
  done += 1;
}

console.log(`\n${done} rewritten${write ? '' : ' (dry run)'}, ${refused} refused`);
