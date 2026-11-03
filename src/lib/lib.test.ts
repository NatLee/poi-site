import { describe, expect, it } from 'vitest';
import site from '../site.config.ts';
import { colorModeScript, nextMode, storageKey } from './color-mode.ts';
import { contrast, INK, PAPER, parseHex, readableOn } from './color.ts';
import { renderHead } from './head.ts';
import { isExternal, withBase } from './paths.ts';

describe('withBase', () => {
  it('adds the base path to files from public/', () => {
    expect(withBase('images/a.png', '/poi-site/')).toBe('/poi-site/images/a.png');
    expect(withBase('/images/a.png', '/poi-site/')).toBe('/poi-site/images/a.png');
    expect(withBase('./POI.mp3', '/poi-site')).toBe('/poi-site/POI.mp3');
    expect(withBase('POI.mp3', '/')).toBe('/POI.mp3');
  });

  it('leaves full URLs and page anchors alone', () => {
    for (const href of ['https://github.com/poooi/poi', 'http://pan.baidu.com/s/1kT2zGwf', 'mailto:a@b.c', '//cdn.example.com/x.js', '#top']) {
      expect(withBase(href, '/poi-site/')).toBe(href);
    }
    expect(isExternal('images/a.png')).toBe(false);
  });
});

describe('colours', () => {
  it('parses short and long hex', () => {
    expect(parseHex('#e89980')).toEqual([232, 153, 128]);
    expect(parseHex('#fff')).toEqual([255, 255, 255]);
    expect(() => parseHex('salmon')).toThrow(/hex/);
  });

  it('picks the readable text colour', () => {
    // White on the old salmon band was only ~2.3:1; dark text gives ~6.6:1.
    expect(readableOn('#e89980')).toBe(INK);
    expect(contrast(readableOn('#e89980'), '#e89980')).toBeGreaterThan(4.5);
    expect(readableOn('#aa0000')).toBe(PAPER);
    expect(readableOn('#1e3a8a')).toBe(PAPER);
  });
});

describe('colour mode helpers', () => {
  it('cycles system → light → dark → system', () => {
    expect(nextMode('system')).toBe('light');
    expect(nextMode('light')).toBe('dark');
    expect(nextMode('dark')).toBe('system');
  });

  it('keys storage by base path so sites on one github.io origin do not clash', () => {
    expect(storageKey('/poi-site/')).not.toBe(storageKey('/other-site/'));
  });

  it('head script applies the saved mode before React loads', () => {
    const key = storageKey('/poi-site/');
    localStorage.setItem(key, 'dark');
    new Function(colorModeScript(key, 'light'))();
    expect(document.documentElement).toHaveClass('dark');
    localStorage.setItem(key, 'nonsense');
    new Function(colorModeScript(key, 'light'))();
    expect(document.documentElement).not.toHaveClass('dark');
  });
});

describe('renderHead', () => {
  const head = renderHead(site, '/poi-site/');

  it('puts the title, description and favicon from the config into the page head', () => {
    expect(head).toContain('<title>POI</title>');
    expect(head).toContain('content="Landing page template for poi, a scalable KanColle browser and tool."');
    expect(head).toContain('<link rel="icon" href="/poi-site/images/poi.png" />');
  });

  it('builds an absolute social preview image URL', () => {
    expect(head).toContain('<meta property="og:image" content="https://natlee.github.io/poi-site/images/banner.png" />');
  });

  it('escapes HTML in config text', () => {
    const evil = renderHead({ ...site, meta: { ...site.meta, title: 'A <b> & "c"' } }, '/');
    expect(evil).toContain('<title>A &lt;b&gt; &amp; &quot;c&quot;</title>');
  });
});
