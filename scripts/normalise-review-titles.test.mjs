/**
 * The one function that decides whether a review headline is spoiling its score.
 *
 *   node scripts/normalise-review-titles.test.mjs
 *
 * Every "must strip" case is a real title the generator produced; every "must
 * keep" case is either a hand-written title or a game name that carries a
 * number of its own. The second group is the whole risk — a stripper that eats
 * "NHL 27" is worse than none.
 */
import { cleanReviewTitle } from './normalise-review-titles.mjs';

let failed = 0;
const check = (name, got, want) => {
  if (got === want) console.log(`PASS  ${name}`);
  else {
    console.error(`FAIL  ${name}\n        want: ${want}\n        got:  ${got}`);
    failed += 1;
  }
};

/* ---------------------------------------------------------- must strip --- */

check('control', cleanReviewTitle('Control Resonant review: a 4-to-10 spread'), 'Control Resonant');
check('fire emblem', cleanReviewTitle("Fire Emblem Fortune's Weave review: 89, 7 to 10"), "Fire Emblem Fortune's Weave");
check('nhl (game number kept)', cleanReviewTitle('NHL 27 review: AI commentary and a 5-to-8 spread'), 'NHL 27');
check('resident evil', cleanReviewTitle('Resident Evil movie review: 98% fresh, 7.5 mean'), 'Resident Evil movie');
check('elden ring old form', cleanReviewTitle('Elden Ring Tarnished Edition review: a 9.5'), 'Elden Ring Tarnished Edition');
check('plural reviews with number', cleanReviewTitle('Mortal Shell II reviews: 8.5 across 15 outlets'), 'Mortal Shell II');

/* ----------------------------------------------------------- must keep --- */

// A verdict-in-words tail with no number is exactly what we want; leave it.
check('marvel tokon (no number)', cleanReviewTitle('Marvel Tokon reviews: great scores, bad launch'), 'Marvel Tokon reviews: great scores, bad launch');
// Hand-written titles: no "review:" tail, nothing to strip.
check('hand-written verdict', cleanReviewTitle('Elden Ring Tarnished Edition proves the doubters wrong'), 'Elden Ring Tarnished Edition proves the doubters wrong');
check('wolverine (word score, no digit)', cleanReviewTitle("Marvel's Wolverine: PlayStation Studios' lowest score yet"), "Marvel's Wolverine: PlayStation Studios' lowest score yet");
check('version number, no review tail', cleanReviewTitle('Valheim 1.0 ends five years of early access, near flawless'), 'Valheim 1.0 ends five years of early access, near flawless');
check('game number in a news title', cleanReviewTitle('NBA 2K27 nails the defence broadcast cameras barely show'), 'NBA 2K27 nails the defence broadcast cameras barely show');

console.log(failed ? `\n${failed} failing` : '\nall good');
process.exit(failed ? 1 : 0);
