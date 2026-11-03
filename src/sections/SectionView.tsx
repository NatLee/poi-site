import { cn } from '../lib/cn.ts';
import { darkSurface } from '../lib/defaults.ts';
import { asset } from '../lib/paths.ts';
import type { Section, SiteConfig } from '../types.ts';
import { CallToAction } from './CallToAction.tsx';
import { CardGrid } from './CardGrid.tsx';
import { FeatureGrid } from './FeatureGrid.tsx';
import { Showcase } from './Showcase.tsx';

interface Props {
  section: Section;
  site: SiteConfig;
  /** Pull this section up into the bottom of the hero (by --hero-overlap, see index.css). */
  overlapHero: boolean;
}

function hasTitle(section: Section): boolean {
  return 'title' in section && Boolean(section.title);
}

/**
 * Picks the component for a config section. To add your own section type: add it to the
 * `Section` union in types.ts, write a component, and add a `case` here.
 */
export function SectionView({ section, site, overlapHero }: Props) {
  let body;
  switch (section.type) {
    case 'showcase':
      body = <Showcase section={section} overlapHero={overlapHero} />;
      break;
    case 'cards':
      body = <CardGrid section={section} overlapHero={overlapHero} />;
      break;
    case 'features':
      body = <FeatureGrid section={section} accents={site.theme.accents} />;
      break;
    case 'cta': {
      const { texture } = darkSurface(site);
      body = <CallToAction section={section} texture={texture ? asset(texture) : undefined} />;
      break;
    }
  }
  return (
    <section
      id={section.id}
      aria-labelledby={hasTitle(section) ? `${section.id}-title` : undefined}
      className={cn('relative scroll-mt-[calc(var(--header-height)+1rem)]', overlapHero && 'rise-into-hero')}
    >
      {body}
    </section>
  );
}
