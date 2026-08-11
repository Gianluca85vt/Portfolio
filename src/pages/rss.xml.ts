import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../data/portfolio';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: `${site.name} — Blog`,
    description:
      'Notes on 3D and AI, and on the things that feed the work — games, manga, film and collecting.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt ?? '',
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      categories: [post.data.category],
    })),
    customData: '<language>en</language>',
  });
}
