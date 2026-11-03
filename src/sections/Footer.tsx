import { SmartLink } from '../components/SmartLink.tsx';
import type { SiteConfig } from '../types.ts';

/** Icon links, copyright and credits. */
export function Footer({ footer }: { footer: SiteConfig['footer'] }) {
  return (
    <footer className="bg-neutral-200/70 px-4 pt-16 pb-20 text-center text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
      {footer.social.length > 0 && (
        <ul className="flex justify-center gap-4">
          {footer.social.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <SmartLink
                link={{ href }}
                aria-label={label}
                className="grid size-10 place-items-center rounded-full text-neutral-500 transition-colors duration-200 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-200"
              >
                <Icon aria-hidden className="size-6" />
              </SmartLink>
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-8 flex flex-col items-center gap-2 text-sm sm:flex-row sm:justify-center sm:gap-0 sm:divide-x sm:divide-neutral-300 dark:sm:divide-neutral-700">
        <li className="sm:px-4">{footer.copyright}</li>
        {footer.credits && (
          <li className="sm:px-4">
            {footer.credits.prefix && <>{footer.credits.prefix} </>}
            <SmartLink link={footer.credits} className="underline decoration-dotted underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100">
              {footer.credits.label}
            </SmartLink>
          </li>
        )}
      </ul>
    </footer>
  );
}
