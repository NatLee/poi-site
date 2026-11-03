import { cn } from '../lib/cn.ts';
import type { Action } from '../types.ts';
import { SmartLink } from './SmartLink.tsx';

/** What the button sits on: the always-dark hero and call-to-action panel, or a normal page area. */
export type Surface = 'dark' | 'page';

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-center text-[15px] font-semibold transition duration-200 motion-safe:active:scale-[0.98]';

const styles: Record<Surface, Record<'solid' | 'outline', string>> = {
  dark: {
    solid: 'bg-primary text-on-primary shadow-lg shadow-primary/25 hover:brightness-110',
    outline: 'bg-white/5 text-white ring-1 ring-white/20 ring-inset backdrop-blur-sm hover:bg-white/10 hover:ring-white/35',
  },
  page: {
    solid: 'bg-primary text-on-primary shadow-sm hover:brightness-105',
    outline:
      'text-slate-800 ring-1 ring-slate-300 ring-inset hover:bg-slate-50 dark:text-white dark:ring-white/15 dark:hover:bg-white/5',
  },
};

interface Props {
  action: Action;
  surface: Surface;
  className?: string;
}

/** A link that looks like a button. */
export function ButtonLink({ action, surface, className }: Props) {
  return (
    <SmartLink link={action} className={cn(base, styles[surface][action.variant ?? 'outline'], className)}>
      {action.label}
    </SmartLink>
  );
}
