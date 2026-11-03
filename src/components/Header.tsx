import { Menu } from 'lucide-react';
import type { Ref } from 'react';
import { cn } from '../lib/cn.ts';
import { asset } from '../lib/paths.ts';
import { headerTone } from '../lib/tone.ts';
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
  /** False while the hero is on screen (transparent header, white text), true after scrolling past half of it. */
  solid: boolean;
  menuOpen: boolean;
  onOpenMenu: () => void;
  menuButtonRef: Ref<HTMLButtonElement>;
}

/**
 * The bar across the top. It stays pinned while the page scrolls: see-through over the hero,
 * then it fades in a frosted background once the visitor scrolls past half of the hero.
 * On small screens the links move into the MobileMenu behind the menu button.
 */
export function Header({ site, solid, sound, colorMode, menuOpen, onOpenMenu, menuButtonRef }: Props) {
  const { brand, nav } = site;
  const tone = headerTone;
  return (
    <header
      data-solid={solid}
      className={cn(
        'group/header fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none',
        solid
          ? 'border-slate-900/10 bg-page/80 shadow-sm backdrop-blur-lg dark:border-white/10'
          : 'border-transparent bg-transparent',
      )}
    >
      {site.forkRibbon && <ForkRibbon ribbon={site.forkRibbon} />}
      <div className={cn('mx-auto flex h-(--header-height) max-w-6xl items-center gap-2 px-4 sm:px-6', site.forkRibbon && 'lg:clear-ribbon')}>
        <a href="#top" className={cn('mr-auto flex items-center gap-2.5 rounded-full text-lg font-bold tracking-tight', tone.text)}>
          {brand.logo && (
            <img src={asset(brand.logo)} alt="" width={36} height={36} className="size-9 rounded-full ring-2 ring-white/20" />
          )}
          {brand.name}
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((link) => (
              <li key={link.label}>
                <SmartLink
                  link={link}
                  className={cn('inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-colors duration-200', tone.text, tone.hover)}
                >
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
        {site.sound && (
          <div className="ml-2 hidden sm:block">
            <SoundButton label={site.sound.label} playing={sound.playing} onPlay={sound.play} tone={tone} />
          </div>
        )}
        {site.theme.toggle && <ColorModeToggle mode={colorMode.mode} onChange={colorMode.setMode} tone={tone} />}

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          onClick={onOpenMenu}
          className={cn('grid size-10 cursor-pointer place-items-center rounded-full md:hidden', tone.text, tone.hover)}
        >
          <Menu aria-hidden className="size-5" />
        </button>
      </div>
    </header>
  );
}
