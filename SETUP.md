# NRC Cape Creator 🧵

Designing Minecraft capes doesn't have to be complicated. **NRC Cape Creator** is a browser‑based playground where you can mix colors, drop in images, and shape Elytra wings — all without touching Photoshop or external editors.

---

## 🚀 Setup

This project is built with **React + TypeScript + Vite**.

### Requirements
- [Node.js](https://nodejs.org/) (v16+) and npm

### Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## How you use it

1. **Run `npm run dev`** to start the development server.
2. **Upload images** for the front, back, or Elytra.  
3. **Pick colors** or switch on gradient mode.  
4. **Preview** your cape in real time.  
5. **Download** the PNG and drop it into your game.  

---

## What's inside

- **React + TypeScript** for a modern, type-safe UI  
- **Vite** for fast development and builds  
- Canvas rendering for layering and masking  
- Gradient options with vertical and horizontal directions  
- Custom hooks for state management  
- Reset button to start fresh anytime  

### Project Structure

```
src/
├── components/          # React components
│   ├── Controls.tsx     # Main control panel
│   ├── GradientColorInput.tsx  # Gradient color picker
│   └── ControlsProps.ts # TypeScript interfaces
├── hooks/
│   └── useCapeState.ts  # Custom state hook
├── utils/
│   └── CanvasRenderer.ts # Canvas drawing logic
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

---

## The vibe

Think of it as a **cape workshop in your browser**: quick, playful, and lightweight. You don't need design tools — just curiosity and a few clicks.
