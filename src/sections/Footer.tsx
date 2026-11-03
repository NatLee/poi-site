import { SmartLink } from '../components/SmartLink.tsx';
import { asset } from '../lib/paths.ts';
import type { SiteConfig } from '../types.ts';

interface Props {
  footer: SiteConfig['footer'];
  brand: SiteConfig['brand'];
}

/** Brand and copyright on the left, icon links on the right, small print underneath. */
export function Footer({ footer, brand }: Props) {
  return (
    <footer className="border-t border-slate-200 text-sm dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <span className="flex items-center gap-2.5 text-base font-bold tracking-tight text-slate-900 dark:text-white">
              {brand.logo && <img src={asset(brand.logo)} alt="" width={28} height={28} className="size-7 rounded-full" />}
              {brand.name}
            </span>
            <span>{footer.copyright}</span>
          </div>
          {footer.social.length > 0 && (
            <ul className="flex gap-2">
              {footer.social.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <SmartLink
                    link={{ href }}
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full text-slate-500 ring-1 ring-slate-200 transition-colors duration-200 ring-inset hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white"
                  >
                    <Icon aria-hidden className="size-5" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          )}
        </div>
        {(footer.note || footer.credits) && (
          <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-6 text-center text-xs leading-6 sm:flex-row sm:justify-between sm:gap-6 sm:text-left dark:border-white/10">
            {footer.note && <p className="max-w-2xl">{footer.note}</p>}
            {footer.credits && (
              <p className="shrink-0">
                {footer.credits.prefix && <>{footer.credits.prefix} </>}
                <SmartLink
                  link={footer.credits}
                  className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900 dark:text-slate-200 dark:decoration-white/20 dark:hover:text-white"
                >
                  {footer.credits.label}
                </SmartLink>
              </p>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
