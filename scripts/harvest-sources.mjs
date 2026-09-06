/**
 * Harvests the trade press into the repository so the scheduled writer can read
 * it.
 *
 * That agent runs behind an egress proxy that refuses almost every host —
 * Variety, Ars Technica, Wikipedia, Steam and the rest all answer 403 — so it
 * has been working from search-result snippets alone. GitHub Actions has no
 * such restriction, so the fetching happens there and the result is committed
 * for the agent to read off disk.
 *
 * Only what each publisher chose to put in its own feed is stored: headline,
 * link, date, and the summary or content they syndicate. That is what RSS is
 * for. Nothing is scraped from behind the feed.
 */

import { writeFile, mkdir, rm } from 'node:fs/promises';
import { publishedArticles, assess, report } from './editorial-mix.mjs';

// Widened on 6 September 2026, from 20 feeds to 36, because the two-source rule
// can only be satisfied out of what lands in notes/feeds: the writer sits
// behind an egress proxy that refuses almost every host. On the harvest that
// day only 15 of 109 stories were carried by two of our outlets, which was a
// shortage of feeds rather than of coverage - the same story was on four sites
// we did not fetch.
//
// Animation Magazine and Cartoon Brew belong here on subject and are absent on
// evidence: both answered 403. Comic Natalie is left out because it publishes
// in Japanese and the writer works in English.
const FEEDS = [
  // Games
  { category: 'Games', name: 'Eurogamer', url: 'https://www.eurogamer.net/feed' },
  { category: 'Games', name: 'GamesIndustry.biz', url: 'https://www.gamesindustry.biz/feed' },
  { category: 'Games', name: 'VG247', url: 'https://www.vg247.com/feed' },
  { category: 'Games', name: 'Push Square', url: 'https://www.pushsquare.com/feeds/latest' },
  { category: 'Games', name: 'Game Developer', url: 'https://www.gamedeveloper.com/rss.xml' },
  { category: 'Games', name: 'VGC', url: 'https://www.videogameschronicle.com/feed/' },
  { category: 'Games', name: 'Polygon', url: 'https://www.polygon.com/rss/index.xml' },
  { category: 'Games', name: 'PC Gamer', url: 'https://www.pcgamer.com/rss/' },
  { category: 'Games', name: 'GameSpot', url: 'https://www.gamespot.com/feeds/news/' },
  { category: 'Games', name: 'Rock Paper Shotgun', url: 'https://www.rockpapershotgun.com/feed' },
  // Tech
  { category: 'Tech', name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' },
  { category: 'Tech', name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
  { category: 'Tech', name: "Tom's Hardware", url: 'https://www.tomshardware.com/feeds/all' },
  { category: 'Tech', name: 'Phoronix', url: 'https://www.phoronix.com/rss.php' },
  { category: 'Tech', name: 'The Register', url: 'https://www.theregister.com/headlines.atom' },
  { category: 'Tech', name: 'Engadget', url: 'https://www.engadget.com/rss.xml' },
  { category: 'Tech', name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  // 3D
  { category: '3D', name: '80.lv', url: 'https://80.lv/feed/' },
  { category: '3D', name: 'BlenderNation', url: 'https://www.blendernation.com/feed/' },
  { category: '3D', name: 'CGChannel', url: 'https://www.cgchannel.com/feed/' },
  // AI
  { category: 'AI', name: 'OpenAI', url: 'https://openai.com/news/rss.xml' },
  { category: 'AI', name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml' },
  { category: 'AI', name: 'Google DeepMind', url: 'https://deepmind.google/blog/rss.xml' },
  { category: 'AI', name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
  // Manga / anime
  { category: 'Manga', name: 'Anime News Network', url: 'https://www.animenewsnetwork.com/all/rss.xml' },
  { category: 'Manga', name: 'Crunchyroll News', url: 'https://www.crunchyroll.com/news/rss' },
  { category: 'Manga', name: 'Anime Corner', url: 'https://animecorner.me/feed/' },
  { category: 'Manga', name: 'MyAnimeList News', url: 'https://myanimelist.net/rss/news.xml' },
  { category: 'Manga', name: 'Otaku USA', url: 'https://otakuusamagazine.com/feed/' },
  { category: 'Manga', name: 'Anime UK News', url: 'https://animeuknews.net/feed/' },
  // Film & TV
  { category: 'Film & TV', name: 'Variety', url: 'https://variety.com/feed/' },
  { category: 'Film & TV', name: 'The Hollywood Reporter', url: 'https://www.hollywoodreporter.com/feed/' },
  { category: 'Film & TV', name: 'Deadline', url: 'https://deadline.com/feed/' },
  { category: 'Film & TV', name: 'befores & afters', url: 'https://beforesandafters.com/feed/' },
  { category: 'Film & TV', name: 'IndieWire', url: 'https://www.indiewire.com/feed/' },
  { category: 'Film & TV', name: 'The Wrap', url: 'https://www.thewrap.com/feed/' },
  { category: 'Film & TV', name: 'Collider', url: 'https://collider.com/feed/' },
];

const MAX_ITEMS_PER_FEED = 12;
const MAX_SUMMARY_CHARS = 1500;
const MAX_AGE_HOURS = 48;

/** Pulls a tag's contents, CDATA and all, without dragging in a parser. */
function tag(xml, name) {
  const m = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i').exec(xml);
  if (!m) return '';
  return m[1]
    .replace(/^<!\[CDATA\[/, '')
    .replace(/\]\]>$/, '')
    .trim();
}

function stripHtml(s) {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#\d+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseItems(xml) {
  // RSS uses <item>, Atom uses <entry>.
  const blocks = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) ?? [];

  return blocks.map((block) => {
    let link = tag(block, 'link');
    if (!link) {
      // Atom puts it in an attribute instead of the element body.
      link = /<link[^>]*href="([^"]+)"/i.exec(block)?.[1] ?? '';
    }
    const published =
      tag(block, 'pubDate') || tag(block, 'published') || tag(block, 'updated') || '';
    const body =
      tag(block, 'content:encoded') || tag(block, 'content') || tag(block, 'description') ||
      tag(block, 'summary') || '';

    return {
      title: stripHtml(tag(block, 'title')),
      link: link.trim(),
      published,
      summary: stripHtml(body).slice(0, MAX_SUMMARY_CHARS),
    };
  });
}

function recentEnough(published) {
  if (!published) return true; // no date given, keep it and let the agent judge
  const t = Date.parse(published);
  if (Number.isNaN(t)) return true;
  return Date.now() - t < MAX_AGE_HOURS * 3600_000;
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: {
        'user-agent': 'gianlucascattarella.it feed reader (+https://www.gianlucascattarella.it)',
        accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
      },
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) return { ...feed, error: `HTTP ${res.status}`, items: [] };

    const items = parseItems(await res.text())
      .filter((i) => i.title && recentEnough(i.published))
      .slice(0, MAX_ITEMS_PER_FEED);

    return { ...feed, items };
  } catch (err) {
    return { ...feed, error: String(err?.message ?? err), items: [] };
  }
}

