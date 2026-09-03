/**
 * One Instagram carousel a day, at 19:00 Italian time, carrying every article
 * published since the last one.
 *
 *   node scripts/social-digest.mjs --plan    # print the slugs, post nothing
 *   node scripts/social-digest.mjs           # build and publish the carousel
 *
 * Instagram replaced one post per article for a reason worth writing down. A
 * caption there carries no clickable link, so posting often buys no traffic —
 * only reach, and reach is not what frequency buys. Three or four posts a day
 * draw from the same follower pool within hours of each other, so each one goes
 * out to a smaller test slice than the last. The recommended ceiling is three
 * to five feed posts a week; this account was running twenty-one.
 *
 * Facebook still gets a post per article. There a link is clickable, so the
 * argument runs the other way.
 *
 * Needs META_IG_USER_ID and META_PAGE_TOKEN. The cards must already be pushed:
 * Instagram fetches images from a URL rather than accepting an upload.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const GRAPH = 'https://graph.facebook.com/v26.0';
const REPO = 'Gianluca85vt/Portfolio';
const LEDGER = 'notes/social-posted.json';

/** A carousel takes ten items, and one of them is the cover. */
const MAX_ARTICLES = 9;

/** How far back to look for articles nobody has carouselled yet. */
const WINDOW_DAYS = 2;

const TAGS = {
  Editorial: ['#gamedev', '#vfx', '#gameart'],
  '3D': ['#3dart', '#environmentart', '#blender', '#unrealengine'],
  Tech: ['#tech', '#hardware', '#pcgaming'],
  AI: ['#ai', '#creativetech'],
  Games: ['#gaming', '#videogames', '#gamedev'],
  Manga: ['#manga', '#anime'],
  'Film & TV': ['#film', '#vfx', '#filmmaking'],
  Collecting: ['#collecting', '#collectibles'],
};

function frontmatter(text) {
  const block = text.replace(/\r\n?/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  if (!block) return {};
  const out = {};
  for (const line of block[1].split('\n')) {
    const kv = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

async function graph(path, body) {
  const res = await fetch(`${GRAPH}/${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ ...body, access_token: process.env.META_PAGE_TOKEN }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) {
    const e = json.error ?? {};
    throw new Error(`${path} -> HTTP ${res.status} ${e.message ?? ''} ${e.error_user_msg ?? ''}`.trim());
  }
  return json;
}

async function graphGet(path, params = {}) {
  const qs = new URLSearchParams({ ...params, access_token: process.env.META_PAGE_TOKEN });
  const res = await fetch(`${GRAPH}/${path}?${qs}`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(`${path} -> ${json.error?.message ?? res.status}`);
  return json;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function readLedger(root) {
  try {
    return JSON.parse(await readFile(join(root, LEDGER), 'utf8'));
  } catch {
    return {};
  }
}

/** The date in Rome, as YYYY-MM-DD. en-CA is the locale that formats it that way. */
function romeDate(now) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(now);
}

function romeHour(now) {
  return Number(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', hour: '2-digit', hour12: false }).format(now)
  );
}

/**
 * Whether tonight's carousel is still owed.
 *
 * This used to ask whether the hour in Rome was exactly 19, which is a question
 * a cron on GitHub Actions cannot reliably answer yes to. Scheduled runs are
 * best-effort and are routinely late under load: on 2 September the 17:00 and
 * 18:00 slots fired at 19:38 and 20:33, so both runs found 21:38 and 22:33 on
 * the clock, skipped every step, and reported success. No carousel went out.
 *
 * The question that survives a late start is whether the evening has arrived
 * and today's post has not. A run delayed past midnight fails the hour test
 * against the new day and simply waits for the evening, which is right: the
 * articles are still inside the window and go out tonight instead.
 */
export function isDue(ledger, now = new Date()) {
  const hour = romeHour(now);
  const today = romeDate(now);

  if (hour < 19) {
    return { due: false, why: `it is ${hour}:00 in Rome and the slot opens at 19:00` };
  }
  if (Object.values(ledger).some((r) => r?.carouselAt === today)) {
    return { due: false, why: `tonight's carousel already went out` };
  }
  return { due: true, why: `${hour}:00 in Rome, nothing posted today` };
}

/**
 * What belongs in tonight's carousel.
 *
 * The test is a Facebook post that happened and no carousel yet, bounded by the
 * article's own date. That bound matters: the ledger carries ninety-eight
 * entries from before any of this was wired up, marked as posted so the
 * archive would never be blasted out retroactively. Without the date window
 * the first run would try to carousel all of them.
 */
export async function selectForDigest(root = process.cwd(), today = new Date()) {
  const ledger = await readLedger(root);
  const dir = join(root, 'src/content/blog');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));

  const floor = new Date(today);
  floor.setUTCDate(floor.getUTCDate() - WINDOW_DAYS);
  const floorISO = floor.toISOString().slice(0, 10);

  const picked = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const record = ledger[slug];

    // Reached Facebook, so it is genuinely published and genuinely recent.
    if (!record?.facebook) continue;
    if (record.carousel) continue;

    // And never one that already had its own Instagram post. Thirteen articles
    // went out that way before the carousel replaced it, and without this the
    // first run would put seven of them back on the feed as a swipe.
    if (record.instagram) continue;

    const text = await readFile(join(dir, file), 'utf8');
    if (/^draft:\s*true/m.test(text)) continue;

    const data = frontmatter(text);
    if (!data.title || !data.date || data.date < floorISO) continue;

    picked.push({
      slug,
      title: data.title,
      category: data.category ?? 'Games',
      cover: data.cover,
      date: data.date,
      at: record.at ?? '',
    });
  }

  // Oldest first, so a carried-over piece from last night opens the carousel
  // and the swipe runs forward in time.
  picked.sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0));
  return picked.slice(0, MAX_ARTICLES);
}

