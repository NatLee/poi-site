import { cn } from '../lib/cn.ts';

interface Props {
  id: string;
  title: string;
  intro?: string;
  className?: string;
}

/** Centred section heading with an optional sentence under it. `id` is what the section's aria-labelledby points at. */
export function SectionHeading({ id, title, intro, className }: Props) {
  return (
    <div className={cn('mx-auto max-w-2xl text-center', className)}>
      <h2 id={id} className="text-3xl sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg">{intro}</p>}
    </div>
  );
}
