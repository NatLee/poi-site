import { useRef, useState } from 'react';
import { Header, type HeaderControls } from './components/Header.tsx';
import { MobileMenu } from './components/MobileMenu.tsx';
import { useColorMode } from './hooks/useColorMode.ts';
import { useScrolledPast } from './hooks/useScrolledPast.ts';
import { useSound } from './hooks/useSound.ts';
import { cn } from './lib/cn.ts';
import { asset } from './lib/paths.ts';
import { isFullWidth } from './lib/sections.ts';
import { Footer } from './sections/Footer.tsx';
import { Hero } from './sections/Hero.tsx';
import { SectionView } from './sections/SectionView.tsx';
import type { SiteConfig } from './types.ts';

/** The whole page, built from the config. */
export function App({ site }: { site: SiteConfig }) {
  const heroRef = useRef<HTMLElement>(null);
  const solidHeader = useScrolledPast(heroRef, 0.5);
  const sound = useSound(site.sound ? asset(site.sound.src) : undefined);
  const { mode, setMode } = useColorMode(site.theme.defaultMode);
  const [menuOpen, setMenuOpen] = useState(false);

  const controls: HeaderControls = { sound, colorMode: { mode, setMode } };
  const overlap = site.sections.length > 0 && !isFullWidth(site.sections[0]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-md bg-white px-4 py-2 text-neutral-900 shadow focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <MobileMenu site={site} open={menuOpen} onOpenChange={setMenuOpen} {...controls} />

      {/* On phones the open menu pushes the whole page 275px to the right. */}
      <div
        id="top"
        inert={menuOpen}
        className={cn(
          'relative max-md:transition-[translate] max-md:duration-500 max-md:ease-out motion-reduce:transition-none',
          menuOpen && 'max-md:translate-x-[275px]',
        )}
      >
        <Header site={site} solid={solidHeader} {...controls} />
        <Hero ref={heroRef} hero={site.hero} overlap={overlap} />
        <main id="main" tabIndex={-1} className="pt-8 outline-none md:pt-0">
          {site.sections.map((section, i) => (
            <SectionView
              key={section.id}
              section={section}
              accents={site.theme.accents}
              overlapHero={i === 0 && overlap}
            />
          ))}
        </main>
        <Footer footer={site.footer} />
      </div>
    </>
  );
}
