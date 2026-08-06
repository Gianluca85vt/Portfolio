import { marked } from 'marked';
import type { BlogCategory } from '../data/portfolio';

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: BlogCategory;
  excerpt: string;
  cover?: string;
  readingMinutes: number;
  body: string;
};

/**
 * Posts are plain markdown files in src/content/blog with a small frontmatter
 * block. Vite inlines them at build time, so there is no CMS and no runtime
 * fetch — writing a post means adding a file and pushing.
 */
const files = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {} as Record<string, string>, body: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(':');
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    // strip surrounding quotes, which are optional in the frontmatter
    const value = line
      .slice(sep + 1)
      .trim()
      .replace(/^["'](.*)["']$/, '$1');
    if (key) meta[key] = value;
  }
  return { meta, body: match[2] };
}

/** ~200 words a minute, rounded up, never zero. */
function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function buildPost(path: string, raw: string): Post {
  const { meta, body } = parseFrontmatter(raw);
  const slug = meta.slug || path.split('/').pop()!.replace(/\.md$/, '');

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    category: (meta.category || '3D') as BlogCategory,
    excerpt: meta.excerpt || body.trim().split(/\r?\n\r?\n/)[0]?.slice(0, 180) || '',
    cover: meta.cover || undefined,
    readingMinutes: readingMinutes(body),
    body,
  };
}

/** Newest first. */
export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => buildPost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

/**
 * Only ever fed markdown written by Gianluca and committed to this repo — there
 * is no user-submitted content anywhere in this pipeline.
 */
export function renderMarkdown(body: string) {
  return marked.parse(body, { async: false }) as string;
}

export function formatDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
