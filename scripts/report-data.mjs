/**
 * Gathers everything the four-day report is made of.
 *
 * Four sources, and every one of them is optional. A missing Bing key should
 * cost you the Bing section and nothing else — a report that arrives with
 * three quarters of the picture and says which quarter is absent beats no
 * report at all, and beats one that silently pretends the gap is a zero.
 *
 * Nothing here prints a credential. Failures carry the provider's own message,
 * because a wrong property id, a key that was never granted access and a
 * disabled API all look the same from outside.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { accessToken, SCOPES } from './lib/google-token.mjs';

const SITE = 'https://www.gianlucascattarella.it/';

const iso = (d) => d.toISOString().slice(0, 10);

export function windows(days, endsAt = new Date()) {
  // Search Console lags two to three days, and GA4 keeps refining the last
  // day, so the window stops yesterday rather than today.
  const end = new Date(endsAt);
  end.setUTCDate(end.getUTCDate() - 1);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));

  const prevEnd = new Date(start);
  prevEnd.setUTCDate(prevEnd.getUTCDate() - 1);
  const prevStart = new Date(prevEnd);
  prevStart.setUTCDate(prevStart.getUTCDate() - (days - 1));

  return {
    current: { start: iso(start), end: iso(end) },
    previous: { start: iso(prevStart), end: iso(prevEnd) },
  };
}

/* ---------------------------------------------------------------- Analytics */

async function ga4Report(token, propertyId, body) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error?.message ?? `GA4 returned ${res.status}`);
  return json;
}

const rows = (report, valueIndex = 0) =>
  (report.rows ?? []).map((r) => ({
    key: r.dimensionValues.map((d) => d.value).join(' · '),
    value: Number(r.metricValues[valueIndex].value),
  }));

