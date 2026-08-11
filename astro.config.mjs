// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Static output: every route is written out as real HTML at build time, so each
// page carries its own title, description and og:image, and blog articles are
// readable by crawlers without running any JavaScript.
export default defineConfig({
  site: 'https://www.gianlucascattarella.it',
  output: 'static',
  integrations: [react(), sitemap()],
  build: { format: 'directory' },
});
