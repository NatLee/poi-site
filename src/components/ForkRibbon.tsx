import { readableOn } from '../lib/color.ts';
import { ribbonColor } from '../lib/defaults.ts';
import { GitHub } from '../lib/icons.ts';
import type { SiteConfig } from '../types.ts';
import { SmartLink } from './SmartLink.tsx';

/** A "Fork me on GitHub" ribbon pinned to the top-right corner, on wide screens. Its size and reach are CSS variables in index.css; the header uses them to leave room. */
export function ForkRibbon({ ribbon }: { ribbon: NonNullable<SiteConfig['forkRibbon']> }) {
  const color = ribbonColor(ribbon);
  return (
    <div className="pointer-events-none fixed top-0 right-0 z-50 hidden size-(--ribbon-size) overflow-hidden lg:block">
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
