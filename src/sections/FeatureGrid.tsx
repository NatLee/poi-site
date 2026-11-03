import { ArrowLink } from '../components/ArrowLink.tsx';
import { SectionHeading } from '../components/SectionHeading.tsx';
import { titleId } from '../lib/anchors.ts';
import { readableOn } from '../lib/color.ts';
import { featureColor } from '../lib/defaults.ts';
import type { FeaturesSection } from '../types.ts';

interface Props {
  section: FeaturesSection;
  /** Colours for icon tiles without their own `color`, used in turn. */
  accents: string[];
}

/** A tinted full-width band with features in two columns: icon tile on the left, text on the right. */
export function FeatureGrid({ section, accents }: Props) {
  return (
    <div className="border-y border-slate-200 bg-slate-50 py-20 sm:py-28 dark:border-white/5 dark:bg-slate-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {section.title && <SectionHeading id={titleId(section.id)} title={section.title} intro={section.intro} className="mb-14" />}
        <ul className="mx-auto grid max-w-5xl gap-x-12 gap-y-12 md:grid-cols-2">
          {section.items.map((feature, i) => {
            const Icon = feature.icon;
            const color = featureColor(feature, i, accents);
            return (
              <li key={feature.title} className="flex gap-5">
                <span
                  aria-hidden
                  className="grid size-12 shrink-0 place-items-center rounded-xl shadow-sm ring-1 ring-black/5"
                  style={{ backgroundColor: color, color: readableOn(color) }}
                >
                  <Icon aria-hidden className="size-6" strokeWidth={2} />
                </span>
                <div className="flex flex-col">
                  <h3 className="text-lg leading-7">{feature.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-7">{feature.text}</p>
                  {feature.action && <ArrowLink link={feature.action} className="mt-3 self-start" />}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
