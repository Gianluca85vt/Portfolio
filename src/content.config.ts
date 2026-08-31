import { existsSync } from 'node:fs';
import { join } from 'node:path';
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
  })
    /**
     * A published article must carry a photograph, not the drawn fallback.
     *
     * The SVG cover exists so a piece is never coverless while its images are
     * being fetched. It was never meant to ship, and it kept shipping anyway —
     * on a DLSS piece and an Elden Ring review, where the whole subject is what
     * something looks like. Written as guidance in the writer's prompt it was
     * advice, and advice loses to a deadline. Here it fails the build, and the
     * scheduled job pushes only when the build passes.
     *
     * The date floor is deliberate and permanent. Thirty-seven articles
     * published before this carry a drawn cover, and Gianluca decided against
     * sourcing artwork for them: they are old, barely read, and each one is a
     * separate hunt for a press asset rather than a download. So the rule binds
     * everything written from here on and leaves the archive alone. Do not
     * lower this date expecting the build to stay green.
     */
    .superRefine((post, ctx) => {
      const ENFORCED_FROM = new Date('2026-08-30T00:00:00Z');
      if (post.draft) return;
      if (post.date < ENFORCED_FROM) return;

      if (post.cover?.endsWith('.svg')) {
        ctx.addIssue({
          code: 'custom',
          path: ['cover'],
          message:
            'a published article needs a real image as its cover, not the drawn SVG. ' +
            'Write notes/image-requests/<slug>.json with a steamAppId or official press urls, ' +
            'or keep draft: true until the artwork is in.',
        });
        return;
      }

      // And the file has to be there. A cover path is only a string, so an
      // article can name a cover.jpg that was never fetched and sail past every
      // check with a broken image on the card and in every share preview. One
      // draft was in exactly that state, naming a .jpg while only the .svg
      // existed on disk.
      if (post.cover && !existsSync(join('public', post.cover))) {
        ctx.addIssue({
          code: 'custom',
          path: ['cover'],
          message: `the cover file does not exist: public${post.cover}`,
        });
      }
    }),
});

export const collections = { blog };
