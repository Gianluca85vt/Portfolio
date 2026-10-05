/**
 * Puts this run's entries back on top of the social ledger as it stands on main.
 *
 *   node scripts/merge-ledger.mjs <ours.json> <ledger.json> <slug> [slug...]
 *
 * notes/social-posted.json is written by two workflows: the feed poster, when
 * an article goes live, and the evening story, when it records the frames.
 * When both commit at once the rebase sees two edits a few lines apart in one
 * JSON file and can stop, which on 5 October left an article unposted. The
 * ledger is data, so the clash is settled as data: start from main's copy and
 * lay over it only the slugs this run actually posted, field by field, so a
 * `storyAt` the other job just wrote is kept.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export function mergeLedger(ours, theirs, slugs) {
  const out = { ...theirs };
  for (const slug of slugs) {
    if (!ours[slug]) continue;
    out[slug] = { ...(theirs[slug] ?? {}), ...ours[slug] };
  }
  return out;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const [oursPath, ledgerPath, ...slugs] = process.argv.slice(2);
  if (!oursPath || !ledgerPath || !slugs.length) {
    console.error('usage: merge-ledger.mjs <ours.json> <ledger.json> <slug> [slug...]');
    process.exit(2);
  }
  const ours = JSON.parse(await readFile(oursPath, 'utf8'));
  const theirs = JSON.parse(await readFile(ledgerPath, 'utf8'));
  await writeFile(ledgerPath, `${JSON.stringify(mergeLedger(ours, theirs, slugs), null, 2)}\n`);
  console.log(`ledger merged for: ${slugs.join(' ')}`);
}
