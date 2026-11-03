import type { ColorMode } from '../types.ts';

export const COLOR_MODES: readonly ColorMode[] = ['system', 'light', 'dark'];

/**
 * localStorage key for the visitor's choice. It includes the base path because every
 * GitHub Pages project site of one account shares the same origin (and the same storage).
 */
export function storageKey(base: string): string {
  return `${base}:color-mode`;
}

export function isColorMode(value: unknown): value is ColorMode {
  return typeof value === 'string' && (COLOR_MODES as readonly string[]).includes(value);
}

/** The next mode for the toggle button: system → light → dark → system. */
export function nextMode(mode: ColorMode): ColorMode {
  return COLOR_MODES[(COLOR_MODES.indexOf(mode) + 1) % COLOR_MODES.length];
}

/**
 * A tiny script for the <head> that applies the saved mode before the first paint,
 * so dark-mode visitors never see a white flash. Keep it in sync with useColorMode().
 */
export function colorModeScript(key: string, defaultMode: ColorMode): string {
  return `(function(){try{var m=localStorage.getItem(${JSON.stringify(key)});if(m!=='light'&&m!=='dark'&&m!=='system')m=${JSON.stringify(defaultMode)};var d=m==='dark'||(m==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light'}catch(_){}})();`;
}
