import type { Feature, SiteConfig } from '../types.ts';

/**
 * Every value the site falls back to when the config leaves something out, in one place.
 * Components, the <head> builder and the tests read defaults through the helpers below,
 * never with their own `?? something`. `types.ts` repeats these values in its comments so
 * people editing the config can see them on hover.
 */
export const DEFAULTS = {
  /** Dark base colour of the hero and the call-to-action panel. */
  ink: '#0b1120',
  /** Share of `ink` laid over the hero photo. */
  dim: 0.75,
  /** Hero photo stays still while the page scrolls (wide screens). */
  fixed: true,
  /** "Fork me on GitHub" ribbon colour. */
  ribbonColor: '#0f172a',
  /** Feature tile colour, only used when `theme.accents` is empty. */
  accent: '#64748b',
} as const;

/** The hero background with every default filled in. */
export function heroBackground(site: Pick<SiteConfig, 'hero'>) {
  const bg = site.hero.background ?? {};
  return {
    image: bg.image,
    pattern: bg.pattern,
    color: bg.color ?? DEFAULTS.ink,
    dim: bg.dim ?? DEFAULTS.dim,
    fixed: bg.fixed ?? DEFAULTS.fixed,
  };
}

/**
 * The always-dark look shared by the hero and the call-to-action panel: base colour and
 * texture tile. It is configured under `hero.background`, and every dark surface reads it from here.
 */
export function darkSurface(site: Pick<SiteConfig, 'hero'>) {
  const bg = heroBackground(site);
  return { ink: bg.color, texture: bg.pattern };
}

export function ribbonColor(ribbon: NonNullable<SiteConfig['forkRibbon']>): string {
  return ribbon.color ?? DEFAULTS.ribbonColor;
}

/** A feature's tile colour: its own, else the next accent in turn. */
export function featureColor(feature: Pick<Feature, 'color'>, index: number, accents: readonly string[]): string {
  if (feature.color) return feature.color;
  return accents.length > 0 ? accents[index % accents.length] : DEFAULTS.accent;
}
