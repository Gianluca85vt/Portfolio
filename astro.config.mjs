// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

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
  integrations: [react(), sitemap()],
  build: { format: 'directory' },
});
