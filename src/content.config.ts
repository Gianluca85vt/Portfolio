import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { blogCategories } from './data/portfolio';

/**
 * Posts are markdown files in src/content/blog. The schema is checked at build
 * time, so a typo in a category or a missing title fails the build instead of
 * shipping a broken page.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(blogCategories),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().optional(),

    // The invented persona a piece is published under. See
    // src/data/personas.ts — they are bylines, not real people, and the
    // page says so beside every one of them.
    author: z.string().optional(),

    // Review pieces carry a score: the mean of the scores the article quotes,
    // put on a 1-10 scale and rounded to the nearest half point. Anything with
    // a score appears in the "Latest reviews" column on the blog index.
    score: z.number().min(0).max(10).optional(),
    // What was reviewed, for that column — the headline is usually too long.
    reviewOf: z.string().optional(),
    // The individual scores the mean came from, so the number is auditable.
    scoreSources: z
      .array(z.object({ outlet: z.string(), score: z.number().min(0).max(10) }))
      .optional(),
  }),
});

export const collections = { blog };
