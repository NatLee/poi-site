import { useCallback, useEffect, useState } from 'react';
import { applyColorMode, COLOR_MODES, isColorMode, storageKey } from '../lib/color-mode.ts';
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

/**
 * The visitor's colour mode. Picking a mode saves it, so the next visit starts in the same
 * mode; `system` follows the OS setting live. Putting the mode on the page is done by
 * applyColorMode, the same function the <head> script uses before the first paint.
 */
export function useColorMode(defaultMode: ColorMode, base: string = import.meta.env.BASE_URL) {
  const key = storageKey(base);
  const [mode, setModeState] = useState<ColorMode>(() => readSaved(key) ?? defaultMode);
  // Bumped when the OS switches between light and dark, so `system` re-applies.
  const [systemChanges, setSystemChanges] = useState(0);

  useEffect(() => {
    if (typeof matchMedia !== 'function') return;
    const query = matchMedia(DARK_QUERY);
    const onChange = () => setSystemChanges((n) => n + 1);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    applyColorMode(key, defaultMode, mode, COLOR_MODES);
  }, [key, defaultMode, mode, systemChanges]);

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

  return { mode, setMode };
}
