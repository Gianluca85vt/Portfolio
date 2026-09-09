/**
 * Finds broadcasts announced in the harvest, so a preview gets written before
 * the show rather than a round-up after it.
 *
 *   node scripts/event-watch.mjs
 *
 * notes/event-coverage.md says every dated showcase gets two articles, a
 * preview and a round-up. It was written on 8 September after the Zelda
 * anniversary Direct went by with only a round-up. On 9 September the next
 * Direct went by the same way, and the preview was again written by hand, ten
 * minutes before air.
 *
 * A rule nobody is looking for is a rule that does not fire. The feeds carry
 * these announcements days ahead — "Nintendo Direct: here's where to watch
 * today's big presentation" was sitting in games.md this morning — so the
 * material was there both times and nothing was reading it for this.
 *
 * This does not try to parse a date out of a headline. It flags the headlines
 * that smell like a scheduled broadcast and lets whoever is writing decide,
 * which is the part a regular expression is bad at and a reader is good at.
 */
import { readdir, readFile } from 'node:fs/promises';

/** Named shows, plus the words a scheduled broadcast is announced with. */
const SHOWS = [
  'nintendo direct', 'state of play', 'xbox games showcase', 'developer direct',
  'game awards', 'opening night live', 'gamescom', 'summer game fest',
  'tokyo game show', 'ubisoft forward', 'pc gaming show', 'future games show',
  'indie world', 'partner showcase', 'treehouse', 'playstation showcase',
  'capcom highlights', 'annecy', 'siggraph',
];

/** A show already over is a round-up, not a preview. These say it has aired. */
const PAST = [
  'everything announced', 'live report', 'round-up', 'roundup', 'recap',
  'everything revealed', 'all the announcements', 'here is everything',
  "here's everything", 'reaction', 'biggest announcements',
];

/** These say it has not. */
const FUTURE = [
  'how to watch', 'where to watch', 'what to expect', 'start time', 'time, date',
  'announced for', 'confirmed for', 'will be held', 'set for', 'airs',
  'countdown', 'when is', 'what time',
];

const has = (text, list) => list.some((w) => text.includes(w));

export function scan(items) {
  const out = [];
  for (const item of items) {
    const title = item.title.toLowerCase();
    if (!has(title, SHOWS)) continue;
    // A headline that reads as coverage of a finished show tells us nothing we
    // can still act on, and there are far more of those than of announcements.
    if (has(title, PAST) && !has(title, FUTURE)) continue;
    out.push({ ...item, upcoming: has(title, FUTURE) });
  }
  // Announcements first: those are the ones with a preview still to write.
  out.sort((a, b) => Number(b.upcoming) - Number(a.upcoming));
  return out;
}

export async function itemsFromFeeds(root = process.cwd()) {
  const dir = `${root}/notes/feeds`;
  const items = [];
  for (const file of (await readdir(dir)).filter((f) => f !== 'README.md')) {
    const text = (await readFile(`${dir}/${file}`, 'utf8')).replace(/\r\n?/g, '\n');
    let outlet = null;
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const o = lines[i].match(/^## (.+)$/);
      if (o) {
        outlet = o[1].trim();
        continue;
      }
      const t = lines[i].match(/^### (.+)$/);
      if (t && outlet) {
        const meta = lines[i + 1] ?? '';
        items.push({ outlet, title: t[1].trim(), link: (meta.match(/https?:\S+/) ?? [''])[0] });
      }
    }
  }
  return items;
}

/** The block the harvest puts at the top of notes/feeds/README.md. */
export function report(found) {
  if (!found.length) return '';

  const upcoming = found.filter((f) => f.upcoming);
  let out = '## Broadcasts in the feeds\n\n';

  if (upcoming.length) {
    out += `**A preview is owed on ${upcoming.length === 1 ? 'this' : 'these'}.** `;
    out += 'Write it before the show airs, with the start time in Italian time and the\n';
    out += 'stream embedded, then the round-up an hour after it ends. See\n';
    out += 'notes/event-coverage.md.\n\n';
    for (const f of upcoming.slice(0, 6)) out += `- **${f.outlet}** — ${f.title}\n  ${f.link}\n`;
    out += '\n';
  }

  const aired = found.filter((f) => !f.upcoming);
  if (aired.length) {
    out += 'Already aired, so a round-up rather than a preview:\n\n';
    for (const f of aired.slice(0, 4)) out += `- ${f.outlet} — ${f.title}\n`;
    out += '\n';
  }

  return out;
}

if (import.meta.url === (await import('node:url')).pathToFileURL(process.argv[1] ?? '').href) {
  const found = scan(await itemsFromFeeds());
  console.log(found.length ? report(found) : 'No broadcasts mentioned in the current harvest.');
}
