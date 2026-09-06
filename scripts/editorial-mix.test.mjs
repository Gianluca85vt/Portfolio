/**
 * The quota, read as a run rather than as a percentage.
 *
 *   node scripts/editorial-mix.test.mjs
 *
 * The distinction is the whole point of the rule and is the thing worth
 * pinning down: on 6 September 2026 the archive held 3 manga articles, which a
 * lenient percentage over the whole year could almost defend, while the last
 * thirty-eight in a row contained none. The reader experiences the run.
 */
import { runSince, assess, report } from './editorial-mix.mjs';

let failed = 0;

function check(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) console.log(`PASS  ${name}`);
  else {
    console.error(`FAIL  ${name}\n        expected ${JSON.stringify(want)}\n        got      ${JSON.stringify(got)}`);
    failed += 1;
  }
}

/** Newest first, as publishedArticles returns them. `G` is a filler category. */
const feed = (...categories) =>
  categories.map((c, i) => ({ slug: `a${i}`, date: '2026-09-01', category: c === 'G' ? 'Games' : c }));

const row = (rows, category) => rows.find((r) => r.category === category);

/* --------------------------------------------------------------- runSince --- */

check('the newest article is the category', runSince(feed('Manga', 'G', 'G'), 'Manga'), 0);
check('two others in front of it', runSince(feed('G', 'G', 'Manga'), 'Manga'), 2);
check('never published at all counts the whole archive', runSince(feed('G', 'G'), 'Manga'), 2);
check('an empty archive owes nothing yet', runSince([], 'Manga'), 0);

/* ----------------------------------------------------------------- assess --- */

// One in six: five others may pass. The sixth has to be one, so the debt opens
// at a run of five, not six.
check('four others is still fine', row(assess(feed('G', 'G', 'G', 'G', 'Manga')), 'Manga').due, false);
check('five others and the next one is owed', row(assess(feed('G', 'G', 'G', 'G', 'G', 'Manga')), 'Manga').due, true);

// Film & TV asks for one in eight but must never be worse than one in ten, so
// it is owed earlier than it is broken.
const seven = feed('G', 'G', 'G', 'G', 'G', 'G', 'G', 'Film & TV');
check('seven others owes a film piece', row(assess(seven), 'Film & TV').due, true);
check('seven others has not broken the floor', row(assess(seven), 'Film & TV').breached, false);

const nine = feed('G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'Film & TV');
check('nine others breaks one in ten', row(assess(nine), 'Film & TV').breached, true);

/* ----------------------------------------------------------------- report --- */

// Both starved, and manga is the tighter quota, so it is named first even
// though film & TV has the longer raw run.
const starved = assess(feed(...Array(30).fill('G')));
check('the tightest quota is named first', starved[0].category, 'Manga');

const healthy = report(feed('Manga', 'Film & TV', 'G', 'G'));
check('a healthy mix asks for nothing', healthy.includes('Both quotas are being met'), true);
check('a starved mix gives an instruction', report(feed(...Array(30).fill('G'))).includes('Write Manga and anime next'), true);

console.log(failed ? `\n${failed} failing` : '\nall good');
process.exit(failed ? 1 : 0);
