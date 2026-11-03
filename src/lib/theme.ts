import type { SiteConfig } from '../types.ts';
import { inkOn, parseHex, readableOn } from './color.ts';
import { darkSurface } from './defaults.ts';

/**
 * Copies the config colours into the CSS variables Tailwind reads:
 * `bg-primary`, `text-on-primary` (text on primary buttons), `text-primary-ink` (primary as
 * readable text on white) and `bg-ink` (the dark hero and call-to-action panel).
 */
export function applyTheme(site: Pick<SiteConfig, 'theme' | 'hero'>, root: HTMLElement): void {
  const { primary } = site.theme;
  parseHex(primary); // fail fast on a typo
  root.style.setProperty('--color-primary', primary);
  root.style.setProperty('--color-on-primary', readableOn(primary));
  root.style.setProperty('--color-primary-ink', inkOn(primary));
  root.style.setProperty('--color-ink', darkSurface(site).ink);
}
