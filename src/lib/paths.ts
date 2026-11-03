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

/** A base path in the `/x/` form Vite expects: one leading and one trailing slash, `/` for the root. */
export function normalizeBase(value: string): string {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

/**
 * The path the site is served from, decided in one place:
 * 1. `BASE_PATH` when it is set (the deploy workflow sets it from GitHub Pages);
 * 2. otherwise the path of `meta.url` from the config (https://you.github.io/my-site/ → /my-site/);
 * 3. otherwise the root of the domain.
 */
export function resolveBase(basePathEnv: string | undefined, siteUrl: string | undefined): string {
  if (basePathEnv !== undefined) return normalizeBase(basePathEnv);
  if (siteUrl) return normalizeBase(new URL(siteUrl).pathname);
  return '/';
}

/** `withBase` using the base path Vite was built with. */
export function asset(path: string): string {
  return withBase(path, import.meta.env.BASE_URL);
}
