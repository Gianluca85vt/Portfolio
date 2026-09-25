import { existsSync } from 'node:fs';
import { join } from 'node:path';

const RASTER = /\.(jpe?g|png|webp)$/i;

/**
 * The image a card should show for a cover: the small WebP made by
 * scripts/card-thumbs.mjs when there is one, the cover itself when there is
 * not. Build-time only — it looks at the files in public/.
 *
 * The fallback is what makes this safe to call anywhere. In `astro dev`, or on
 * a build where the thumbnail step was skipped or failed for one image, the
 * card simply gets the full cover it always had.
 *
 * Cards only. The article page and every share preview keep the original.
 */
export function cardImage(cover: string | undefined): string | undefined {
  if (!cover || !cover.startsWith('/img/') || !RASTER.test(cover)) return cover;
  // Mirrors thumbPath() in scripts/card-thumbs.mjs.
  const thumb = cover.replace(/^\/img\//, '/img/cards/').replace(RASTER, '.webp');
  return existsSync(join('public', thumb)) ? thumb : cover;
}
