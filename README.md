<p align="center">
  <img src="public/logo.svg" alt="NRC Cape Creator" width="400"/>
</p>

<h1 align="center">🎮 NRC Cape Creator</h1>

<p align="center">
  <strong>Create stunning custom Minecraft capes with gradients, emojis, text, and more!</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-tech-stack">Tech Stack</a>
</p>

---

<p align="center">
  Website:
</p>
<p align="center">
  [NRC Cape Creator](https://einp2pe.github.io/NRC-Cape-Creator/)
</p>

---

## ✨ Features

### 🎨 Gradient Designer
- **Multi-color gradients** – Add unlimited colors to create unique gradients
- **8 preset gradients** – Sunset, Pastel, Purple, Green, Fire, Ocean, Dark, Light
- **Direction control** – Vertical or horizontal gradient flow
- **Live preview** – See changes instantly as you design

### 🖼️ Image Upload & Cropping
- **Three image zones** – Front cape, back cape, and elytra wings
- **Built-in cropper** – Crop your images to perfect proportions
- **Smart positioning** – Images are automatically placed in the correct cape regions
- **Easy removal** – Remove individual images with one click

### ✨ Text & Emoji Overlay
- **Text or emoji patterns** – Tile any text or emoji across your cape
- **50+ Google Fonts** – Organized in categories:
  - 🖥️ System fonts
  - 🔥 Bold & Impact (Anton, Bebas Neue, Black Ops One, Bungee...)
  - 🎮 Gaming & Tech (Orbitron, Press Start 2P, VT323...)
  - 🎉 Fun & Display (Creepster, Nosifer, Monoton...)
  - ✍️ Handwritten (Lobster, Pacifico, Dancing Script...)
  - 🏛️ Elegant (Playfair Display, Cinzel...)

### 🎛️ Advanced Overlay Controls
| Control | Description |
|---------|-------------|
| **Size** | 16px – 128px |
| **Spacing** | Control distance between tiles |
| **Opacity** | 0% – 100% transparency |
| **Rotation** | -180° to +180° angle |
| **Random Rotation** | Randomize each tile's angle |
| **Jitter** | Add position randomness |
| **Seed** | Reproducible random patterns |
| **Elytra Toggle** | Include/exclude wings |

### 🎨 Text Styling
- **Color picker** – Any color for your text
- **Bold & Italic** – Style toggles
- **Stroke/Outline** – Customizable stroke color and width (1-10px)

### 🛡️ Content Filter
Built-in safety system that blocks:
- ❌ Profanity (English & German)
- ❌ Leetspeak variations (f1ck, sh!t, @$$...)
- ❌ Hate symbols and patterns
- ❌ Obfuscated offensive content

### 📱 Responsive Design
- **Desktop** – Full-featured experience
- **Tablet** – Optimized layout
- **Mobile** – Touch-friendly controls
- **Ultra-wide (21:9)** – Extended layout
- **Tall phones (19:9)** – Compact mode
- **iOS Safe Areas** – Notch-aware design

---

## 🖥️ Demo

**🔗 Live Demo:** [NRC Cape Creator](https://einp2pe.github.io/NRC-Cape-Creator/)

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 18+

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

### Build for Production

```bash
bun run build
```

The built files will be in the `dist/` folder.

### Deploy to GitHub Pages

```bash
bun run deploy
```

---

## 📖 Usage

### Creating a Cape

1. **Choose a gradient** – Pick a preset or create your own with custom colors
2. **Upload images** – Add images for front, back, and/or elytra
3. **Add overlay** – Enable text/emoji and customize the pattern
4. **Style it** – Adjust colors, fonts, rotation, and effects
5. **Download** – Click the download button to save your cape as PNG

### Cape Dimensions

| Region | Size | Position |
|--------|------|----------|
| Gradient Area | 368×176px | Top-left |
| Front Image | 80×128px | (8, 8) |
| Back Image | 80×128px | (96, 8) |
| Elytra | 80×160px | (288, 16) |
| **Total Canvas** | **512×256px** | – |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool |
| **Canvas API** | Cape Rendering |
| **Google Fonts** | Typography |
| **bad-words** | Content Filtering |
| **GitHub Pages** | Hosting |

---

## 📁 Project Structure

```
NRC-Cape-Creator/
├── public/
│   ├── logo.svg              # App logo
│   └── nrc_cape_template.png # Cape template
├── src/
│   ├── components/
│   │   ├── LeftColumn.tsx    # Image uploads & actions
│   │   ├── MiddleColumn.tsx  # Gradient & overlay controls
│   │   ├── ImageCropper.tsx  # Image cropping modal
│   │   └── GradientColorInput.tsx
│   ├── hooks/
│   │   └── useCapeState.ts   # Central state management
│   ├── utils/
│   │   ├── CanvasRenderer.ts # Cape drawing logic
│   │   └── contentFilter.ts  # Profanity filter
│   ├── App.tsx               # Main app component
│   ├── App.css               # Component styles
│   └── index.css             # Global styles
└── index.html
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Credits

- **NRC Community** – For the inspiration and support
- **Google Fonts** – For the amazing font library
- **Minecraft** – For the cape system that started it all

---

<p align="center">
  Made with ❤️ for the NRC Community
</p>
