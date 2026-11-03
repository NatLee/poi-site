import { ArrowLink } from '../components/ArrowLink.tsx';
import { Picture } from '../components/Picture.tsx';
import { SectionHeading } from '../components/SectionHeading.tsx';
import { titleId } from '../lib/anchors.ts';
import { cn } from '../lib/cn.ts';
import type { CardsSection } from '../types.ts';

interface Props {
  section: CardsSection;
  /** The section rises into the hero (SectionView does the pull-up), so skip the top padding. */
  overlapHero: boolean;
}

/** Cards with an image on top, then title, text and an arrow link. Two per row from 768 px. */
export function CardGrid({ section, overlapHero }: Props) {
  return (
    <div className={cn('mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28', !overlapHero && 'pt-4')}>
      {section.title && <SectionHeading id={titleId(section.id)} title={section.title} intro={section.intro} className="mb-12" />}
      <ul className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {section.items.map((card) => (
          <li
            key={card.title}
            className="group/card relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-200 focus-within:ring-2 focus-within:ring-primary-ink hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:bg-slate-900 dark:ring-white/10 dark:focus-within:ring-primary"
          >
            {card.image && <Picture image={card.image} />}
            <div className="flex flex-1 flex-col p-7">
              <h3 className="text-xl">{card.title}</h3>
              <p className="mt-2 flex-1">{card.text}</p>
              {card.action && <ArrowLink link={card.action} stretched className="mt-6 self-start" />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
