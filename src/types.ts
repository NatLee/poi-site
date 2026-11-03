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
    /** Main colour (hex). Used for the call-to-action band, links and focus rings. Text on it picks black or white automatically for contrast. */
    primary: string;
    /** Feature icon colours (hex). Features without their own `color` take these in turn. */
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

  /** Optional "Fork me on GitHub" corner ribbon (wide screens only). Leave it out to hide it. */
  forkRibbon?: {
    href: string;
    label: string;
    /** Ribbon colour (hex). Default: GitHub's classic red `#aa0000`. */
    color?: string;
  };

  hero: Hero;

  /** The page body, top to bottom. Add, remove or reorder freely. */
  sections: Section[];

  footer: {
    /** Icon links, e.g. GitHub, X, Discord. */
    social: SocialLink[];
    copyright: string;
    /** Credit line, e.g. for the design or a licence that asks for attribution. */
    credits?: Link & { prefix?: string };
  };
}

/** The big banner at the top. */
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
    /** Path in `public/` to a small tile repeated over the photo (texture). */
    pattern?: string;
    /** Colour behind everything (hex), also shown while the photo loads. */
    color?: string;
    /** Darken the background so white text stays readable: 0 (none) to 1 (black). Default: 0.25. */
    dim?: number;
    /** Keep the photo still while the page scrolls (parallax feel, wide screens only). Default: true. */
    fixed?: boolean;
  };
}

interface SectionBase {
  /** Unique id. Becomes the anchor, so `#<id>` links scroll here. Letters, digits and dashes. */
  id: string;
}

/** A card with a heading and a big image, e.g. a product screenshot. */
export interface ShowcaseSection extends SectionBase {
  type: 'showcase';
  title: string;
  subtitle?: string;
  image?: Image;
}

/** Side-by-side cards (two per row on wide screens). */
export interface CardsSection extends SectionBase {
  type: 'cards';
  /** Optional heading above the cards. */
  title?: string;
  items: Card[];
}

export interface Card {
  title: string;
  text: string;
  image?: Image;
  action?: Link;
}

/** A grid of features with round coloured icons (two per row on wide screens). */
export interface FeaturesSection extends SectionBase {
  type: 'features';
  /** Optional heading above the grid. */
  title?: string;
  items: Feature[];
}

export interface Feature {
  title: string;
  text: string;
  icon: Icon;
  /** Icon background (hex). Default: the next colour from `theme.accents`. */
  color?: string;
  action?: Link;
}

/** A full-width coloured band with a short message, e.g. "Get started" or "Thanks to our contributors". */
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
