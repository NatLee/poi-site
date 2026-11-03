import type { SiteConfig } from '../types.ts';
import { colorModeScript, storageKey } from './color-mode.ts';
import { withBase } from './paths.ts';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Builds the <head> tags from the config. Runs at build time (see vite.config.ts), so
 * search engines and link previews see the real title and description without running JS.
 */
export function renderHead(site: SiteConfig, base: string): string {
  const { meta } = site;
  const e = escapeHtml;
  const tags = [
    `<title>${e(meta.title)}</title>`,
    `<meta name="description" content="${e(meta.description)}" />`,
    `<meta name="theme-color" content="${e(site.hero.background?.color ?? site.theme.primary)}" />`,
    `<link rel="icon" href="${e(withBase(meta.favicon, base))}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${e(meta.title)}" />`,
    `<meta property="og:description" content="${e(meta.description)}" />`,
  ];
  if (meta.url) {
    tags.push(`<meta property="og:url" content="${e(meta.url)}" />`);
    if (meta.image) {
      const image = new URL(meta.image.replace(/^\/+/, ''), meta.url.endsWith('/') ? meta.url : `${meta.url}/`);
      tags.push(`<meta property="og:image" content="${e(image.href)}" />`);
      tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    }
  }
  tags.push(`<script>${colorModeScript(storageKey(base), site.theme.defaultMode)}</script>`);
  return tags.join('\n    ');
}
