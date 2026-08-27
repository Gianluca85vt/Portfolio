/**
 * Tells Bing a page exists the moment it is published.
 *
 * A sitemap is an invitation to come and look eventually. IndexNow is a
 * notification: submit a URL and the crawler is told directly, which matters on
 * a site publishing several times a day where a page can otherwise sit unseen
 * for a week. Bing, Yandex and Seznam share one endpoint, so a single call
 * reaches all of them. Google does not participate.
 *
 * Usage: node scripts/indexnow.mjs <url> [url…]
 *
 * The key is a file in public/ that the crawler fetches to prove the submission
 * came from someone who controls the site. No account, no token, no secret in
 * the environment — the proof is that the file is there.
 */

import { readdir } from 'node:fs/promises';

const HOST = 'www.gianlucascattarella.it';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const urls = process.argv.slice(2).filter((u) => u.startsWith('https://'));

if (!urls.length) {
  console.log('Nothing to submit.');
  process.exit(0);
}

// The key is whatever <hex>.txt sits in public/, so rotating it means dropping
// in a new file rather than editing this script and a secret somewhere else.
const key = (await readdir('public'))
  .map((f) => /^([0-9a-f]{8,128})\.txt$/.exec(f)?.[1])
  .find(Boolean);

if (!key) {
  console.log('::warning::no IndexNow key file in public/, skipping');
  process.exit(0);
}

// The endpoint accepts 10,000 at a time; this site will never approach that,
// but a run that publishes a backlog should still not send one request per URL.
const body = {
  host: HOST,
  key,
  keyLocation: `https://${HOST}/${key}.txt`,
  urlList: urls.slice(0, 10_000),
};

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
  signal: AbortSignal.timeout(20_000),
});

// 200 accepted, 202 accepted but the key is still being verified. Anything else
// is worth seeing but never worth failing a publish over.
if (res.status === 200 || res.status === 202) {
  console.log(`IndexNow: ${urls.length} URL(s) submitted, ${res.status}.`);
  for (const u of urls) console.log(`  ${u}`);
} else {
  console.log(`::warning::IndexNow returned ${res.status} — ${(await res.text()).slice(0, 200)}`);
}
