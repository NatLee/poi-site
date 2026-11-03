import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';
import { renderHead } from './src/lib/head.ts';
import site from './src/site.config.ts';

/**
 * Where the site lives on the web server. GitHub Pages project sites are served from
 * `/<repo-name>/`, so this repo defaults to `/poi-site/`. The deploy workflow sets
 * BASE_PATH from the repository name, so a copy of this template deploys correctly
 * without editing this file. Use `BASE_PATH=/ npm run build` for a site served from the root.
 */
const base = normalizeBase(process.env.BASE_PATH ?? '/poi-site/');

function normalizeBase(value: string): string {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

/** Fills the page <head> (title, description, favicon, social tags, theme script) from site.config.ts. */
function siteHead(): Plugin {
  return {
    name: 'site-head',
    transformIndexHtml(html) {
      return html
        .replace('<html lang="en">', `<html lang="${site.meta.lang}">`)
        .replace('<!-- site-head -->', renderHead(site, base));
    },
  };
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), siteHead()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
