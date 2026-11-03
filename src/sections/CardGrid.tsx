import { Box } from '../components/Box.tsx';
import { ButtonLink } from '../components/ButtonLink.tsx';
import { Picture } from '../components/Picture.tsx';
import type { CardsSection } from '../types.ts';

/** Cards side by side: image on top, then title, text and a button. One per row on phones. */
export function CardGrid({ section }: { section: CardsSection }) {
  return (
    <>
      {section.title && (
        <h2 id={`${section.id}-title`} className="mb-8 text-center text-4xl">
          {section.title}
        </h2>
      )}
      <ul className="grid gap-6 md:grid-cols-2 md:gap-8">
        {section.items.map((card) => (
          <li key={card.title} className="flex">
            <Box className="flex w-full flex-col text-center">
              {card.image && <Picture image={card.image} />}
              <div className="flex flex-1 flex-col items-center px-8 pt-8 pb-10">
                <h3 className="text-2xl">{card.title}</h3>
                <p className="mt-3 flex-1">{card.text}</p>
                {card.action && <ButtonLink action={card.action} surface="card" className="mt-8" />}
              </div>
            </Box>
          </li>
        ))}
      </ul>
    </>
  );
}
