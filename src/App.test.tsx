import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { App } from './App.tsx';
import site from './site.config.ts';
import { media } from './test/setup.ts';
import type { SiteConfig } from './types.ts';

const BASE = import.meta.env.BASE_URL;

function renderApp(config: SiteConfig = site) {
  return render(<App site={config} />);
}

/** Every link the config defines, with the href the page should use. */
function configLinks(config: SiteConfig) {
  const links: { label: string; href: string }[] = [];
  links.push(...config.nav, ...config.hero.actions);
  for (const s of config.sections) {
    if (s.type === 'cards') s.items.forEach((c) => c.action && links.push(c.action));
    if (s.type === 'features') s.items.forEach((f) => f.action && links.push(f.action));
    if (s.type === 'cta') links.push(...(s.actions ?? []));
  }
  if (config.footer.credits) links.push(config.footer.credits);
  if (config.forkRibbon) links.push(config.forkRibbon);
  return links;
}

describe('page content comes from the config', () => {
  it('shows the hero logo, tagline and every section heading', () => {
    renderApp();
    expect(screen.getByRole('heading', { level: 1, name: 'POI' })).toBeInTheDocument();
    expect(screen.getByText(site.hero.tagline)).toBeInTheDocument();
    for (const name of ['Features', 'Available Plugins', 'Guides for developers', 'Built with', 'Electron', 'React', 'ReactBootstrap', 'The MIT License', 'Contributors']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
    for (const item of ['Proxy', 'Cache', 'Analysis', 'Notification', 'Plugin Support']) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    expect(screen.getByText('poi poi poi poi')).toBeInTheDocument();
    expect(screen.getByText('© POI. All rights reserved.')).toBeInTheDocument();
    expect(screen.getByText(site.footer.note!)).toBeInTheDocument();
  });

  it('renders every configured link with its original target', () => {
    renderApp();
    const anchors = [...document.querySelectorAll('a')];
    for (const link of configLinks(site)) {
      const match = anchors.find((a) => a.textContent?.trim() === link.label && a.getAttribute('href') === link.href);
      expect(match, `${link.label} → ${link.href}`).toBeTruthy();
    }
    // Footer icon link
    expect(within(screen.getByRole('contentinfo')).getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/poooi/poi',
    );
  });

  it('prefixes images from public/ with the base path', () => {
    renderApp();
    expect(screen.getByRole('img', { name: 'POI' })).toHaveAttribute('src', `${BASE}images/header.png`);
    expect(screen.getByRole('img', { name: 'Screenshot of poi' })).toHaveAttribute('src', `${BASE}images/pic01.png`);
  });

  it('drops optional parts that are left out of the config', () => {
    const bare: SiteConfig = { ...site, sound: undefined, forkRibbon: undefined, theme: { ...site.theme, toggle: false } };
    renderApp(bare);
    expect(screen.queryByRole('button', { name: /play poi/i })).toBeNull();
    expect(screen.queryByText('Fork me on GitHub')).toBeNull();
    expect(screen.queryByRole('button', { name: /color theme/i })).toBeNull();
  });
});

describe('labels', () => {
  it('uses the words from the config for its own controls, English for the rest', () => {
    renderApp({ ...site, labels: { openMenu: '開啟選單', skipToContent: '跳到主內容', colorSystem: '跟隨系統', colorLight: '淺色' } });
    expect(screen.getByRole('button', { name: '開啟選單' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '跳到主內容' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Color theme: 跟隨系統. Switch to 淺色.' }).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument(); // not set: English default
  });
});

describe('sound button', () => {
  it('plays the sound from the start on every click', async () => {
    const user = userEvent.setup();
    renderApp();
    const [button] = screen.getAllByRole('button', { name: 'Play POI' });
    const play = HTMLMediaElement.prototype.play as unknown as { mock: { calls: unknown[]; contexts: HTMLAudioElement[] } };
    const before = play.mock.calls.length;
    await user.click(button);
    await user.click(button);
    expect(play.mock.calls.length - before).toBe(2);
    const audio = play.mock.contexts.at(-1)!;
    expect(audio.src).toContain(`${BASE}POI.mp3`);
    expect(audio.currentTime).toBe(0);
  });

  it('is also in the mobile menu (the old site had no way to play it on phones)', () => {
    renderApp();
    expect(within(document.getElementById('mobile-menu')!).getByRole('button', { name: 'Play POI' })).toBeInTheDocument();
  });
});

describe('header', () => {
  it('turns into a solid bar after scrolling past half of the hero, and back', () => {
    renderApp();
    const header = document.querySelector('header')!;
    expect(header).toHaveAttribute('data-solid', 'false');
    act(() => {
      window.scrollY = 500;
      fireEvent.scroll(window);
    });
    expect(header).toHaveAttribute('data-solid', 'true');
    act(() => {
      window.scrollY = 0;
      fireEvent.scroll(window);
    });
    expect(header).toHaveAttribute('data-solid', 'false');
  });
});

describe('mobile menu', () => {
  it('opens from the header button and closes with Escape, the close button, a link tap or a right swipe', async () => {
    const user = userEvent.setup();
    renderApp();
    const open = screen.getByRole('button', { name: 'Open menu' });
    const panel = document.getElementById('mobile-menu')!;
    const page = document.getElementById('top')!;
    const isOpen = () => open.getAttribute('aria-expanded') === 'true';
    expect(panel).toHaveAttribute('inert');

    await user.click(open);
    expect(isOpen()).toBe(true);
    expect(panel).not.toHaveAttribute('inert');
    expect(page).toHaveAttribute('inert'); // the page behind cannot be clicked or tabbed into
    expect(within(panel).getByRole('link', { name: 'Home' })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(isOpen()).toBe(false);
    expect(open).toHaveFocus();

    await user.click(open);
    await user.click(within(panel).getByRole('button', { name: 'Close menu' }));
    expect(isOpen()).toBe(false);

    await user.click(open);
    await user.click(within(panel).getByRole('link', { name: 'Home' }));
    expect(isOpen()).toBe(false);

    await user.click(open);
    fireEvent.touchStart(panel, { touches: [{ clientX: 220, clientY: 100 }] });
    fireEvent.touchEnd(panel, { changedTouches: [{ clientX: 90, clientY: 110 }] });
    expect(isOpen()).toBe(true); // swiping left does nothing
    fireEvent.touchStart(panel, { touches: [{ clientX: 60, clientY: 100 }] });
    fireEvent.touchEnd(panel, { changedTouches: [{ clientX: 200, clientY: 110 }] });
    expect(isOpen()).toBe(false);
  });

  it('closes when the window gets wide enough that CSS hides the menu button', async () => {
    const user = userEvent.setup();
    renderApp();
    const open = screen.getByRole('button', { name: 'Open menu' });
    await user.click(open);
    expect(open).toHaveAttribute('aria-expanded', 'true');
    open.style.display = 'none'; // what md:hidden does on a wide screen
    fireEvent(window, new Event('resize'));
    expect(open).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('accessibility', () => {
  // jsdom cannot compute colours, so contrast is checked separately (lib.test.ts) and by eye.
  const options = { rules: { 'color-contrast': { enabled: false } } };

  it('has no axe violations, with the mobile menu closed or open', async () => {
    const user = userEvent.setup();
    const { container } = renderApp();
    expect((await axe.run(container, options)).violations).toEqual([]);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect((await axe.run(container, options)).violations).toEqual([]);
  });
});

describe('colour mode', () => {
  it('starts from the system setting and cycles System → Light → Dark, remembering the choice', async () => {
    const user = userEvent.setup();
    media.prefersDark = true;
    try {
      renderApp();
      const root = document.documentElement;
      expect(root).toHaveClass('dark');
      const [toggle] = screen.getAllByRole('button', { name: /color theme: system/i });

      await user.click(toggle);
      expect(root).not.toHaveClass('dark');
      expect(localStorage.getItem(`${BASE}:color-mode`)).toBe('light');

      await user.click(screen.getAllByRole('button', { name: /color theme: light/i })[0]);
      expect(root).toHaveClass('dark');
      expect(localStorage.getItem(`${BASE}:color-mode`)).toBe('dark');
    } finally {
      media.prefersDark = false;
    }
  });

  it('uses a saved choice over the default', () => {
    localStorage.setItem(`${BASE}:color-mode`, 'dark');
    renderApp();
    expect(document.documentElement).toHaveClass('dark');
  });
});
