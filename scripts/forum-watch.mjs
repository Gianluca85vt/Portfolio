/**
 * Every morning: the questions asked in the last day and a half, on Reddit and
 * the artists' forums, about things the blog has already covered. Emailed to
 * Gianluca so the half hour he gives to answering goes where his answer counts.
 *
 *   node scripts/forum-watch.mjs            # build and email the list
 *   node scripts/forum-watch.mjs --print    # print it, send nothing
 *
 * It reads and lists. It never posts, votes or replies, and it never will:
 * those communities can tell an account run by a script, and a burnt account
 * does not come back. The growth plan of 5 October left this part to him on
 * purpose; the list only saves him the searching.
 *
 * Reddit's JSON refuses anonymous callers and its Atom feeds rate-limit a burst,
 * so every subreddit comes in one combined feed. The Discourse forums publish
 * /latest.json openly. Polycount sits behind a Cloudflare challenge and is left
 * out. A source that fails is named in the email and the rest still arrive.
 */
import { pathToFileURL } from 'node:url';
import { loadArticles, esc } from './lib/articles.mjs';
import { mailHim } from './lib/mail.mjs';

const UA = 'Backdrop-forum-list/1.0 (+https://www.gianlucascattarella.it)';
const SUBREDDITS = [
  'vfx', 'gamedev', 'blender', '3Dmodeling', 'unrealengine', 'TechnicalArtist',
  'Houdini', 'Substance3D', 'Maya', 'emulation',
];
const DISCOURSE = [
  { name: 'Blender Artists', base: 'https://blenderartists.org', home: 'blender' },
  { name: 'Unreal forums', base: 'https://forums.unrealengine.com', home: 'unreal' },
  { name: 'ZBrushCentral', base: 'https://www.zbrushcentral.com', home: 'zbrush' },
];
const WINDOW_HOURS = 36;
const MAX_ITEMS = 12;
const PER_SOURCE = 3;

/**
 * The subjects he can answer from experience, as they appear in a thread title.
 * A vocabulary pulled from article titles matched "Well", "House" and "Dragon"
 * to anything; tools and techniques are what someone asks for help with.
 * Specific names weigh more than broad craft words like "render" or "lighting".
 */
export const TOPICS = [
  'blender', 'geometry nodes', 'grease pencil', 'eevee', 'cycles', 'blender 5',
  'houdini', 'rbd', 'vellum', 'pyro', 'karma', 'nuke', 'mari', 'substance painter', 'substance designer',
  'zbrush', 'maya', '3ds max', 'cinema 4d', 'c4d', 'marvelous designer', 'tyflow', 'armorpaint', 'krita',
  'gimp', 'davinci resolve', 'unreal engine', 'ue5', 'unreal 5', 'nanite', 'lumen', 'megalights', 'unity',
  'godot', 'octane', 'redshift', 'gaussian splat', 'gaussian splatting', 'splats', 'photogrammetry',
  'texture tiling', 'tiling', 'hex tiling', 'trim sheet', 'trim sheets', 'normal map', 'normal maps', 'pbr',
  'retopology', 'retopo', 'baking', 'lod', 'lods', 'path tracing', 'ray tracing', 'raytracing', 'dlss', 'fsr',
  'pssr', 'upscaling', 'frame generation', 'rtx remix', 'emulator', 'emulation', 'rpcs3', 'shadps4',
  'decompilation', 'decomp', 'mcp', 'comfyui', 'environment art', 'environment artist', 'level art',
  'stylized', 'stylised', 'hair cards', 'pre-rendered', 'prerendered', 'compositing', 'colour chart',
  'color chart', 'matchmove', 'modular', 'kitbash', 'hdri', 'volumetric', 'volumetrics', 'displacement',
  'subsurface', 'shader nodes',
];

/** Craft words broad enough to need a second clue before they count for much. */
export const BROAD = [
  'lighting', 'render', 'rendering', 'material', 'materials', 'shader', 'shaders', 'texture', 'textures',
  'texturing', 'uv', 'uvs', 'unwrap', 'topology', 'noise', 'denoise', 'denoiser', 'fog', 'optimization',
  'optimisation', 'performance', 'draw calls', 'polycount',
];

