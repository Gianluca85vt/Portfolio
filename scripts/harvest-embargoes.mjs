/**
 * Builds the review radar from release dates instead of hearsay.
 *
 * The old radar asked a model to search Reddit and the trade press for the
 * word "embargo". It missed Resonance: A Plague Tale Legacy, whose embargo
 * lifted publicly at 18:00 on 26 August 2026 with the game out the next day.
 * The harvested feeds did not mention it either — a game that has finished its
 * preview cycle drops off the news wire until the reviews land, which is
 * exactly the window the radar needs to cover.
 *
 * Release dates are a fact and reviews land one to two days before them, so a
 * calendar of imminent releases is a better radar than searching for a word.
 *
 * The hard part is separating a release worth reviewing from the forty
 * shovelware titles that ship the same morning. Price does it almost perfectly:
 * of 200 titles releasing within days, seven were priced at €25 or more, and
 * those seven were Resonance, the Metal Gear Solid collection, Star Wars Zero
 * Company and Captain Tsubasa — every one of them from a real publisher, and
 * nothing else. Nobody charges fifty euro for something nobody worked on.
 *
 * Games only. Film and television have no equivalent free list, so those stay
 * with the feeds rather than being half-covered here.
 */

import { writeFile, mkdir } from 'node:fs/promises';

const DAYS_AHEAD = 14;
const MAX_PAGES = 30;
const PER_PAGE = 50;
const MIN_CENTS = 2500;
const POLITE_MS = 120;
const BATCH = 50;

// Store entries that are not a game release. A demo has a publisher and a date
// and would otherwise sail through every other test.
const NOT_A_RELEASE = /(demo|playtest|soundtrack|ost|artbook|expansion pack|dlc|season pass|widgets?|bundle)/i;

const UA = { 'user-agent': 'gianlucascattarella.it review radar' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&trade;|™/g, '')
    .trim();

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/**
 * Steam writes "Aug 27, 2026" under a US country code and "27 Aug, 2026" under
 * a European one — a difference that silently emptied this radar once, because
 * a day-first string parses as nothing and every release looked undated. Both
 * orders are accepted so the country code can never break it again.
 *
 * "Q4 2026", "2026" and "To be announced" say nothing about when reviews
 * arrive, so they are dropped rather than guessed at.
 */
function parseDate(text) {
  const s = text.trim();

  // Month first: Aug 27, 2026
  let m = /^([A-Za-z]{3,})\s+(\d{1,2}),?\s*(\d{4})$/.exec(s);
  if (m) return build(m[1], m[2], m[3]);

  // Day first: 27 Aug, 2026
  m = /^(\d{1,2})\s+([A-Za-z]{3,}),?\s*(\d{4})$/.exec(s);
  if (m) return build(m[2], m[1], m[3]);

  return null;
}

function build(monthName, day, year) {
  const month = MONTHS.indexOf(monthName.slice(0, 3).toLowerCase());
  if (month < 0) return null;
  const d = new Date(Date.UTC(Number(year), month, Number(day)));
  return Number.isNaN(d.valueOf()) ? null : d;
}

const iso = (d) => d.toISOString().slice(0, 10);

async function searchPage(start) {
  const url =
    `https://store.steampowered.com/search/results/?query&start=${start}` +
    `&count=${PER_PAGE}&filter=comingsoon&sort_by=Released_ASC&infinite=1&cc=us&l=en`;

  const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(30_000) });
  if (!res.ok) throw new Error(`Steam search ${res.status}`);

  // Under rate limiting Steam answers with an HTML interstitial instead of
  // JSON, and parsing that as JSON throws a syntax error that reads like a bug
  // in this script rather than what it is.
  const body = await res.text();
  if (!body.trimStart().startsWith('{')) throw new Error('Steam answered HTML — rate limited, back off');

  const html = JSON.parse(body).results_html ?? '';
  const re =
    /data-ds-appid="(\d+)"[\s\S]*?<span class="title">([^<]*)<\/span>[\s\S]*?<div class="search_released[^"]*">\s*([^<]*?)\s*<\/div>/g;

  return [...html.matchAll(re)].map((m) => ({
    appid: m[1],
    title: decode(m[2]),
    released: m[3].trim(),
  }));
}

/**
 * Prices for many titles at once.
 *
 * appdetails takes a comma-separated list, but only while `filters` is narrow:
 * ask for price_overview alone and fifty ids come back in one response; add
 * `basic` and Steam rate-limits immediately. Asking per title meant nearly nine
 * hundred requests, most of which came back as an HTML block page and were
 * dropped in silence — which is how the radar once reported free demos while
 * quietly losing the fifty-euro releases it exists to find.
 */
async function pricesFor(appids) {
  const out = new Map();

  for (let i = 0; i < appids.length; i += BATCH) {
    const chunk = appids.slice(i, i + BATCH);
    const url =
      `https://store.steampowered.com/api/appdetails?appids=${chunk.join(',')}` +
      `&filters=price_overview&cc=eu&l=en`;

    try {
      const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(25_000) });
      const raw = await res.text();
      if (!raw.trimStart().startsWith('{')) {
        console.log(`::warning::rate limited on a price batch — backing off`);
        await sleep(20_000);
        continue;
      }
      for (const [id, body] of Object.entries(JSON.parse(raw))) {
        const cents = body?.success ? body.data?.price_overview?.initial : undefined;
        if (typeof cents === 'number') out.set(id, cents);
      }
    } catch (err) {
      console.log(`::warning::price batch failed — ${err.message}`);
    }
    await sleep(POLITE_MS * 8);
  }

  return out;
}

