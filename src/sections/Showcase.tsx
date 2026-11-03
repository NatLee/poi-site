import { Box } from '../components/Box.tsx';
import { Picture } from '../components/Picture.tsx';
import type { ShowcaseSection } from '../types.ts';

/** A heading, a short line under a rule, and a big edge-to-edge image. */
export function Showcase({ section }: { section: ShowcaseSection }) {
  return (
    <Box className="text-center">
      <header className="px-6 pt-12 pb-10 md:px-16 md:pt-16">
        <h2 id={`${section.id}-title`} className="text-4xl md:text-[2.6rem]">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="mx-auto mt-6 inline-block max-w-2xl border-t-2 border-neutral-200 px-2 pt-6 dark:border-neutral-700">
            {section.subtitle}
          </p>
        )}
      </header>
      {section.image && <Picture image={section.image} />}
    </Box>
  );
}
