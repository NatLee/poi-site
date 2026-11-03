/** True for links that leave this site or open another app (https:, mailto:, data:, …). */
export function isExternal(href: string): boolean {
  return /^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//');
}

/**
 * Turns a path from the config into a URL the browser can load.
 * Full URLs and `#anchors` pass through; paths into `public/` get the base path in front,
 * so `images/logo.png` becomes `/poi-site/images/logo.png` on GitHub Pages.
 */
export function withBase(path: string, base: string): string {
  if (isExternal(path) || path.startsWith('#')) return path;
  const root = base.endsWith('/') ? base : `${base}/`;
  return root + path.replace(/^\.?\/+/, '');
}

/** `withBase` using the base path Vite was built with. */
export function asset(path: string): string {
  return withBase(path, import.meta.env.BASE_URL);
}