function caption(articles) {
  const tags = [...new Set(articles.flatMap((a) => TAGS[a.category] ?? []))].slice(0, 6);
  const day = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });

  const lines = [
    `Backdrop — ${day}`,
    '',
    ...articles.map((a) => `• ${a.title}`),
    '',
    articles.length === 1
      ? 'The full piece is on the site — link in bio.'
      : 'All of them in full on the site — link in bio.',
    '',
    tags.join(' '),
  ];
  return lines.join('\n');
}

/** Waits for Instagram to finish fetching and transcoding a container. */
async function ready(id, label) {
  for (let i = 0; i < 16; i += 1) {
    const { status_code: status } = await graphGet(id, { fields: 'status_code' });
    if (status === 'FINISHED') return;
    if (status === 'ERROR' || status === 'EXPIRED') {
      throw new Error(`Instagram rejected ${label}: ${status}`);
    }
    await sleep(2500);
  }
  throw new Error(`Instagram never finished ${label}`);
}

export async function postCarousel(articles, coverUrl) {
  const ig = process.env.META_IG_USER_ID;

  // Step one: a container per slide, each flagged as a carousel item. The
  // cover goes first because that is the frame the feed shows.
  const urls = [
    coverUrl,
    ...articles.map(
      (a) => `https://raw.githubusercontent.com/${REPO}/main/public/img/blog/${a.slug}/social.jpg`
    ),
  ];

  const children = [];
  for (const [i, image_url] of urls.entries()) {
    const child = await graph(`${ig}/media`, { image_url, is_carousel_item: 'true' });
    await ready(child.id, `slide ${i + 1}`);
    children.push(child.id);
  }

  // Step two: the carousel itself, which is what carries the caption.
  const container = await graph(`${ig}/media`, {
    media_type: 'CAROUSEL',
    children: children.join(','),
    caption: caption(articles),
  });
  await ready(container.id, 'the carousel');

  // Step three. A carousel counts as one post against the hundred-a-day limit,
  // however many slides are in it.
  return graph(`${ig}/media_publish`, { creation_id: container.id });
}

async function main() {
  const root = process.cwd();
  const plan = process.argv.includes('--plan');

  const ledger = await readLedger(root);
  // A manual run says post now, whatever the clock says. It still cannot post
  // twice: nothing selects an article that already carries a carousel id.
  const forced = process.env.FORCE_DIGEST === 'true';
  const owed = forced ? { due: true, why: 'manual run' } : isDue(ledger);

  if (!owed.due) {
    // stderr, so --plan's stdout stays a clean list for the workflow to read.
    console.error(`Not posting: ${owed.why}.`);
    if (plan) console.log('');
    return;
  }

  const articles = await selectForDigest(root);

  if (plan) {
    console.log(articles.map((a) => a.slug).join(' '));
    return;
  }

  if (!articles.length) {
    console.log('Nothing published since the last carousel. Posting nothing.');
    return;
  }

  for (const name of ['META_IG_USER_ID', 'META_PAGE_TOKEN']) {
    if (!process.env[name]) {
      console.error(`${name} is not set — nothing posted.`);
      process.exit(1);
    }
  }

  const day = romeDate(new Date());
  const coverUrl = `https://raw.githubusercontent.com/${REPO}/main/public/img/blog/digest/${day}.jpg`;

  console.log(`${articles.length} article(s) in tonight's carousel:`);
  for (const a of articles) console.log(`  ${a.date}  ${a.category.padEnd(10)} ${a.title}`);

  const result = await postCarousel(articles, coverUrl);
  console.log(`instagram carousel -> ${result.id}`);

  const written = await readLedger(root);
  for (const a of articles) {
    written[a.slug] = { ...(written[a.slug] ?? {}), carousel: result.id, carouselAt: day };
  }
  await writeFile(join(root, LEDGER), `${JSON.stringify(ledger, null, 2)}\n`);
  console.log(`ledger updated: ${LEDGER}`);
}

/**
 * Draws the cover and any card that is missing, before the commit step.
 *
 * social-card.mjs is imported here rather than at the top because it pulls in
 * sharp, and the workflow asks this file what to post before it installs
 * anything. A top-level import made `--plan` die on a missing module.
 */
export async function drawAll(root = process.cwd()) {
  const articles = await selectForDigest(root);
  if (!articles.length) return [];

  const { buildCard, buildDigestCover } = await import('./social-card.mjs');

  for (const a of articles) await buildCard(a.slug, root);
  const cover = await buildDigestCover(articles, root);
  return [cover, ...articles.map((a) => a.slug)];
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  if (process.argv.includes('--draw')) {
    const made = await drawAll();
    console.log(made.length ? `drew ${made.length} image(s)` : 'nothing to draw');
  } else {
    await main();
  }
}
