/**
 * One Instagram story a day, at 19:00 Italian time, carrying every article
 * published since the last one.
 *
 *   node scripts/social-digest.mjs --plan    # print the slugs, post nothing
 *   node scripts/social-digest.mjs           # build and publish the story
 *
 * This was a feed carousel for two days. The engagement case for it was sound —
 * carousels outperform single images and posting four times a day splits one
 * follower pool four ways — but the feed it built was wrong. Every carousel
 * opened on the same template with the day's headlines set in the same places,
 * so the grid turned into a column of near-identical cards. Article covers
 * differ; a digest layout does not.
 *
 * A story is the right home for it. It expires in a day, so sameness reads as a
 * format rather than a wallpaper, and the grid goes back to article artwork.
 *
 * Stories have no carousel type. Each frame is published on its own and the
 * viewer taps through them, which is what the progress pips across the top of
 * every frame are counting. And a story takes no caption: whatever it has to
 * say is drawn into the image.
 *
 * Needs META_IG_USER_ID and META_PAGE_TOKEN. The frames must already be pushed:
 * Instagram fetches images from a URL rather than accepting an upload.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const GRAPH = 'https://graph.facebook.com/v26.0';
const REPO = 'Gianluca85vt/Portfolio';
const LEDGER = 'notes/social-posted.json';

/** Frames a viewer will actually tap through before losing interest. */
const MAX_ARTICLES = 9;

/** How far back to look for articles no story has carried yet. */
const WINDOW_DAYS = 2;

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
 * Whether tonight's story is still owed.
 *
 * This used to ask whether the hour in Rome was exactly 19, which is a question
 * a cron on GitHub Actions cannot reliably answer yes to. Scheduled runs are
 * best-effort and are routinely late under load: on 2 September the 17:00 and
 * 18:00 slots fired at 19:38 and 20:33, so both runs found 21:38 and 22:33 on
 * the clock, skipped every step, and reported success. Nothing went out.
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
  if (Object.values(ledger).some((r) => r?.storyAt === today || r?.carouselAt === today)) {
    return { due: false, why: `tonight's story already went out` };
  }
  return { due: true, why: `${hour}:00 in Rome, nothing posted today` };
}

/**
 * What belongs in tonight's story.
 *
 * The test is a Facebook post that happened and no story yet, bounded by the
 * article's own date. That bound matters: the ledger carries ninety-eight
 * entries from before any of this was wired up, marked as posted so the
 * archive would never be blasted out retroactively. Without the date window
 * the first run would try to put all of them in one story.
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
    if (record.story || record.carousel) continue;

    // An article's own Instagram post is expected now rather than disqualifying:
    // the feed carries the piece, the story carries the round-up of the day.

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

  // Oldest first, so a carried-over piece from last night opens the story and
  // the taps run forward in time.
  picked.sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : 0));
  return picked.slice(0, MAX_ARTICLES);
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

export async function postStory(frames) {
  const ig = process.env.META_IG_USER_ID;
  const ids = [];

  // One at a time, in order. Stories have no carousel container: the sequence
  // is the order they were published in, so this cannot be parallelised without
  // shuffling the frames a viewer taps through.
  for (const [i, image_url] of frames.entries()) {
    const container = await graph(`${ig}/media`, { image_url, media_type: 'STORIES' });
    await ready(container.id, `frame ${i + 1} of ${frames.length}`);
    const published = await graph(`${ig}/media_publish`, { creation_id: container.id });
    console.log(`  frame ${i + 1}/${frames.length} -> ${published.id}`);
    ids.push(published.id);
  }

  return ids;
}

/**
 * Stamps tonight's story onto the ledger.
 *
 * A pure function because the inline version wrote the wrong variable: it built
 * the updated copy and then serialised the one read before the post, so the
 * file went back to disk unchanged. Everything downstream believed it — the
 * commit step found nothing to commit, and the next night would have posted the
 * same six articles again, because nothing marked them done.
 *
 * The post itself had gone out. Only the record of it was lost.
 */
export function recordStory(ledger, articles, ids, day) {
  const next = { ...ledger };
  for (const a of articles) {
    next[a.slug] = { ...(next[a.slug] ?? {}), story: ids.join(','), storyAt: day };
  }
  return next;
}

async function main() {
  const root = process.cwd();
  const plan = process.argv.includes('--plan');

  const ledger = await readLedger(root);
  // A manual run says post now, whatever the clock says. It still cannot post
  // twice: nothing selects an article that already carries a story id.
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
    console.log('Nothing published since the last story. Posting nothing.');
    return;
  }

  for (const name of ['META_IG_USER_ID', 'META_PAGE_TOKEN']) {
    if (!process.env[name]) {
      console.error(`${name} is not set — nothing posted.`);
      process.exit(1);
    }
  }

  const day = romeDate(new Date());

  console.log(`${articles.length} article(s) in tonight's story:`);
  for (const a of articles) console.log(`  ${a.date}  ${a.category.padEnd(10)} ${a.title}`);

  // One cover frame plus one per article, in the order they were drawn.
  const frames = Array.from(
    { length: articles.length + 1 },
    (_, i) =>
      `https://raw.githubusercontent.com/${REPO}/main/public/img/blog/digest/${day}-story-${String(i).padStart(2, '0')}.jpg`
  );

  const ids = await postStory(frames);
  console.log(`instagram story -> ${ids.length} frame(s)`);

  const written = recordStory(await readLedger(root), articles, ids, day);
  await writeFile(join(root, LEDGER), `${JSON.stringify(written, null, 2)}\n`);
  console.log(`ledger updated: ${LEDGER}`);
}

/**
 * Draws every frame of tonight's story, before the commit step.
 *
 * social-card.mjs is imported here rather than at the top because it pulls in
 * sharp, and the workflow asks this file what to post before it installs
 * anything. A top-level import made `--plan` die on a missing module.
 *
 * Frame zero is the cover, and it borrows the first article's artwork rather
 * than inventing its own: the point of the frame is the date and the count, and
 * a picture from the day underneath reads better than a flat field.
 */
export async function drawAll(root = process.cwd()) {
  const articles = await selectForDigest(root);
  if (!articles.length) return [];

  const { buildStoryFrame } = await import('./social-card.mjs');

  const day = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  const lead = articles.find((a) => a.cover && !a.cover.endsWith('.svg')) ?? articles[0];
  const frames = [
    {
      title: `${articles.length} ${articles.length === 1 ? 'story' : 'stories'} today`,
      category: lead.category,
      cover: lead.cover,
      kicker: `Backdrop \u00b7 ${day}`,
    },
    ...articles,
  ];

  const made = [];
  for (const [i, frame] of frames.entries()) {
    made.push(await buildStoryFrame(frame, i, frames.length, root));
  }
  return made;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  if (process.argv.includes('--draw')) {
    const made = await drawAll();
    console.log(made.length ? `drew ${made.length} image(s)` : 'nothing to draw');
  } else {
    await main();
  }
}
