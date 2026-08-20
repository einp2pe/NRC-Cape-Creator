export type TemplateCategory =
  "pride" | "summer" | "winter" | "gaming" | "gradients" | "minecraft" | "fun";

export const categoryLabels: Record<TemplateCategory, string> = {
  pride: "Pride Flags",
  summer: "Summer",
  winter: "Winter",
  gaming: "Gaming",
  minecraft: "Minecraft",
  gradients: "Gradients",
  fun: "Fun & Meme",
};

export const categoryOrder: TemplateCategory[] = [
  "pride",
  "summer",
  "winter",
  "gaming",
  "minecraft",
  "gradients",
  "fun",
];

export type GradientDirection = "vertical" | "horizontal";

export interface CapeTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  settings: {
    gradientColors: string[];
    gradDirection: GradientDirection;
    elytraGradientColors?: string[];
    elytraGradDirection?: GradientDirection;
  };
}

export const templates: CapeTemplate[] = [
  {
    id: "pride-rainbow",
    name: "Rainbow Pride",
    category: "pride",
    settings: {
      gradientColors: [
        "#E40303",
        "#FF8C00",
        "#FFED00",
        "#008026",
        "#24408E",
        "#732982",
      ],
      gradDirection: "vertical",
    },
  },
  {
    id: "pride-trans",
    name: "Transgender",
    category: "pride",
    settings: {
      gradientColors: ["#5BCEFA", "#F5A9B8", "#FFFFFF", "#F5A9B8", "#5BCEFA"],
      gradDirection: "vertical",
    },
  },
  {
    id: "pride-bisexual",
    name: "Bisexual",
    category: "pride",
    settings: {
      gradientColors: ["#D60270", "#D60270", "#9B4F96", "#0038A8", "#0038A8"],
      gradDirection: "vertical",
    },
  },
  {
    id: "pride-lesbian",
    name: "Lesbian",
    category: "pride",
    settings: {
      gradientColors: [
        "#D52D00",
        "#EF7627",
        "#FF9A56",
        "#FFFFFF",
        "#D162A4",
        "#B55690",
        "#A30262",
      ],
      gradDirection: "vertical",
    },
  },
  {
    id: "pride-gay",
    name: "Gay",
    category: "pride",
    settings: {
      gradientColors: [
        "#078D70",
        "#26CEAA",
        "#98E8C1",
        "#FFFFFF",
        "#7BADE2",
        "#5049CC",
        "#3D1A78",
      ],
      gradDirection: "vertical",
    },
  },
  {
    id: "pride-nonbinary",
    name: "Non-Binary",
    category: "pride",
    settings: {
      gradientColors: ["#FCF434", "#FFFFFF", "#9C59D1", "#2C2C2C"],
      gradDirection: "vertical",
    },
  },
  {
    id: "pride-pansexual",
    name: "Pansexual",
    category: "pride",
    settings: {
      gradientColors: [
        "#FF218C",
        "#FF218C",
        "#FFD800",
        "#FFD800",
        "#21B1FF",
        "#21B1FF",
      ],
      gradDirection: "vertical",
    },
  },
  {
    id: "pride-asexual",
    name: "Asexual",
    category: "pride",
    settings: {
      gradientColors: ["#000000", "#A3A3A3", "#FFFFFF", "#800080"],
      gradDirection: "vertical",
    },
  },
  {
    id: "pride-aromantic",
    name: "Aromantic",
    category: "pride",
    settings: {
      gradientColors: ["#3DA542", "#A7D379", "#FFFFFF", "#A9A9A9", "#000000"],
      gradDirection: "vertical",
    },
  },
  {
    id: "pride-genderfluid",
    name: "Genderfluid",
    category: "pride",
    settings: {
      gradientColors: ["#FF76A4", "#FFFFFF", "#BE18D6", "#000000", "#333EBD"],
      gradDirection: "vertical",
    },
  },
  {
    id: "pride-agender",
    name: "Agender",
    category: "pride",
    settings: {
      gradientColors: [
        "#000000",
        "#B9B9B9",
        "#FFFFFF",
        "#B8F483",
        "#FFFFFF",
        "#B9B9B9",
        "#000000",
      ],
      gradDirection: "vertical",
    },
  },
  {
    id: "pride-progress",
    name: "Progress",
    category: "pride",
    settings: {
      gradientColors: [
        "#FFFFFF",
        "#F5A9B8",
        "#5BCEFA",
        "#613915",
        "#000000",
        "#E40303",
        "#FF8C00",
        "#FFED00",
        "#008026",
        "#24408E",
        "#732982",
      ],
      gradDirection: "vertical",
    },
  },

  {
    id: "sunset-vibes",
    name: "Sunset Vibes",
    category: "summer",
    settings: {
      gradientColors: ["#ff6b6b", "#feca57", "#ff9ff3"],
      gradDirection: "vertical",
    },
  },
  {
    id: "ocean-deep",
    name: "Ocean Deep",
    category: "summer",
    settings: {
      gradientColors: ["#0c3483", "#0575e6", "#00d4ff"],
      gradDirection: "vertical",
    },
  },
  {
    id: "tropical-vibes",
    name: "Tropical",
    category: "summer",
    settings: {
      gradientColors: ["#00b4db", "#0083b0", "#00c9ff", "#92fe9d"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    category: "summer",
    settings: {
      gradientColors: ["#f9d423", "#ff9800", "#ff5722", "#e91e63"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "beach-waves",
    name: "Beach Waves",
    category: "summer",
    settings: {
      gradientColors: ["#f5deb3", "#87ceeb", "#00bfff", "#1e90ff"],
      gradDirection: "vertical",
    },
  },
  {
    id: "watermelon",
    name: "Watermelon",
    category: "summer",
    settings: {
      gradientColors: ["#2e8b57", "#ff6b6b", "#ff4757"],
      gradDirection: "vertical",
    },
  },

  {
    id: "ice-cold",
    name: "Ice Cold",
    category: "winter",
    settings: {
      gradientColors: ["#e0eafc", "#cfdef3", "#a8c0ff", "#3f87f5"],
      gradDirection: "vertical",
    },
  },
  {
    id: "snowfall",
    name: "Snowfall",
    category: "winter",
    settings: {
      gradientColors: ["#1a1a2e", "#4a4a6a", "#8a8aaa"],
      gradDirection: "vertical",
    },
  },
  {
    id: "christmas",
    name: "Christmas",
    category: "winter",
    settings: {
      gradientColors: ["#165b33", "#bb2528", "#165b33"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "candy-cane",
    name: "Candy Cane",
    category: "winter",
    settings: {
      gradientColors: ["#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "aurora-borealis",
    name: "Aurora",
    category: "winter",
    settings: {
      gradientColors: ["#000428", "#004e92", "#00bf8f", "#7b4397"],
      gradDirection: "vertical",
    },
  },
  {
    id: "cozy-fire",
    name: "Cozy Fire",
    category: "winter",
    settings: {
      gradientColors: ["#1a0000", "#8b0000", "#ff4500", "#ff8c00"],
      gradDirection: "vertical",
    },
  },

  {
    id: "pixel-gamer",
    name: "Pixel Gamer",
    category: "gaming",
    settings: {
      gradientColors: ["#000000", "#1a1a2e", "#16213e"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "pro-gamer",
    name: "PRO Gamer",
    category: "gaming",
    settings: {
      gradientColors: ["#0f0f0f", "#1a1a2e", "#16213e"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "gg-wp",
    name: "GG WP",
    category: "gaming",
    settings: {
      gradientColors: ["#232526", "#414345"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "neon-nights",
    name: "Neon Nights",
    category: "gaming",
    settings: {
      gradientColors: ["#0f0c29", "#302b63", "#24243e", "#ff00ff"],
      gradDirection: "vertical",
    },
  },
  {
    id: "matrix",
    name: "Matrix",
    category: "gaming",
    settings: {
      gradientColors: ["#000000", "#001100", "#003300"],
      gradDirection: "vertical",
    },
  },
  {
    id: "lightning-bolt",
    name: "Lightning",
    category: "gaming",
    settings: {
      gradientColors: ["#000428", "#004e92", "#00d4ff"],
      gradDirection: "vertical",
    },
  },

  {
    id: "creeper",
    name: "Creeper",
    category: "minecraft",
    settings: {
      gradientColors: ["#2d5a27", "#3a7a33", "#4a9a40"],
      gradDirection: "vertical",
    },
  },
  {
    id: "enderman",
    name: "Enderman",
    category: "minecraft",
    settings: {
      gradientColors: ["#0a0a0a", "#1a0a2a", "#2a1a4a"],
      gradDirection: "vertical",
    },
  },
  {
    id: "diamond-mine",
    name: "Diamond Mine",
    category: "minecraft",
    settings: {
      gradientColors: ["#1a3a4a", "#2d5a6a", "#4ecdc4"],
      gradDirection: "vertical",
    },
  },
  {
    id: "netherite",
    name: "Netherite",
    category: "minecraft",
    settings: {
      gradientColors: ["#1a1a1a", "#2d2d2d", "#3a3a3a", "#4a4040"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "emerald",
    name: "Emerald",
    category: "minecraft",
    settings: {
      gradientColors: ["#004d00", "#008000", "#00b300", "#00e600"],
      gradDirection: "vertical",
    },
  },
  {
    id: "redstone",
    name: "Redstone",
    category: "minecraft",
    settings: {
      gradientColors: ["#2a0000", "#5a0000", "#8b0000", "#cc0000"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "lava-flow",
    name: "Lava Flow",
    category: "minecraft",
    settings: {
      gradientColors: ["#1a0000", "#4a0000", "#8b0000", "#ff4500", "#ff8c00"],
      gradDirection: "vertical",
    },
  },

  {
    id: "forest-mist",
    name: "Forest Mist",
    category: "gradients",
    settings: {
      gradientColors: ["#134e5e", "#71b280", "#a8e063"],
      gradDirection: "vertical",
    },
  },
  {
    id: "midnight-purple",
    name: "Midnight",
    category: "gradients",
    settings: {
      gradientColors: ["#0f0f23", "#2d1b4e", "#4a2c7f", "#6b3fa0"],
      gradDirection: "vertical",
    },
  },
  {
    id: "cotton-candy",
    name: "Cotton Candy",
    category: "gradients",
    settings: {
      gradientColors: ["#a8edea", "#fed6e3", "#d299c2", "#fef9d7"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "rainbow-party",
    name: "Rainbow Party",
    category: "gradients",
    settings: {
      gradientColors: [
        "#ff0000",
        "#ff8000",
        "#ffff00",
        "#00ff00",
        "#0080ff",
        "#8000ff",
      ],
      gradDirection: "horizontal",
    },
  },
  {
    id: "fire-gradient",
    name: "Fire",
    category: "gradients",
    settings: {
      gradientColors: ["#1a0000", "#8b0000", "#ff4500", "#ff8c00", "#ffd700"],
      gradDirection: "vertical",
    },
  },
  {
    id: "galaxy",
    name: "Galaxy",
    category: "gradients",
    settings: {
      gradientColors: ["#0f0c29", "#302b63", "#24243e", "#4a1a8a"],
      gradDirection: "vertical",
    },
  },

  {
    id: "starry-night",
    name: "Starry Night",
    category: "fun",
    settings: {
      gradientColors: ["#0f0c29", "#302b63", "#24243e"],
      gradDirection: "vertical",
    },
  },
  {
    id: "royal-crown",
    name: "Royal Crown",
    category: "fun",
    settings: {
      gradientColors: ["#1a0033", "#4a0080", "#7b1fa2"],
      gradDirection: "vertical",
    },
  },
  {
    id: "love-hearts",
    name: "Love Hearts",
    category: "fun",
    settings: {
      gradientColors: ["#ff9a9e", "#fecfef", "#fecfef", "#ff9a9e"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "skull-dark",
    name: "Dark Skull",
    category: "fun",
    settings: {
      gradientColors: ["#0d0d0d", "#1a1a1a", "#2d2d2d"],
      gradDirection: "vertical",
    },
  },
  {
    id: "pizza-party",
    name: "Pizza Party",
    category: "fun",
    settings: {
      gradientColors: ["#ff9800", "#f44336", "#ffeb3b"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "money-maker",
    name: "Money Maker",
    category: "fun",
    settings: {
      gradientColors: ["#004d00", "#006600", "#008800", "#00aa00"],
      gradDirection: "vertical",
    },
  },
  {
    id: "space-rocket",
    name: "Space Rocket",
    category: "fun",
    settings: {
      gradientColors: ["#000011", "#000033", "#000066", "#0000aa"],
      gradDirection: "vertical",
    },
  },
  {
    id: "ghost-mode",
    name: "Ghost Mode",
    category: "fun",
    settings: {
      gradientColors: ["#1a1a2e", "#2d2d44", "#3d3d5a"],
      gradDirection: "vertical",
    },
  },
  {
    id: "alien-invasion",
    name: "Alien",
    category: "fun",
    settings: {
      gradientColors: ["#001100", "#002200", "#003300", "#00ff00"],
      gradDirection: "vertical",
    },
  },
  {
    id: "cat-lover",
    name: "Cat Lover",
    category: "fun",
    settings: {
      gradientColors: ["#ffecd2", "#fcb69f", "#ff9a9e"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "music-lover",
    name: "Music Lover",
    category: "fun",
    settings: {
      gradientColors: ["#1a1a2e", "#4a1a5e", "#7a2a8e", "#aa3abe"],
      gradDirection: "horizontal",
    },
  },
  {
    id: "sports-champion",
    name: "Champion",
    category: "fun",
    settings: {
      gradientColors: ["#b8860b", "#daa520", "#ffd700", "#ffec8b"],
      gradDirection: "vertical",
    },
  },
  {
    id: "dragon-fire",
    name: "Dragon Fire",
    category: "fun",
    settings: {
      gradientColors: ["#1a0000", "#3a0000", "#5a0000", "#ff4500", "#ffd700"],
      gradDirection: "vertical",
    },
  },
];

export default templates;
