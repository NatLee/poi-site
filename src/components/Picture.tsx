import { asset } from '../lib/paths.ts';
import { cn } from '../lib/cn.ts';
import type { Image } from '../types.ts';

/** An image from the config. `cover` fills the frame; `contain` sits at its own size on a soft gradient panel. */
export function Picture({ image, className }: { image: Image; className?: string }) {
  const img = (
    <img
      src={asset(image.src)}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
      className={image.fit === 'contain' ? 'h-auto max-h-32 w-auto drop-shadow-lg' : 'block h-auto w-full'}
    />
  );
  if (image.fit !== 'contain') return <div className={className}>{img}</div>;
  return (
    <div
      className={cn(
        'grid h-48 place-items-center bg-linear-to-br from-primary/25 via-slate-50 to-slate-100 dark:from-primary/20 dark:via-slate-900 dark:to-slate-900',
        className,
      )}
    >
      {img}
    </div>
  );
}
