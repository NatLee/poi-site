import type { Ref } from 'react';
import { ButtonLink } from '../components/ButtonLink.tsx';
import { cn } from '../lib/cn.ts';
import { asset } from '../lib/paths.ts';
import type { Hero as HeroConfig } from '../types.ts';

interface Props {
  hero: HeroConfig;
  /** Leave room at the bottom for the first section, which rises into the hero. */
  overlap: boolean;
  ref?: Ref<HTMLElement>;
}

/**
 * The dark banner: background photo under a tint, a dot texture that fades towards the edges,
 * a soft glow in the primary colour, then the logo or title, the tagline and the buttons.
 */
export function Hero({ hero, overlap, ref }: Props) {
  const bg = hero.background ?? {};
  return (
    <section
      ref={ref}
      data-surface="dark"
      aria-labelledby="hero-title"
      className={cn(
        'relative isolate overflow-hidden bg-ink px-4 pt-32 text-center text-white sm:pt-40',
        overlap ? 'pb-40 sm:pb-56 lg:pb-64' : 'pb-24 sm:pb-32',
      )}
    >
      {bg.image && (
        <div
          aria-hidden
          className={cn('absolute inset-0 -z-30 bg-cover bg-center', (bg.fixed ?? true) && 'md:bg-fixed')}
          style={{ backgroundImage: `url("${asset(bg.image)}")` }}
        />
      )}
      <div aria-hidden className="absolute inset-0 -z-20 bg-ink" style={{ opacity: bg.dim ?? 0.75 }} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-20 h-40 bg-linear-to-t from-ink to-transparent dark:from-slate-950" />
      {bg.pattern && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
          style={{ backgroundImage: `url("${asset(bg.pattern)}")` }}
        />
      )}
      <div
        aria-hidden
        className="absolute top-24 left-1/2 -z-10 h-[28rem] w-[min(60rem,140vw)] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
      />

      <h1 id="hero-title" className="mx-auto max-w-[32rem] text-5xl leading-tight text-white sm:text-6xl">
        {hero.logo ? (
          <img
            src={asset(hero.logo.src)}
            alt={hero.title}
            width={hero.logo.width}
            height={hero.logo.height}
            fetchPriority="high"
            className="mx-auto h-auto w-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
          />
        ) : (
          hero.title
        )}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-balance text-white/80 sm:text-2xl">{hero.tagline}</p>
      {hero.actions.length > 0 && (
        <ul className="mx-auto mt-10 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          {hero.actions.map((action) => (
            <li key={action.label}>
              <ButtonLink action={action} surface="dark" className="w-full sm:w-auto" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
