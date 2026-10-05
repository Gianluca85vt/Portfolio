/**
 *   node --test scripts/merge-ledger.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeLedger } from './merge-ledger.mjs';

test("this run's post lands on top of main without undoing the story job", () => {
  // What this run read at checkout, plus the article it just posted.
  const ours = {
    old: { at: '2026-10-04T18:27:50Z', facebook: 'f1' },
    capcom: { at: '2026-10-05T08:02:00Z', facebook: 'f2', instagram: 'i2' },
  };
  // Main meanwhile: the evening story recorded `old`, another run posted `endgame`.
  const theirs = {
    old: { at: '2026-10-04T18:27:50Z', facebook: 'f1', story: 'frames-emailed', storyAt: '2026-10-04' },
    endgame: { at: '2026-10-05T08:01:48Z', facebook: 'f3', instagram: 'i3' },
  };
  const merged = mergeLedger(ours, theirs, ['capcom']);
  assert.deepEqual(merged.capcom, ours.capcom);
  assert.equal(merged.old.storyAt, '2026-10-04'); // not reverted to the stale copy
  assert.ok(merged.endgame); // not dropped
});

test('fields are merged per slug, and unknown slugs are ignored', () => {
  const merged = mergeLedger(
    { a: { facebook: 'f' } },
    { a: { at: 't', storyAt: 'd' } },
    ['a', 'missing']
  );
  assert.deepEqual(merged, { a: { at: 't', storyAt: 'd', facebook: 'f' } });
});
