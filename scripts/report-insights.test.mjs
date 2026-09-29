/**
 * The report's reading, checked against the window it was written from:
 * 25 to 28 September 2026, the first report after the consent banner.
 *
 *   node --test scripts/report-insights.test.mjs
 *
 * The figures are the ones that report printed. Where it printed a percentage
 * rather than the previous total, the previous total is worked back from it.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { insights, insightsText, giorno } from './report-insights.mjs';

const art = (slug, clicks, impressions, position) => ({ key: `/blog/${slug}/`, clicks, impressions, position });

function september28() {
  return {
    days: 4,
    window: {
      current: { start: '2026-09-25', end: '2026-09-28' },
      previous: { start: '2026-09-21', end: '2026-09-24' },
    },
    ga: {
      ok: true,
      current: { users: 71, sessions: 76, views: 75, avgSeconds: 19 },
      previous: { users: 62, sessions: 65, views: 81, avgSeconds: 90 },
      daily: [
        { key: '20260925', value: 41 },
        { key: '20260926', value: 9 },
        { key: '20260927', value: 7 },
        { key: '20260928', value: 6 },
      ],
      pages: [
        { key: '/', value: 26 },
        { key: '/blog/chiikawa-break-production-buffer/', value: 7 },
        { key: '/blog/silent-hill-townfall-review/', value: 5 },
        { key: '/blog', value: 3 },
      ],
      channels: [
        { key: 'Direct', value: 33 },
        { key: 'Organic Social', value: 16 },
        { key: 'Organic Search', value: 12 },
        { key: 'Unassigned', value: 3 },
        { key: 'Cross-network', value: 2 },
        { key: 'Referral', value: 1 },
      ],
      countries: [
        { key: 'United States', value: 36 },
        { key: 'Italy', value: 6 },
        { key: 'China', value: 5 },
        { key: 'United Kingdom', value: 3 },
        { key: 'Belgium', value: 2 },
        { key: 'Canada', value: 2 },
        { key: 'Ireland', value: 2 },
        { key: 'Colombia', value: 1 },
      ],
    },
    sc: {
      ok: true,
      current: { days: 2, clicks: 6, impressions: 365, position: 7.3 },
      previous: { days: 4, clicks: 10, impressions: 545, position: 10.1 },
      pages: [
        art('black-flag-resynced-perk-vfx-toggle', 3, 22, 4.6),
        { key: '/', clicks: 1, impressions: 1, position: 1 },
        art('fire-emblem-fortunes-weave-review', 1, 7, 11.9),
        art('wolverine-uv-bug-burden-of-proof', 1, 2, 6),
        art('avatar-season-2-appa-fur-practical-cg-groom', 0, 4, 6.3),
        art('beast-of-reincarnation-review-scores', 0, 1, 11),
        art('blender-5-2-lts-what-changed', 0, 9, 8.9),
        art('blender-overgrown-teaser-painterly-shadows', 0, 9, 6.9),
      ],
    },
    bing: { ok: true, clicks: 1, impressions: 19, queries: [] },
    editorial: {
      published: 195,
      drafts: 3,
      socialPosted: 12,
      inWindow: [
        '2026-09-25', '2026-09-25', '2026-09-26', '2026-09-26', '2026-09-26', '2026-09-27',
        '2026-09-27', '2026-09-27', '2026-09-28', '2026-09-28', '2026-09-28', '2026-09-28',
      ].map((date, i) => ({ slug: `a${i}`, date, title: `Article ${i}`, category: 'Games' })),
      draftList: [
        { slug: 'the-helper-closes-warcraft-3-archive', title: 'The Helper closes its Warcraft 3 archive', date: '2026-09-22', review: false },
        { slug: 'ace-combat-8-wings-of-theve-review', title: 'Ace Combat 8 review', date: '2026-09-26', review: true },
        { slug: 'rtx-mega-geometry-2-vram-streaming', title: 'RTX Mega Geometry 2', date: '2026-09-27', review: false },
      ],
      meta: {
        'chiikawa-break-production-buffer': { category: 'Manga', review: false, handsOn: false },
        'black-flag-resynced-perk-vfx-toggle': { category: 'Games', review: false, handsOn: false },
        'fire-emblem-fortunes-weave-review': { category: 'Games', review: true, handsOn: false },
        'beast-of-reincarnation-review-scores': { category: 'Games', review: true, handsOn: false },
        'wolverine-uv-bug-burden-of-proof': { category: '3D', review: false, handsOn: false },
        'avatar-season-2-appa-fur-practical-cg-groom': { category: 'Film & TV', review: false, handsOn: false },
        'blender-5-2-lts-what-changed': { category: '3D', review: false, handsOn: false },
        'blender-overgrown-teaser-painterly-shadows': { category: '3D', review: false, handsOn: false },
        'pawbay-review': { category: 'Games', review: true, handsOn: true },
      },
      quotas: [
        { label: 'Manga and anime', every: 6, since: 4, breached: false },
        { label: 'Film & TV', every: 8, since: 5, breached: false },
      ],
    },
  };
}

const read = () => insights(september28(), { today: new Date('2026-09-29T11:39:00Z') });
const titles = (list) => list.map((x) => x.title).join(' | ');

test('dates read in Italian', () => {
  assert.equal(giorno('2026-09-25'), '25 settembre');
  assert.equal(giorno('20261003'), '3 ottobre');
});

test('the consent banner is named before any Analytics comparison', () => {
  const r = read();
  assert.match(r.trend[0], /25 settembre/);
  assert.match(r.trend[0], /cookie/);
  // No Analytics percentage across the break.
  const gaLine = r.trend.find((t) => t.startsWith('Google Analytics:'));
  assert.doesNotMatch(gaLine, /%/);
});

test('the trend leads with Search Console, per day', () => {
  const r = read();
  assert.equal(r.headline, 'Su Google stai crescendo: più impressioni e posizioni migliori.');
  const line = r.trend.find((t) => t.startsWith('Google Search'));
  assert.match(line, /183 impressioni/); // 365 over 2 reported days
  assert.match(line, /\+34%/);
  assert.match(line, /prima pagina/);
  assert.match(line, /2 giorni su 4/);
});

test('the one-day spike is called out, with the level underneath it', () => {
  const line = read().trend.find((t) => t.startsWith('Google Analytics:'));
  assert.match(line, /25 settembre con 41 utenti/);
  assert.match(line, /intorno ai 7 utenti al giorno/);
});

test('direct links to the home page are read as outreach, with an action', () => {
  const r = read();
  assert.match(titles(r.findings), /link aperti/);
  assert.match(titles(r.actions), /articolo preciso/);
});

test('search: what brings clicks, and what is one step from page one', () => {
  const r = read();
  const clicks = r.findings.find((f) => f.title.startsWith('I pezzi che portano click'));
  assert.match(clicks.body, /^black-flag-resynced-perk-vfx-toggle: 3 click/);
  const near = r.findings.find((f) => f.title.startsWith('A un passo'));
  assert.match(near.body, /blender-5-2-lts-what-changed/);
  assert.match(near.body, /fire-emblem-fortunes-weave-review/);
  assert.doesNotMatch(near.body, /blender-overgrown/); // 6.9 is already page one
});

test('round-up reviews are compared with the rest', () => {
  const f = read().findings.find((x) => x.title.startsWith('Le recensioni-rassegna'));
  assert.ok(f, 'expected the round-up comparison');
  assert.match(f.body, /11,8/); // fire emblem 11.9 over 7, beast 11 over 1
});

test('the stale review draft is the first action; four actions at most', () => {
  const r = read();
  assert.equal(r.actions[0].title, 'Approva o scarta le recensioni in bozza');
  assert.match(r.actions[0].body, /Ace Combat 8 review" aspetta dal 26 settembre/);
  assert.match(r.actions[1].body, /Warcraft 3/);
  assert.doesNotMatch(r.actions[1].body, /RTX Mega Geometry/); // two days old: not stale yet
  assert.ok(r.actions.length <= 4);
});

test('Bing with a click is left alone', () => {
  assert.doesNotMatch(titles(read().findings), /Bing/);
});

test('a window after the banner compares normally and keeps the standing note', () => {
  const d = september28();
  d.window = {
    current: { start: '2026-09-29', end: '2026-10-02' },
    previous: { start: '2026-09-25', end: '2026-09-28' },
  };
  d.ga.daily = [
    { key: '20260929', value: 8 },
    { key: '20260930', value: 9 },
    { key: '20261001', value: 7 },
    { key: '20261002', value: 10 },
  ];
  const r = insights(d, { today: new Date('2026-10-03T08:00:00Z') });
  assert.match(r.trend[0], /solo una parte dei visitatori/);
  const gaLine = r.trend.find((t) => t.startsWith('Google Analytics:'));
  assert.match(gaLine, /%/);
  assert.doesNotMatch(gaLine, /Quasi tutto viene da un giorno/);
});

test('missing sources do not break the reading', () => {
  const d = september28();
  d.ga = { ok: false, why: 'x' };
  d.sc = { ok: false, why: 'x' };
  d.bing = { ok: false, why: 'x' };
  const r = insights(d, { today: new Date('2026-09-29T08:00:00Z') });
  assert.equal(typeof r.headline, 'string');
  assert.ok(insightsText(r).length > 0);
});
