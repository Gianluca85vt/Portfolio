/**
 * The two pieces of the daily carousel that decide whether it runs and whether
 * it remembers having run.
 *
 *   node scripts/social-digest.test.mjs
 *
 * Both are here because both failed in production on consecutive nights, and
 * both failed silently — the workflow reported success each time.
 */
import { isDue, recordCarousel } from './social-digest.mjs';

let failed = 0;

function check(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) console.log(`PASS  ${name}`);
  else {
    console.error(`FAIL  ${name}\n        expected ${JSON.stringify(want)}\n        got      ${JSON.stringify(got)}`);
    failed += 1;
  }
}

/* ---------------------------------------------------------------- isDue ---
 *
 * 2 September: the gate demanded the hour in Rome be exactly 19. GitHub started
 * the 17:00 and 18:00 slots at 19:38 and 20:33, so both runs saw 21:38 and
 * 22:33, skipped every step and reported success. Nothing posted.
 */

const empty = {};
const postedToday = { 'some-slug': { carouselAt: '2026-09-03' } };
const postedYesterday = { 'some-slug': { carouselAt: '2026-09-02' } };

check('18:00 Rome — too early', isDue(empty, new Date('2026-09-03T16:00:00Z')).due, false);
check('19:00 Rome — the slot opens', isDue(empty, new Date('2026-09-03T17:00:00Z')).due, true);
check('21:38 Rome — the delayed 17:00 slot', isDue(empty, new Date('2026-09-03T19:38:23Z')).due, true);
check('22:33 Rome — the delayed 18:00 slot', isDue(empty, new Date('2026-09-03T20:33:16Z')).due, true);
check('second run of the night stands down', isDue(postedToday, new Date('2026-09-03T20:33:16Z')).due, false);
check('yesterday does not count as today', isDue(postedYesterday, new Date('2026-09-03T17:00:00Z')).due, true);
check('00:30 Rome — waits for the evening', isDue(empty, new Date('2026-09-03T22:30:00Z')).due, false);
check('winter, 17:00 UTC is 18:00 Rome', isDue(empty, new Date('2026-12-03T17:00:00Z')).due, false);
check('winter, 18:00 UTC is 19:00 Rome', isDue(empty, new Date('2026-12-03T18:00:00Z')).due, true);
check('entries without a carousel are ignored', isDue({ a: { facebook: '1' }, b: null }, new Date('2026-09-03T17:00:00Z')).due, true);

/* -------------------------------------------------------- recordCarousel ---
 *
 * 3 September: the carousel posted and the ledger went back to disk unchanged,
 * because the code serialised the copy read before the post rather than the one
 * it had just updated. The commit step found nothing to commit, so the night
 * left no trace and the next run would have posted the same six again.
 */

const before = {
  'already-done': { facebook: 'fb1', carousel: 'old', carouselAt: '2026-09-02' },
  'went-out-tonight': { facebook: 'fb2', at: '2026-09-03T10:00:00Z' },
  'not-in-this-batch': { facebook: 'fb3' },
};
const batch = [{ slug: 'went-out-tonight' }];
const after = recordCarousel(before, batch, 'IG_123', '2026-09-03');

check('the posted article carries the id', after['went-out-tonight'].carousel, 'IG_123');
check('and the day it went out', after['went-out-tonight'].carouselAt, '2026-09-03');
check('its existing fields survive', after['went-out-tonight'].facebook, 'fb2');
check('an article outside the batch is untouched', after['not-in-this-batch'], { facebook: 'fb3' });
check('an older carousel is not overwritten', after['already-done'].carousel, 'old');

// The bug itself: the returned object must differ from the input. Serialising
// the wrong one produced a file identical to what was already there.
check(
  'the result differs from what was read',
  JSON.stringify(after) !== JSON.stringify(before),
  true
);

// And the input must not be mutated, so a caller cannot compare the two and be
// told they are the same.
check('the input is left alone', before['went-out-tonight'].carousel, undefined);

// A slug with no prior record still gets one.
check(
  'a slug absent from the ledger is added',
  recordCarousel({}, [{ slug: 'brand-new' }], 'IG_9', '2026-09-03')['brand-new'],
  { carousel: 'IG_9', carouselAt: '2026-09-03' }
);

process.exit(failed ? 1 : 0);
