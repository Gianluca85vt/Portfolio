/**
 * The published archive, read straight from the Markdown, for the jobs that run
 * on GitHub Actions without building the site.
 *
 * The other scripts parse frontmatter one flat line at a time, which is enough
 * for a title and a date. The weekly kits need the nested blocks too — the
 * artist's view, the verdict, the sources — so this one uses a real YAML parser.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';

export const SITE = 'https://www.gianlucascattarella.it';

/** Splits a Markdown file into its frontmatter object and its body. */
export function splitArticle(text) {
  const src = text.replace(/\r\n?/g, '\n');
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: src };
  let data = {};
  try {
    data = parse(m[1]) ?? {};
  } catch {
    data = {};
  }
  return { data, body: m[2] };
}

/** YYYY-MM-DD, whether YAML handed back a string or a Date. */
export function isoDay(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '').slice(0, 10);
}

/** The prose of an article without markup, for keyword matching. */
export function plainText(body) {
  return body
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Every published article, newest first. A draft is not on the site, so it
 * never appears here.
 */
export async function loadArticles(root = process.cwd()) {
  const dir = join(root, 'src/content/blog');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  const out = [];
  for (const file of files) {
    const { data, body } = splitArticle(await readFile(join(dir, file), 'utf8'));
    if (data.draft === true || !data.title) continue;
    const slug = file.replace(/\.md$/, '');
    out.push({
      slug,
      url: `${SITE}/blog/${slug}/`,
      title: String(data.title),
      date: isoDay(data.date),
      category: String(data.category ?? ''),
      excerpt: String(data.excerpt ?? ''),
      cover: data.cover ? String(data.cover) : '',
      take: data.artistView?.take ? String(data.artistView.take) : '',
      verdict: data.verdict ? String(data.verdict) : '',
      score: typeof data.score === 'number' ? data.score : null,
      reviewOf: data.reviewOf ? String(data.reviewOf) : '',
      sources: Array.isArray(data.sources) ? data.sources : [],
      text: plainText(body),
    });
  }
  return out.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/** The full address of a cover, for an email or a submission form. */
export function coverUrl(article) {
  if (!article.cover || article.cover.endsWith('.svg')) return '';
  return article.cover.startsWith('http') ? article.cover : `${SITE}${article.cover}`;
}

/** The date in Rome, as YYYY-MM-DD. en-CA is the locale that formats it that way. */
export function romeDay(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(now);
}

/** A YYYY-MM-DD string moved by a number of days. */
export function addDays(day, n) {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Escapes text for HTML. */
export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