export async function analytics(win) {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!propertyId || !key) {
    return { ok: false, why: 'GA4_PROPERTY_ID or GOOGLE_SERVICE_ACCOUNT_JSON is not set' };
  }

  try {
    const token = await accessToken(key, [SCOPES.analytics]);
    const ranges = [
      { startDate: win.current.start, endDate: win.current.end, name: 'current' },
      { startDate: win.previous.start, endDate: win.previous.end, name: 'previous' },
    ];

    const totals = await ga4Report(token, propertyId, {
      dateRanges: ranges,
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
    });

    // With two date ranges GA4 returns one row per range, tagged by the range
    // name in a trailing dimension.
    const pick = (name) => {
      const row = (totals.rows ?? []).find((r) =>
        r.dimensionValues?.some((d) => d.value === `date_range_${name === 'current' ? 0 : 1}`)
      ) ?? (totals.rows ?? [])[name === 'current' ? 0 : 1];
      const m = row?.metricValues ?? [];
      return {
        users: Number(m[0]?.value ?? 0),
        sessions: Number(m[1]?.value ?? 0),
        views: Number(m[2]?.value ?? 0),
        avgSeconds: Number(m[3]?.value ?? 0),
        bounceRate: Number(m[4]?.value ?? 0),
      };
    };

    const only = { startDate: win.current.start, endDate: win.current.end };

    const [pages, sources, countries, devices, daily] = await Promise.all([
      ga4Report(token, propertyId, {
        dateRanges: [only],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 15,
      }),
      ga4Report(token, propertyId, {
        dateRanges: [only],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),
      ga4Report(token, propertyId, {
        dateRanges: [only],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 8,
      }),
      ga4Report(token, propertyId, {
        dateRanges: [only],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      }),
      ga4Report(token, propertyId, {
        dateRanges: [only],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),
    ]);

    return {
      ok: true,
      current: pick('current'),
      previous: pick('previous'),
      pages: rows(pages),
      channels: rows(sources),
      countries: rows(countries),
      devices: rows(devices),
      daily: rows(daily),
    };
  } catch (err) {
    return { ok: false, why: String(err.message) };
  }
}

/* ----------------------------------------------------------- Search Console */

/**
 * Search Console addresses a property by exactly the string it was verified
 * with, and there are two forms: the URL prefix `https://www.example.com/` and
 * the domain property `sc-domain:example.com`. Guessing wrong returns a bare
 * 403 that reads like a permissions problem. So ask which ones this account
 * can see and take the one that matches.
 */
async function scSite(token) {
  const res = await fetch('https://searchconsole.googleapis.com/webmasters/v3/sites', {
    headers: { authorization: `Bearer ${token}` },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error?.message ?? `Search Console returned ${res.status} listing sites`);

  const entries = json.siteEntry ?? [];
  if (!entries.length) {
    throw new Error('the service account is not a user on any Search Console property yet');
  }

  const host = new URL(SITE).hostname.replace(/^www\./, '');
  const match =
    entries.find((e) => e.siteUrl === SITE) ??
    entries.find((e) => e.siteUrl === `sc-domain:${host}`) ??
    entries.find((e) => e.siteUrl.includes(host));

  if (!match) {
    throw new Error(
      `none of the properties this account can see is ${host} — it can see: ${entries.map((e) => e.siteUrl).join(', ')}`
    );
  }
  return match.siteUrl;
}

async function scQuery(token, site, body) {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error?.message ?? `Search Console returned ${res.status}`);
  return json.rows ?? [];
}

export async function searchConsole(win) {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!key) return { ok: false, why: 'GOOGLE_SERVICE_ACCOUNT_JSON is not set' };

  try {
    const token = await accessToken(key, [SCOPES.searchConsole]);
    const site = await scSite(token);
    const range = { startDate: win.current.start, endDate: win.current.end };
    const prev = { startDate: win.previous.start, endDate: win.previous.end };

    const sum = (list) =>
      list.reduce(
        (a, r) => ({
          clicks: a.clicks + r.clicks,
          impressions: a.impressions + r.impressions,
          position: a.position + r.position * r.impressions,
        }),
        { clicks: 0, impressions: 0, position: 0 }
      );

    const [nowRows, prevRows, queries, pages] = await Promise.all([
      scQuery(token, site, { ...range, dimensions: ['date'] }),
      scQuery(token, site, { ...prev, dimensions: ['date'] }),
      scQuery(token, site, { ...range, dimensions: ['query'], rowLimit: 20 }),
      scQuery(token, site, { ...range, dimensions: ['page'], rowLimit: 15 }),
    ]);

    const a = sum(nowRows);
    const b = sum(prevRows);

    return {
      ok: true,
      // Which property was actually read. Worth surfacing: a domain property
      // and a URL-prefix property over the same site can hold different data.
      site,
      // How many days each window actually came back with. Search Console lags
      // two to three days, so a four-day window routinely holds two days of
      // data while the window before it holds four — and comparing the totals
      // then reports a collapse that is only the lag. The 31 August report said
      // impressions fell 58 per cent; per day they fell about 16.
      current: {
        days: nowRows.length,
        clicks: a.clicks,
        impressions: a.impressions,
        position: a.impressions ? a.position / a.impressions : 0,
      },
      previous: {
        days: prevRows.length,
        clicks: b.clicks,
        impressions: b.impressions,
        position: b.impressions ? b.position / b.impressions : 0,
      },
      daily: nowRows.map((r) => ({ key: r.keys[0], value: r.impressions, clicks: r.clicks })),
      queries: queries.map((r) => ({
        key: r.keys[0],
        clicks: r.clicks,
        impressions: r.impressions,
        position: r.position,
      })),
      pages: pages.map((r) => ({
        key: r.keys[0].replace(SITE.replace(/\/$/, ''), ''),
        clicks: r.clicks,
        impressions: r.impressions,
        position: r.position,
      })),
    };
  } catch (err) {
    return { ok: false, why: String(err.message) };
  }
}

/* ------------------------------------------------------------------- Bing */

