import { Box } from '../components/Box.tsx';
import { ButtonLink } from '../components/ButtonLink.tsx';
import { cn } from '../lib/cn.ts';
import type { FeaturesSection } from '../types.ts';

interface Props {
  section: FeaturesSection;
  /** Colours for icons without their own `color`, used in turn. */
  accents: string[];
}

/** Features in a two-column grid with thin dividers, each with a round coloured icon. */
export function FeatureGrid({ section, accents }: Props) {
  return (
    <Box>
      {section.title && (
        <h2 id={`${section.id}-title`} className="px-6 pt-12 text-center text-4xl">
          {section.title}
        </h2>
      )}
      <ul className="grid md:grid-cols-2">
        {section.items.map((feature, i) => {
          const Icon = feature.icon;
          const color = feature.color ?? accents[i % accents.length] ?? '#737373';
          return (
            <li
              key={feature.title}
              className={cn(
                'flex flex-col items-center border-neutral-200 px-8 py-12 text-center md:px-12 dark:border-neutral-800',
                i > 0 && 'border-t',
                i === 1 && 'md:border-t-0',
                i % 2 === 0 && 'md:border-r',
              )}
            >
              <span
                aria-hidden
                className="grid size-22 place-items-center rounded-full text-white"
                style={{ backgroundColor: color }}
              >
                <Icon aria-hidden className="size-10" strokeWidth={2.25} />
              </span>
              <h3 className="mt-8 text-2xl">{feature.title}</h3>
              <p className="mt-3 max-w-md flex-1">{feature.text}</p>
              {feature.action && <ButtonLink action={feature.action} surface="card" className="mt-8" />}
            </li>
          );
        })}
      </ul>
    </Box>
  );
}
