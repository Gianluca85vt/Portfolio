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

    // A recurring column the piece belongs to, shown as an eyebrow above the
    // headline. The column name stays the same every week; the headline does
    // not. "Architectures of the Void" is the Monday editorial.
    column: z.string().optional(),

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
