import { asset } from '../lib/paths.ts';
import { cn } from '../lib/cn.ts';
import type { ColorMode, SiteConfig } from '../types.ts';
import { ColorModeToggle } from './ColorModeToggle.tsx';
import { ForkRibbon } from './ForkRibbon.tsx';
import { SmartLink } from './SmartLink.tsx';
import { SoundButton } from './SoundButton.tsx';

export interface HeaderControls {
  sound: { play: () => void; playing: boolean };
  colorMode: { mode: ColorMode; setMode: (mode: ColorMode) => void };
}

interface Props extends HeaderControls {
  site: SiteConfig;
  /** False while the hero is on screen (transparent header over the image), true after scrolling past it. */
  solid: boolean;
}

/**
 * Desktop header. Transparent over the hero; once the visitor scrolls past the hero it
 * becomes a dark bar pinned to the top that slides in from above. The fork ribbon shows only
 * at the top of the page; the solid bar shows the brand instead. Hidden on small screens,
 * where the MobileMenu takes over.
 */
export function Header({ site, solid, sound, colorMode }: Props) {
  const { brand, nav } = site;
  const showBrand = solid || !site.forkRibbon;
  return (
    <header
      className={cn(
        'inset-x-0 top-0 z-40 hidden h-14 md:block',
        solid
          ? 'fixed bg-neutral-700/95 shadow-md backdrop-blur-sm motion-safe:animate-reveal dark:bg-neutral-900/95'
          : 'absolute bg-transparent',
      )}
    >
      {site.forkRibbon && !solid && <ForkRibbon ribbon={site.forkRibbon} />}
      <div className="flex h-full items-center justify-between gap-6 px-5">
        {showBrand ? (
          <a href="#top" className="flex items-center gap-2.5 text-lg font-normal text-white">
            {brand.logo && <img src={asset(brand.logo)} alt="" className="size-8 rounded-full" width={32} height={32} />}
            {brand.name}
          </a>
        ) : (
          <span />
        )}
        <nav aria-label="Main">
          <ul className="flex items-center gap-1">
            {nav.map((link) => (
              <li key={link.label}>
                <SmartLink
                  link={link}
                  className="inline-flex h-9 items-center rounded-md px-4 text-[15px] font-normal text-white transition-colors duration-200 hover:bg-white/15"
                >
                  {link.label}
                </SmartLink>
              </li>
            ))}
            {site.sound && (
              <li className="ml-2">
                <SoundButton label={site.sound.label} playing={sound.playing} onPlay={sound.play} />
              </li>
            )}
            {site.theme.toggle && (
              <li className="ml-1">
                <ColorModeToggle mode={colorMode.mode} onChange={colorMode.setMode} />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
