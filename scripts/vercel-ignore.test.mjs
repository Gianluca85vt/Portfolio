/**
 * Whether a push earns a deployment.
 *
 *   node scripts/vercel-ignore.test.mjs
 *
 * Every case below is a real commit out of this repository's history rather
 * than a fixture, because the rule is only worth anything if it agrees with
 * what actually happened. Deployment storage filled up on 6 September 2026 and
 * the cause was three deployments per article published before a word of it was
 * public: the draft, its placeholder cover, and the screenshots fetched for it.
 *
 * A wrong skip is the expensive failure — the site silently stops matching the
 * repository — so the cases that must BUILD are the ones that matter here.
 */
import { decide } from './vercel-ignore.mjs';

let failed = 0;

function check(name, got, want) {
  if (got === want) console.log(`PASS  ${name}`);
  else {
    console.error(`FAIL  ${name}\n        expected ${want ? 'build' : 'skip'}, got ${got ? 'build' : 'skip'}`);
    failed += 1;
  }
}

/** decide() against a single commit and its parent. */
const at = (sha) => decide(`${sha}^`, sha).build;

/* ------------------------------------------------------- must not build --- */

check('a draft arriving with its placeholder cover', at('652d362'), false);
check('screenshots fetched for a piece still in draft', at('36aabfb'), false);
check('a feed harvest', at('cfddc99'), false);
check('the social ledger', at('32ef392'), false);
check('cards drawn for Instagram', at('0a98bdb'), false);

/* ----------------------------------------------------------- must build --- */

check('the moment draft: true comes off', at('cdecab5'), true);
check('a change to the site itself', at('2b27c82'), true);

// These look like Instagram artwork and are not. The evening email links them
// as /img/blog/digest/<day>-story-NN.jpg, so a skip here mails five 404s.
check('the evening story frames', at('1fd8e0e'), true);

// Nineteen published articles point at folders never named after a slug —
// covers/, editorial/, marvel-tokon/. "No article by this name" cannot mean
// "invisible", or their artwork would stop deploying.
check('artwork in a shared folder', at('92b14ab'), true);

/* --------------------------------------------------- the multi-commit push --
 *
 * The reason this compares against VERCEL_GIT_PREVIOUS_SHA and not HEAD^.
 *
 * These three landed together: an article went live, then two bookkeeping
 * commits followed it. Judged against its own parent the tip is a ledger write
 * and nothing more, and skipping it would leave the article written, committed,
 * and absent from the site. Judged against the last commit that actually
 * deployed, the publication is inside the span.
 */

check('the tip alone reads as bookkeeping', decide('0a98bdb', '32ef392').build, false);
check('the span since the last deploy carries the publication', decide('36aabfb', '32ef392').build, true);

console.log(failed ? `\n${failed} failing` : '\nall good');
process.exit(failed ? 1 : 0);
