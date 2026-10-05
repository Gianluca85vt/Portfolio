/**
 *   node --test scripts/strip-placeholders.test.mjs
 *
 * The cases are the real paragraphs that reached the site on 28 September and
 * 5 October.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { stripPlaceholders } from './strip-placeholders.mjs';

const before =
  'There is no\nversion of a generative engine that runs on nothing.\n\n' +
  '[[ANEDDOTO: a short memory of working inside an in-house or proprietary tool — the particular trust you place in something that only ever does exactly what you asked]]\n\n' +
  '## Ten years, corrupted\n';

test('the placeholder paragraph goes, and the prose closes up around it', () => {
  const { text, found } = stripPlaceholders(before);
  assert.equal(found, 1);
  assert.equal(text, 'There is no\nversion of a generative engine that runs on nothing.\n\n## Ten years, corrupted\n');
});

test('line endings are kept as they were', () => {
  const { text } = stripPlaceholders(before.replace(/\n/g, '\r\n'));
  assert.ok(text.includes('\r\n## Ten years'));
  assert.ok(!/[^\r]\n/.test(text));
});

test('brackets inside a sentence are not a placeholder', () => {
  const s = 'The wiki writes links as [[Page]] in the middle of a sentence.\n';
  assert.deepEqual(stripPlaceholders(s), { text: s, found: 0 });
});

test('two in one piece both go', () => {
  const s =
    'A.\n\n[[ANEDDOTO: a job where the final result looked like nothing.]]\n\nB.\n\n' +
    '[[ANEDDOTO: a credit that was wrong, late, missing.]]\n\n## Next\n';
  const { text, found } = stripPlaceholders(s);
  assert.equal(found, 2);
  assert.equal(text, 'A.\n\nB.\n\n## Next\n');
});
