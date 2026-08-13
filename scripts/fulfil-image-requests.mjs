/**
 * Fetches the images the scheduled writer asked for.
 *
 * That agent sits behind an egress proxy that refuses Steam, Unsplash,
 * Wikimedia and effectively every other host, so it cannot download a picture
 * even when it knows exactly which one it wants. Instead it leaves a request in
 * notes/image-requests/<slug>.json and this runs on GitHub Actions, which has
 * an open network, to go and get them.
 *
 * Request shape (every field optional except slug):
 *
 *   {
 *     "slug": "the-article-slug",
 *     "steamAppId": 2001760,
 *     "urls": ["https://upload.wikimedia.org/...jpg"],
 *     "credit": "Arc System Works, via the official Steam page"
 *   }
 *
 * steamAppId pulls official store screenshots, which publishers put there for
 * editorial use. urls must point at press assets or free-licence stock — a
 * credit line is attribution, not a licence, so images lifted from another
 * outlet's article are never acceptable.
 */

import { readdir, readFile, writeFile, mkdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const REQUEST_DIR = 'notes/image-requests';
const MAX_WIDTH = 1440;
const MAX_PER_ARTICLE = 4;

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function steamScreenshots(appId) {
  const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`, {
    headers: { 'user-agent': 'gianlucascattarella.it' },
    signal: AbortSignal.timeout(25_000),
  });
  if (!res.ok) throw new Error(`Steam API HTTP ${res.status}`);

  const json = await res.json();
  const entry = json?.[String(appId)];
  if (!entry?.success) throw new Error(`Steam API returned no data for ${appId}`);

  const shots = entry.data?.screenshots ?? [];
  return shots.map((s) => s.path_full).filter(Boolean);
}

async function download(url) {
  const res = await fetch(url, {
    headers: { 'user-agent': 'gianlucascattarella.it' },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const type = res.headers.get('content-type') ?? '';
  if (!type.startsWith('image/')) throw new Error(`not an image (${type || 'no content-type'})`);

  return Buffer.from(await res.arrayBuffer());
}

/**
 * Points the article's cover at the first real image that arrived.
 *
 * A photograph beats a drawn diagram on the card grid every time, so a fetched
 * image replaces artwork the writer made for itself. Set "keepCover": true in
 * the request for the rare piece where the diagram genuinely is the better
 * opening image.
 */
async function fixCover(slug, firstImage, keepCover) {
  const file = `src/content/blog/${slug}.md`;
  if (!(await exists(file))) return false;

  const text = await readFile(file, 'utf8');
  const current = /^cover:\s*(.+)$/m.exec(text)?.[1]?.trim();

  if (current === firstImage) return false;
  if (keepCover && current && (await exists(path.join('public', current.replace(/^\//, '')))))
    return false;

  const updated = current
    ? text.replace(/^cover:\s*.+$/m, `cover: ${firstImage}`)
    : text.replace(/^(title:.*)$/m, `$1\ncover: ${firstImage}`);

  await writeFile(file, updated, 'utf8');
  return true;
}

/**
 * Drops a second image into the body, after the first section heading.
 *
 * The writer never references these paths itself: it cannot know whether a
 * download will succeed, and a hard-coded path to a file that never arrived is
 * a broken image on a live page. Inserting here means a picture is only ever
 * referenced once it exists on disk.
 */
async function insertBodyImage(slug, image, credit) {
  const file = `src/content/blog/${slug}.md`;
  if (!(await exists(file))) return false;

  const text = await readFile(file, 'utf8');
  if (text.includes('<figure')) return false; // it already illustrated itself

  const heading = /^##\s+.+$/m.exec(text);
  if (!heading) return false;

  const at = heading.index + heading[0].length;
  const figure =
    `\n\n<figure>\n` +
    `  <img src="${image}" loading="lazy" width="1440" height="810" alt="" />\n` +
    `  <figcaption>${credit}</figcaption>\n` +
    `</figure>`;

  await writeFile(file, text.slice(0, at) + figure + text.slice(at), 'utf8');
  return true;
}

if (!(await exists(REQUEST_DIR))) {
  console.log('No image requests.');
  process.exit(0);
}

const requests = (await readdir(REQUEST_DIR)).filter((f) => f.endsWith('.json'));
if (requests.length === 0) {
  console.log('No image requests.');
  process.exit(0);
}

let fetchedAny = false;

for (const filename of requests) {
  const requestPath = path.join(REQUEST_DIR, filename);
  let request;
  try {
    request = JSON.parse(await readFile(requestPath, 'utf8'));
  } catch (err) {
    console.log(`::warning::${filename} is not valid JSON (${err.message}), removing it`);
    await rm(requestPath, { force: true });
    continue;
  }

  const slug = String(request.slug ?? path.basename(filename, '.json'));
  if (!/^[a-z0-9-]{3,120}$/.test(slug)) {
    console.log(`::warning::bad slug in ${filename}, skipping`);
    await rm(requestPath, { force: true });
    continue;
  }

  const urls = [];
  if (request.steamAppId) {
    try {
      const shots = await steamScreenshots(request.steamAppId);
      urls.push(...shots.slice(0, MAX_PER_ARTICLE));
      console.log(`${slug}: ${shots.length} Steam screenshots available`);
    } catch (err) {
      console.log(`::warning::${slug}: Steam lookup failed — ${err.message}`);
    }
  }
  if (Array.isArray(request.urls)) urls.push(...request.urls.map(String));

  const outDir = path.join('public/img/blog', slug);
  await mkdir(outDir, { recursive: true });

  let index = 0;
  const written = [];

  for (const url of urls.slice(0, MAX_PER_ARTICLE)) {
    index++;
    try {
      const raw = await download(url);
      const out = path.join(outDir, `shot-${String(index).padStart(2, '0')}.jpg`);

      await sharp(raw)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: 82 })
        .toFile(out);

      written.push('/' + out.replace(/\\/g, '/').replace(/^public\//, ''));
      console.log(`${slug}: saved ${out}`);
    } catch (err) {
      console.log(`::warning::${slug}: could not fetch ${url} — ${err.message}`);
    }
  }

  if (written.length) {
    fetchedAny = true;
    const credit = request.credit ?? 'Official press asset.';
    const changed = await fixCover(slug, written[0], request.keepCover === true);

    // Use a different shot in the body than on the cover, when there is one.
    const bodyShot = written[1] ?? written[0];
    const placed = await insertBodyImage(slug, bodyShot, credit);

    console.log(
      `${slug}: ${written.length} image(s); cover ${changed ? 'updated' : 'left as-is'}; ` +
        `body image ${placed ? 'inserted' : 'not needed'}`
    );

    // Leave a note the writer can read on its next run, listing what actually
    // arrived and under what credit, so it can place them in the body.
    await writeFile(
      path.join(outDir, 'CREDIT.txt'),
      `${request.credit ?? 'Source not stated in the request.'}\n\n` +
        written.map((w) => `- ${w}`).join('\n') + '\n',
      'utf8'
    );
  } else {
    console.log(`::warning::${slug}: no images could be fetched`);
  }

  await rm(requestPath, { force: true });
}

console.log(fetchedAny ? 'Done, images fetched.' : 'Done, nothing fetched.');
