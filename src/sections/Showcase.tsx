import { Check } from 'lucide-react';
import { asset } from '../lib/paths.ts';
import { cn } from '../lib/cn.ts';
import type { ShowcaseSection } from '../types.ts';

interface Props {
  section: ShowcaseSection;
  /** Pull the image up into the hero. */
  overlapHero: boolean;
}

/** A framed screenshot with a glow behind it, then the heading, a subtitle and keyword pills. */
export function Showcase({ section, overlapHero }: Props) {
  const { image } = section;
  return (
    <div className={cn('mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28', overlapHero ? '-mt-28 sm:-mt-40 lg:-mt-48' : 'pt-20 sm:pt-28')}>
      {image && (
        <figure className="relative mx-auto" style={{ maxWidth: image.width }}>
          <div aria-hidden className="absolute -inset-x-6 -top-6 bottom-10 -z-10 rounded-[2.5rem] bg-primary/30 blur-3xl" />
          <div className="overflow-hidden rounded-2xl bg-slate-900 p-1.5 shadow-2xl ring-1 shadow-slate-950/30 ring-slate-900/10 dark:ring-white/10">
            <img
              src={asset(image.src)}
              alt={image.alt}
              width={image.width}
              height={image.height}
              decoding="async"
              className="block h-auto w-full rounded-xl"
            />
          </div>
        </figure>
      )}
      <div className={cn('mx-auto max-w-2xl text-center', image && 'mt-14 sm:mt-16')}>
        <h2 id={`${section.id}-title`} className="text-3xl sm:text-4xl">
          {section.title}
        </h2>
        {section.subtitle && <p className="mt-4 text-lg">{section.subtitle}</p>}
        {section.highlights && section.highlights.length > 0 && (
          <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
            {section.highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 ring-inset dark:bg-white/5 dark:text-slate-200 dark:ring-white/10"
              >
                <Check aria-hidden className="size-4 text-primary-ink dark:text-primary" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
