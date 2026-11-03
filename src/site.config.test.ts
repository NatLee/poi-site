// @vitest-environment node
/**
 * Sanity checks for site.config.ts. When you edit the config, `npm test` tells you about
 * typos before visitors find them: missing files, duplicate ids, broken anchors, bad colours.
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { PAGE_IDS } from './lib/anchors.ts';
import { isExternal } from './lib/paths.ts';
import { parseHex } from './lib/color.ts';
import { heroBackground } from './lib/defaults.ts';
import site from './site.config.ts';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

function localFiles(): string[] {
  const files = [site.meta.favicon, site.meta.image, site.brand.logo, site.sound?.src];
  const { hero } = site;
  files.push(hero.logo?.src, hero.background?.image, hero.background?.pattern);
  for (const s of site.sections) {
    if (s.type === 'showcase') files.push(s.image?.src);
    if (s.type === 'cards') s.items.forEach((c) => files.push(c.image?.src));
  }
  return files.filter((f): f is string => Boolean(f) && !isExternal(f!));
}

function allHrefs(): string[] {
  const hrefs = [...site.nav, ...site.hero.actions, ...site.footer.social].map((l) => l.href);
  for (const s of site.sections) {
    if (s.type === 'cards' || s.type === 'features') s.items.forEach((i) => i.action && hrefs.push(i.action.href));
    if (s.type === 'cta') (s.actions ?? []).forEach((a) => hrefs.push(a.href));
  }
  if (site.footer.credits) hrefs.push(site.footer.credits.href);
  if (site.forkRibbon) hrefs.push(site.forkRibbon.href);
  return hrefs;
}

describe('site.config.ts', () => {
  it.each(localFiles())('public/%s exists', (file) => {
    expect(existsSync(publicDir + file.replace(/^\/+/, ''))).toBe(true);
  });

  it('section ids are unique, usable as anchors and not taken by the page itself', () => {
    const ids = site.sections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z][\w-]*$/i);
      expect(Object.values(PAGE_IDS), id).not.toContain(id);
    }
  });

  it('every #anchor link points at a section (or #top)', () => {
    const targets = new Set([PAGE_IDS.top, PAGE_IDS.main, ...site.sections.map((s) => s.id)]);
    for (const href of allHrefs().filter((h) => h.startsWith('#'))) {
      expect(targets, href).toContain(href.slice(1));
    }
  });

  it('colours are valid hex', () => {
    for (const c of [site.theme.primary, ...site.theme.accents, site.hero.background?.color, site.forkRibbon?.color]) {
      if (c) expect(() => parseHex(c)).not.toThrow();
    }
  });

  it('hero dim is between 0 and 1', () => {
    const { dim } = heroBackground(site);
    expect(dim).toBeGreaterThanOrEqual(0);
    expect(dim).toBeLessThanOrEqual(1);
  });
});
