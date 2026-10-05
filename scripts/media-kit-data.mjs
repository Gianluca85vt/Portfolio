/**
 * The numbers behind /media-kit/, refreshed every Monday by media-kit.yml.
 *
 *   node scripts/media-kit-data.mjs     # writes src/data/media-kit.json
 *
 * The growth plan of 5 October: at this size, traffic is a weak argument and
 * the searches are a strong one. Nobody types "nuke gaussian splat relighting"
 * unless they work in the field, and a product manager at a tool vendor reads
 * that in five seconds. So the page leads with thirty real queries from Search
 * Console, then the countries, then the counts stated plainly.
 *
 * Every source is optional, as in the report: a missing one leaves its field
 * null and the page leaves the line out rather than printing a zero.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { accessToken, SCOPES } from './lib/google-token.mjs';
import { scSite, scQuery, growth } from './report-data.mjs';
import { loadArticles, romeDay, addDays } from './lib/articles.mjs';
import { TOPICS } from './forum-watch.mjs';

const OUT = 'src/data/media-kit.json';
const DAYS = 28;

/** Searches for him or the site by name say nothing about who the readers are. */
const OWN = /gianluca|scattarella|backdrop|monk3y/i;

/** A site address typed into Google is somebody looking for another site. */
const SITE_ADDRESS = /\.(com|net|org|io|it)\b/i;

const pattern = (t) => new RegExp(`(^|[^a-z0-9])${t.replace(/[.+]/g, '\\$&')}([^a-z0-9]|$)`, 'i');

/**
 * Thirty queries, the ones naming a tool or a technique first: they are the
 * proof of a professional audience. Ties go to the query more people saw.
 */
export function pickQueries(rows, n = 30) {
  const ranked = rows
    .filter((r) => !OWN.test(r.query) && r.query.length >= 6 && !SITE_ADDRESS.test(r.query))
    .map((r) => ({ ...r, craft: TOPICS.some((t) => pattern(t).test(r.query)) }))
    .sort((a, b) => Number(b.craft) - Number(a.craft) || b.impressions - a.impressions);
  const picked = [];
  for (const r of ranked) {
    if (picked.length >= n) break;
    if (picked.some((p) => sameSearch(p, r.query))) continue;
    picked.push(r.query);
  }
  return picked;
}

const tokens = (q) => q.toLowerCase().match(/[a-z0-9]+/g) ?? [];
const compact = (q) => tokens(q).join('');

/**
 * Whether two queries are the same search typed differently: "paint bridge
 * krita" and "paintbridge krita", "blender downtown generator" and "downtown
 * generator blender", or one that only adds a word to the other. Thirty
 * spellings of six searches would undersell the range the list exists to show.
 */
export function sameSearch(a, b) {
  const ca = compact(a);
  const cb = compact(b);
  if (ca === cb || ca.includes(cb) || cb.includes(ca)) return true;
  const ta = new Set(tokens(a));
  const tb = new Set(tokens(b));
  const [small, large] = ta.size <= tb.size ? [ta, tb] : [tb, ta];
  return small.size >= 2 && [...small].every((t) => large.has(t));
}

/** ISO 3166 alpha-3, as Search Console reports countries, to English names. */
function countryName(code) {
  const two = {
    usa: 'US', ita: 'IT', gbr: 'GB', deu: 'DE', nld: 'NL', fra: 'FR', esp: 'ES', can: 'CA', aus: 'AU', ind: 'IN',
    bra: 'BR', jpn: 'JP', pol: 'PL', swe: 'SE', che: 'CH', bel: 'BE', aut: 'AT', kor: 'KR', mex: 'MX', tur: 'TR',
    ukr: 'UA', rus: 'RU', chn: 'CN', twn: 'TW', sgp: 'SG', phl: 'PH', idn: 'ID', nor: 'NO', dnk: 'DK', fin: 'FI',
    prt: 'PT', irl: 'IE', nzl: 'NZ', arg: 'AR', cze: 'CZ', hun: 'HU', rou: 'RO', grc: 'GR', isr: 'IL', zaf: 'ZA',
  }[code.toLowerCase()];
  if (!two) return code.toUpperCase();
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(two) ?? code.toUpperCase();
}

async function search() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!key) return null;
  const token = await accessToken(key, [SCOPES.searchConsole]);
  const site = await scSite(token);
  // Search Console lags two to three days; end the window where data exists.
  const endDate = addDays(romeDay(), -3);
  const startDate = addDays(endDate, -(DAYS - 1));
  const blogOnly = { dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'contains', expression: '/blog/' }] }] };
  const range = { startDate, endDate, ...blogOnly };
  const [totals, queries, countries] = await Promise.all([
    scQuery(token, site, { ...range }),
    scQuery(token, site, { ...range, dimensions: ['query'], rowLimit: 400 }),
    scQuery(token, site, { ...range, dimensions: ['country'], rowLimit: 250 }),
  ]);
  const t = totals[0] ?? { clicks: 0, impressions: 0, position: 0 };
  // Shares of every country together. Not of the dimensionless total: with a
  // page filter Search Console counts that one per page, and the first refresh
  // divided by it and gave Germany one per cent.
  const allImpressions = countries.reduce((a, r) => a + r.impressions, 0) || 1;
  return {
    from: startDate,
    to: endDate,
    impressions: t.impressions,
    clicks: t.clicks,
    position: Math.round(t.position * 10) / 10,
    queries: pickQueries(queries.map((r) => ({ query: r.keys[0], impressions: r.impressions }))),
    countries: countries
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 6)
      .map((r) => ({ name: countryName(r.keys[0]), share: Math.round((r.impressions / allImpressions) * 100) })),
  };
}

async function main() {
  const previous = JSON.parse(await readFile(OUT, 'utf8').catch(() => '{}'));
  const articles = await loadArticles();
  let sc = null;
  try {
    sc = await search();
  } catch (e) {
    console.log(`Search Console: ${e.message}`);
  }
  const grown = await growth();
  const data = {
    updated: romeDay(),
    // A failed read keeps last week's figures rather than blanking the page.
    search: sc ?? previous.search ?? null,
    archive: {
      articles: articles.length,
      craft: articles.filter((a) => ['3D', 'Tech', 'AI'].includes(a.category)).length,
      reviews: articles.filter((a) => a.score != null).length,
    },
    newsletter: grown.newsletter
      ? { subscribers: grown.newsletter.subscribers, openRate: grown.newsletter.openRate }
      : (previous.newsletter ?? null),
    bluesky: grown.bluesky?.followers ?? previous.bluesky ?? null,
  };
  await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(
    `media kit: ${data.search ? `${data.search.queries.length} queries, ${data.search.impressions} impressions in ${DAYS} days` : 'no search data'}, ` +
      `${data.archive.articles} articles, newsletter ${data.newsletter?.subscribers ?? 'n/a'}`,
  );
}

if (process.argv[1] && import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
