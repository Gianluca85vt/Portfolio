/**
 * Makes sure Bing has the sitemap.
 *
 *   BING_API_KEY=… node scripts/bing-sitemap.mjs
 *
 * Bing ranks the blog at position 1-2 for queries like "what did blender 5.2.1
 * lts add" and still shows it only a couple of dozen times a window: it barely
 * crawls the site. IndexNow already tells it about each article as it goes
 * live; the sitemap is what lets it find the other two hundred. Run by the
 * report workflow, which already holds the key. Asks first and submits only
 * when the sitemap is missing, and never fails the run.
 */
const SITE = 'https://www.gianlucascattarella.it/';
const SITEMAP = 'https://www.gianlucascattarella.it/sitemap-index.xml';
const API = 'https://ssl.bing.com/webmaster/api.svc/json';

const key = process.env.BING_API_KEY;
if (!key) {
  console.log('bing sitemap: BING_API_KEY is not set, skipped');
  process.exit(0);
}

async function call(method, init) {
  const res = await fetch(`${API}/${method}?apikey=${encodeURIComponent(key)}${init?.query ?? ''}`, init);
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} -> HTTP ${res.status} ${text.slice(0, 200)}`);
  return text ? JSON.parse(text) : {};
}

try {
  const feeds = await call('GetFeeds', { query: `&siteUrl=${encodeURIComponent(SITE)}` });
  const known = (feeds.d ?? []).some((f) => (f.Url ?? '').replace(/\/$/, '') === SITEMAP);
  if (known) {
    console.log('bing sitemap: already registered');
  } else {
    await call('SubmitFeed', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ siteUrl: SITE, feedUrl: SITEMAP }),
    });
    console.log('bing sitemap: submitted');
  }
} catch (err) {
  console.log(`::warning::bing sitemap: ${err.message}`);
}
