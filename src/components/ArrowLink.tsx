import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/cn.ts';
import type { Link } from '../types.ts';
import { SmartLink } from './SmartLink.tsx';

interface Props {
  link: Link;
  /** Stretch the click area over the nearest `relative` parent, so the whole card is clickable. */
  stretched?: boolean;
  className?: string;
}

/** A text link with an arrow that nudges right when the link, or the card (`group/card`) it sits in, is hovered. */
export function ArrowLink({ link, stretched = false, className }: Props) {
  return (
    <SmartLink
      link={link}
      className={cn(
        'group/link inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary-ink dark:text-primary',
        stretched && 'after:absolute after:inset-0 after:rounded-[inherit] after:content-[""]',
        className,
      )}
    >
      {link.label}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/card:translate-x-0.5"
      />
    </SmartLink>
  );
}
