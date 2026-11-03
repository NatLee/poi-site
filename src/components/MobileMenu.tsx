import { Menu, X } from 'lucide-react';
import { useEffect, useRef, type TouchEvent } from 'react';
import { asset } from '../lib/paths.ts';
import { cn } from '../lib/cn.ts';
import type { SiteConfig } from '../types.ts';
import { ColorModeToggle } from './ColorModeToggle.tsx';
import type { HeaderControls } from './Header.tsx';
import { SmartLink } from './SmartLink.tsx';
import { SoundButton } from './SoundButton.tsx';

/** Width of the slide-out panel. App pushes the page aside by the same 275px. */
const MENU_WIDTH = 'w-[275px]';
const DESKTOP = '(min-width: 48rem)';

interface Props extends HeaderControls {
  site: SiteConfig;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Small-screen navigation: a round button in the top-left corner opens a panel from the left.
 * Tapping a link, tapping outside, pressing Escape or swiping left closes it.
 */
export function MobileMenu({ site, open, onOpenChange, sound, colorMode }: Props) {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const wasOpen = useRef(false);

  const close = () => onOpenChange(false);

  // Focus: move into the panel when it opens, back to the button when it closes.
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    else if (wasOpen.current) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Escape closes; the page behind does not scroll while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', onKey);
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      root.style.overflow = previous;
    };
  }, [open, onOpenChange]);

  // Widening the window past the breakpoint closes the panel (it is not shown there).
  useEffect(() => {
    if (!open || typeof matchMedia !== 'function') return;
    const query = matchMedia(DESKTOP);
    const onChange = () => query.matches && onOpenChange(false);
    onChange();
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [open, onOpenChange]);

  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current;
    const t = e.changedTouches[0];
    touchStart.current = null;
    if (!start) return;
    const dx = t.clientX - start.x;
    if (dx < -50 && Math.abs(dx) > Math.abs(t.clientY - start.y)) close();
  };

  const motion = 'transition-[translate,opacity] duration-500 ease-out motion-reduce:transition-none';

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => onOpenChange(!open)}
        className={cn(
          'fixed top-2 left-2 z-[60] grid h-9 w-14 cursor-pointer place-items-center rounded-md bg-neutral-800/70 text-white shadow backdrop-blur-sm',
          motion,
          open && 'translate-x-[275px]',
        )}
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      <div
        aria-hidden
        onClick={close}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={cn('fixed inset-0 z-40 bg-black/40', motion, open ? 'opacity-100' : 'pointer-events-none opacity-0')}
      />

      <nav
        ref={panelRef}
        id="mobile-menu"
        aria-label="Main"
        inert={!open}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col overflow-y-auto bg-neutral-800 text-neutral-200 shadow-xl dark:bg-neutral-900',
          MENU_WIDTH,
          motion,
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <a href="#top" onClick={close} className="flex items-center gap-3 px-4 py-4 text-lg font-normal text-white">
          {site.brand.logo && (
            <img src={asset(site.brand.logo)} alt="" className="size-8 rounded-full" width={32} height={32} />
          )}
          {site.brand.name}
        </a>
        <ul className="border-t border-white/10">
          {site.nav.map((link) => (
            <li key={link.label} className="border-b border-white/5">
              <SmartLink link={link} onClick={close} className="flex h-11 items-center px-4 text-white">
                {link.label}
              </SmartLink>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-start gap-3 px-4 py-5">
          {site.sound && <SoundButton label={site.sound.label} playing={sound.playing} onPlay={sound.play} />}
          {site.theme.toggle && (
            <ColorModeToggle mode={colorMode.mode} onChange={colorMode.setMode} showLabel className="-ml-2 px-2" />
          )}
        </div>
      </nav>
    </div>
  );
}
