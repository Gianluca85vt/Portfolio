import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clip, judgement, pickIssue, subjects } from './newsletter-draft.mjs';
import { blenderScore, category, pickPiece, postBody } from './blendernation-kit.mjs';

const art = (over) => ({
  slug: 's',
  url: 'https://www.gianlucascattarella.it/blog/s/',
  title: 'T',
  date: '2026-10-01',
  category: 'Games',
  excerpt: 'An excerpt.',
  cover: '',
  take: '',
  verdict: '',
  score: null,
  reviewOf: '',
  sources: [],
  text: '',
  ...over,
});

test('clip ends on a sentence, or on a word with an ellipsis', () => {
  assert.equal(clip('Short.', 50), 'Short.');
  assert.equal(clip('One sentence here. Two sentence here that runs long.', 30), 'One sentence here.');
  assert.match(clip('word '.repeat(40), 30), /word…$/);
});

test('judgement prefers the verdict on a review, then the take, then the excerpt', () => {
  assert.match(judgement(art({ score: 8, verdict: 'Good game.' })), /Good game\. Final score 8\/10\./);
  assert.equal(judgement(art({ take: 'A craft reading.' })), 'A craft reading.');
  assert.equal(judgement(art()), 'An excerpt.');
});

test('the issue covers seven days, leads with the editorial, caps a category at two', () => {
  const articles = [
    art({ slug: 'ed', category: 'Editorial', date: '2026-10-05', title: 'The editorial' }),
    art({ slug: 'a', category: '3D', date: '2026-10-04', take: 'x' }),
    art({ slug: 'b', category: '3D', date: '2026-10-03', take: 'x' }),
    art({ slug: 'c', category: '3D', date: '2026-10-02', take: 'x' }),
    art({ slug: 'd', category: 'Games', date: '2026-10-01' }),
    art({ slug: 'old', category: '3D', date: '2026-09-20', take: 'x' }),
  ];
  const releases = [{ tool: 'Mari', version: '8', status: 'beta', changed: ['x'], piece: '/blog/a/' }];
  const issue = pickIssue(articles, releases, '2026-10-07');
  assert.equal(issue.lead.slug, 'ed');
  assert.deepEqual(
    issue.items.map((a) => a.slug),
    ['a', 'b', 'd'],
  );
  assert.equal(issue.tools.length, 1);
  assert.equal(subjects(issue)[0], 'The editorial');
});

test('a tool entry whose piece is outside the week is left out', () => {
  const articles = [art({ slug: 'a', date: '2026-09-01' }), art({ slug: 'b', date: '2026-10-06' })];
  const releases = [{ tool: 'X', version: '1', status: 'stable', changed: [], piece: '/blog/a/' }];
  assert.equal(pickIssue(articles, releases, '2026-10-07').tools.length, 0);
});

test('"cycles" alone does not make a piece about Blender', () => {
  assert.ok(blenderScore(art({ text: 'release cycles cycles cycles cycles cycles cycles' })) < 6);
  assert.ok(blenderScore(art({ title: 'Blender 5.3', text: 'Blender' })) >= 6);
});

test('the BlenderNation pick is last week, and none when nothing qualifies', () => {
  const list = [
    art({ slug: 'thin', date: '2026-10-05', text: 'blender' }),
    art({ slug: 'rich', date: '2026-10-02', title: 'Blender on Android', text: 'Blender blender geometry nodes' }),
    art({ slug: 'today', date: '2026-10-06', title: 'Blender today' }),
  ];
  assert.equal(pickPiece(list, '2026-10-06').slug, 'rich');
  assert.equal(pickPiece([art({ text: 'Unreal' })], '2026-10-06'), null);
});

test('categories follow the piece, and "short" as an adjective is not a film', () => {
  assert.equal(category(art({ title: 'Blender on Android', excerpt: 'Vulkan is required, short a denoiser.' })), 'Development');
  assert.equal(category(art({ title: "OVERGROWN's teaser", excerpt: 'Painterly shadows.' })), 'Art');
  assert.equal(category(art({ title: 'Stylised hair cards', excerpt: 'A technique for normals.' })), 'Education');
});

test('the body credits him and links with the tag', () => {
  const body = postBody(art({ excerpt: 'E.', take: 'T.' }), 'https://x/?utm_source=blendernation');
  assert.match(body, /^Gianluca Scattarella writes:/);
  assert.match(body, /> E\.\n>\n> T\./);
  assert.match(body, /utm_source=blendernation$/);
});

/* --- the weekly breakdown Reel ------------------------------------------ */

import * as reel from './weekly-reel.mjs';

