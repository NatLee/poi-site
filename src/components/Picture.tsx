import { asset } from '../lib/paths.ts';
import { cn } from '../lib/cn.ts';
import type { Image } from '../types.ts';

/** An image from the config. `cover` fills the frame; `contain` sits at its own size on a tinted panel. */
export function Picture({ image, className }: { image: Image; className?: string }) {
  const img = (
    <img
      src={asset(image.src)}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
      className={image.fit === 'contain' ? 'h-auto max-w-full' : 'block h-auto w-full'}
    />
  );
  if (image.fit !== 'contain') return <div className={className}>{img}</div>;
  return (
    <div className={cn('flex justify-center bg-neutral-50 px-6 py-10 dark:bg-neutral-800/60', className)}>{img}</div>
  );
}
