import type { SiteConfig } from '../types.ts';
import { parseHex, readableOn } from './color.ts';

/** Copies the config colours into the CSS variables Tailwind's `bg-primary` / `text-on-primary` read. */
export function applyTheme(theme: SiteConfig['theme'], root: HTMLElement): void {
  parseHex(theme.primary); // fail fast on a typo
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-on-primary', readableOn(theme.primary));
}
