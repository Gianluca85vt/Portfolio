/**
 * The past week's published pieces that name a tool or a game someone makes,
 * for the Friday outreach drafts (notes/outreach.md).
 *
 *   node scripts/outreach-candidates.mjs [days]
 *
 * Prints one block per piece: its address with the outreach tag, what it
 * covered, the maker when the release tracker knows it, and the line the piece
 * concluded with. The cloud job reads this instead of the archive, which is
 * over a hundred thousand tokens.
 */
import { loadArticles, romeDay, addDays } from './lib/articles.mjs';
import { tagged } from '../src/lib/utm.ts';
import { tracker } from '../src/data/tracker.ts';

const days = Number(process.argv[2] ?? 7);
const today = romeDay();
const from = addDays(today, -days);
const pieces = (await loadArticles()).filter((a) => a.date > from && a.date <= today && a.category !== 'Editorial');

for (const a of pieces) {
  const tool = tracker.find((r) => r.piece === `/blog/${a.slug}/`);
  console.log(
    [
      `## ${a.title}`,
      `date: ${a.date} · category: ${a.category}${a.score != null ? ` · review, final score ${a.score}/10` : ''}`,
      tool ? `tool: ${tool.tool} ${tool.version} by ${tool.maker}` : a.reviewOf ? `game: ${a.reviewOf}` : '',
      `link: ${tagged(a.url, 'outreach', 'email', a.slug)}`,
      `excerpt: ${a.excerpt}`,
      a.take ? `artist's view: ${a.take}` : '',
      a.verdict ? `verdict: ${a.verdict}` : '',
      '',
    ]
      .filter((l, i, all) => l !== '' || i === all.length - 1)
      .join('\n'),
  );
}
if (!pieces.length) console.log(`nothing published between ${from} and ${today}`);
