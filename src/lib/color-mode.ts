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
 * Puts a colour mode on <html> (the `dark` class and `color-scheme`) and returns whether the
 * page is dark now. `chosen` is the visitor's pick; when it is null the saved pick is read
 * from localStorage, and anything not in `modes` falls back to `fallback`.
 *
 * The same function runs in two places: in the app (useColorMode) and, as source text, in a
 * <script> in <head> that runs before the first paint (colorModeScript). So it has to stay
 * self-contained: no imports, no outer variables, no inner functions.
 */
export function applyColorMode(key: string, fallback: string, chosen: string | null, modes: readonly string[]): boolean {
  let mode = chosen;
  if (mode === null) {
    try {
      mode = localStorage.getItem(key);
    } catch {
      mode = null; // storage blocked (private mode, strict privacy settings)
    }
  }
  if (mode === null || modes.indexOf(mode) < 0) mode = fallback;
  const dark = mode === 'dark' || (mode === 'system' && typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches);
  const root = document.documentElement;
  root.classList.toggle('dark', dark);
  root.style.colorScheme = dark ? 'dark' : 'light';
  return dark;
}

/** The <head> script: applyColorMode's own source, called with the saved pick, so dark-mode visitors never see a white flash. */
export function colorModeScript(key: string, defaultMode: ColorMode): string {
  const args = [key, defaultMode, null, COLOR_MODES].map((v) => JSON.stringify(v)).join(',');
  return `(${applyColorMode.toString()})(${args});`;
}