const results = await Promise.all(FEEDS.map(fetchFeed));

await rm('notes/feeds', { recursive: true, force: true });
await mkdir('notes/feeds', { recursive: true });

const stamp = new Date().toISOString();
const byCategory = new Map();
for (const r of results) {
  if (!byCategory.has(r.category)) byCategory.set(r.category, []);
  byCategory.get(r.category).push(r);
}

// What is owed goes above the feed list, not below it. The categories and the
// feeds both existed while thirty articles in a row came out of neither, so
// the deficit has to be the first thing read, in the imperative, with a number
// attached, rather than a preference filed somewhere else.
const articles = await publishedArticles();
const owed = new Set(assess(articles).filter((r) => r.due).map((r) => r.category));

let index = `# Source feeds — harvested ${stamp}\n\n`;
index += `Fetched by GitHub Actions, which is not behind the writer's egress proxy.\n`;
index += `One file per category. Each item is what the publisher syndicates in its\n`;
index += `own feed: headline, link, date, and their summary.\n\n`;
index += `${report(articles)}
`;
index += `## Feeds

`;

let totalItems = 0;
let failures = [];

// A starved category listed eighth reads as the eighth priority. Owed first.
const ordered = [...byCategory.entries()].sort(
  (a, b) => Number(owed.has(b[0])) - Number(owed.has(a[0]))
);

for (const [category, feeds] of ordered) {
  const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  let page = `# ${category} — harvested ${stamp}\n\n`;
  let count = 0;

  for (const feed of feeds) {
    page += `## ${feed.name}\n\n`;
    if (feed.error) {
      page += `_Feed unavailable: ${feed.error}_\n\n`;
      failures.push(`${feed.name} (${feed.error})`);
      continue;
    }
    if (feed.items.length === 0) {
      page += `_Nothing in the last ${MAX_AGE_HOURS} hours._\n\n`;
      continue;
    }
    for (const item of feed.items) {
      page += `### ${item.title}\n`;
      page += `${item.published || 'no date'} — ${item.link}\n\n`;
      if (item.summary) page += `${item.summary}\n\n`;
      count++;
    }
  }

  await writeFile(`notes/feeds/${slug}.md`, page, 'utf8');
  index += `- [${category}](${slug}.md)${owed.has(category) ? ' **owed**' : ''} — ${count} items\n`;
  totalItems += count;
}

index += `\nTotal: ${totalItems} items.\n`;
if (failures.length) index += `\nFeeds that did not answer: ${failures.join(', ')}.\n`;

await writeFile('notes/feeds/README.md', index, 'utf8');
console.log(`Harvested ${totalItems} items across ${byCategory.size} categories.`);
if (failures.length) console.log(`Failed: ${failures.join(', ')}`);
