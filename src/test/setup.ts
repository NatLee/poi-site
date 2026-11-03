import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';

/** Tests flip this before rendering to simulate the visitor's OS setting. */
export const media = { prefersDark: false };

// Files marked `@vitest-environment node` (plain config checks) have no DOM to set up.
if (typeof window !== 'undefined') {
  const { cleanup } = await import('@testing-library/react');

  afterEach(() => {
    cleanup();
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('style');
  });

  // jsdom has no media playback; record calls instead.
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    writable: true,
    value: vi.fn(() => Promise.resolve()),
  });
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });

  // jsdom has no matchMedia.
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: query.includes('prefers-color-scheme: dark') ? media.prefersDark : false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
