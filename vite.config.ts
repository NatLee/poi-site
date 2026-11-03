import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';
import { fillIndexHtml } from './src/lib/head.ts';
import { resolveBase } from './src/lib/paths.ts';
import site from './src/site.config.ts';

/**
 * Where the site lives on the web server: `BASE_PATH` if set (the deploy workflow sets it
 * from GitHub Pages), else the path of `meta.url` in site.config.ts, else `/`.
 * See resolveBase() in src/lib/paths.ts.
 */
const base = resolveBase(process.env.BASE_PATH, site.meta.url);

/** Fills index.html (language, <head> tags, no-JavaScript message) from site.config.ts. */
function siteHtml(): Plugin {
  return {
    name: 'site-html',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => fillIndexHtml(html, site, base),
    },
  };
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), siteHtml()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
