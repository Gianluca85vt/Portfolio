/**
 * Renders the gathered data as the printable report.
 *
 * Light paper rather than the blog's dark ground: this is read on a phone at
 * breakfast and occasionally printed, and inverting a dark page wastes ink and
 * loses the thin rules. The accents are the site's, so it still reads as
 * Backdrop rather than as a spreadsheet.
 *
 * No chart library. Every figure here is a bar or a line over at most a couple
 * of dozen points, which is less SVG than the loader for a charting package.
 */

const INK = '#18011F';
const ACCENT = '#B600A8';
const VIOLET = '#7621B0';
const EMBER = '#BE4C00';
const MUTED = '#6C6470';
const RULE = '#E4DEE8';

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const int = (n) => Math.round(Number(n) || 0).toLocaleString('en-GB');
const dec = (n, p = 1) => (Number(n) || 0).toFixed(p);

function delta(now, before, { invert = false } = {}) {
  const a = Number(now) || 0;
  const b = Number(before) || 0;
  if (!b) return { text: a ? 'new' : '—', tone: a ? 'up' : 'flat' };
  const pct = ((a - b) / b) * 100;
  const up = invert ? pct < 0 : pct > 0;
  const flat = Math.abs(pct) < 0.5;
  return {
    text: `${pct > 0 ? '+' : ''}${dec(pct, pct > -10 && pct < 10 ? 1 : 0)}%`,
    tone: flat ? 'flat' : up ? 'up' : 'down',
  };
}

const perDay = (total, days) => (days > 0 ? Number(total) / days : 0);

/**
 * Says so on the tile when Google reported fewer days than the window asked
 * for, so a total that looks small is read as a short window rather than as a
 * fall. Silent when the window is complete.
 */
function scPartial(sc, days) {
  const got = sc.current?.days ?? 0;
  if (!days || got >= days || got === 0) return undefined;
  return `${got} of ${days} days reported`;
}

function tile(label, value, d, sub) {
  const colour = d?.tone === 'up' ? '#1B7A4B' : d?.tone === 'down' ? '#B4283C' : MUTED;
  return `
  <div class="tile">
    <p class="tile-label">${esc(label)}</p>
    <p class="tile-value">${esc(value)}</p>
    ${d ? `<p class="tile-delta" style="color:${colour}">${esc(d.text)} <span>vs previous</span></p>` : ''}
    ${sub ? `<p class="tile-sub">${esc(sub)}</p>` : ''}
  </div>`;
}

/** A plain column chart. Bars carry their own value above them. */
function bars(series, { colour = ACCENT, height = 120 } = {}) {
  if (!series.length) return '<p class="empty">No data in this window.</p>';
  const max = Math.max(...series.map((s) => s.value), 1);
  const w = 100 / series.length;
  return `
  <svg class="chart" viewBox="0 0 100 ${height}" preserveAspectRatio="none" role="img">
    ${series
      .map((s, i) => {
        const h = (s.value / max) * (height - 26);
        return `<rect x="${i * w + w * 0.18}" y="${height - 16 - h}" width="${w * 0.64}" height="${Math.max(h, 0.6)}" fill="${colour}" rx="0.6"/>`;
      })
      .join('')}
  </svg>
  <div class="chart-labels">
    ${series.map((s) => `<span><b>${int(s.value)}</b>${esc(String(s.key).slice(-2))}</span>`).join('')}
  </div>`;
}

function table(head, rowsHtml) {
  if (!rowsHtml) return '<p class="empty">Nothing to show.</p>';
  return `<table><thead><tr>${head.map((h, i) => `<th${i ? ' class="num"' : ''}>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
}

function missing(label, why) {
  return `<div class="missing"><b>${esc(label)}</b> could not be read — ${esc(why)}</div>`;
}

