// Exercises the filter against the cases that matter: the ones it must let
// through, and the ones it must hold. Run with `node <this file>`.
import { readFileSync } from 'node:fs';

// The lib is TypeScript; strip the types rather than adding a build step for a
// test that only needs the logic.
const src = readFileSync('src/lib/moderation.ts', 'utf8')
  .replace(/export type Verdict[\s\S]*?matched: string \};/, '')
  .replace(/: Verdict/g, '')
  .replace(/export function screen\(body: string, authorName = ''\)/, 'export function screen(body, authorName = "")')
  .replace(/export const REASONS: Record<string, string>/, 'export const REASONS')
  .replace(/function normalise\(text: string\)/, 'function normalise(text)');

const { screen } = await import(
  'data:text/javascript;base64,' + Buffer.from(src).toString('base64')
);

const MUST_PASS = [
  ['plain praise', 'Great piece, the animation breakdown made it click for me.'],
  ['hard disagreement', 'I think this argument is completely wrong. DLSS 5 does save time.'],
  ['harsh about a company', 'EA made a stupid decision here and the cuts prove it.'],
  ['harsh in Italian', 'Secondo me questa analisi è sbagliata e la conclusione non regge.'],
  ['criticism of the work', 'The article is badly structured and the numbers are not sourced.'],
  ['friendly second person', 'Sei un grande, questo pezzo mi ha aiutato molto.'],
  ['technical words', 'The Scunthorpe test passed. Analysis of the class hierarchy.'],
  ['surname that contains a word', 'Ho parlato con Cazzaniga della pipeline.'],
  ['the word hack, technical', 'It is a clever hack for the shadow pass.'],
  ['company called incompetent', 'The publisher was incompetent and the port proves it.'],
  ['company called a grifter', 'Every one of these launchers is a grift by a fraud company.'],
];

const MUST_HOLD = [
  ['obscenity IT', 'Questo articolo è una cazzata assurda'],
  ['obscenity EN', 'This is fucking nonsense'],
  ['leetspeak', 'che c4zz0 stai dicendo'],
  ['stretched letters', 'ma vaffanculooooo'],
  ['personal attack IT', 'Sei un idiota e non capisci niente di 3D'],
  ['personal attack EN', "You're an idiot who has never shipped anything"],
  ['slur', 'typical retard take'],
  ['threat IT', 'ti ammazzo se scrivi ancora queste cose'],
  ['threat EN', 'I hope you fail and lose everything'],
  ['abuse in the name field', 'perfectly normal comment body', 'stronzo'],
  ['directed fraud', 'You are a fraud and everyone can see it'],
  ['directed incompetence IT', 'Sei un incompetente, questo pezzo lo dimostra'],
];

let bad = 0;

console.log('MUST PASS');
for (const [label, body, name] of MUST_PASS) {
  const v = screen(body, name ?? '');
  const ok = v.publish === true;
  if (!ok) bad += 1;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label}${ok ? '' : `  — held for ${v.reason}: "${v.matched}"`}`);
}

console.log('\nMUST HOLD');
for (const [label, body, name] of MUST_HOLD) {
  const v = screen(body, name ?? '');
  const ok = v.publish === false;
  if (!ok) bad += 1;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label}${ok ? `  — ${v.reason}` : '  — PUBLISHED'}`);
}

console.log(`\n${bad === 0 ? 'all cases correct' : bad + ' wrong'}`);
process.exit(bad === 0 ? 0 : 1);
