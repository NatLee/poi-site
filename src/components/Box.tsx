import type { ReactNode } from 'react';
import { cn } from '../lib/cn.ts';

/** The white rounded card most sections sit on. */
export function Box({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg bg-white shadow-[0_2px_0_rgba(0,0,0,0.05)] dark:bg-neutral-900 dark:shadow-none dark:ring-1 dark:ring-white/5',
        className,
      )}
    >
      {children}
    </div>
  );
}
