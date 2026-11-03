import { readableOn } from '../lib/color.ts';
import type { SiteConfig } from '../types.ts';
import { SmartLink } from './SmartLink.tsx';

/** The classic "Fork me on GitHub" corner ribbon, drawn with CSS (no image to go stale). Lives in the desktop header. */
export function ForkRibbon({ ribbon }: { ribbon: NonNullable<SiteConfig['forkRibbon']> }) {
  const color = ribbon.color ?? '#aa0000';
  return (
    <div className="pointer-events-none absolute top-0 left-0 z-50 size-[149px] overflow-hidden">
      <SmartLink
        link={ribbon}
        className="pointer-events-auto absolute top-[42px] left-[-58px] block w-[230px] -rotate-45 py-[3px] text-center text-[13px] leading-tight font-semibold tracking-wide shadow-[0_2px_3px_rgba(0,0,0,0.35)] hover:brightness-110"
        style={{ backgroundColor: color, color: readableOn(color) }}
      >
        <span className="block border-y border-dashed border-current/60 py-[3px]">{ribbon.label}</span>
      </SmartLink>
    </div>
  );
}
