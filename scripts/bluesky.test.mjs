/**
 *   node --test scripts/bluesky.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPost } from './bluesky.mjs';

test('headline, summary and clickable tags, inside 300', () => {
  const { text, facets } = buildPost({
    title: 'Mari 8 hex tiling: three taps kill the repeat',
    excerpt: 'Foundry moved hex tiling into the node graph. Three samples per pixel instead of one, and the seams that gave every tiled texture away are gone.',
    category: '3D',
  });
  assert.ok([...text].length <= 300);
  assert.ok(text.startsWith('Mari 8 hex tiling'));
  assert.ok(text.endsWith('#b3d #3dart'));
  // Each facet points at exactly its hashtag's bytes.
  const bytes = Buffer.from(text, 'utf8');
  assert.deepEqual(
    facets.map((f) => bytes.subarray(f.index.byteStart, f.index.byteEnd).toString('utf8')),
    ['#b3d', '#3dart']
  );
  assert.equal(facets[0].features[0].tag, 'b3d');
});

test('a long summary is clipped on a word, and accents do not shift the tags', () => {
  const { text, facets } = buildPost({
    title: "Chiikawa's 13-week break is a production buffer — è così",
    excerpt: 'word '.repeat(120),
    category: 'Manga',
  });
  assert.ok([...text].length <= 300);
  assert.ok(text.includes('…'));
  const bytes = Buffer.from(text, 'utf8');
  assert.equal(bytes.subarray(facets[0].index.byteStart, facets[0].index.byteEnd).toString('utf8'), '#anime');
});

test('no summary, no tags: just the headline', () => {
  const { text, facets } = buildPost({ title: 'A title', excerpt: '', category: 'Unknown' });
  assert.equal(text, 'A title');
  assert.deepEqual(facets, []);
});
