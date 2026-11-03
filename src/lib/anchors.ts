/**
 * Element ids the page itself uses. Links like `#top` in the config point at them, and the
 * config test makes sure no section id takes one of them.
 */
export const PAGE_IDS = {
  /** The whole page; `#top` scrolls back up. */
  top: 'top',
  /** The main content; the skip link jumps here. */
  main: 'main',
  /** The phone menu panel. */
  menu: 'mobile-menu',
  /** Reserved because the hero's heading is titleId('hero'); a section called 'hero' would clash with it. */
  hero: 'hero',
} as const;

/** Id of a section's heading. The section's aria-labelledby points at it. */
export function titleId(id: string): string {
  return `${id}-title`;
}
