/**
 * Keeps the score out of review headlines, for good.
 *
 *   node scripts/normalise-review-titles.mjs          # fix in place, report
 *   node scripts/normalise-review-titles.mjs --check  # exit 1 if any would change
 *
 * The rule — a review title carries the verdict in words, never the number —
 * kept getting written into a notes file and kept being ignored, because the
 * cloud writer follows its own prompt over a repo note. So this stops asking
 * and starts fixing: a workflow runs it on every push that touches the blog,
 * and a scored headline is rewritten within the minute, whatever wrote it.
 *
 * It cannot fail the build. It only ever shortens a title, and it is wired as a
 * self-healing commit, not a schema check — the schema check that rejected a
 * draft once took the whole site down with it, and that mistake is not repeated
 * here.
 *
 * It is a safety net, not the author. Stripped down it leaves "<Game> review",
 * which is dull but not a spoiler; the writer is still asked, in
 * article-voice.md, to give the verdict in words. This catches the misses.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * The score, removed from a review headline.
 *
 * Only a "review:" / "reviews:" tail that actually contains a digit is cut, so
 * the game's own numbers are safe — "NHL 27", "NBA 2K27", "Valheim 1.0" all sit
 * before the "review:" and stay, and a verdict-in-words tail with no number
 * ("reviews: great scores, bad launch") is left exactly as written.
 */
export function cleanReviewTitle(title) {
  const m = title.match(/\s+reviews?:\s*(.*)$/i);
  if (!m || !/\d/.test(m[1])) return title;
  const head = title.slice(0, m.index).trim();
  // Never return an empty headline; if there is nothing before "review:",
  // leave the title alone for a human to fix rather than blanking it.
  return head || title;
}

function frontmatterTitle(text) {
  return /^title:\s*(.+)$/m.exec(text.replace(/\r\n/g, '\n'))?.[1] ?? null;
}

/** Reviews are the files carrying a score; only those are touched. */
function isReview(text) {
  return /^score:\s*[\d.]+\s*$/m.test(text.replace(/\r\n/g, '\n'));
}

export async function scan(root = process.cwd()) {
  const dir = join(root, 'src/content/blog');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  const changes = [];

  for (const file of files) {
    const path = join(dir, file);
    const text = await readFile(path, 'utf8');
    if (!isReview(text)) continue;

    const rawTitle = frontmatterTitle(text);
    if (!rawTitle) continue;
    const title = rawTitle.replace(/^["']|["']$/g, '');
    const cleaned = cleanReviewTitle(title);
    if (cleaned !== title) changes.push({ file, path, text, from: title, to: cleaned });
  }
  return changes;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const check = process.argv.includes('--check');
  const changes = await scan();

  if (!changes.length) {
    console.log('Every review headline is clean.');
    process.exit(0);
  }

  for (const c of changes) {
    console.log(`${c.file}\n  from: ${c.from}\n  to:   ${c.to}`);
    if (check) console.log('::warning::a review title still carries its score');
  }

  if (check) {
    console.log(`\n${changes.length} scored review title(s).`);
    process.exit(1);
  }

  for (const c of changes) {
    // Replace the exact title line, quoted (a stripped title can still contain
    // a colon from the game's own name, which YAML needs quoted).
    const next = c.text.replace(/^title:.*$/m, `title: "${c.to.replace(/"/g, '\\"')}"`);
    await writeFile(c.path, next);
  }
  console.log(`\nFixed ${changes.length} review title(s).`);
}
