/**
 *   node --test scripts/social-kit.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSocialKit, subjectOf, findRelated } from '../src/lib/social-kit.ts';

test('a kit with both sections', () => {
  const kit = parseSocialKit(
    '## LinkedIn\n\nMari 8 moved hex tiling into the node graph.\n\nThree samples per pixel.\n\n## X\n\n1/ Mari 8 just killed the tiling repeat.\n\n2/ Here is how.\n\n3/ Full piece below.\n'
  );
  assert.equal(kit.linkedin, 'Mari 8 moved hex tiling into the node graph.\n\nThree samples per pixel.');
  assert.deepEqual(kit.x, ['1/ Mari 8 just killed the tiling repeat.', '2/ Here is how.', '3/ Full piece below.']);
});

test('the older LinkedIn-only file still reads as LinkedIn', () => {
  assert.deepEqual(parseSocialKit('Just a post.\r\nSecond line.'), { linkedin: 'Just a post.\nSecond line.' });
});

const index = [
  { slug: 'minecraft-dungeons-2-review-critics-split', title: 'Minecraft Dungeons II review: safe, and divisive', date: '2026-09-29T00:00:00.000Z' },
  { slug: 'blood-of-dawnwalker-review', title: 'Blood of Dawnwalker’s thirty-day clock splits the verdicts', date: '2026-08-31T00:00:00.000Z' },
  { slug: 'ai-in-a-3d-pipeline', title: 'AI in a 3D pipeline', date: '2026-09-20T00:00:00.000Z' },
];
const now = new Date('2026-10-05T12:00:00Z');

test('the Minecraft case: a second review of the same game is flagged', () => {
  const subject = subjectOf('Minecraft Dungeons II: better built, rough online', 'Minecraft Dungeons II');
  const hits = findRelated(subject, index, now);
  assert.deepEqual(hits.map((h) => h.slug), ['minecraft-dungeons-2-review-critics-split']);
});

test('apostrophes do not hide a match, and old pieces fall outside the window', () => {
  assert.equal(findRelated('Blood of Dawnwalker', index, now, 60).length, 1);
  assert.equal(findRelated('Blood of Dawnwalker', index, now, 20).length, 0);
});

test('a two-letter subject matches nothing', () => {
  assert.deepEqual(findRelated(subjectOf('AI: something new'), index, now), []);
});

test('the draft itself is never its own duplicate', () => {
  assert.deepEqual(findRelated('Minecraft Dungeons II', index, now, 60, 'minecraft-dungeons-2-review-critics-split'), []);
});
