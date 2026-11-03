import { readableOn } from '../lib/color.ts';
import { GitHub } from '../lib/icons.ts';
import type { SiteConfig } from '../types.ts';
import { SmartLink } from './SmartLink.tsx';

/** A "Fork me on GitHub" ribbon pinned to the top-right corner. Screens 1024 px and wider; the header leaves room for it. */
export function ForkRibbon({ ribbon }: { ribbon: NonNullable<SiteConfig['forkRibbon']> }) {
  const color = ribbon.color ?? '#0f172a';
  return (
    <div className="pointer-events-none fixed top-0 right-0 z-50 hidden size-32 overflow-hidden lg:block">
      <SmartLink
        link={ribbon}
        className="pointer-events-auto absolute top-[30px] right-[-46px] flex w-[200px] rotate-45 items-center justify-center gap-1.5 py-1.5 text-xs font-semibold tracking-wide shadow-lg ring-1 ring-white/15 transition hover:brightness-125"
        style={{ backgroundColor: color, color: readableOn(color) }}
      >
        <GitHub aria-hidden className="size-3.5" />
        {ribbon.label}
      </SmartLink>
    </div>
  );
}
