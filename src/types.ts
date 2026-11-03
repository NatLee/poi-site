/**
 * The shape of `src/site.config.ts`. You normally never edit this file; it is here so your
 * editor can autocomplete and type-check the config, and so `npm run build` fails loudly
 * when a field is missing or misspelled.
 */
import type { ComponentType } from 'react';

/** Props the site passes to icons. */
export interface IconProps {
  className?: string;
  'aria-hidden'?: boolean;
  strokeWidth?: number;
}

/**
 * Any React icon component. Lucide icons (`import { Zap } from 'lucide-react'`, see https://lucide.dev/icons)
 * fit, and so do your own SVG components that accept `className`.
 */
export type Icon = ComponentType<IconProps>;

/**
 * A link. `href` can be:
 * - a full URL: `https://github.com/you/project`
 * - an anchor on this page: `#features` (matches a section `id`), or `#top` for the top of the page
 * - a file in `public/`: `files/manual.pdf` (the base path is added for you)
 */
export interface Link {
  label: string;
  href: string;
  /** Open in a new browser tab. Default: false. */
  newTab?: boolean;
}

/** A button-styled link. */
export interface Action extends Link {
  /** `solid` is the filled, eye-catching button; `outline` is the quieter one. Default: `outline`. */
  variant?: 'solid' | 'outline';
}

/** An image from `public/`. `width` and `height` are the file's pixel size; they stop the page from jumping while it loads. */
export interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** `cover` fills the frame edge to edge; `contain` shows the whole image on a tinted panel. Default: `cover`. */
  fit?: 'cover' | 'contain';
}

export type ColorMode = 'light' | 'dark' | 'system';

/**
 * Words the page uses for its own controls, mostly for screen readers. English by default;
 * set the ones you need when `meta.lang` is another language.
 */
export interface Labels {
  /** Link at the very top that keyboard users can use to jump past the header. */
  skipToContent: string;
  /** Name of the navigation, read out by screen readers. */
  navigation: string;
  openMenu: string;
  closeMenu: string;
  /** Name of the phone menu panel. */
  menu: string;
  /** Read out after links that open in a new tab. */
  opensInNewTab: string;
  colorSystem: string;
  colorLight: string;
  colorDark: string;
  /** Read out for the colour-mode button. `{current}` and `{next}` become mode names. */
  colorModeButton: string;
  /** Shown next to the colour-mode icon in the phone menu, and as its tooltip. `{current}` becomes the mode name. */
  colorModeShort: string;
  /** Shown instead of the page when JavaScript is turned off. */
  noscript: string;
}

export interface SiteConfig {
  /** What browsers, search engines and link previews see. */
  meta: {
    /** Browser tab title. */
    title: string;
    description: string;
    /** Page language, e.g. `en`, `zh-Hant`, `ja`. */
    lang: string;
    /** Path in `public/` to the tab icon (PNG, SVG or ICO). */
    favicon: string;
    /** Full public URL of the site. Needed only for the social preview image. */
    url?: string;
    /** Path in `public/` to the image shown in link previews (Slack, Discord, X, …). Needs `url`. */
    image?: string;
  };

  /** Name and small logo, shown in the sticky header and the mobile menu. */
  brand: {
    name: string;
    /** Square image in `public/`. */
    logo?: string;
  };

  theme: {
    /**
     * Main colour (hex). Used for solid buttons, links, highlights, focus rings and the glow in the
     * hero. Text on buttons picks black or white for contrast, and links on white get a darker
     * shade of the same colour automatically when the colour itself is too light to read.
     */
    primary: string;
    /** Feature icon tile colours (hex). Features without their own `color` take these in turn. */
    accents: string[];
    /** Colour mode for first-time visitors. `system` follows the visitor's OS setting. */
    defaultMode: ColorMode;
    /** Show the light/dark switch in the header. */
    toggle: boolean;
  };

