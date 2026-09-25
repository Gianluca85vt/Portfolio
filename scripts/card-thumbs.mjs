/**
 * Small WebP copies of the article covers, for the cards that list them.
 *
 *   node scripts/card-thumbs.mjs
 *
 * The blog index shows every article as a card, and each card was loading the
 * full cover — a 1440px or 1920px JPEG — to fill a box a few hundred pixels
 * wide. Scrolling the index meant tens of megabytes of pictures drawn at a
 * quarter of their size. These are 800px WebP, enough for a card on a retina
 * screen at a fraction of the weight.
 *
 * Written to public/img/cards/, which is ignored by git: they are rebuilt from
 * the covers on every build, so there is nothing to keep in sync by hand. They
 * sit outside /img/blog on purpose — that path is rewritten to jsDelivr and
 * stripped from the deployment, while these are small enough to ship with it.
 *
 * It never fails the build. A cover that cannot be converted simply has no
 * thumbnail, and src/lib/card-image.ts then hands the card the original, which
 * is exactly what every card showed before this existed.
 */
import { readdir, readFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const WIDTH = 800;
const QUALITY = 72;
const RASTER = /\.(jpe?g|png|webp)$/i;

/** /img/blog/x/cover.jpg -> /img/cards/blog/x/cover.webp. Mirrored in src/lib/card-image.ts. */
export function thumbPath(cover) {
  return cover.replace(/^\/img\//, '/img/cards/').replace(RASTER, '.webp');
}

async function covers() {
  const found = new Set();

  for (const file of await readdir('src/content/blog')) {
    if (!file.endsWith('.md')) continue;
    const text = await readFile(join('src/content/blog', file), 'utf8');
    const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? '';
    // Drafts are not on the site, so no card shows them.
    if (/^draft:\s*true\s*$/m.test(fm)) continue;
    const cover = /^cover:\s*(.+)$/m.exec(fm)?.[1]?.trim().replace(/^["']|["']$/g, '');
    if (cover) found.add(cover);
  }

  // Covers a whole column shares, set in the site data rather than per article.
  const data = await readFile('src/data/portfolio.ts', 'utf8');
  const block = /columnCovers[^{]*\{([\s\S]*?)\}/.exec(data)?.[1] ?? '';
  for (const m of block.matchAll(/'(\/img\/[^']+)'/g)) found.add(m[1]);

  return [...found].filter((c) => c.startsWith('/img/') && RASTER.test(c));
}

async function fresh(src, out) {
  try {
    const [a, b] = await Promise.all([stat(src), stat(out)]);
    return b.mtimeMs >= a.mtimeMs;
  } catch {
    return false;
  }
}

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.warn('card-thumbs: sharp is not installed, cards keep their full covers.');
    return;
  }

  const list = await covers();
  let made = 0;
  let kept = 0;
  let failed = 0;

  // A few at a time: sharp is fast, but two hundred decodes at once is memory
  // the build machine may not have.
  const queue = [...list];
  async function worker() {
    for (let cover = queue.shift(); cover; cover = queue.shift()) {
      const src = join('public', cover);
      const out = join('public', thumbPath(cover));
      try {
        if (await fresh(src, out)) {
          kept += 1;
          continue;
        }
        await mkdir(dirname(out), { recursive: true });
        await sharp(src)
          .rotate()
          .resize({ width: WIDTH, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(out);
        made += 1;
      } catch (err) {
        failed += 1;
        console.warn(`card-thumbs: skipped ${cover} (${err instanceof Error ? err.message : err})`);
      }
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));

  console.log(`card-thumbs: ${made} made, ${kept} already current, ${failed} skipped, of ${list.length} covers.`);
}

main().catch((err) => {
  console.warn(`card-thumbs: gave up (${err instanceof Error ? err.message : err}); cards keep their full covers.`);
});
