/**
 * The scheduling rule for the daily carousel.
 *
 *   node scripts/social-digest.test.mjs
 *
 * Written after a night when nothing posted. The check demanded the hour in
 * Rome be exactly 19; GitHub started the runs at 19:38 and 20:33 UTC, so both
 * saw 21:38 and 22:33, skipped every step and reported success. These cases are
 * the ones that mattered, kept so the rule cannot quietly go back to assuming a
 * scheduler is punctual.
 */
import { isDue } from './social-digest.mjs';

let failed = 0;

function check(name, got, want) {
  if (got === want) {
    console.log(`PASS  ${name}`);
  } else {
    console.error(`FAIL  ${name}\n        expected ${want}, got ${got}`);
    failed += 1;
  }
}

const empty = {};
const postedToday = { 'some-slug': { carouselAt: '2026-09-03' } };
const postedYesterday = { 'some-slug': { carouselAt: '2026-09-02' } };

// September: Rome is UTC+2.
check('18:00 Rome — too early', isDue(empty, new Date('2026-09-03T16:00:00Z')).due, false);
check('19:00 Rome — the slot opens', isDue(empty, new Date('2026-09-03T17:00:00Z')).due, true);

// The two runs that failed. Both must now post.
check(
  '21:38 Rome — the delayed 17:00 slot',
  isDue(empty, new Date('2026-09-03T19:38:23Z')).due,
  true
);
check(
  '22:33 Rome — the delayed 18:00 slot',
  isDue(empty, new Date('2026-09-03T20:33:16Z')).due,
  true
);

// But only once. The second delayed run finds the first one's work.
check(
  'second run of the night stands down',
  isDue(postedToday, new Date('2026-09-03T20:33:16Z')).due,
  false
);
check(
  'yesterday does not count as today',
  isDue(postedYesterday, new Date('2026-09-03T17:00:00Z')).due,
  true
);

// Past midnight the hour reads against the new day, so it waits for evening
// rather than posting a digest at half past midnight.
check('00:30 Rome — waits for the evening', isDue(empty, new Date('2026-09-03T22:30:00Z')).due, false);

// December: Rome is UTC+1, so the slot that opens is the later cron.
check('winter, 17:00 UTC is 18:00 Rome', isDue(empty, new Date('2026-12-03T17:00:00Z')).due, false);
check('winter, 18:00 UTC is 19:00 Rome', isDue(empty, new Date('2026-12-03T18:00:00Z')).due, true);

// A record with no carouselAt must not throw or match.
check(
  'entries without a carousel are ignored',
  isDue({ a: { facebook: '1' }, b: null }, new Date('2026-09-03T17:00:00Z')).due,
  true
);

process.exit(failed ? 1 : 0);
