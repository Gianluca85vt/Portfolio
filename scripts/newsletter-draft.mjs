/**
 * Wednesday evening: the draft of Thursday's newsletter, emailed to Gianluca.
 *
 *   node scripts/newsletter-draft.mjs            # build and email it
 *   node scripts/newsletter-draft.mjs --print    # write it to newsletter-draft.html, send nothing
 *
 * The growth plan of 5 October put the newsletter at the centre: the one
 * audience the blog owns rather than rents from a feed. beehiiv's free plan has
 * no API for creating posts (that is Max and Enterprise only), so the draft
 * arrives as an email laid out to survive being pasted into beehiiv's editor.
 *
 * The week's pieces, each with the judgement the article already made, and the
 * tools that moved are assembled here. The opening and the long piece are left
 * as marked gaps: they are the reason anyone subscribes, and only he can write
 * them. Nothing is sent to subscribers from here, ever.
 */
import { pathToFileURL } from 'node:url';
import { writeFile } from 'node:fs/promises';
import { loadArticles, romeDay, addDays, esc, SITE } from './lib/articles.mjs';
import { mailHim } from './lib/mail.mjs';
import { subscriberCount } from './lib/beehiiv.mjs';
import { tagged } from '../src/lib/utm.ts';
import { tracker } from '../src/data/tracker.ts';

/** How much a category speaks to the people the list is for: working artists. */
const WEIGHT = { '3D': 4, Tech: 3, AI: 3, Games: 2, 'Film & TV': 2, Manga: 2, Collecting: 1 };
const MAX_ITEMS = 6;
const PER_CATEGORY = 2;

