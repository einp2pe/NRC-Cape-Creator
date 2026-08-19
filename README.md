<p align="center">
  <img src="public/logo.svg" alt="NRC Cape Creator" width="360"/>
</p>

<p align="center">
  <strong>Design custom Minecraft capes with gradients, images and a live 3D preview.</strong>
</p>

<p align="center">
  <a href="https://einp2pe.github.io/NRC-Cape-Creator/">Live demo</a>
</p>

---

## Features

**Gradient designer** — Build a gradient from any number of colours, drag the
swatches to reorder them, and switch between a vertical and a horizontal flow.
The elytra can either follow the cape or carry a gradient of its own.

**Images** — Drop a picture into the front, back or elytra zone. Every upload
goes through a cropper that locks to the cape's aspect ratio by default, or
lets you draw a free selection. Pixel art keeps its hard edges; photos are
resampled.

**Templates** — 56 presets across pride flags, seasons, gaming, Minecraft,
gradients and memes. Apply one to the cape, the elytra, or both.

**3D preview** — Live skinview3d viewer that follows the texture as you edit.
Load any player's skin by username or upload a skin file, and toggle between
cape and elytra rendering.

**Local only** — Your cape, images and skin never leave the browser. Settings
live in localStorage, uploaded images in IndexedDB. No analytics, no cookies.

---

## Getting started

Requires [Bun](https://bun.sh) (or Node 20+ with npm).

```bash
bun install     # install dependencies
bun run dev     # start the dev server
bun run build   # type-check and build for production
bun run lint    # ESLint
bun run format  # Prettier
```

---

## Cape layout

The exported texture is a standard 512×256 Minecraft cape sheet.

| Region      | Size     | Position |
| ----------- | -------- | -------- |
| Front image | 80×128   | (8, 8)   |
| Back image  | 80×128   | (96, 8)  |
| Elytra      | 80×160   | (288, 16)|
| Canvas      | 512×256  | –        |

---

## Project structure

```
src/
├── assets/fonts/       Outfit + Minecraft, the only font sources
├── components/         One folder per component: Component.tsx + Component.module.scss
├── data/templates.ts   The 56 gradient presets
├── hooks/              useCapeState — all editor state and persistence
├── icons/              SVG icon components, currentColor throughout
├── lib/utils.ts        cn() class-name helper
├── styles/             variables, viewports, mixins, fonts, globals
└── utils/              CanvasRenderer, gradient, imageStore, mojang
```

Styling is SCSS Modules on top of a CSS custom-property token layer
(`src/styles/variables.scss`). Breakpoints come from the mixins in
`src/styles/viewports.scss` — no raw media queries in component files.