async function bing(path, params) {
  const qs = new URLSearchParams({ ...params, apikey: process.env.BING_API_KEY });
  const res = await fetch(`https://ssl.bing.com/webmaster/api.svc/json/${path}?${qs}`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.Message ?? `Bing returned ${res.status}`);
  return json.d ?? [];
}

export async function bingWebmaster(win) {
  if (!process.env.BING_API_KEY) return { ok: false, why: 'BING_API_KEY is not set' };

  try {
    const [traffic, queries] = await Promise.all([
      bing('GetRankAndTrafficStats', { siteUrl: SITE }),
      bing('GetQueryStats', { siteUrl: SITE }).catch(() => []),
    ]);

    // Bing hands back a running series rather than a range; keep the days that
    // fall inside the window. Its dates arrive as /Date(ms)/.
    const parse = (d) => {
      const ms = /\/Date\((\d+)/.exec(String(d));
      return ms ? new Date(Number(ms[1])).toISOString().slice(0, 10) : String(d).slice(0, 10);
    };

    const inWindow = (traffic ?? [])
      .map((r) => ({
        date: parse(r.Date),
        impressions: r.Impressions ?? 0,
        clicks: r.Clicks ?? 0,
      }))
      .filter((r) => r.date >= win.current.start && r.date <= win.current.end);

    return {
      ok: true,
      daily: inWindow,
      clicks: inWindow.reduce((a, r) => a + r.clicks, 0),
      impressions: inWindow.reduce((a, r) => a + r.impressions, 0),
      queries: (queries ?? [])
        .slice(0, 15)
        .map((q) => ({
          key: q.Query,
          clicks: q.Clicks ?? 0,
          impressions: q.Impressions ?? 0,
          position: q.AvgImpressionPosition ?? q.AvgClickPosition ?? 0,
        })),
    };
  } catch (err) {
    return { ok: false, why: String(err.message) };
  }
}

/* ------------------------------------------------------- What the blog did */

/**
 * The one section that needs no credentials, and the one that explains the
 * others: traffic moves because something was published, or because nothing
 * was.
 */
export async function editorial(win, root = process.cwd()) {
  const dir = join(root, 'src/content/blog');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));

  let published = 0;
  let drafts = 0;
  const inWindow = [];
  const categories = {};
  let svgCovers = 0;

  for (const f of files) {
    const text = (await readFile(join(dir, f), 'utf8')).replace(/\r\n?/g, '\n');
    const head = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const field = (n) => head.match(new RegExp(`^${n}:\\s*(.*)$`, 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '');

    if (/^draft:\s*true/m.test(head)) {
      drafts += 1;
      continue;
    }
    published += 1;

    const category = field('category') ?? '?';
    categories[category] = (categories[category] ?? 0) + 1;
    if ((field('cover') ?? '').endsWith('.svg')) svgCovers += 1;

    const date = field('date');
    if (date && date >= win.current.start && date <= win.current.end) {
      inWindow.push({
        slug: f.replace(/\.md$/, ''),
        title: field('title') ?? f,
        category,
        score: field('score'),
        cover: (field('cover') ?? '').endsWith('.svg') ? 'drawn' : 'photo',
      });
    }
  }

  let social = {};
  try {
    social = JSON.parse(await readFile(join(root, 'notes/social-posted.json'), 'utf8'));
  } catch {
    social = {};
  }
  const posted = inWindow.filter((a) => social[a.slug]).length;

  return {
    published,
    drafts,
    svgCovers,
    categories: Object.entries(categories)
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => b.value - a.value),
    inWindow: inWindow.sort((a, b) => a.slug.localeCompare(b.slug)),
    socialPosted: posted,
  };
}

export async function gather(days = 4) {
  const win = windows(days);
  const [ga, sc, bing, ed] = await Promise.all([
    analytics(win),
    searchConsole(win),
    bingWebmaster(win),
    editorial(win),
  ]);
  return { days, window: win, ga, sc, bing, editorial: ed, generatedAt: new Date().toISOString() };
}
