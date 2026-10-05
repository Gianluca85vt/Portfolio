/**
 * Tuesday morning: a BlenderNation submission, written and ready, emailed to
 * Gianluca. He submits it himself from his own account.
 *
 *   node scripts/blendernation-kit.mjs            # build and email it
 *   node scripts/blendernation-kit.mjs --print    # print it, send nothing
 *
 * BlenderNation is where the Blender crowd reads its news, and its form takes
 * community submissions: a title, a category, a clean image at 1456x672 with no
 * text on it, and a body. Commercial posts pay; an editorial piece does not.
 * Submissions are made by a logged-in person, so this prepares everything and
 * leaves the click to him.
 *
 * It picks the past week's piece that is most about Blender. A week with none
 * sends nothing: a forced pick is how a channel learns to ignore you.
 */
import { pathToFileURL } from 'node:url';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadArticles, romeDay, addDays, esc } from './lib/articles.mjs';
import { mailHim } from './lib/mail.mjs';
import { tagged } from '../src/lib/utm.ts';
import { clip } from './newsletter-draft.mjs';

const FORM = 'https://www.blendernation.com/submit-news/';

/**
 * How much a piece is about Blender. "Cycles" is left out on purpose: it is
 * also an ordinary English word, and a hardware piece about release cycles
 * scored as a Blender story until it was.
 */
export function blenderScore(article) {
  const named = (article.text.match(/\bblender\b/gi) ?? []).length;
  const features = (article.text.match(/geometry nodes|grease pencil|\beevee\b|blender studio/gi) ?? []).length;
  const inTitle = /\bblender\b/i.test(article.title) ? 10 : 0;
  return named + 2 * features + inTitle;
}

/** The piece for this week, or null. */
export function pickPiece(articles, today) {
  const from = addDays(today, -7);
  const week = articles
    .filter((a) => a.date >= from && a.date < today && a.category !== 'Editorial')
    .map((a) => ({ a, s: blenderScore(a) }))
    .filter(({ s }) => s >= 6)
    .sort((x, y) => y.s - x.s || y.a.date.localeCompare(x.a.date));
  return week[0]?.a ?? null;
}

/** BlenderNation's own categories, matched to what the piece is. */
export function category(a) {
  const t = `${a.title} ${a.excerpt}`;
  if (/\b(releas\w*|lts|beta|alpha|\d+\.\d+|ports?|ported|builds?|versions?|patch\w*|upstream|api|android|vulkan)\b/i.test(t))
    return 'Development';
  if (/\b(how to|tutorial|workflow|technique)\b/i.test(t)) return 'Education';
  if (/\b(short film|open movie|teaser|animated|film)\b/i.test(t)) return 'Art';
  return 'Community';
}

/** The submission body, in the "<name> writes:" form BlenderNation's posts use. */
export function postBody(a, link) {
  const lines = ['Gianluca Scattarella writes:', '', `> ${a.excerpt}`];
  if (a.take) lines.push('>', `> ${clip(a.take, 420)}`);
  lines.push('', `Read the full piece on Backdrop: ${link}`);
  return lines.join('\n');
}

/** The cover, cropped to the size the form asks for. Null if sharp or the file is missing. */
async function cropCover(a) {
  if (!a.cover || a.cover.endsWith('.svg')) return null;
  const file = join('public', a.cover);
  if (!existsSync(file)) return null;
  try {
    const { default: sharp } = await import('sharp');
    return await sharp(file).resize(1456, 672, { fit: 'cover', position: 'attention' }).jpeg({ quality: 88 }).toBuffer();
  } catch (e) {
    console.log(`no crop: ${e.message}`);
    return null;
  }
}

async function credit(a) {
  const dir = join('public', 'img/blog', a.slug, 'CREDIT.txt');
  try {
    return (await readFile(dir, 'utf8')).split('\n')[0].trim();
  } catch {
    return '';
  }
}

async function main() {
  const today = process.env.KIT_DAY || romeDay();
  const a = pickPiece(await loadArticles(), today);
  if (!a) {
    console.log('no Blender piece this week — nothing to submit');
    return;
  }
  const link = tagged(a.url, 'blendernation', 'referral', a.slug);
  const body = postBody(a, link);
  const cat = category(a);
  const who = await credit(a);
  const still = /video-thumb/.test(a.cover);
  const image = await cropCover(a);
  console.log(`${a.title}\n${cat}\n\n${body}\n\nimage: ${image ? 'cropped' : 'none'} ${who}`);
  if (process.argv.includes('--print')) return;

  const imageNote = !image
    ? "Nessuna immagine ritagliata: l'articolo non ha una copertina fotografica. Usa un'immagine stampa ufficiale."
    : still
      ? "L'immagine allegata è un fotogramma di un video YouTube: BlenderNation chiede immagini di cui hai i diritti, quindi se puoi usa un'immagine stampa ufficiale al suo posto."
      : `Immagine allegata, già a 1456x672 e senza scritte. Fonte: ${who || 'vedi la didascalia nell\'articolo'}.`;

  const field = (label, value, mono = false) =>
    `<p style="margin:14px 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#777;">${label}</p>
<div style="border:1px solid #ddd;border-radius:6px;padding:10px 12px;${mono ? 'white-space:pre-wrap;font-family:Consolas,monospace;font-size:13px;' : ''}">${esc(value)}</div>`;

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#222;max-width:680px;">
<p>La segnalazione di questa settimana per BlenderNation è pronta. Accedi con il tuo account e incolla i campi qui sotto nel <a href="${FORM}">modulo Submit News</a>.</p>
<p>È un pezzo editoriale, quindi non serve la quota per i post commerciali.</p>
${field('Post Title', a.title)}
${field('Post Category', cat)}
${field('Post Body', body, true)}
<p style="margin:14px 0 0;">${esc(imageNote)}</p>
<p style="margin:18px 0 0;color:#777;font-size:12px;">Articolo: <a href="${a.url}">${esc(a.url)}</a> — il link nel testo ha già il tag blendernation, così il report mostrerà le visite che porta.</p>
</div>`;

  await mailHim({
    subject: `BlenderNation: la segnalazione della settimana — ${a.title}`,
    html,
    text: `Post Title: ${a.title}\nPost Category: ${cat}\n\n${body}\n\n${imageNote}\n\nModulo: ${FORM}`,
    attachments: image ? [{ filename: `${a.slug}-blendernation.jpg`, content: image }] : [],
  });
  console.log('emailed');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