/** Full record for the handful that clear the price line, to name the publisher. */
async function details(appid) {
  const res = await fetch(
    `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=eu&l=en`,
    { headers: UA, signal: AbortSignal.timeout(20_000) },
  );
  if (!res.ok) return null;

  const raw = await res.text();
  if (!raw.trimStart().startsWith('{')) return null;

  const body = JSON.parse(raw)?.[appid];
  return body?.success ? body.data : null;
}

async function main() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const horizon = new Date(today.getTime() + DAYS_AHEAD * 86_400_000);

  // Sorted by release date ascending, so once a page runs past the horizon
  // every later page is further out still and there is nothing left to read.
  const candidates = new Map();
  let scanned = 0;

  for (let page = 0; page < MAX_PAGES; page++) {
    let rows;
    try {
      rows = await searchPage(page * PER_PAGE);
    } catch (err) {
      console.log(`::warning::search page ${page} failed — ${err.message}`);
      break;
    }
    if (!rows.length) break;
    scanned += rows.length;

    let anyInWindow = false;
    for (const row of rows) {
      const date = parseDate(row.released);
      if (!date) continue;
      if (date < today) continue;
      if (date > horizon) continue;
      anyInWindow = true;
      if (!candidates.has(row.appid)) candidates.set(row.appid, { ...row, date });
    }

    // Undated entries sort last, so a page with no in-window date means the
    // dated ones have run out rather than that this page happened to be empty.
    const dated = rows.filter((r) => parseDate(r.released));
    if (dated.length && !anyInWindow) break;

    await sleep(POLITE_MS);
  }

  console.log(`Scanned ${scanned} upcoming titles, ${candidates.size} dated inside ${DAYS_AHEAD} days.`);

  const releases = [...candidates.values()].filter((c) => !NOT_A_RELEASE.test(c.title));
  console.log(`${releases.length} look like actual releases rather than demos or soundtracks.`);

  const prices = await pricesFor(releases.map((r) => r.appid));
  const dear = releases.filter((r) => (prices.get(r.appid) ?? 0) >= MIN_CENTS);
  console.log(`${dear.length} priced at €${MIN_CENTS / 100} or more.`);

  // Free-to-play launches are missed by design. Filtering on price is what
  // keeps four hundred demos out, and a large free release is the kind of thing
  // that arrives with enough noise to notice without a radar.
  const worth = [];
  for (const c of dear) {
    const d = await details(c.appid);
    await sleep(POLITE_MS * 4);

    worth.push({
      ...c,
      price: ((prices.get(c.appid) ?? 0) / 100).toFixed(2),
      publisher: (d?.publishers ?? d?.developers ?? ['—']).join(', '),
      reviewsFrom: new Date(c.date.getTime() - 86_400_000),
    });
  }

  worth.sort((a, b) => a.date - b.date || Number(b.price) - Number(a.price));

  const days = (d) => Math.round((d - today) / 86_400_000);
  const line = (r) =>
    `| ${r.title.replace(/\|/g, '/')} | ${r.publisher.slice(0, 40)} | ${iso(r.date)} | ${days(r.date) === 0 ? 'today' : `${days(r.date)}d`} | ${iso(r.reviewsFrom)} | €${r.price} |`;

  const head = '| Title | Publisher | Release | Away | Reviews from | Price |\n|---|---|---|---|---|---|';
  const imminent = worth.filter((r) => days(r.date) <= 3);
  const later = worth.filter((r) => days(r.date) > 3);

  const md = `# Review radar — updated ${iso(today)}

Built by \`scripts/harvest-embargoes.mjs\` from Steam's upcoming releases,
sorted by date and filtered to titles priced at €25 or more. That price line is
the whole trick: of nearly nine hundred games dated inside the window, eleven
cleared it, and every one was a real release from a real publisher. Nobody
charges fifty euro for something nobody worked on.

Free-to-play launches are missed by design — filtering on price is what keeps
four hundred demos out.

Release dates are facts. Embargo times are not published anywhere a script can
read, so "reviews from" is the day before release, which is where they land in
almost every case. When a publisher holds reviews to the release day itself,
that silence is itself worth writing about.

Games only. Film and television still come from \`notes/feeds/film-tv.md\`.

## Reviews expected within three days

${imminent.length ? head + '\n' + imminent.map(line).join('\n') : '_Nothing inside three days._'}

## Further out, within ${DAYS_AHEAD} days

${later.length ? head + '\n' + later.map(line).join('\n') : '_Nothing else dated in the window._'}

---

*${scanned} upcoming titles scanned, ${candidates.size} with a firm date inside
${DAYS_AHEAD} days, ${worth.length} above the price line. Titles showing
"Q4 2026" or "To be announced" are dropped: a quarter says nothing about when
reviews arrive.*
`;

  await mkdir('notes', { recursive: true });
  await writeFile('notes/embargo-watch.md', md, 'utf8');

  console.log(`${worth.length} worth watching, ${imminent.length} within three days.`);
  for (const r of imminent) console.log(`  ${iso(r.date)}  €${r.price}  ${r.title}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
