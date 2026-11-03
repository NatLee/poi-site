import { X } from 'lucide-react';
import { useEffect, useRef, type RefObject, type TouchEvent } from 'react';
import { cn } from '../lib/cn.ts';
import { asset } from '../lib/paths.ts';
import { panelTone } from '../lib/tone.ts';
import type { SiteConfig } from '../types.ts';
import { ColorModeToggle } from './ColorModeToggle.tsx';
import type { HeaderControls } from './Header.tsx';
import { SmartLink } from './SmartLink.tsx';
import { SoundButton } from './SoundButton.tsx';

const DESKTOP = '(min-width: 48rem)';

interface Props extends HeaderControls {
  site: SiteConfig;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The header's menu button; focus returns to it when the menu closes. */
  returnFocusTo: RefObject<HTMLButtonElement | null>;
}

/**
 * Small-screen navigation: a panel that slides in from the right over a dimmed page.
 * Tapping a link, tapping outside, pressing Escape or swiping right closes it.
 */
export function MobileMenu({ site, open, onOpenChange, sound, colorMode, returnFocusTo }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const wasOpen = useRef(false);

  const close = () => onOpenChange(false);

  // Focus: move into the panel when it opens, back to the menu button when it closes.
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>('nav a')?.focus();
    else if (wasOpen.current) returnFocusTo.current?.focus();
    wasOpen.current = open;
  }, [open, returnFocusTo]);

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

  // Widening the window past the breakpoint closes the panel (the header shows the links there).
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
    if (dx > 50 && Math.abs(dx) > Math.abs(t.clientY - start.y)) close();
  };

  const motion = 'transition duration-300 ease-out motion-reduce:transition-none';

  return (
    <div className="md:hidden">
      <div
        aria-hidden
        onClick={close}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={cn('fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm', motion, open ? 'opacity-100' : 'pointer-events-none opacity-0')}
      />
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={cn(
          'fixed inset-y-0 right-0 z-[60] flex w-[min(20rem,85vw)] flex-col overflow-y-auto bg-white dark:bg-slate-900',
          motion,
          // No shadow while parked off-screen, or it would bleed in at the right edge.
          open ? 'translate-x-0 shadow-2xl' : 'invisible translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-white/10">
          <span className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            {site.brand.logo && (
              <img src={asset(site.brand.logo)} alt="" width={32} height={32} className="size-8 rounded-full" />
            )}
            {site.brand.name}
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className={cn('grid size-10 cursor-pointer place-items-center rounded-full', panelTone.text, panelTone.hover)}
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <nav aria-label="Main" className="px-3 py-4">
          <ul className="space-y-1">
            {site.nav.map((link) => (
              <li key={link.label}>
                <SmartLink
                  link={link}
                  onClick={close}
                  className={cn('flex h-12 items-center rounded-xl px-3 text-base font-semibold', panelTone.text, panelTone.hover)}
                >
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-3 border-t border-slate-200 p-4 dark:border-white/10">
          {site.sound && (
            <SoundButton label={site.sound.label} playing={sound.playing} onPlay={sound.play} tone={panelTone} className="w-full" />
          )}
          {site.theme.toggle && (
            <ColorModeToggle mode={colorMode.mode} onChange={colorMode.setMode} tone={panelTone} showLabel className="w-full ring-1 ring-slate-200 ring-inset dark:ring-white/10" />
          )}
        </div>
      </div>
    </div>
  );
}
