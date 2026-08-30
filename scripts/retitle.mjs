/**
 * Applies rewritten titles from a JSON map of slug → new title.
 *
 *   node scripts/retitle.mjs titles.json          check, change nothing
 *   node scripts/retitle.mjs titles.json --write  apply
 *
 * Refuses anything that would not survive a search result: over sixty
 * characters, or empty. Quotes the value when it contains a colon, because an
 * unquoted colon in YAML fails the build — which is the correct outcome, but a
 * confusing one to debug from a title.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const LIMIT = 60;
const [, , mapFile] = process.argv;
const write = process.argv.includes('--write');

if (!mapFile) {
  console.error('usage: node scripts/retitle.mjs <map.json> [--write]');
  process.exit(1);
}

const map = JSON.parse(await readFile(mapFile, 'utf8'));
let done = 0;
let refused = 0;

for (const [slug, title] of Object.entries(map)) {
  if (!title || title.length > LIMIT) {
    console.log(`  REFUSED ${String(title?.length ?? 0).padStart(3)}  ${slug}`);
    console.log(`          ${title}`);
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
  const current = text.match(/^title:\s*(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '');
  if (current === undefined) {
    console.log(`  NO TITLE      ${slug}`);
    refused += 1;
    continue;
  }

  const value = /[:#]/.test(title) ? `"${title.replace(/"/g, '\\"')}"` : title;
  const updated = text.replace(/^title:\s*.*$/m, `title: ${value}`);

  console.log(`  ${String(current.length).padStart(3)} → ${String(title.length).padStart(2)}  ${title}`);
  if (write) await writeFile(path, eol === '\r\n' ? updated.replace(/\n/g, '\r\n') : updated, 'utf8');
  done += 1;
}

console.log(`\n${done} rewritten${write ? '' : ' (dry run)'}, ${refused} refused`);
