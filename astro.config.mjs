// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// `astro dev` reads .env into import.meta.env but leaves process.env alone, so
// the API routes — which read process.env, deliberately, so that Vercel's
// values are picked up per request instead of frozen into the bundle at build
// time — would find nothing locally. This copies .env across at startup.
//
// A real environment variable always wins over the file, so on Vercel (where
// there is no .env) this does nothing and the platform's values are used as-is.
if (existsSync('.env')) {
  // Two things bite here on Windows. A BOM would glue itself to the first key
  // name, and `.` in JavaScript does not match \r — so splitting CRLF files on
  // \n alone leaves a stray \r that stops every line with a value from
  // matching, while blank-valued lines still pass. Hence both are handled.
  const text = readFileSync('.env', 'utf8').replace(/^﻿/, '');

  for (const line of text.split(/\r?\n/)) {
    const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!match) continue;
    const [, key, raw] = match;
    if (process.env[key] !== undefined) continue;
    process.env[key] = raw.trim().replace(/^(['"])(.*)\1$/, '$2');
  }
}

/**
 * When each blog page last really changed, for the sitemap's lastmod.
 *
 * Stamping every URL with the build time told crawlers that all 190 pages
 * changed on every deploy — several times a day — which is the pattern search
 * engines learn to ignore, taking the signal away from the pages that did
 * change. An article's date is its `updated` field, else its publication date;
 * an index page's is the newest article it lists.
 *
 * Read straight off the markdown because the config loads before the content
 * layer. Loose on purpose: a file this cannot read is left without a lastmod,
 * never allowed to break the build.
 */
function blogLastmods() {
  const dir = './src/content/blog';
  /** @type {Map<string, Date>} */
  const byPath = new Map();
  /** @param {string} path @param {Date} date */
  const newest = (path, date) => {
    const seen = byPath.get(path);
    if (!seen || date > seen) byPath.set(path, date);
  };
  // The same rule as categorySlug() in src/data/portfolio.ts.
  /** @param {string} category */
  const slugOf = (category) =>
    category.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  /** @type {string[]} */
  let files = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch {
    return byPath;
  }

  /** @param {string | undefined} value */
  const parse = (value) => {
    const d = new Date(value ?? '');
    return Number.isNaN(d.getTime()) ? null : d;
  };

  for (const file of files) {
    let text = '';
    try {
      text = readFileSync(`${dir}/${file}`, 'utf8');
    } catch {
      continue;
    }
    const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? '';
    if (/^draft:\s*true\s*$/m.test(fm)) continue;
    /** @param {string} k */
    const field = (k) => new RegExp(`^${k}:\\s*(.+)$`, 'm').exec(fm)?.[1]?.trim().replace(/^["']|["']$/g, '');

    const date = parse(field('updated')) ?? parse(field('date'));
    if (!date) continue;

    newest(`/blog/${file.replace(/\.md$/, '')}/`, date);
    newest('/blog/', date);
    newest('/', date);
    const category = field('category');
    if (category) newest(`/blog/category/${slugOf(category)}/`, date);
    if (field('score') !== undefined) newest('/blog/reviews/', date);
  }
  return byPath;
}

const lastmods = blogLastmods();

// Static output: every route is written out as real HTML at build time, so each
// page carries its own title, description and og:image, and blog articles are
// readable by crawlers without running any JavaScript.
//
// The adapter is here only so a single route can opt out of that. The comment
// endpoint sets `prerender = false` and runs as a function; everything else
// stays a plain file on the CDN.
export default defineConfig({
  site: 'https://www.gianlucascattarella.it',
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    // lastmod tells a crawler which pages are worth re-reading. Without it the
    // whole sitemap looks equally stale, and a site publishing several times a
    // day gets crawled as if it never changes.
    sitemap({
      // The analytics opt-out switch is for the site owner, not for readers or
      // for search engines. /authors/ is now only a redirect stub pointing at
      // /about/, so listing it would invite crawls of a page whose whole job is
      // to send the crawler somewhere else.
      filter: (page) =>
        !page.includes('/no-track') && !page.includes('/authors') && !page.includes('/cms'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const known = lastmods.get(path);
        if (known) {
          item.lastmod = known.toISOString();
        } else if (path.startsWith('/easyframe')) {
          // EasyFrame is kept exactly as it was, build-time stamp included.
          item.lastmod = new Date().toISOString();
        }
        // Anything else (/about/, /privacy/) gets no lastmod rather than a
        // made-up one.
        // The article pages are the point of the site; the utility routes are
        // not, and should not compete with them for crawl budget. changefreq is
        // left off deliberately — crawlers have ignored it for years, and a
        // wrong value is worse than none.
        if (item.url.endsWith('/blog/')) {
          item.priority = 0.9;
        } else if (item.url.includes('/blog/')) {
          item.priority = 0.8;
        }
        return item;
      },
    }),
  ],
  build: { format: 'directory' },
});
