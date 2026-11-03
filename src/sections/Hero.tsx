import type { Ref } from 'react';
import { ButtonLink } from '../components/ButtonLink.tsx';
import { asset } from '../lib/paths.ts';
import { cn } from '../lib/cn.ts';
import type { Hero as HeroConfig } from '../types.ts';

interface Props {
  hero: HeroConfig;
  /** Leave room at the bottom for the first section, which overlaps the hero on wide screens. */
  overlap: boolean;
  ref?: Ref<HTMLElement>;
}

/** The banner: background photo with texture, logo or title, tagline and buttons. */
export function Hero({ hero, overlap, ref }: Props) {
  const bg = hero.background ?? {};
  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className={cn(
        'relative isolate overflow-hidden px-4 pt-24 pb-16 text-center text-white md:pt-44',
        overlap ? 'md:pb-80' : 'md:pb-36',
      )}
      style={{ backgroundColor: bg.color ?? '#525252' }}
    >
      {bg.image && (
        <div
          aria-hidden
          className={cn('absolute inset-0 -z-10 bg-cover bg-center', (bg.fixed ?? true) && 'md:bg-fixed')}
          style={{ backgroundImage: `url("${asset(bg.image)}")` }}
        />
      )}
      {bg.pattern && (
        <div aria-hidden className="absolute inset-0 -z-10" style={{ backgroundImage: `url("${asset(bg.pattern)}")` }} />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black" style={{ opacity: bg.dim ?? 0.25 }} />

      <h1 id="hero-title" className="mx-auto max-w-[600px] text-5xl leading-tight text-white md:text-6xl">
        {hero.logo ? (
          <img
            src={asset(hero.logo.src)}
            alt={hero.title}
            width={hero.logo.width}
            height={hero.logo.height}
            fetchPriority="high"
            className="mx-auto h-auto w-full"
          />
        ) : (
          hero.title
        )}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-xl md:text-[1.35rem]">{hero.tagline}</p>
      {hero.actions.length > 0 && (
        <ul className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          {hero.actions.map((action) => (
            <li key={action.label}>
              <ButtonLink action={action} surface="image" className="w-full sm:w-auto sm:min-w-48" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
