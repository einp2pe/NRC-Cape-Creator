<p align="center">
  <img src="public/logo.svg" alt="NRC Cape Creator" width="400"/>
</p>

<h1 align="center">🎮 NRC Cape Creator</h1>

<p align="center">
  <strong>Create custom Minecraft capes with gradients, emojis, text, templates, and a live 3D preview.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-usage">Usage</a>
</p>

---

<div align="center">

## 🖥️ Demo  
**🔗 Live Demo:** [NRC Cape Creator](https://einp2pe.github.io/NRC-Cape-Creator/)

</div>


---


### Fonts Included
- System: Sans-serif, Serif, Monospace, Impact, Comic Sans
- Bold & Impact: Anton, Bebas Neue, Black Ops One, Bungee, Russo One, Oswald, Titan One, Ultra
- Gaming & Tech: Orbitron, Press Start 2P, VT323, Bangers, Silkscreen
- Fun & Display: Creepster, Nosifer, Monoton, Righteous, Concert One
- Handwritten: Lobster, Pacifico, Dancing Script, Caveat, Indie Flower
- Elegant: Playfair Display, Cinzel, Abril Fatface, Fredoka

## ✨ Features

### 🎨 Gradient Designer
- Multi-color gradients — add and reorder colors freely

- Preset gradients for quick starts (Sunset, Pastel, Purple, Green, Fire, Ocean, Dark, Light)
- Direction control — vertical or horizontal gradient flow
- Live 2D canvas preview updates instantly


### 🖼️ Image Upload & Cropping
- Three image zones: front cape, back cape, and elytra wings

### (Legacy) Content Filter Details
- Blocks profanity in English and German
- Detects leetspeak and common obfuscations (e.g. f1ck, sh!t, @$$)
- Filters hate symbols and obfuscated offensive content

- Built-in cropper modal with free selection or "use full image"
- Masked elytra rendering for correct shape

### ✨ Text & Emoji Overlay
- Tile text or emoji across the cape with sizing, spacing, opacity, rotation, jitter and seed
- Large font list including system fonts and many Google Fonts
- Stroke (outline), bold and italic styling

### 🎛️ Advanced Overlay Controls
- Size: 16px — 128px
- Spacing: control distance between tiles
- Opacity: 0% — 100%
- Rotation: -180° to +180° (optional random rotation)
- Jitter & Seed: add randomness with reproducible seed
- Option to apply overlays to elytra separately

### 🧭 Templates & Presets
- Built-in template gallery grouped by category (Pride, Summer, Winter, Gaming, Minecraft, Gradients, Fun)
- Templates apply gradient and overlay defaults; can be applied to main, elytra, or both

### 🧩 3D Preview & Skin Viewer
- Live 3D preview powered by skinview3d (Three.js) that syncs with the 2D canvas
- Load Minecraft skins by username or upload a skin file
- Toggle elytra rendering in the 3D viewer

### 🛡️ Content Filter
- Built-in profanity/content filter blocks offensive text (supports common obfuscations)

### 📱 Responsive Design
- Desktop, tablet and mobile-friendly layouts
- Touch-friendly cropper and controls
- iOS safe-area aware

---

## 🚀 Getting Started

### Prerequisites
- Bun (recommended) or Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/einp2pe/NRC-Cape-Creator.git
cd NRC-Cape-Creator

# Install dependencies
bun install

# Start development server
bun run dev
```

If you prefer npm/yarn:

```bash
npm install
npm run dev
```

### Build for Production

```bash
bun run build
```

Built files are placed into `dist/`.

### Deploy to GitHub Pages

```bash
bun run deploy
```

---

## 📖 Usage

### Creating a Cape

1. Choose or create a gradient
2. Upload images for front/back/elytra and crop if needed
3. Enable text or emoji overlay and configure size, spacing, rotation and seed
4. Optionally load a template from the gallery
5. Download the resulting cape texture as PNG

### Canvas / Cape Layout

| Region | Size | Position |
|--------|------|----------|
| Gradient Area | 368×176px | Top-left |
| Front Image | 80×128px | (8, 8) |
| Back Image | 80×128px | (96, 8) |
| Elytra | 80×160px | (288, 16) |
| **Total Canvas** | **512×256px** | – |

---

## 🛠️ Tech Stack & Key Dependencies

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Canvas API | Cape rendering and composition |
| skinview3d (Three.js) | Live 3D skin/cape preview |
| bad-words | Content filtering helper |
| @react-three/fiber, three | 3D dependencies (used by viewer) |

---

## 📁 Project Structure

```
NRC-Cape-Creator/
├── public/
│   ├── logo.svg              # App logo
│   └── nrc_cape_template.png # Cape template image used for masking/preview
├── src/
│   ├── components/
│   │   ├── LeftColumn.tsx    # Image uploads, templates button, download/reset
│   │   ├── MiddleColumn.tsx  # Gradient, overlay controls, presets
│   │   ├── ImageCropper.tsx  # Cropper modal (canvas-based)
│   │   ├── GradientColorInput.tsx
│   │   ├── TemplateGallery.tsx # Template browser
│   │   └── CapePreview3D.tsx  # 3D skin & cape preview (skinview3d)
│   ├── hooks/
│   │   └── useCapeState.ts   # Centralized app state and loaders
│   ├── data/
│   │   └── templates.ts      # Built-in templates and categories
│   ├── utils/
│   │   ├── CanvasRenderer.ts # All cape drawing logic and masking
│   │   └── contentFilter.ts  # Profanity / content filtering utilities
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # App bootstrap
│   └── index.css             # Global styles
└── index.html
```

---

## 🤝 Contributing

Contributions welcome — open issues or PRs. Suggested workflow:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit and push changes
4. Open a Pull Request

---

## 🙏 Credits

- NoriskClient
- Google Fonts
- Minecraft