  /** Header links, left to right. */
  nav: Link[];

  /** Optional sound button in the header, e.g. a jingle. Leave it out to hide the button. */
  sound?: {
    /** Path in `public/` to an MP3, OGG or WAV file. */
    src: string;
    label: string;
  };

  /** Optional "Fork me on GitHub" ribbon in the top-right corner (screens 1024 px and wider). Leave it out to hide it. */
  forkRibbon?: {
    href: string;
    label: string;
    /** Ribbon colour (hex). Default: dark slate `#0f172a`. */
    color?: string;
  };

  hero: Hero;

  /** The page body, top to bottom. Add, remove or reorder freely. */
  sections: Section[];

  /** Words for the page's own controls (screen-reader names, the skip link, …). Leave out to use English. */
  labels?: Partial<Labels>;

  footer: {
    /** Icon links, e.g. GitHub, X, Discord. */
    social: SocialLink[];
    copyright: string;
    /** Small print under the footer, e.g. who owns the images and under what terms. */
    note?: string;
    /** Credit line with a link, e.g. "Built with <template>" or a licence that asks for attribution. */
    credits?: Link & { prefix?: string };
  };
}

/** The dark banner at the top. */
export interface Hero {
  /** Main heading. When `logo` is set it becomes the logo's alt text instead of visible text. */
  title: string;
  /** Logo image that replaces the text heading. */
  logo?: Omit<Image, 'alt' | 'fit'>;
  tagline: string;
  actions: Action[];
  background?: {
    /** Path in `public/` to the background photo. */
    image?: string;
    /** Path in `public/` to a small tile repeated over the photo, fading out towards the edges (texture). */
    pattern?: string;
    /** Dark base colour (hex) behind the photo. Also used for the call-to-action panel. Default: `#0b1120`. */
    color?: string;
    /** How much of `color` to lay over the photo, so white text stays readable: 0 (photo as is) to 1 (photo hidden). Default: 0.75. */
    dim?: number;
    /** Keep the photo still while the page scrolls (parallax feel, wide screens only). Default: true. */
    fixed?: boolean;
  };
}

interface SectionBase {
  /** Unique id. Becomes the anchor, so `#<id>` links scroll here. Letters, digits and dashes. */
  id: string;
}

/**
 * A big framed image (e.g. a product screenshot) with a heading below it. As the first section
 * it rises into the hero.
 */
export interface ShowcaseSection extends SectionBase {
  type: 'showcase';
  title: string;
  subtitle?: string;
  /** Short keywords shown as pills under the heading. */
  highlights?: string[];
  image?: Image;
}

/** Cards with an image on top, two per row on wide screens. The whole card is clickable when it has an `action`. */
export interface CardsSection extends SectionBase {
  type: 'cards';
  /** Optional heading above the cards. */
  title?: string;
  /** Optional sentence under the heading. */
  intro?: string;
  items: Card[];
}

export interface Card {
  title: string;
  text: string;
  image?: Image;
  action?: Link;
}

/** Features with a coloured icon tile, two per row on wide screens, on a tinted full-width band. */
export interface FeaturesSection extends SectionBase {
  type: 'features';
  /** Optional heading above the grid. */
  title?: string;
  /** Optional sentence under the heading. */
  intro?: string;
  items: Feature[];
}

export interface Feature {
  title: string;
  text: string;
  icon: Icon;
  /** Icon tile colour (hex). Default: the next colour from `theme.accents`. */
  color?: string;
  action?: Link;
}

/** A dark rounded panel with a glow and a short message, e.g. "Get started" or "Thanks to our contributors". */
export interface CallToActionSection extends SectionBase {
  type: 'cta';
  title: string;
  text?: string;
  actions?: Action[];
}

export type Section = ShowcaseSection | CardsSection | FeaturesSection | CallToActionSection;

export interface SocialLink {
  label: string;
  href: string;
  icon: Icon;
}
