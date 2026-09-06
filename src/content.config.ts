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

    // Who reported it. Two independent outlets before anything publishes -
    // see the rule below. Kept as a field rather than counted from links in
    // the body because the body does not link them: of 128 published pieces,
    // 97 name their outlets in prose and link nothing at all.
    sources: z.array(z.object({ outlet: z.string(), url: z.string().url() })).optional(),
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
    })

    /**
     * Two independent outlets, or it does not publish.
     *
     * Gianluca's rule, and his reasoning: getting there second is survivable,
     * being wrong in the first person with his name on it is not. Every article
     * now speaks as him, which raises the cost of repeating one outlet's
     * mistake from an embarrassment to a personal one.
     *
     * A separate floor from the cover rule above, and a later one, because this
     * binds only what is written from here on. The 128 pieces already published
     * were written under the old rule and are left alone - the same decision he
     * made about the drawn covers.
     *
     * A review satisfies it through scoreSources: a piece quoting ten outlets'
     * scores has plainly read more than one of them.
     *
     * The count is of distinct outlets, not of entries. Two links to the same
     * publication is one source that has been read twice, which is how a single
     * wire story gets mistaken for corroboration.
     */
    .superRefine((post, ctx) => {
      const SOURCED_FROM = new Date('2026-09-07T00:00:00Z');
      if (post.draft) return;
      if (post.date < SOURCED_FROM) return;

      const outlets = new Set(
        [...(post.sources ?? []), ...(post.scoreSources ?? [])].map((s) =>
          s.outlet.trim().toLowerCase()
        )
      );
      outlets.delete('');

      if (outlets.size < 2) {
        ctx.addIssue({
          code: 'custom',
          path: ['sources'],
          message:
            `a published article needs two independent outlets, and this has ${outlets.size}. ` +
            'Add them as sources: [{ outlet, url }, ...] in the frontmatter. ' +
            'If only one outlet has the story, keep draft: true and wait for a second - ' +
            'if none arrives, the piece does not run.',
        });
      }
    }),
});

export const collections = { blog };
