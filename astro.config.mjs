// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync, existsSync } from 'node:fs';
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
      serialize(item) {
        item.lastmod = new Date().toISOString();
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