/** The topic itself, as words, for matching inside a title. */
const pattern = (t) => new RegExp(`(^|[^a-z0-9])${t.replace(/[.+]/g, '\\$&')}([^a-z0-9]|$)`, 'i');

/**
 * Every topic, mapped to the blog's newest piece on it when there is a strong
 * one — the topic in its title, or five mentions in its text — and to null when
 * there is not. The list shows the piece as background reading, so a weak
 * match would send him to read the wrong thing.
 */
export function vocabulary(articles) {
  const terms = new Map();
  for (const t of [...TOPICS, ...BROAD]) {
    const re = pattern(t);
    const all = new RegExp(re.source, 'gi');
    // A broad word maps to no piece: "render" is in half the archive, and the
    // piece it found first would be the wrong background for the question.
    const piece = BROAD.includes(t)
      ? null
      : (articles.find((a) => re.test(a.title) || (a.text.match(all) ?? []).length >= 5) ?? null);
    terms.set(t, piece);
  }
  return terms;
}

/** Whether a thread is something a person can usefully answer. */
export function isQuestion(title) {
  return (
    /\?\s*$/.test(title) ||
    /^(how|why|what|which|is|are|can|does|do|should|any|anyone|help|need|where|when)\b/i.test(title.trim()) ||
    /\b(help|feedback|critique|advice|stuck|issue|problem|not working|went wrong|appears? black|artifacts?|flicker\w*|broken|crash\w*|error|can'?t|won'?t|doesn'?t|isn'?t)\b/i.test(title)
  );
}

/**
 * Scores a thread against the topics. Zero means it is not ours, or it is a
 * showcase rather than a question. A forum's own subject is not a match on that
 * forum: every post on Blender Artists is about Blender.
 */
export function scoreThread(thread, terms, now = Date.now()) {
  if (!(thread.support || isQuestion(thread.title))) return { score: 0, hits: [], article: null };
  const home = thread.home ?? '';
  const hits = [...terms.keys()].filter((t) => !(home && t.startsWith(home)) && pattern(t).test(thread.title));
  const specific = hits.filter((h) => !BROAD.includes(h));
  if (!specific.length && hits.length < 2 && !thread.support) return { score: 0, hits, article: null };
  if (!hits.length) return { score: 0, hits, article: null };
  const article = hits.map((h) => terms.get(h)).find(Boolean) ?? null;
  const age = (now - thread.created) / 3600000;
  let score = 2 + specific.length * 2 + (hits.length - specific.length) + (article ? 2 : 0);
  if (hits.some((h) => h.includes(' '))) score += 1;
  if (thread.replies != null && thread.replies <= 5) score += 1;
  if (age < 24) score += 1;
  return { score, hits, article };
}

function decode(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

/** Threads from a Reddit Atom feed, each labelled with its own subreddit. */
export function parseAtom(xml) {
  const out = [];
  for (const entry of xml.split('<entry>').slice(1)) {
    const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const href = entry.match(/<link href="([^"]+)"/)?.[1];
    const when = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? entry.match(/<updated>([^<]+)<\/updated>/)?.[1];
    const sub = entry.match(/<category term="([^"]+)"/)?.[1] ?? '';
    if (!title || !href || !when) continue;
    out.push({
      source: `r/${sub}`,
      home: sub.toLowerCase().replace(/^unrealengine$/, 'unreal').replace(/^substance3d$/, 'substance'),
      title: decode(title),
      url: href,
      created: Date.parse(when),
      replies: null,
    });
  }
  return out;
}

