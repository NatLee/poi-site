import { useCallback, useRef, useState } from 'react';
import { Header, type HeaderControls } from './components/Header.tsx';
import { MobileMenu } from './components/MobileMenu.tsx';
import { useColorMode } from './hooks/useColorMode.ts';
import { useScrolledPast } from './hooks/useScrolledPast.ts';
import { useSound } from './hooks/useSound.ts';
import { asset } from './lib/paths.ts';
import { canOverlapHero } from './lib/sections.ts';
import { Footer } from './sections/Footer.tsx';
import { Hero } from './sections/Hero.tsx';
import { SectionView } from './sections/SectionView.tsx';
import type { SiteConfig } from './types.ts';

/** The whole page, built from the config. */
export function App({ site }: { site: SiteConfig }) {
  const heroRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const solidHeader = useScrolledPast(heroRef, 0.5);
  const sound = useSound(site.sound ? asset(site.sound.src) : undefined);
  const { mode, setMode } = useColorMode(site.theme.defaultMode);
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  const controls: HeaderControls = { sound, colorMode: { mode, setMode } };
  const overlap = site.sections.length > 0 && canOverlapHero(site.sections[0]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-lg bg-white px-4 py-2 font-semibold text-slate-900 shadow-lg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      {/* While the phone menu is open, the page behind it cannot be clicked or tabbed into. */}
      <div id="top" inert={menuOpen}>
        <Header
          site={site}
          solid={solidHeader}
          menuOpen={menuOpen}
          onOpenMenu={openMenu}
          menuButtonRef={menuButtonRef}
          {...controls}
        />
        <Hero ref={heroRef} hero={site.hero} overlap={overlap} />
        <main id="main" tabIndex={-1} className="outline-none">
          {site.sections.map((section, i) => (
            <SectionView key={section.id} section={section} site={site} overlapHero={i === 0 && overlap} />
          ))}
        </main>
        <Footer footer={site.footer} brand={site.brand} />
      </div>

      <MobileMenu site={site} open={menuOpen} onOpenChange={setMenuOpen} returnFocusTo={menuButtonRef} {...controls} />
    </>
  );
}
