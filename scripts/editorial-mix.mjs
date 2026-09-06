/**
 * How far the archive has drifted from the mix it is supposed to have.
 *
 *   node scripts/editorial-mix.mjs
 *
 * The categories existed and the feeds were being harvested, and it changed
 * nothing: on 6 September 2026 the archive held 128 articles, 3 of them manga
 * and 10 film & TV, and the last thirty in a row contained neither. A category
 * nobody is counting is a category nobody writes.
 *
 * So this counts. The quota is read as a run length rather than as a
 * percentage, because a percentage can be satisfied by a burst a month ago and
 * still leave the reader with thirty games articles in a row. One in six means
 * six consecutive articles never go by without one.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * `every`: the run that must never pass without one of these.
 * `limit`: the run that must never be reached at all, where the target and the
 *   hard floor differ.
 */
export const QUOTAS = [
  { category: 'Manga', every: 6, limit: 6, label: 'Manga and anime' },
  { category: 'Film & TV', every: 8, limit: 10, label: 'Film & TV' },
];

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

/** Every published article, newest first. Drafts are not on the site and do not count. */
export async function publishedArticles(root = process.cwd()) {
  const dir = join(root, 'src/content/blog');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));

  const out = [];
  for (const file of files) {
    const text = await readFile(join(dir, file), 'utf8');
    if (/^draft:\s*true/m.test(text)) continue;
    const data = frontmatter(text);
    if (!data.date || !data.category) continue;
    out.push({ slug: file.replace(/\.md$/, ''), date: data.date, category: data.category });
  }

  // Same-day articles have no finer timestamp, so the slug breaks the tie and
  // keeps the order stable between runs.
  out.sort((a, b) => (a.date === b.date ? b.slug.localeCompare(a.slug) : b.date.localeCompare(a.date)));
  return out;
}

/**
 * How many articles have gone out since the last one in this category.
 *
 * Zero means the most recent article was one. The count is what the quota is
 * measured against: at `every - 1`, the next article has to be this category or
 * the run is broken.
 */
export function runSince(articles, category) {
  const i = articles.findIndex((a) => a.category === category);
  return i === -1 ? articles.length : i;
}

/** @returns one row per quota, most urgent first. */
export function assess(articles) {
  const rows = QUOTAS.map((q) => {
    const since = runSince(articles, q.category);
    const held = articles.filter((a) => a.category === q.category).length;
    return {
      ...q,
      since,
      held,
      // At `every - 1` the next one is owed; at `limit - 1` the promise is
      // already broken and this outranks everything else.
      due: since >= q.every - 1,
      breached: since >= q.limit - 1,
      // How far past owing it is, so two overdue categories can be ordered.
      urgency: since / Math.max(1, q.limit - 1),
    };
  });

  rows.sort((a, b) => b.urgency - a.urgency);
  return rows;
}

/** The section the writer reads before choosing what to cover. */
export function report(articles) {
  const rows = assess(articles);
  const owed = rows.filter((r) => r.due);

  let out = '## Editorial mix — what the archive owes\n\n';

  if (owed.length === 0) {
    out += 'Both quotas are being met. Write whatever the day deserves.\n\n';
  } else {
    out += `**Write ${owed[0].label} next.** `;
    out += `${owed[0].since} articles have gone out since the last one.\n\n`;
  }

  for (const r of rows) {
    const quota =
      r.limit === r.every ? `one in ${r.every}` : `one in ${r.every}, never worse than one in ${r.limit}`;
    const state = r.breached ? 'BROKEN' : r.due ? 'owed now' : 'on track';
    out += `- **${r.label}** — ${state}. ${r.since} article${r.since === 1 ? '' : 's'} since the last one; `;
    out += `quota is ${quota}. ${r.held} in the archive of ${articles.length}.\n`;
  }

  out += '\nThe run is what counts, not the percentage: a burst last month does not\n';
  out += 'excuse thirty in a row without one. If a category is owed and the feeds\n';
  out += 'hold nothing worth writing about, say so in the draft rather than\n';
  out += 'silently skipping it.\n';

  return out;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const articles = await publishedArticles();
  console.log(report(articles));
}
