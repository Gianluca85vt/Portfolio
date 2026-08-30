/**
 * Measures every built page against the things Google actually reads.
 *
 *   npm run build && node scripts/seo-audit.mjs
 *   node scripts/seo-audit.mjs --json      machine-readable, for diffing runs
 *
 * This reads dist/client rather than the source, so what it reports is what
 * ships: titles after the layout has composed them, descriptions after any
 * fallback has kicked in, links after the markdown was rendered.
 *
 * There is no check here for a keywords meta tag. Google stopped reading it in
 * 2009 and says so publicly; adding one is a way to tell competitors what you
 * are targeting and nothing else.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = 'dist/client';
const SITE = 'https://www.gianlucascattarella.it';

// Google truncates around these, measured in pixels but near enough in
// characters for a Latin script at the weights it renders results in.
const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 160;
const THIN_WORDS = 300;

const tag = (html, re) => (html.match(re) ?? [])[1]?.trim();

/**
 * Reads a meta attribute in two steps: isolate the element, then read the
 * attribute out of it with the closing quote matched to the opening one.
 *
 * Worth the two steps. A single pattern with `([^"']*)` truncates at the first
 * apostrophe inside a double-quoted value — which an English sentence reaches
 * almost immediately — and reported this site's descriptions as three and ten
 * characters long, which sent me hunting a bug in the site rather than in the
 * ruler.
 */
const attr = (html, name, value, want) => {
  const el = html.match(new RegExp(`<meta\\b[^>]*\\b${name}=["']${value}["'][^>]*>`, 'i'))?.[0];
  if (!el) return undefined;
  return el.match(new RegExp(`\\b${want}=(["'])([\\s\\S]*?)\\1`, 'i'))?.[2]?.trim();
};

async function pages(dir = ROOT, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await pages(full, out);
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

function analyse(html, url) {
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const text = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  const images = [...body.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const decorative = images.filter((i) => /aria-hidden=["']true["']/.test(i));
  const missingAlt = images.filter((i) => !/\balt=/.test(i) && !/aria-hidden=["']true["']/.test(i));

  const links = [...body.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const internal = links.filter((h) => h.startsWith('/') || h.startsWith(SITE));

  const h1 = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').trim()
  );

  const jsonLd = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
  const types = jsonLd.flatMap((m) => {
    try {
      const d = JSON.parse(m[1]);
      return [].concat(d['@type'] ?? []);
    } catch {
      return ['UNPARSEABLE'];
    }
  });

  return {
    url,
    title: tag(html, /<title>([\s\S]*?)<\/title>/i) ?? '',
    description: attr(html, 'name', 'description', 'content') ?? '',
    canonical: tag(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ?? '',
    noindex: /name=["']robots["'][^>]*noindex/i.test(html),
    h1Count: h1.length,
    h1: h1[0] ?? '',
    h2Count: (body.match(/<h2\b/gi) ?? []).length,
    words: text.split(' ').filter(Boolean).length,
    images: images.length,
    decorative: decorative.length,
    missingAlt: missingAlt.length,
    internalLinks: internal.length,
    schema: [...new Set(types)],
    ogImage: attr(html, 'property', 'og:image', 'content') ?? '',
  };
}

const audit = [];
for (const file of await pages()) {
  const url = '/' + relative(ROOT, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  audit.push(analyse(await readFile(file, 'utf8'), url === '//' ? '/' : url));
}
audit.sort((a, b) => a.url.localeCompare(b.url));

/* Which pages does the site itself point at, and how often. A page nothing
   links to is a page Google reaches only through the sitemap, and treats
   accordingly. */
const inbound = new Map(audit.map((p) => [p.url, 0]));
for (const file of await pages()) {
  const html = await readFile(file, 'utf8');
  const from = '/' + relative(ROOT, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  for (const m of html.matchAll(/href=["'](\/[^"'#?]*)["']/g)) {
    const target = m[1].endsWith('/') ? m[1] : `${m[1]}/`;
    if (inbound.has(target) && target !== from) inbound.set(target, inbound.get(target) + 1);
  }
}

const problems = {
  titleTooLong: audit.filter((p) => p.title.length > TITLE_MAX && !p.noindex),
  titleMissing: audit.filter((p) => !p.title),
  descTooLong: audit.filter((p) => p.description.length > DESC_MAX && !p.noindex),
  descTooShort: audit.filter((p) => p.description && p.description.length < DESC_MIN && !p.noindex),
  descMissing: audit.filter((p) => !p.description && !p.noindex),
  noH1: audit.filter((p) => p.h1Count === 0 && !p.noindex),
  manyH1: audit.filter((p) => p.h1Count > 1),
  thin: audit.filter((p) => p.words < THIN_WORDS && !p.noindex),
  altMissing: audit.filter((p) => p.missingAlt > 0),
  noSchema: audit.filter((p) => p.schema.length === 0 && !p.noindex),
  orphan: audit.filter((p) => (inbound.get(p.url) ?? 0) === 0 && p.url !== '/' && !p.noindex),
  duplicateTitles: Object.entries(
    audit.reduce((a, p) => ((a[p.title] = (a[p.title] ?? 0) + 1), a), {})
  ).filter(([, n]) => n > 1),
};

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ audit, inbound: [...inbound], problems }, null, 2));
} else {
  const pad = (s, n) => String(s).padEnd(n);
  console.log(`${audit.length} pages\n`);

  const rows = [
    ['title over 60 chars', problems.titleTooLong.length],
    ['title missing', problems.titleMissing.length],
    ['duplicate titles', problems.duplicateTitles.length],
    ['description over 160', problems.descTooLong.length],
    ['description under 70', problems.descTooShort.length],
    ['description missing', problems.descMissing.length],
    ['no h1', problems.noH1.length],
    ['more than one h1', problems.manyH1.length],
    [`under ${THIN_WORDS} words`, problems.thin.length],
    ['images without alt', problems.altMissing.length],
    ['no structured data', problems.noSchema.length],
    ['nothing links to it', problems.orphan.length],
  ];
  for (const [label, n] of rows) {
    console.log(`  ${n > 0 ? '!' : ' '} ${pad(label, 24)} ${n}`);
  }

  const show = (label, list, fmt) => {
    if (!list.length) return;
    console.log(`\n${label}`);
    for (const p of list.slice(0, 12)) console.log('   ' + fmt(p));
    if (list.length > 12) console.log(`   … and ${list.length - 12} more`);
  };

  show('Titles Google will cut', problems.titleTooLong, (p) => `${p.title.length}  ${p.title}`);
  show('Descriptions too long', problems.descTooLong, (p) => `${p.description.length}  ${p.url}`);
  show('Descriptions too short', problems.descTooShort, (p) => `${p.description.length}  ${p.url}`);
  show('Nothing on the site links here', problems.orphan, (p) => p.url);
  show('Thin pages', problems.thin, (p) => `${p.words}w  ${p.url}`);
  show('Images with no alt', problems.altMissing, (p) => `${p.missingAlt}  ${p.url}`);

  const linked = [...inbound.entries()].sort((a, b) => b[1] - a[1]);
  console.log('\nMost linked-to pages');
  for (const [url, n] of linked.slice(0, 8)) console.log(`   ${pad(n, 4)} ${url}`);
}
