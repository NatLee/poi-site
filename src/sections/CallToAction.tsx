import { ButtonLink } from '../components/ButtonLink.tsx';
import { titleId } from '../lib/anchors.ts';
import type { CallToActionSection } from '../types.ts';

/** A dark rounded panel (the shared dark surface: ink colour and texture) with a glow, a heading, text and buttons. */
export function CallToAction({ section, texture }: { section: CallToActionSection; texture?: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div
        data-surface="dark"
        className="relative isolate overflow-hidden rounded-3xl bg-ink px-6 py-16 text-center text-white shadow-xl sm:px-12 sm:py-20"
      >
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 h-80 w-[min(48rem,150%)] -translate-x-1/2 rounded-full bg-primary/35 blur-3xl"
        />
        {texture && (
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
            style={{ backgroundImage: `url("${texture}")` }}
          />
        )}
        <h2 id={titleId(section.id)} className="text-3xl text-white sm:text-4xl">
          {section.title}
        </h2>
        {section.text && <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">{section.text}</p>}
        {section.actions && section.actions.length > 0 && (
          <ul className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            {section.actions.map((action) => (
              <li key={action.label}>
                <ButtonLink action={action} surface="dark" className="w-full sm:w-auto" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
