/**
 * The evening Reel caption, checked against real nights from the archive.
 *
 *   node scripts/reel-caption.test.mjs
 *
 * Needs Node 23.6 or later, which strips the TypeScript types on import. The
 * caption lives in src/lib because the site sends it; this only reads it.
 */
import { reelCaption, reelTags } from '../src/lib/reel-caption.ts';

let failed = 0;
const check = (name, ok, detail = '') => {
  if (ok) console.log(`PASS  ${name}`);
  else {
    console.error(`FAIL  ${name}${detail ? `\n        ${detail}` : ''}`);
    failed += 1;
  }
};

// 22 September, as drawn: a review among news pieces, oldest first.
const night = [
  { title: 'Undead Labs layoffs: what State of Decay 3 loses', category: 'Games' },
  { title: 'Studio Orange: 3D models bent to look hand-drawn', category: '3D' },
  { title: 'EA Sports FC 27 is a good football game with a hub problem', category: 'Games', review: true },
  { title: 'RAM prices: Acer says the peak is mid-2027', category: 'Tech' },
];
const caption = reelCaption(night);
const lines = caption.split('\n');

check('the review leads, as a sentence', lines[0] === 'EA Sports FC 27 is a good football game with a hub problem.', lines[0]);
check('the review is not listed twice', caption.split('EA Sports FC 27').length === 2);
check('the rest keep their order', caption.indexOf('Undead Labs') < caption.indexOf('Studio Orange') && caption.indexOf('Studio Orange') < caption.indexOf('RAM prices'));
check('counts in words', caption.includes('All four on the blog, link in bio.'));

const tags = lines.at(-1).split(' ');
check('never more than five hashtags', tags.length <= 5, lines.at(-1));
check('every tag is a hashtag', tags.every((t) => /^#[a-z0-9]+$/.test(t)), lines.at(-1));
check('a games night is tagged as one', tags[0] === '#gamedev' || tags[0] === '#gaming' || tags[0] === '#gameart', lines.at(-1));

// No review that night: the first piece leads.
const noReview = reelCaption(night.map(({ review, ...a }) => a));
check('without a review the first piece leads', noReview.startsWith('Undead Labs layoffs'));

// One article.
const single = reelCaption([{ title: 'Why the render farm quit?', category: '3D' }]);
check('one article: no "also" list', !single.includes('Also on Backdrop'));
check('a question mark is kept, not doubled', single.startsWith('Why the render farm quit?\n'), single.split('\n')[0]);

// Nine categories' worth of tags still caps at five.
const all = ['3D', 'Tech', 'AI', 'Games', 'Manga', 'Film & TV', 'Collecting'].map((category) => ({ title: 'x', category }));
check('a mixed night caps at five', reelTags(all).length === 5);

check('nothing in, nothing out', reelCaption([]) === '');

console.log(`\n--- sample ---\n${caption}\n`);
console.log(failed ? `${failed} failing` : 'all good');
process.exit(failed ? 1 : 0);
