import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * The full text of every published article, as one static file.
 *
 * Written out at build time like the rest of the site, so searching costs a
 * single cached request off the CDN and no function invocation. The page does
 * not fetch it until someone actually reaches for the search box: it is around
 * six hundred kilobytes before compression, which is nothing to download once
 * on purpose and a great deal to spend on every visitor who never searches.
 *
 * Drafts are excluded here for the same reason they are excluded everywhere —
 * an unpublished piece is not on the site, and search must not be the hole that
 * leaks it.
 */

/** Markdown, reduced to the words a reader would search for. */
export function toPlainText(markdown: string) {
  return (
    markdown
      // Fenced code and HTML comments carry no prose.
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      // Images before links: an image is a link with a bang, and doing links
      // first would leave the alt text wearing a stray "!".
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      // Reference-style definitions sit on their own line and are never read.
      .replace(/^\s*\[[^\]]+\]:.*$/gm, ' ')
      .replace(/<[^>]+>/g, ' ')
      // Heading hashes, quote markers and list bullets.
      .replace(/^\s{0,3}#{1,6}\s+/gm, '')
      .replace(/^\s{0,3}>\s?/gm, '')
      .replace(/^\s{0,3}[-*+]\s+/gm, '')
      // Emphasis and inline code, keeping what they wrap.
      .replace(/(\*\*|__|\*|_|`)/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

export const GET: APIRoute = async () => {
  const entries = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  const docs = entries.map((entry) => ({
    slug: entry.id,
    title: entry.data.title,
    category: entry.data.category,
    date: entry.data.date.toISOString(),
    excerpt: entry.data.excerpt ?? '',
    text: toPlainText(entry.body ?? ''),
  }));

  return new Response(JSON.stringify(docs), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Rebuilt on every deploy under the same name, so a reader who searches
      // twice in a week should not pay for it twice.
      'cache-control': 'public, max-age=3600',
    },
  });
};
