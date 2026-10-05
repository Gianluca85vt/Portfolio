import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isQuestion, scoreThread, shortlist, supportCategories, parseAtom, vocabulary } from './forum-watch.mjs';

const piece = { slug: 'p', url: 'u', title: 'Mari 8 hex tiling: three taps kill the repeat', text: '' };
const terms = vocabulary([piece]);
const now = Date.parse('2026-10-05T12:00:00Z');
const thread = (over) => ({ source: 'r/vfx', title: '', url: 'x', created: now - 3600000, replies: null, ...over });

test('questions and help requests count, showcases do not', () => {
  assert.ok(isQuestion('How do I bake normals?'));
  assert.ok(isQuestion('Materials appear black in render'));
  assert.ok(isQuestion('Need feedback on my environment'));
  assert.ok(!isQuestion('Cozy Bathroom'));
  assert.ok(!isQuestion('Lamborghini V12 Vision GT - Blender Car Animation + Breakdown'));
});

test('a specific tool counts and maps to the piece that covered it', () => {
  const r = scoreThread(thread({ title: 'Is hex tiling worth it in Mari?' }), terms, now);
  assert.ok(r.score > 0);
  assert.equal(r.article, piece);
});

test("a forum's own subject is not a match there", () => {
  assert.equal(scoreThread(thread({ title: 'Why is Blender slow?', home: 'blender' }), terms, now).score, 0);
  assert.ok(scoreThread(thread({ title: 'Why is Blender slow?', home: 'vfx' }), terms, now).score > 0);
});

test('one broad word is not enough outside a help section', () => {
  assert.equal(scoreThread(thread({ title: 'Why is my render dark?' }), terms, now).score, 0);
  assert.ok(scoreThread(thread({ title: 'Why is my render dark?', support: true }), terms, now).score > 0);
  assert.ok(scoreThread(thread({ title: 'Why are my materials black in render?' }), terms, now).score > 0);
});

test('only the last 36 hours, at most three per source', () => {
  const many = Array.from({ length: 5 }, (_, i) => thread({ title: `How do I use nanite ${i}?`, url: String(i) }));
  const old = thread({ title: 'How do I use nanite?', created: now - 40 * 3600000, source: 'r/old' });
  const list = shortlist([...many, old], terms, now);
  assert.equal(list.length, 3);
  assert.ok(list.every((t) => t.source === 'r/vfx'));
});

test('help sections and their children, never the website one', () => {
  const ids = supportCategories({
    categories: [
      { id: 9, name: 'Technical Support' },
      { id: 49, name: 'Technical Support', parent_category_id: 9 },
      { id: 29, name: 'Blender Artists Website Support', parent_category_id: 9 },
      { id: 5, name: 'General Forums' },
    ],
  });
  assert.deepEqual([...ids].sort(), [49, 9]);
});

test('Atom entries carry their own subreddit', () => {
  const xml = `<feed><entry><category term="blender" label="r/blender"/><title>How do I &amp; why?</title><link href="https://reddit.com/x" /><published>2026-10-05T10:00:00+00:00</published></entry></feed>`;
  const [t] = parseAtom(xml);
  assert.equal(t.source, 'r/blender');
  assert.equal(t.home, 'blender');
  assert.equal(t.title, 'How do I & why?');
});