export function renderReport(d) {
  const { ga, sc, bing, editorial: ed, window: win, days } = d;

  const gaps = [
    !ga.ok && missing('Google Analytics', ga.why),
    !sc.ok && missing('Search Console', sc.why),
    !bing.ok && missing('Bing Webmaster', bing.why),
  ].filter(Boolean);

  const tiles = [
    ga.ok && tile('Users', int(ga.current.users), delta(ga.current.users, ga.previous.users)),
    ga.ok && tile('Sessions', int(ga.current.sessions), delta(ga.current.sessions, ga.previous.sessions)),
    ga.ok && tile('Pageviews', int(ga.current.views), delta(ga.current.views, ga.previous.views)),
    ga.ok &&
      tile(
        'Avg. session',
        `${Math.floor(ga.current.avgSeconds / 60)}m ${Math.round(ga.current.avgSeconds % 60)}s`,
        delta(ga.current.avgSeconds, ga.previous.avgSeconds)
      ),
    // Per day, not per window. Search Console's lag means the current window
    // often holds fewer days than the one it is compared against, and totals
    // then read as a crash that is only missing data. Position is already an
    // impression-weighted mean, so it compares as it stands.
    sc.ok &&
      tile(
        'Google clicks',
        int(sc.current.clicks),
        delta(perDay(sc.current.clicks, sc.current.days), perDay(sc.previous.clicks, sc.previous.days)),
        scPartial(sc, days)
      ),
    sc.ok &&
      tile(
        'Google impressions',
        int(sc.current.impressions),
        delta(perDay(sc.current.impressions, sc.current.days), perDay(sc.previous.impressions, sc.previous.days)),
        scPartial(sc, days)
      ),
    sc.ok &&
      tile('Avg. position', dec(sc.current.position), delta(sc.current.position, sc.previous.position, { invert: true })),
    bing.ok && tile('Bing clicks', int(bing.clicks), null, `${int(bing.impressions)} impressions`),
  ].filter(Boolean);

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Backdrop — ${days}-day report</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@600;800&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 14mm 13mm 16mm; }
  * { box-sizing: border-box; }
  body {
    font-family: 'Source Sans 3', 'Liberation Sans', 'DejaVu Sans', sans-serif;
    color: ${INK}; background: #fff; margin: 0;
    font-size: 10.5pt; line-height: 1.5;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  h1, h2, h3 { font-family: Kanit, 'Liberation Sans', sans-serif; margin: 0; }

  .masthead { border-bottom: 3px solid ${INK}; padding-bottom: 10px; margin-bottom: 18px; }
  .masthead h1 { font-weight: 800; font-size: 30pt; letter-spacing: -0.02em; text-transform: uppercase; line-height: 1; }
  .masthead .kicker { font-size: 7.5pt; letter-spacing: 0.28em; text-transform: uppercase; color: ${MUTED}; font-weight: 600; }
  .masthead .range { margin-top: 6px; font-size: 10pt; color: ${MUTED}; }
  .masthead .range b { color: ${INK}; }

  h2 {
    font-size: 12.5pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;
    margin: 22px 0 9px; padding-bottom: 5px; border-bottom: 1px solid ${RULE};
  }
  h2 .n { color: ${ACCENT}; margin-right: 8px; }

  .tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .tile { border: 1px solid ${RULE}; border-top: 3px solid ${ACCENT}; padding: 9px 10px 10px; }
  .tile-label { margin: 0; font-size: 7pt; letter-spacing: 0.16em; text-transform: uppercase; color: ${MUTED}; font-weight: 600; }
  .tile-value { margin: 3px 0 0; font-family: Kanit, sans-serif; font-weight: 800; font-size: 19pt; line-height: 1.05; font-variant-numeric: tabular-nums; }
  .tile-delta { margin: 2px 0 0; font-size: 8.5pt; font-weight: 600; }
  .tile-delta span { color: ${MUTED}; font-weight: 400; }
  .tile-sub { margin: 2px 0 0; font-size: 8.5pt; color: ${MUTED}; }

  .chart { width: 100%; height: 118px; display: block; }
  .chart-labels { display: flex; margin-top: 2px; }
  .chart-labels span { flex: 1; text-align: center; font-size: 7pt; color: ${MUTED}; }
  .chart-labels b { display: block; color: ${INK}; font-size: 8pt; font-variant-numeric: tabular-nums; }

  table { width: 100%; border-collapse: collapse; font-size: 9.5pt; }
  th { text-align: left; font-size: 7pt; letter-spacing: 0.14em; text-transform: uppercase; color: ${MUTED};
       border-bottom: 1px solid ${RULE}; padding: 0 6px 4px 0; font-weight: 600; }
  td { padding: 4px 6px 4px 0; border-bottom: 1px solid #F2EEF4; vertical-align: top; }
  td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; padding-right: 0; }
  tr td:first-child { word-break: break-word; }

  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .empty { color: ${MUTED}; font-style: italic; font-size: 9.5pt; }
  .missing { border-left: 3px solid ${EMBER}; background: #FDF6F1; padding: 7px 10px; margin: 6px 0; font-size: 9.5pt; }
  .pill { display: inline-block; padding: 1px 7px; border-radius: 9px; font-size: 7.5pt; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em; color: #fff; background: ${VIOLET}; }
  .pill.drawn { background: ${EMBER}; }
  footer { margin-top: 26px; padding-top: 8px; border-top: 1px solid ${RULE}; font-size: 8pt; color: ${MUTED}; }
  .avoid { break-inside: avoid; }
</style></head>
<body>

<header class="masthead">
  <p class="kicker">Backdrop · performance report</p>
  <h1>${days} days</h1>
  <p class="range"><b>${esc(win.current.start)}</b> to <b>${esc(win.current.end)}</b>
     &nbsp;·&nbsp; compared with ${esc(win.previous.start)} to ${esc(win.previous.end)}</p>
</header>

${gaps.join('')}

${tiles.length ? `<div class="tiles">${tiles.join('')}</div>` : ''}

${
  ga.ok
    ? `<section class="avoid">
  <h2><span class="n">01</span>Visitors by day</h2>
  ${bars(ga.daily)}
</section>`
    : ''
}

${
  ga.ok
    ? `<section class="avoid">
  <h2><span class="n">02</span>Where they landed</h2>
  <div class="cols">
    <div>
      ${table(
        ['Page', 'Views'],
        ga.pages.map((p) => `<tr><td>${esc(p.key)}</td><td class="num">${int(p.value)}</td></tr>`).join('')
      )}
    </div>
    <div>
      ${table(
        ['Channel', 'Sessions'],
        ga.channels.map((c) => `<tr><td>${esc(c.key)}</td><td class="num">${int(c.value)}</td></tr>`).join('')
      )}
      <h3 style="font-size:9pt;margin:14px 0 5px;text-transform:uppercase;letter-spacing:0.12em;color:${MUTED}">Countries</h3>
      ${table(
        ['Country', 'Users'],
        ga.countries.map((c) => `<tr><td>${esc(c.key)}</td><td class="num">${int(c.value)}</td></tr>`).join('')
      )}
    </div>
  </div>
</section>`
    : ''
}

${
  sc.ok
    ? `<section class="avoid">
  <h2><span class="n">03</span>Google Search</h2>
  ${bars(sc.daily, { colour: VIOLET })}
  <div class="cols" style="margin-top:14px">
    <div>
      ${table(
        ['Query', 'Clicks', 'Impr.', 'Pos.'],
        sc.queries
          .map(
            (q) =>
              `<tr><td>${esc(q.key)}</td><td class="num">${int(q.clicks)}</td><td class="num">${int(q.impressions)}</td><td class="num">${dec(q.position)}</td></tr>`
          )
          .join('')
      )}
    </div>
    <div>
      ${table(
        ['Page', 'Clicks', 'Impr.', 'Pos.'],
        sc.pages
          .map(
            (p) =>
              `<tr><td>${esc(p.key)}</td><td class="num">${int(p.clicks)}</td><td class="num">${int(p.impressions)}</td><td class="num">${dec(p.position)}</td></tr>`
          )
          .join('')
      )}
    </div>
  </div>
</section>`
    : ''
}

${
  bing.ok
    ? `<section class="avoid">
  <h2><span class="n">04</span>Bing</h2>
  ${bars(bing.daily.map((r) => ({ key: r.date, value: r.impressions })), { colour: EMBER })}
  ${table(
    ['Query', 'Clicks', 'Impr.', 'Pos.'],
    bing.queries
      .map(
        (q) =>
          `<tr><td>${esc(q.key)}</td><td class="num">${int(q.clicks)}</td><td class="num">${int(q.impressions)}</td><td class="num">${dec(q.position)}</td></tr>`
      )
      .join('')
  )}
</section>`
    : ''
}

<section class="avoid">
  <h2><span class="n">05</span>What the blog did</h2>
  <div class="cols">
    <div>
      <p style="margin:0 0 8px">
        <b>${ed.published}</b> articles published, <b>${ed.drafts}</b> waiting in drafts.
        <b>${ed.inWindow.length}</b> went out in this window, of which <b>${ed.socialPosted}</b> reached Facebook and Instagram.
        <b>${ed.svgCovers}</b> of ${ed.published} still carry a drawn cover rather than a photograph.
      </p>
      ${table(
        ['Published in this window', 'Cover'],
        ed.inWindow
          .map(
            (a) =>
              `<tr><td>${esc(a.title)}${a.score ? ` <span class="pill">${esc(a.score)}/10</span>` : ''}</td><td class="num"><span class="pill ${a.cover === 'drawn' ? 'drawn' : ''}">${a.cover}</span></td></tr>`
          )
          .join('')
      )}
    </div>
    <div>
      ${table(
        ['Category', 'Articles'],
        ed.categories.map((c) => `<tr><td>${esc(c.key)}</td><td class="num">${int(c.value)}</td></tr>`).join('')
      )}
    </div>
  </div>
</section>

<footer>
  Generated ${esc(d.generatedAt.slice(0, 16).replace('T', ' '))} UTC · gianlucascattarella.it/blog ·
  Search Console and Bing lag two to three days, so the window closes yesterday rather than today.
</footer>

</body></html>`;
}
