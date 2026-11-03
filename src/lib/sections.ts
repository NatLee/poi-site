import type { Section } from '../types.ts';

/** Sections drawn as a full-width band rather than as a card in the centre column. */
export function isFullWidth(section: Section): boolean {
  return section.type === 'cta';
}
