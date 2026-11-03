import { useCallback, useEffect, useState } from 'react';
import { isColorMode, storageKey } from '../lib/color-mode.ts';
import type { ColorMode } from '../types.ts';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function readSaved(key: string): ColorMode | null {
  try {
    const value = localStorage.getItem(key);
    return isColorMode(value) ? value : null;
  } catch {
    return null; // storage blocked (private mode, strict privacy settings)
  }
}

function systemIsDark(): boolean {
  return typeof matchMedia === 'function' && matchMedia(DARK_QUERY).matches;
}

/**
 * The visitor's colour mode: what they picked (`mode`) and what is on screen (`isDark`).
 * Picking a mode saves it, so the next visit starts in the same mode.
 */
export function useColorMode(defaultMode: ColorMode, base: string = import.meta.env.BASE_URL) {
  const key = storageKey(base);
  const [mode, setModeState] = useState<ColorMode>(() => readSaved(key) ?? defaultMode);
  const [systemDark, setSystemDark] = useState(systemIsDark);

  useEffect(() => {
    if (typeof matchMedia !== 'function') return;
    const query = matchMedia(DARK_QUERY);
    const onChange = () => setSystemDark(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const isDark = mode === 'dark' || (mode === 'system' && systemDark);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const setMode = useCallback(
    (next: ColorMode) => {
      setModeState(next);
      try {
        localStorage.setItem(key, next);
      } catch {
        // Not saved; the choice still applies until the page is closed.
      }
    },
    [key],
  );

  return { mode, isDark, setMode };
}
