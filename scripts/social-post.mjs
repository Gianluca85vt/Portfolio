/**
 * Posts a published article to the Facebook Page and to Instagram.
 *
 *   node scripts/social-post.mjs <slug> [<slug>...]
 *
 * Needs META_PAGE_ID, META_IG_USER_ID and META_PAGE_TOKEN in the environment.
 * The token is a Page token derived from a long-lived user token, so it does
 * not expire; nothing here ever prints it.
 *
 * Two things are worth knowing before reading further.
 *
 * Instagram will not accept an uploaded file. It takes a URL and fetches the
 * image itself, which means the card has to be public on the internet before
 * this runs. The workflow commits the cards first and this reads them back
 * from raw.githubusercontent, which serves a public repository immediately —
 * no waiting for a deploy.
 *
 * And a caption on Instagram carries no clickable link. Facebook gets a link
 * post that can actually send someone to the article; Instagram gets a card
 * that has to be worth seeing on its own, and points at the bio.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const GRAPH = 'https://graph.facebook.com/v26.0';
const REPO = 'Gianluca85vt/Portfolio';
const SITE = 'https://www.gianlucascattarella.it';
const LEDGER = 'notes/social-posted.json';

// Modest and specific. A wall of thirty tags reads as a bot and Instagram
// discounts them anyway.
const TAGS = {
  Editorial: ['#gamedev', '#vfx', '#gameart'],
  '3D': ['#3dart', '#environmentart', '#blender', '#unrealengine', '#gameart'],
  Tech: ['#tech', '#hardware', '#pcgaming'],
  AI: ['#ai', '#machinelearning', '#creativetech'],
  Games: ['#gaming', '#videogames', '#gamedev', '#gameart'],
  Manga: ['#manga', '#anime', '#animation'],
  'Film & TV': ['#film', '#vfx', '#cinema', '#filmmaking'],
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

/**
 * Every Graph call goes through here so that a failure reports the endpoint and
 * Meta's own message, which is the only thing that makes these debuggable. The
 * token is in the body rather than the query string so it stays out of logs
 * that record URLs.
 */
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

async function postToFacebook(article) {
  return graph(`${process.env.META_PAGE_ID}/feed`, {
    message: `${article.title}\n\n${article.excerpt}`,
    link: article.url,
  });
}

async function postToInstagram(article) {
  const tags = (TAGS[article.category] ?? []).join(' ');
  const caption = [
    article.title,
    '',
    article.excerpt,
    '',
    'Full piece at gianlucascattarella.it — link in bio.',
    '',
    tags,
  ].join('\n');

  const container = await graph(`${process.env.META_IG_USER_ID}/media`, {
    image_url: article.cardUrl,
    caption,
  });

  // Instagram fetches and transcodes the image before it can be published. For
  // a single JPEG this is usually done on the first check, but publishing a
  // container that is still IN_PROGRESS fails, so wait for it to say so.
  for (let i = 0; i < 12; i += 1) {
    const { status_code: status } = await graphGet(container.id, { fields: 'status_code' });
    if (status === 'FINISHED') break;
    if (status === 'ERROR' || status === 'EXPIRED') {
      throw new Error(`Instagram rejected the container: ${status}`);
    }
    await sleep(2500);
  }

  return graph(`${process.env.META_IG_USER_ID}/media_publish`, { creation_id: container.id });
}

async function readLedger(root) {
  try {
    return JSON.parse(await readFile(join(root, LEDGER), 'utf8'));
  } catch {
    return {};
  }
}

async function main() {
  const root = process.cwd();
  const slugs = process.argv.slice(2);

  for (const name of ['META_PAGE_ID', 'META_IG_USER_ID', 'META_PAGE_TOKEN']) {
    if (!process.env[name]) {
      console.error(`${name} is not set — nothing posted.`);
      process.exit(1);
    }
  }

  const ledger = await readLedger(root);
  let changed = false;

  for (const slug of slugs) {
    if (ledger[slug]) {
      console.log(`skip ${slug} — already posted on ${ledger[slug].at}`);
      continue;
    }

    const source = await readFile(join(root, 'src/content/blog', `${slug}.md`), 'utf8');

    // A second guard behind the workflow's own filter. Posting an unapproved
    // draft to two networks is not something to leave to one grep.
    if (/^draft:\s*true/m.test(source)) {
      console.log(`skip ${slug} — still a draft`);
      continue;
    }

    const data = frontmatter(source);
    if (!data.title) {
      console.log(`skip ${slug} — no title in the frontmatter`);
      continue;
    }

    const article = {
      title: data.title,
      excerpt: data.excerpt ?? '',
      category: data.category ?? 'Games',
      url: `${SITE}/blog/${slug}/`,
      cardUrl: `https://raw.githubusercontent.com/${REPO}/main/public/img/blog/${slug}/social.jpg`,
    };

    const record = { at: new Date().toISOString() };

    // The two are attempted independently. Instagram is the fussier of the
    // pair, and losing the Facebook post because a card failed to transcode
    // would be the wrong trade.
    try {
      const fb = await postToFacebook(article);
      record.facebook = fb.id;
      console.log(`facebook  ${slug} -> ${fb.id}`);
    } catch (err) {
      record.facebookError = String(err.message);
      console.log(`::warning::facebook failed for ${slug}: ${err.message}`);
    }

    try {
      const ig = await postToInstagram(article);
      record.instagram = ig.id;
      console.log(`instagram ${slug} -> ${ig.id}`);
    } catch (err) {
      record.instagramError = String(err.message);
      console.log(`::warning::instagram failed for ${slug}: ${err.message}`);
    }

    // Only a slug that reached at least one network is written down. A run
    // where both failed stays unrecorded so the next push can try again.
    if (record.facebook || record.instagram) {
      ledger[slug] = record;
      changed = true;
    }
  }

  if (changed) {
    await writeFile(join(root, LEDGER), `${JSON.stringify(ledger, null, 2)}\n`);
    console.log(`ledger updated: ${LEDGER}`);
  }
}

// Run only when this file is the entry point. The substring match this used
// to do would also fire for any sibling whose name contains "social-post",
// which means importing one of them would start a real posting run.
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  await main();
}
