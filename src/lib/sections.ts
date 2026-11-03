import type { Section } from '../types.ts';

/** Sections that can rise into the bottom of the hero when they come first. */
export function canOverlapHero(section: Section): boolean {
  return section.type === 'showcase' || section.type === 'cards';
}
