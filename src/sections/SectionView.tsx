import { cn } from '../lib/cn.ts';
import { isFullWidth } from '../lib/sections.ts';
import type { Section } from '../types.ts';
import { CallToAction } from './CallToAction.tsx';
import { CardGrid } from './CardGrid.tsx';
import { FeatureGrid } from './FeatureGrid.tsx';
import { Showcase } from './Showcase.tsx';

interface Props {
  section: Section;
  accents: string[];
  /** Pull this section up over the bottom of the hero (wide screens). */
  overlapHero: boolean;
}

function hasTitle(section: Section): boolean {
  return 'title' in section && Boolean(section.title);
}

/**
 * Picks the component for a config section. To add your own section type: add it to the
 * `Section` union in types.ts, write a component, and add a `case` here.
 */
export function SectionView({ section, accents, overlapHero }: Props) {
  let body;
  switch (section.type) {
    case 'showcase':
      body = <Showcase section={section} />;
      break;
    case 'cards':
      body = <CardGrid section={section} />;
      break;
    case 'features':
      body = <FeatureGrid section={section} accents={accents} />;
      break;
    case 'cta':
      body = <CallToAction section={section} />;
      break;
  }
  return (
    <section
      id={section.id}
      aria-labelledby={hasTitle(section) ? `${section.id}-title` : undefined}
      className={cn(
        'scroll-mt-20',
        isFullWidth(section) ? 'my-16 last:mb-0 md:my-20' : 'relative mx-auto mb-8 max-w-[55rem] px-4 last:mb-16',
        overlapHero && 'md:-mt-56',
      )}
    >
      {body}
    </section>
  );
}
