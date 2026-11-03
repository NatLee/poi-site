import type { AnchorHTMLAttributes } from 'react';
import { useLabels } from '../lib/labels.ts';
import { asset } from '../lib/paths.ts';
import type { Link } from '../types.ts';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'> & {
  link: Pick<Link, 'href' | 'newTab'>;
};

/** An <a> for config links: adds the base path to local files and handles `newTab` safely. */
export function SmartLink({ link, children, rel, ...rest }: Props) {
  const newTab = link.newTab ?? false;
  const labels = useLabels();
  return (
    <a
      href={asset(link.href)}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? ['noopener', 'noreferrer', rel].filter(Boolean).join(' ') : rel}
      {...rest}
    >
      {children}
      {newTab && <span className="sr-only"> {labels.opensInNewTab}</span>}
    </a>
  );
}
