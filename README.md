# poi-site

> **Archived.** A 2016 landing-page template I made for [poi](https://github.com/poooi/poi), a scalable KanColle browser and tool. It is kept for reference only and is not the official poi website.

Live preview: <https://natlee.github.io/poi-site/>

## What's inside

A single static page built on the **Alpha** template by [HTML5 UP](https://html5up.net). It introduces poi's features (proxy, cache, analysis, notifications, plugins), links to the poi repository and releases, and has a small "Play POI" sound button.

```text
.
├── index.html          # The page
├── POI.mp3             # Sound played by the "Play POI" button
├── images/             # Banner, header logo, screenshot, favicon
└── assets/
    ├── css/            # Compiled styles (main.css) + Font Awesome
    ├── sass/           # Sass sources for main.css
    ├── fonts/          # Font Awesome webfonts
    └── js/             # jQuery, skel, dropotron, scrollgress, template scripts
```

## Run locally

It is plain HTML/CSS/JS with no build step. Serve the folder with any static server, for example:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

To change styles, edit `assets/sass/main.scss` and compile it to `assets/css/main.css` with any Sass compiler.

## Deployment

GitHub Pages serves the `gh-pages` branch as-is.

## Credits

- Template: [Alpha](https://html5up.net/alpha) by HTML5 UP, under [CCA 3.0](https://html5up.net/license) (attribution is kept in the footer).
- Icons: [Font Awesome](https://fontawesome.com) 4.
- poi, its name, logo and screenshots belong to the [poooi](https://github.com/poooi) team.
