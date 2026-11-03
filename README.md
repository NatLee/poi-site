# poi-site

[![CI](https://github.com/NatLee/poi-site/actions/workflows/ci.yml/badge.svg)](https://github.com/NatLee/poi-site/actions/workflows/ci.yml)
[![Deploy](https://github.com/NatLee/poi-site/actions/workflows/deploy.yml/badge.svg)](https://github.com/NatLee/poi-site/actions/workflows/deploy.yml)
![React 19](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![Vite 8](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)

A one-page landing site template built with React, TypeScript and Tailwind CSS. Everything a visitor
sees (name, tagline, links, sections, images, colours, even the button sound) lives in **one file**,
[`src/site.config.ts`](src/site.config.ts). Edit it, push, and GitHub Pages publishes your site.
The demo content is a landing page for [poi](https://github.com/poooi/poi), a KanColle browser.

**Live demo:** <https://natlee.github.io/poi-site/>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/desktop-dark.jpg">
  <img src="docs/images/desktop-light.jpg" alt="The demo site on a desktop screen: a banner with the poi logo, tagline and three buttons">
</picture>

<p>
  <img src="docs/images/mobile-light.jpg" width="250" alt="The demo site on a phone in light mode">
  <img src="docs/images/mobile-dark.jpg" width="250" alt="The demo site on a phone in dark mode">
  <img src="docs/images/mobile-menu.jpg" width="250" alt="The phone menu slid open from the left">
</p>

## What you get

- **One config file.** Typed and commented, so your editor autocompletes it and the build stops on typos.
- **Building blocks you can reorder:** a hero banner, a showcase card with a big screenshot, side-by-side
  cards, a feature grid with round coloured icons, a coloured call-to-action band, and a footer.
- **Light, dark and system colour modes**, remembered per visitor, with no white flash on load.
- **Works on phones:** a slide-out menu that closes on a tap outside, Escape or a swipe to the left.
- **Small touches:** a header that turns into a sticky bar after the banner, an optional button sound,
  an optional "Fork me on GitHub" ribbon, and readable text on any primary colour.
- **Accessible:** skip link, keyboard-friendly menu, alt text, focus rings, and an automated
  [axe](https://github.com/dequelabs/axe-core) check in the test suite.
- **Deploys itself:** pushing to `gh-pages` (or `main`) builds and publishes to GitHub Pages.

## Quick start

You need [Node.js](https://nodejs.org) 22.13 or newer (24 LTS recommended).

1. Get a copy: click **Use this template** on GitHub, or clone it:

   ```bash
   git clone https://github.com/NatLee/poi-site.git my-site
   cd my-site
   ```

2. Install and start the dev server:

   ```bash
   npm ci
   npm run dev
   ```

   Open the address it prints (<http://localhost:5173/poi-site/>). The page reloads as you save.

3. Open `src/site.config.ts` and start replacing the poi content with yours.

## Make it yours

Put your images, icons and sounds in `public/`, then point the config at them with paths like
`images/banner.png`. The base path for GitHub Pages is added for you.

Change the name, tagline and buttons:

```ts
hero: {
  title: 'Acme Rocket',
  tagline: 'Gets you to orbit before lunch.',
  actions: [
    { label: 'Download', href: 'https://github.com/acme/rocket/releases', variant: 'solid' },
    { label: 'Docs', href: '#features' },
  ],
  background: { image: 'images/launch.jpg', color: '#1e293b' },
},
```

Add a section: drop another entry into `sections`. Icons come from [Lucide](https://lucide.dev/icons);
import the ones you use at the top of the config.

```ts
import { Rocket } from 'lucide-react';

sections: [
  // …
  {
    type: 'features',
    id: 'why',
    title: 'Why Acme',
    items: [
      { title: 'Fast', text: 'Very.', icon: Rocket, action: { label: 'Benchmarks', href: 'https://example.com' } },
    ],
  },
  { type: 'cta', id: 'start', title: 'Ready?', actions: [{ label: 'Get started', href: '#top', variant: 'solid' }] },
],
```

Section types: `showcase`, `cards`, `features` and `cta`. Each `id` becomes an anchor, so `#why` links
scroll to it. To add a new type, add it to the `Section` union in [`src/types.ts`](src/types.ts), write a
component in `src/sections/`, and add a `case` in [`SectionView.tsx`](src/sections/SectionView.tsx).

Other things you can change in the config:

| Setting | What it does |
|---|---|
| `meta` | Tab title, description, favicon, language, and the link-preview image |
| `theme.primary` | Main colour (call-to-action band, focus rings). Text on it picks black or white for contrast |
| `theme.accents` | Feature icon colours, used in turn |
| `theme.defaultMode`, `theme.toggle` | First-visit colour mode (`system`, `light`, `dark`) and whether to show the switch |
| `nav` | Header links |
| `sound` | The header sound button. Delete it to hide the button |
| `forkRibbon` | The corner ribbon. Delete it to hide the ribbon |
| `footer` | Icon links, copyright and credits |

Every field is described in [`src/types.ts`](src/types.ts); hover over a field in your editor to see it.
`npm test` also checks the config: it fails when a file is missing from `public/`, an `#anchor` has no
section, or a colour is not a hex value.

The typeface is Source Sans 3. To change it, swap the `@fontsource-variable/…` import and the
`--font-sans` line in [`src/index.css`](src/index.css).

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with live reload |
| `npm test` | Tests: config checks, page behaviour, accessibility |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no output files |
| `npm run build` | Type-check, then build the site into `dist/` |
| `npm run preview` | Serve `dist/` locally to try the production build |
| `npm run check` | Lint, type-check, test and build in one go |

## Deploy to GitHub Pages

1. Push your copy to GitHub.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `gh-pages` or `main`. The [deploy workflow](.github/workflows/deploy.yml) lints, tests,
   builds and publishes. The site appears at `https://<you>.github.io/<repo>/`.

The workflow reads the right base path from GitHub, so a copy named `my-site` is served from `/my-site/`
and a `<you>.github.io` repository or a custom domain from `/`, without editing anything.

To build for another host, set `BASE_PATH` yourself:

```bash
BASE_PATH=/ npm run build        # site at the root of a domain
BASE_PATH=/docs/ npm run build   # site under /docs/
```

In Git Bash on Windows, put `MSYS_NO_PATHCONV=1` in front, or Git Bash rewrites `/` into a Windows path.

## Project layout

```text
.
├── public/               # Images and sounds used by the config, copied as-is
├── src/
│   ├── site.config.ts    # ← all the content: edit this
│   ├── types.ts          # What each config field means
│   ├── sections/         # Hero, Showcase, CardGrid, FeatureGrid, CallToAction, Footer
│   ├── components/       # Header, MobileMenu, buttons, links, colour-mode switch, …
│   ├── hooks/            # Colour mode, sound, "scrolled past the hero"
│   └── lib/              # Small helpers (paths, colours, <head> tags, brand icons)
├── docs/images/          # Screenshots for this README
├── index.html            # Page shell; <head> is filled in from the config at build time
└── .github/workflows/    # CI for pull requests, deploy to Pages
```

## History

This started in 2016 as a static page on the [Alpha](https://html5up.net/alpha) template by HTML5 UP,
with jQuery and Font Awesome. In 2026 it was rebuilt as this React + Tailwind template; every section,
link, image, the sound and the header and menu behaviour were carried over. The old static version is
in the git history (commit `86338c8`).

## Credits

- Layout and look follow [Alpha](https://html5up.net/alpha) by HTML5 UP, released under
  [CCA 3.0](https://html5up.net/license), which asks for attribution. That's why the footer says
  "Design: HTML5 UP"; keep it or credit them elsewhere if you reuse the design.
- Icons: [Lucide](https://lucide.dev) (ISC). GitHub mark from [Simple Icons](https://simpleicons.org) (CC0).
- Font: [Source Sans 3](https://github.com/adobe-fonts/source-sans) (SIL Open Font License), via Fontsource.
- poi, its name, logo, screenshots and sound belong to the [poooi](https://github.com/poooi) team.
  Replace them with your own content when you use the template.
