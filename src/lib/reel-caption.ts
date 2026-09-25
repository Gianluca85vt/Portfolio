import TAGS from '../data/social-tags.json' with { type: 'json' };

/**
 * The caption for the evening Reel, written for him to paste.
 *
 * The frames are posted by hand as a photo Reel, because only the app can put a
 * trending track under them, and until now the caption was his to write every
 * night. It is built here from the same articles the frames were drawn from.
 *
 * The opening line is the one Instagram shows before "more", so it carries a
 * real headline rather than a count: the review when there is one, since
 * reviews are what people search for, and otherwise the first piece of the day.
 *
 * Five hashtags at most. Instagram has refused more than five on a post or a
 * Reel since December 2025, so a sixth is not a bonus, it is a failed paste.
 */

export type ReelArticle = { title: string; category: string; review?: boolean };

const MAX_TAGS = 5;

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const inWords = (n: number) => WORDS[n] ?? String(n);

/** A headline ends without punctuation; a caption line reads better with it. */
function sentence(title: string) {
  return /[.!?…]$/.test(title) ? title : `${title}.`;
}

/**
 * The tags the most articles tonight share, so a night of four games pieces
 * and one 3D piece is tagged as a games night. Ties go to the order the tags
 * were first met, which starts with the lead article.
 */
export function reelTags(articles: ReelArticle[], tags: Record<string, string[]> = TAGS) {
  const score = new Map<string, number>();
  for (const a of articles) {
    for (const t of tags[a.category] ?? []) score.set(t, (score.get(t) ?? 0) + 1);
  }
  // Map keeps insertion order and sort is stable, so ties keep first-met order.
  return [...score.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_TAGS)
    .map(([t]) => t);
}

export function reelCaption(articles: ReelArticle[], tags: Record<string, string[]> = TAGS) {
  if (articles.length === 0) return '';

  const lead = articles.find((a) => a.review) ?? articles[0];
  const rest = articles.filter((a) => a !== lead);
  const ordered = [lead, ...rest];
  const hashtags = reelTags(ordered, tags).join(' ');

  if (rest.length === 0) {
    return [sentence(lead.title), '', 'On the blog now, link in bio.', '', hashtags].join('\n').trim();
  }

  return [
    sentence(lead.title),
    '',
    'Also on Backdrop today:',
    ...rest.map((a) => `· ${a.category} — ${a.title}`),
    '',
    `All ${inWords(articles.length)} on the blog, link in bio.`,
    '',
    hashtags,
  ]
    .join('\n')
    .trim();
}
