import type { Action } from '../types.ts';
import { cn } from '../lib/cn.ts';
import { SmartLink } from './SmartLink.tsx';

/** What the button sits on, so it can pick colours that stay readable. */
export type Surface = 'image' | 'card' | 'primary';

const styles: Record<Surface, Record<'solid' | 'outline', string>> = {
  image: {
    solid: 'bg-white text-neutral-700 hover:bg-white/85',
    outline: 'text-white ring-2 ring-inset ring-white/60 hover:bg-white/10 active:bg-white/20',
  },
  card: {
    solid: 'bg-primary text-on-primary hover:brightness-105',
    outline:
      'text-neutral-700 ring-2 ring-inset ring-neutral-300 hover:bg-neutral-100 active:bg-neutral-200 dark:text-neutral-200 dark:ring-neutral-600 dark:hover:bg-neutral-800',
  },
  primary: {
    solid: 'bg-white text-neutral-800 hover:bg-white/85',
    outline: 'ring-2 ring-inset ring-current hover:bg-black/5',
  },
};

interface Props {
  action: Action;
  surface: Surface;
  className?: string;
}

/** A link that looks like a button. */
export function ButtonLink({ action, surface, className }: Props) {
  const variant = action.variant ?? 'outline';
  return (
    <SmartLink
      link={action}
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-md px-7 py-2 text-center text-[15px] font-normal transition-colors duration-200',
        styles[surface][variant],
        className,
      )}
    >
      {action.label}
    </SmartLink>
  );
}