const piece = (over) =>
  art({
    category: '3D',
    take: 'A reading.',
    works: ['Texturing: de-repeats at the paint stage.'],
    misses: ['Scope: hides the repeat, not the flatness.'],
    cover: '/img/blog/s/cover.jpg',
    ...over,
  });

test('a point splits into its area and its text, which starts with a capital', () => {
  assert.deepEqual(reel.splitPoint('Texturing: de-repeats.'), ['Texturing', 'de-repeats.']);
  assert.deepEqual(reel.splitPoint('No area here'), ['', 'No area here']);
  const frames = reel.plan(piece(), []);
  assert.equal(frames[2].heading, 'Texturing');
  assert.match(frames[2].body, /^De-repeats/);
});

test('the Reel piece needs works and misses, and 3D comes first', () => {
  const list = [
    piece({ slug: 'games', category: 'Games', date: '2026-10-09' }),
    piece({ slug: 'thin', date: '2026-10-09', misses: [] }),
    piece({ slug: 'three', date: '2026-10-05' }),
  ];
  const plenty = () => ['/a.jpg', '/b.jpg', '/c.jpg'];
  assert.equal(reel.pickPiece(list, '2026-10-10', plenty).slug, 'three');
  assert.equal(reel.pickPiece([piece({ date: '2026-09-01' })], '2026-10-10', plenty), null);
});

test('a piece with pictures beats a 3D piece with one video still', () => {
  // 10 October: RizomUV (3D, one still) was picked over Gears E-Day (3D, four shots).
  const list = [
    piece({ slug: 'rizomuv', date: '2026-10-09' }),
    piece({ slug: 'gears', date: '2026-10-04' }),
    piece({ slug: 'review', category: 'Games', date: '2026-10-08' }),
  ];
  const count = { rizomuv: 1, gears: 5, review: 4 };
  const pics = (a) => Array.from({ length: count[a.slug] }, (_, i) => `/${a.slug}-${i}.jpg`);
  assert.equal(reel.pickPiece(list, '2026-10-10', pics).slug, 'gears');
  // A week where nobody has enough takes the most pictures.
  const thin = { rizomuv: 1, gears: 2, review: 0 };
  assert.equal(reel.pickPiece(list, '2026-10-10', (a) => Array(thin[a.slug]).fill('/x.jpg')).slug, 'gears');
});

test('every frame has a picture, and a repeated one is framed differently', () => {
  const one = reel.plan(piece(), ['/only.jpg']);
  assert.ok(one.every((f) => f.image === '/only.jpg'));
  assert.deepEqual(one.slice(0, 3).map((f) => f.focus), ['attention', 'zoom', 'attention']);
  const two = reel.plan(piece(), ['/a.jpg', '/b.jpg']);
  assert.deepEqual(two.slice(0, 4).map((f) => `${f.image} ${f.focus}`), ['/a.jpg attention', '/b.jpg attention', '/a.jpg left', '/b.jpg left']);
  assert.ok(reel.plan(piece(), []).every((f) => f.image === ''));
});

test('the cover leads the pictures and drawn covers are left out', () => {
  assert.deepEqual(reel.picturesOf(piece({ slug: 's' }), ['shot-02.jpg', 'social.jpg', 'shot-01.jpg']), [
    '/img/blog/s/cover.jpg',
    '/img/blog/s/shot-01.jpg',
    '/img/blog/s/shot-02.jpg',
  ]);
  assert.deepEqual(reel.picturesOf(piece({ cover: '/img/blog/s/cover.svg' }), []), []);
});

test('a tool tag only when the piece names the tool, five at most', () => {
  const c4d = reel.reelTags(piece({ title: 'Cinema 4D 2026.4: an MCP server' }));
  assert.equal(c4d[0], '#cinema4d');
  assert.ok(!c4d.includes('#blender') && !c4d.includes('#unrealengine'));
  assert.ok(reel.reelTags(piece({ title: 'Blender on Android' })).includes('#blender'));
  assert.ok(reel.reelTags(piece({ title: 'Blender in Unreal with Houdini and Maya' })).length <= 5);
});

test('the reading is cut at a sentence, never mid-way', () => {
  const take = 'Twenty years ago Gears taught a generation what a normal map looked like. The same franchise is now the first to ship it, and the footage shows a team working without the arithmetic they have carried since 2006.';
  assert.equal(reel.sentences(take, 120), 'Twenty years ago Gears taught a generation what a normal map looked like.');
  assert.equal(reel.sentences(take, 400), take);
  assert.match(reel.sentences('One very long sentence without any stop at all that goes on and on', 30), /…$/);
});
