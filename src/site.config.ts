/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  site.config.ts — everything the visitor sees lives in this one file.    │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * To make the template yours:
 *   1. Put your images and sounds in `public/` (sub-folders are fine).
 *   2. Edit the values below. Paths like `images/banner.png` point into `public/`.
 *   3. Run `npm run dev` and watch the page update as you save.
 *
 * Every field is documented in `src/types.ts`; your editor shows those notes on hover and
 * `npm run build` refuses to build when something is missing or misspelled.
 * `npm test` also checks that every file you reference here really exists in `public/`.
 *
 * Icons: pick any from https://lucide.dev/icons and import it by name (e.g. `Rocket`).
 * Brand logos such as GitHub live in `src/lib/icons.ts`.
 *
 * The content below is the demo: a landing page for poi, a KanColle browser
 * (https://github.com/poooi/poi). poi, its name, logo and screenshots belong to the poooi team.
 */
import { ChartArea, Cloud, Lock, Zap } from 'lucide-react';
import { GitHub } from './lib/icons.ts';
import type { SiteConfig } from './types.ts';

const POI_REPO = 'https://github.com/poooi/poi';

const site: SiteConfig = {
  meta: {
    title: 'POI',
    description: 'Landing page template for poi, a scalable KanColle browser and tool.',
    lang: 'en',
    favicon: 'images/poi.png',
    url: 'https://natlee.github.io/poi-site/',
    image: 'images/banner.png',
  },

  brand: {
    name: 'POI',
    logo: 'images/poi.png',
  },

  theme: {
    primary: '#e89980',
    accents: ['#e89980', '#7fcdb8', '#90b0ba', '#e5cb95'],
    defaultMode: 'system',
    toggle: true,
  },

  nav: [
    { label: 'Home', href: '#top' },
    { label: 'GitHub', href: POI_REPO },
  ],

  sound: {
    src: 'POI.mp3',
    label: 'Play POI',
  },

  forkRibbon: {
    href: 'https://github.com/NatLee/poi-site',
    label: 'Fork me on GitHub',
  },

  hero: {
    title: 'POI',
    logo: { src: 'images/header.png', width: 600, height: 330 },
    tagline: 'Scalable KanColle browser and tool.',
    actions: [
      { label: 'GitHub', href: POI_REPO, variant: 'solid' },
      { label: 'GitHub release', href: `${POI_REPO}/releases` },
      { label: 'China mainland mirror', href: 'http://pan.baidu.com/s/1kT2zGwf' },
    ],
    background: {
      image: 'images/banner.png',
      pattern: 'images/overlay.png',
      color: '#666666',
      dim: 0.25,
      fixed: true,
    },
  },

  sections: [
    {
      type: 'showcase',
      id: 'features',
      title: 'Features',
      subtitle: 'Proxy / Cache / Analysis / Notification / Plugin Support',
      image: { src: 'images/pic01.png', alt: 'Screenshot of poi', width: 803, height: 922 },
    },
    {
      type: 'cards',
      id: 'plugins',
      items: [
        {
          title: 'Available Plugins',
          text: 'Yes, you know.',
          image: { src: 'images/poi.png', alt: '', width: 200, height: 200, fit: 'contain' },
          action: { label: 'Click Me', href: `${POI_REPO}#available-plugins` },
        },
        {
          title: 'Guides for developers',
          text: 'About plugin.',
          image: { src: 'images/poi.png', alt: '', width: 200, height: 200, fit: 'contain' },
          action: { label: 'Click Me', href: `${POI_REPO}/tree/master/docs` },
        },
      ],
    },
    {
      type: 'features',
      id: 'built-with',
      items: [
        {
          title: 'Electron',
          text: 'The Electron framework lets you write cross-platform desktop applications using JavaScript, HTML and CSS. It is based on Node.js and Chromium.',
          icon: Zap,
          action: { label: 'Click Me', href: 'https://github.com/electron/electron' },
        },
        {
          title: 'React',
          text: 'React is a JavaScript library for building user interfaces.',
          icon: ChartArea,
          action: { label: 'Click Me', href: 'https://github.com/facebook/react' },
        },
        {
          title: 'ReactBootstrap',
          text: "Bootstrap makes front-end web development faster and easier. It's made for folks of all skill levels, devices of all shapes, and projects of all sizes.",
          icon: Cloud,
          action: { label: 'Click Me', href: 'https://github.com/react-bootstrap/react-bootstrap' },
        },
        {
          title: 'The MIT License',
          text: 'Yes.',
          icon: Lock,
          action: { label: 'Click Me', href: `${POI_REPO}/blob/master/LICENSE` },
        },
      ],
    },
    {
      type: 'cta',
      id: 'contributors',
      title: 'Contributors',
      text: 'poi poi poi poi',
    },
  ],

  footer: {
    social: [{ label: 'GitHub', href: POI_REPO, icon: GitHub }],
    copyright: '© POI. All rights reserved.',
    credits: { prefix: 'Design:', label: 'HTML5 UP', href: 'https://html5up.net' },
  },
};

export default site;