/** Cuts text at a sentence end near `max` characters, never mid-word. */
export function clip(text, max = 300) {
  const t = String(text).trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
  if (stop > max * 0.5) return cut.slice(0, stop + 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/** The line under each title: what the piece concluded, not what it covered. */
export function judgement(a) {
  if (a.score != null && a.verdict) return `${clip(a.verdict, 260)} Final score ${a.score}/10.`;
  if (a.take) return clip(a.take, 300);
  return clip(a.excerpt, 220);
}

/**
 * What goes in this week's issue: the seven days up to and including `today`.
 * The Monday editorial leads when there is one; after it the pieces with a
 * craft reading come first, weighted toward the tools the list is about, two
 * per category at most so one busy beat cannot fill the issue.
 */
export function pickIssue(articles, releases, today) {
  const from = addDays(today, -6);
  const week = articles.filter((a) => a.date >= from && a.date <= today);
  const lead = week.find((a) => a.category === 'Editorial') ?? null;
  const rest = week
    .filter((a) => a !== lead)
    .map((a) => ({ a, rank: (WEIGHT[a.category] ?? 1) + (a.take ? 2 : 0) + (a.score != null ? 1 : 0) }))
    .sort((x, y) => y.rank - x.rank || y.a.date.localeCompare(x.a.date));
  const items = [];
  const perCat = {};
  for (const { a } of rest) {
    if (items.length >= MAX_ITEMS - (lead ? 1 : 0)) break;
    if ((perCat[a.category] ?? 0) >= PER_CATEGORY) continue;
    perCat[a.category] = (perCat[a.category] ?? 0) + 1;
    items.push(a);
  }
  const live = new Set(articles.map((a) => `/blog/${a.slug}/`));
  const weekPieces = new Set(week.map((a) => `/blog/${a.slug}/`));
  const tools = releases.filter((r) => live.has(r.piece) && weekPieces.has(r.piece));
  return { from, to: today, lead, items, tools };
}

/** Subject lines to choose from, strongest first. */
export function subjects(issue) {
  const out = [];
  if (issue.lead) out.push(issue.lead.title);
  const tool = issue.tools[0];
  const review = issue.items.find((a) => a.score != null);
  const first = issue.items[0];
  if (tool && review) out.push(`${tool.tool} ${tool.version}, ${review.reviewOf || review.title} and what else moved`);
  else if (tool) out.push(`${tool.tool} ${tool.version}: what changed, and the rest of the week`);
  if (first) out.push(first.title);
  return [...new Set(out)].slice(0, 3);
}

const GAP =
  'background:#FFF4C2;border:1px dashed #B88A00;padding:14px 16px;margin:18px 0;font-family:Arial,sans-serif;font-size:14px;color:#5A4500;';

function itemHtml(a, campaign, kicker) {
  const href = tagged(a.url, 'newsletter', 'email', campaign);
  return `<p style="margin:22px 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#B600A8;">${esc(kicker)}</p>
<h3 style="margin:0 0 6px;font-size:19px;"><a href="${esc(href)}">${esc(a.title)}</a></h3>
<p style="margin:0;">${esc(judgement(a))}</p>`;
}

/** The issue itself, in English, plus his instructions above it in Italian. */
export function renderIssue(issue, { subscribers = null } = {}) {
  const campaign = `issue-${issue.to}`;
  const subs = subjects(issue);
  const preview = clip((issue.lead ?? issue.items[0])?.excerpt ?? '', 140);
  const tracked = tagged(`${SITE}/tracker/`, 'newsletter', 'email', campaign);

  const notes = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#222;border:1px solid #ccc;border-radius:8px;padding:16px 18px;margin-bottom:28px;">
<p style="margin:0 0 8px;"><strong>Bozza della newsletter di giovedì</strong> — pezzi pubblicati dal ${esc(issue.from)} al ${esc(issue.to)}.${
    subscribers == null ? '' : ` Iscritti attivi oggi: <strong>${subscribers}</strong>.`
  }</p>
<ol style="margin:0 0 10px 18px;padding:0;">
<li>In beehiiv: <em>Start writing</em>, poi copia tutto quello che sta <strong>sotto la linea</strong> e incollalo nell'editor.</li>
<li>Scrivi l'apertura e il pezzo lungo nei due riquadri gialli, poi cancella i riquadri.</li>
<li>Programma l'invio per giovedì mattina. Non parte niente da solo.</li>
</ol>
<p style="margin:0 0 4px;"><strong>Oggetto</strong>, a scelta:</p>
<ul style="margin:0 0 8px 18px;padding:0;">${subs.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
<p style="margin:0;"><strong>Anteprima</strong> (preview text): ${esc(preview)}</p>
</div>
<hr style="border:0;border-top:2px solid #B600A8;margin:0 0 28px;" />`;

  const suggestion = issue.lead
    ? `l'argomento dell'editoriale, "${issue.lead.title}", raccontato come lo diresti a un collega`
    : issue.items[0]
      ? `quello che ti ha colpito di più in "${issue.items[0].title}", oltre a ciò che dice l'articolo`
      : 'una cosa che hai visto o fatto al lavoro questa settimana';

  const body = `<div style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#111;">
<div style="${GAP}"><strong>Apertura — scrivila tu.</strong> Due o tre righe in prima persona: cosa è successo questa settimana e perché vale la pena leggere fino in fondo.</div>
<div style="${GAP}"><strong>Il pezzo lungo — 400-700 parole, solo tuo.</strong> È il motivo per cui la gente resta iscritta: un ragionamento che sul blog non c'è. Uno spunto: ${esc(suggestion)}.</div>
${issue.lead ? `<h2 style="font-size:22px;margin:30px 0 0;">The Monday editorial</h2>\n${itemHtml(issue.lead, campaign, 'Architectures of the Void')}` : ''}
<h2 style="font-size:22px;margin:30px 0 0;">This week on Backdrop</h2>
${issue.items.map((a) => itemHtml(a, campaign, a.score != null ? `${a.category} · review` : a.category)).join('\n')}
${
  issue.tools.length
    ? `<h2 style="font-size:22px;margin:34px 0 8px;">Tools that moved</h2>
<ul style="margin:0 0 0 18px;padding:0;">${issue.tools
        .map(
          (r) =>
            `<li style="margin:0 0 8px;"><strong>${esc(r.tool)} ${esc(r.version)}</strong>${r.status === 'beta' ? ' (beta)' : ''}: ${esc(clip(r.changed[0] ?? '', 200))}</li>`,
        )
        .join('')}</ul>
<p style="margin:8px 0 0;">Every tool's latest version, what changed and what to watch for: <a href="${esc(tracked)}">the release tracker</a>.</p>`
    : ''
}
<p style="margin:34px 0 0;font-size:14px;color:#555;">Backdrop is written by Gianluca Scattarella, a 3D environment and technical artist. If someone you work with would get something out of this, forward it to them.</p>
</div>`;

  const text = [
    `Bozza newsletter ${issue.from} → ${issue.to}`,
    `Oggetto: ${subs.join(' | ')}`,
    `Anteprima: ${preview}`,
    '',
    '[APERTURA — scrivila tu]',
    '[PEZZO LUNGO — 400-700 parole]',
    '',
    ...(issue.lead ? [`EDITORIAL: ${issue.lead.title}`, judgement(issue.lead), tagged(issue.lead.url, 'newsletter', 'email', campaign), ''] : []),
    ...issue.items.flatMap((a) => [`${a.category.toUpperCase()}: ${a.title}`, judgement(a), tagged(a.url, 'newsletter', 'email', campaign), '']),
    ...(issue.tools.length ? ['TOOLS THAT MOVED', ...issue.tools.map((r) => `${r.tool} ${r.version}: ${r.changed[0] ?? ''}`), tracked] : []),
  ].join('\n');

  return { html: notes + body, text, count: issue.items.length + (issue.lead ? 1 : 0) };
}

async function main() {
  const today = process.env.ISSUE_DAY || romeDay();
  const articles = await loadArticles();
  const issue = pickIssue(articles, tracker, today);
  const n = issue.items.length + (issue.lead ? 1 : 0);
  console.log(`issue ${issue.from} → ${issue.to}: ${n} piece(s), ${issue.tools.length} tool(s)`);
  for (const a of [issue.lead, ...issue.items].filter(Boolean)) console.log(`  ${a.category.padEnd(9)} ${a.title}`);
  if (!n) {
    console.log('nothing published this week — no draft');
    return;
  }
  const subscribers = await subscriberCount();
  const { html, text } = renderIssue(issue, { subscribers });
  if (process.argv.includes('--print')) {
    await writeFile('newsletter-draft.html', `<!doctype html><meta charset="utf-8">${html}`);
    console.log('written to newsletter-draft.html');
    return;
  }
  await mailHim({ subject: `Newsletter di giovedì: la bozza (${n} pezzi)`, html, text });
  console.log('emailed');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
