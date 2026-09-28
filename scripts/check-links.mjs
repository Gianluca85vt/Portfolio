/**
 * Checks every internal reference in the built site before it goes live.
 *
 *   npm run build && node scripts/check-links.mjs
 *
 * Reads the pages the build wrote to .vercel/output/static and follows every
 * href, src, poster, srcset and meta content that points at this site, plus
 * the image paths the home page's island carries as JSON. Each one has to be
 * a file in the build, a page, or an anchor on the page it links from.
 *
 * Article artwork is stripped from the deployment and served from jsDelivr
 * (vercel.json), so /img/blog/ only has to exist in public/. The server
 * routes (the API, /cms, /moderation) are listed, not checked.
 *
 * A published article that links to a draft is the usual catch: the draft is
 * not built, so the link is a 404 on the live site.
 *
 * Exits 1 when anything is broken, so it can gate a push.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(process.cwd(), '.vercel/output/static');
const PUBLIC = join(process.cwd(), 'public');
const SITE = 'https://www.gianlucascattarella.it';

if (!existsSync(ROOT)) {
  console.error(`No build at ${ROOT}: run npm run build first.`);
  process.exit(2);
}

const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})(ROOT);

const SERVER = (path) =>
  path.startsWith('/api/') || path === '/moderation' || path === '/cms' || path.startsWith('/cms/') || path === '/_vercel/insights/script.js';

function exists(url) {
  const path = decodeURIComponent(url.split('#')[0].split('?')[0]);
  if (path === '') return true;
  if (path.startsWith('/img/blog/')) return existsSync(join(PUBLIC, path));
  if (SERVER(path)) return 'server';
  const f = join(ROOT, path);
  if (existsSync(f) && statSync(f).isFile()) return true;
  if (existsSync(join(f, 'index.html'))) return true;
  return existsSync(f + '.html');
}

const idsOf = new Map();
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  idsOf.set(page, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const broken = new Map();
const anchors = new Set();
const server = new Set();
let refs = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const rel = '/' + page.slice(ROOT.length + 1).replace(/index\.html$/, '');
  const urls = [
    ...[...html.matchAll(/\s(?:href|src|poster)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\scontent="(\/[^"]+|https:\/\/www\.gianlucascattarella\.it\/[^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(' ')[0])),
  ];
  // Island props carry image paths as escaped JSON.
  for (const m of html.matchAll(/&quot;(\/img\/[^&]+?)&quot;/g)) urls.push(m[1]);

  for (let u of urls) {
    u = u.replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|data:|javascript:|#?$)/.test(u)) {
      if (!u.startsWith(`${SITE}/`)) continue;
      u = u.slice(SITE.length);
    }
    if (u.startsWith('#')) {
      refs++;
      if (!idsOf.get(page).has(u.slice(1))) anchors.add(`${rel} -> ${u}`);
      continue;
    }
    if (!u.startsWith('/')) continue;
    refs++;
    const ok = exists(u);
    if (ok === 'server') server.add(u.split('?')[0]);
    else if (!ok) broken.set(u, (broken.get(u) ?? new Set()).add(rel));
  }
}

console.log(`pages: ${pages.length}, internal references checked: ${refs}`);
console.log(`server routes referenced: ${[...server].join(', ') || 'none'}`);
console.log(`broken: ${broken.size}`);
for (const [u, from] of [...broken].slice(0, 30)) {
  console.log('  ', u, '<-', [...from].slice(0, 3).join(', '), from.size > 3 ? `(+${from.size - 3})` : '');
}
console.log(`missing anchors: ${anchors.size}`);
for (const k of [...anchors].slice(0, 20)) console.log('  ', k);

process.exit(broken.size || anchors.size ? 1 : 0);
