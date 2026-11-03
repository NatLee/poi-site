import { ButtonLink } from '../components/ButtonLink.tsx';
import type { CallToActionSection } from '../types.ts';

/** A full-width band in the primary colour. Text colour is picked for contrast at start-up. */
export function CallToAction({ section }: { section: CallToActionSection }) {
  return (
    <div className="bg-primary px-4 py-16 text-center text-on-primary md:py-20">
      <h2 id={`${section.id}-title`} className="text-4xl text-inherit">
        {section.title}
      </h2>
      {section.text && <p className="mx-auto mt-4 max-w-2xl text-lg">{section.text}</p>}
      {section.actions && section.actions.length > 0 && (
        <ul className="mt-8 flex flex-wrap justify-center gap-4">
          {section.actions.map((action) => (
            <li key={action.label}>
              <ButtonLink action={action} surface="primary" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
