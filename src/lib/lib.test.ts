import { describe, expect, it } from 'vitest';
import site from '../site.config.ts';
import { colorModeScript, nextMode, storageKey } from './color-mode.ts';
import { contrast, INK, inkOn, PAPER, parseHex, readableOn } from './color.ts';
import { darkSurface, DEFAULTS, featureColor, heroBackground } from './defaults.ts';
import { fillIndexHtml, renderHead } from './head.ts';
import { isExternal, normalizeBase, resolveBase, withBase } from './paths.ts';

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
    expect(parseHex('#fb923c')).toEqual([251, 146, 60]);
    expect(parseHex('#fff')).toEqual([255, 255, 255]);
    expect(() => parseHex('salmon')).toThrow(/hex/);
  });

  it('picks the readable text colour', () => {
    // White on light orange is only ~2.3:1; dark text is well over 4.5:1.
    expect(readableOn('#fb923c')).toBe(INK);
    expect(contrast(readableOn('#fb923c'), '#fb923c')).toBeGreaterThan(4.5);
    expect(readableOn('#2dd4bf')).toBe(INK);
    expect(readableOn('#aa0000')).toBe(PAPER);
    expect(readableOn('#1e3a8a')).toBe(PAPER);
  });

  it('darkens a light primary until it is readable as text on white', () => {
    const ink = inkOn('#2dd4bf');
    expect(contrast(ink, '#ffffff')).toBeGreaterThanOrEqual(4.5);
    expect(ink).not.toBe('#2dd4bf');
    expect(inkOn('#1e3a8a')).toBe('#1e3a8a'); // already dark enough: unchanged
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

describe('defaults', () => {
  const bare = { hero: { title: 'x', tagline: 'y', actions: [] } };

  it('fills every hero background default from one table', () => {
    expect(heroBackground(bare)).toEqual({ image: undefined, pattern: undefined, color: DEFAULTS.ink, dim: DEFAULTS.dim, fixed: DEFAULTS.fixed });
    expect(heroBackground({ hero: { ...bare.hero, background: { dim: 0, fixed: false } } })).toMatchObject({ dim: 0, fixed: false });
  });

  it('gives the hero and the call-to-action panel the same dark surface', () => {
    expect(darkSurface(site)).toEqual({ ink: site.hero.background?.color, texture: site.hero.background?.pattern });
    expect(darkSurface(bare).ink).toBe(DEFAULTS.ink);
  });

  it('cycles accents for features without a colour, and survives an empty list', () => {
    expect(featureColor({}, 5, ['#111111', '#222222'])).toBe('#222222');
    expect(featureColor({ color: '#333333' }, 0, ['#111111'])).toBe('#333333');
    expect(featureColor({}, 0, [])).toBe(DEFAULTS.accent);
  });

  it('uses the same ink for the browser theme colour as for the page', () => {
    expect(renderHead({ ...site, hero: { ...site.hero, background: undefined } }, '/')).toContain(`content="${DEFAULTS.ink}"`);
  });
});

describe('base path', () => {
  it('normalises any spelling to /x/ or /', () => {
    for (const v of ['poi-site', '/poi-site', 'poi-site/', ' //poi-site// ']) expect(normalizeBase(v)).toBe('/poi-site/');
    for (const v of ['', '/', '//']) expect(normalizeBase(v)).toBe('/');
  });

  it('takes BASE_PATH first, then the path of meta.url, then the root', () => {
    expect(resolveBase('/from-env/', 'https://you.github.io/my-site/')).toBe('/from-env/');
    expect(resolveBase('', 'https://you.github.io/my-site/')).toBe('/'); // BASE_PATH set but empty: root
    expect(resolveBase(undefined, 'https://you.github.io/my-site/')).toBe('/my-site/');
    expect(resolveBase(undefined, 'https://example.com')).toBe('/');
    expect(resolveBase(undefined, undefined)).toBe('/');
  });
});

describe('fillIndexHtml', () => {
  const html = '<html lang="%SITE_LANG%"><head><!-- site-head --></head><body><noscript>%SITE_NOSCRIPT%</noscript></body></html>';

  it('fills language, head tags and the no-JavaScript text from the config', () => {
    const out = fillIndexHtml(html, { ...site, meta: { ...site.meta, lang: 'zh-Hant' }, labels: { noscript: '請開啟 JavaScript' } }, '/x/');
    expect(out).toContain('<html lang="zh-Hant">');
    expect(out).toContain('<title>POI</title>');
    expect(out).toContain('<noscript>請開啟 JavaScript</noscript>');
  });

  it('fails loudly when index.html lost a placeholder', () => {
    expect(() => fillIndexHtml(html.replace('%SITE_LANG%', 'en'), site, '/')).toThrow(/%SITE_LANG%/);
  });
});