async function get(url, as) {
  const res = await fetch(url, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${res.status}`);
  return as === 'json' ? res.json() : res.text();
}

/**
 * A Discourse forum's help sections, children included: a thread posted there
 * is a request for help whatever its title says ("Materials appear black").
 */
export function supportCategories(site) {
  const cats = site?.categories ?? [];
  const ids = new Set(cats.filter((c) => /support|question|help/i.test(c.name) && !/website/i.test(c.name)).map((c) => c.id));
  for (const c of cats) if (c.parent_category_id && ids.has(c.parent_category_id) && !/website/i.test(c.name)) ids.add(c.id);
  return ids;
}

async function gather() {
  const threads = [];
  const failed = [];
  try {
    threads.push(...parseAtom(await get(`https://www.reddit.com/r/${SUBREDDITS.join('+')}/new/.rss?limit=100`, 'text')));
  } catch (e) {
    failed.push(`Reddit (${e.message})`);
  }
  for (const f of DISCOURSE) {
    try {
      const support = supportCategories(await get(`${f.base}/site.json`, 'json').catch(() => ({})));
      const json = await get(`${f.base}/latest.json?order=created`, 'json');
      for (const t of json.topic_list?.topics ?? []) {
        if (t.closed || t.archived || t.has_accepted_answer || t.pinned) continue;
        threads.push({
          source: f.name,
          home: f.home,
          title: t.title,
          url: `${f.base}/t/${t.slug}/${t.id}`,
          created: Date.parse(t.created_at),
          replies: t.reply_count ?? Math.max(0, (t.posts_count ?? 1) - 1),
          support: support.has(t.category_id),
        });
      }
    } catch (e) {
      failed.push(`${f.name} (${e.message})`);
    }
  }
  return { threads, failed };
}

/** The list for today: recent, ours, the best first, a few per source. */
export function shortlist(threads, terms, now = Date.now()) {
  const fresh = threads.filter((t) => now - t.created <= WINDOW_HOURS * 3600000);
  const scored = fresh
    .map((t) => ({ ...t, ...scoreThread(t, terms, now) }))
    .filter((t) => t.score > 0)
    .sort((a, b) => b.score - a.score || b.created - a.created);
  const per = {};
  const out = [];
  for (const t of scored) {
    if (out.length >= MAX_ITEMS) break;
    if ((per[t.source] ?? 0) >= PER_SOURCE) continue;
    per[t.source] = (per[t.source] ?? 0) + 1;
    out.push(t);
  }
  return out;
}

async function main() {
  const terms = vocabulary(await loadArticles());
  const { threads, failed } = await gather();
  const list = shortlist(threads, terms);
  console.log(`${threads.length} threads read, ${list.length} worth a look${failed.length ? `; failed: ${failed.join(', ')}` : ''}`);
  for (const t of list) console.log(`  [${t.score}] ${t.source}: ${t.title}  (${t.hits.join(', ')})${t.article ? ` ← ${t.article.title}` : ''}`);
  if (process.argv.includes('--print') || !list.length) return;

  const hours = (t) => Math.max(1, Math.round((Date.now() - t.created) / 3600000));
  const rows = list
    .map(
      (t) => `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;">
<div style="font-size:12px;color:#888;">${esc(t.source)} · ${hours(t)} h fa${t.replies != null ? ` · ${t.replies} risposte` : ''} · ${esc(t.hits.join(', '))}</div>
<div style="font-size:15px;margin:2px 0;"><a href="${esc(t.url)}">${esc(t.title)}</a></div>
${t.article ? `<div style="font-size:12px;color:#666;">Ne hai scritto in: <a href="${esc(t.article.url)}" style="color:#666;">${esc(t.article.title)}</a></div>` : ''}
</td></tr>`,
    )
    .join('');
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.45;color:#222;max-width:680px;">
<p>Domande delle ultime 36 ore su argomenti che il blog ha già coperto. Rispondi con quello che sai: è la risposta utile che fa cliccare sul profilo, non il link. Metti il link all'articolo solo se la domanda lo chiede davvero e il forum lo permette.</p>
<table style="width:100%;border-collapse:collapse;">${rows}</table>
${failed.length ? `<p style="color:#999;font-size:12px;">Non raggiunte oggi: ${esc(failed.join(', '))}.</p>` : ''}
</div>`;
  const text = list.map((t) => `${t.source}: ${t.title}\n${t.url}${t.article ? `\n(ne hai scritto: ${t.article.title})` : ''}`).join('\n\n');
  await mailHim({ subject: `Dove rispondere oggi: ${list.length} discussioni`, html, text });
  console.log('emailed');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
