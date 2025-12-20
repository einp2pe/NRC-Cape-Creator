// Design Templates for Cape Creator

export type TemplateCategory = 
  | 'pride'
  | 'summer'
  | 'winter'
  | 'gaming'
  | 'gradients'
  | 'minecraft'
  | 'fun'

export const categoryInfo: Record<TemplateCategory, { label: string; icon: string }> = {
  pride: { label: 'Pride Flags', icon: '🏳️‍🌈' },
  summer: { label: 'Summer', icon: '☀️' },
  winter: { label: 'Winter', icon: '❄️' },
  gaming: { label: 'Gaming', icon: '🎮' },
  minecraft: { label: 'Minecraft', icon: '⛏️' },
  gradients: { label: 'Gradients', icon: '🎨' },
  fun: { label: 'Fun & Meme', icon: '😄' },
}

export const categoryOrder: TemplateCategory[] = [
  'pride',
  'summer',
  'winter',
  'gaming',
  'minecraft',
  'gradients',
  'fun',
]

export interface CapeTemplate {
  id: string
  name: string
  icon: string
  description: string
  category: TemplateCategory
  settings: {
    gradientColors: string[]
    gradDirection: 'vertical' | 'horizontal'
      separateElytraGradient?: boolean
      elytraGradientColors?: string[] | null
      elytraGradDirection?: 'vertical' | 'horizontal'
    emojiEnabled: boolean
    emoji: string
    emojiSize: number
    emojiSpacing: number
    emojiOpacity: number
    emojiRotation: number
    emojiRandomRotation: boolean
    emojiJitter: number
    emojiApplyToElytra: boolean
    emojiSeed: number
    textColor: string
    textStrokeEnabled: boolean
    textStrokeColor: string
    textStrokeWidth: number
    textFont: string
    textBold: boolean
    textItalic: boolean
  }
}

// Default settings template for reuse
const defaultSettings = {
  emojiEnabled: false,
  emoji: '',
  emojiSize: 48,
  emojiSpacing: 64,
  emojiOpacity: 1,
  emojiRotation: 0,
  emojiRandomRotation: false,
  emojiJitter: 0,
  emojiApplyToElytra: true,
  emojiSeed: 0,
  textColor: '#ffffff',
  textStrokeEnabled: false,
  textStrokeColor: '#000000',
  textStrokeWidth: 2,
  textFont: 'sans-serif',
  textBold: false,
  textItalic: false,
}

export const templates: CapeTemplate[] = [
  // ===== PRIDE FLAGS =====
  {
    id: 'pride-rainbow',
    name: 'Rainbow Pride',
    icon: '🏳️‍🌈',
    description: 'Classic rainbow pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#E40303', '#FF8C00', '#FFED00', '#008026', '#24408E', '#732982'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-trans',
    name: 'Transgender',
    icon: '🏳️‍⚧️',
    description: 'Transgender pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5BCEFA', '#F5A9B8', '#FFFFFF', '#F5A9B8', '#5BCEFA'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-bisexual',
    name: 'Bisexual',
    icon: '💖',
    description: 'Bisexual pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#D60270', '#D60270', '#9B4F96', '#0038A8', '#0038A8'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-lesbian',
    name: 'Lesbian',
    icon: '🧡',
    description: 'Lesbian pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#D52D00', '#EF7627', '#FF9A56', '#FFFFFF', '#D162A4', '#B55690', '#A30262'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-gay',
    name: 'Gay',
    icon: '💙',
    description: 'Gay pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#078D70', '#26CEAA', '#98E8C1', '#FFFFFF', '#7BADE2', '#5049CC', '#3D1A78'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-nonbinary',
    name: 'Non-Binary',
    icon: '💛',
    description: 'Non-binary pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FCF434', '#FFFFFF', '#9C59D1', '#2C2C2C'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-pansexual',
    name: 'Pansexual',
    icon: '💗',
    description: 'Pansexual pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FF218C', '#FF218C', '#FFD800', '#FFD800', '#21B1FF', '#21B1FF'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-asexual',
    name: 'Asexual',
    icon: '🖤',
    description: 'Asexual pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#A3A3A3', '#FFFFFF', '#800080'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-aromantic',
    name: 'Aromantic',
    icon: '💚',
    description: 'Aromantic pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#3DA542', '#A7D379', '#FFFFFF', '#A9A9A9', '#000000'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-genderfluid',
    name: 'Genderfluid',
    icon: '💜',
    description: 'Genderfluid pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FF76A4', '#FFFFFF', '#BE18D6', '#000000', '#333EBD'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-agender',
    name: 'Agender',
    icon: '🤍',
    description: 'Agender pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#B9B9B9', '#FFFFFF', '#B8F483', '#FFFFFF', '#B9B9B9', '#000000'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-progress',
    name: 'Progress',
    icon: '🌈',
    description: 'Progress pride flag colors',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FFFFFF', '#F5A9B8', '#5BCEFA', '#613915', '#000000', '#E40303', '#FF8C00', '#FFED00', '#008026', '#24408E', '#732982'],
      gradDirection: 'vertical',
    }
  },

  // ===== SUMMER =====
  {
    id: 'sunset-vibes',
    name: 'Sunset Vibes',
    icon: '🌅',
    description: 'Warm sunset gradient',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff6b6b', '#feca57', '#ff9ff3'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'ocean-deep',
    name: 'Ocean Deep',
    icon: '🌊',
    description: 'Deep blue ocean gradient',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0c3483', '#0575e6', '#00d4ff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'tropical-vibes',
    name: 'Tropical',
    icon: '🌴',
    description: 'Beach vacation',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#00b4db', '#0083b0', '#00c9ff', '#92fe9d'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🌴',
      emojiSize: 32,
      emojiSpacing: 56,
      emojiOpacity: 0.7,
      emojiRandomRotation: true,
      emojiJitter: 0.1,
      emojiSeed: 69,
      textColor: '#ffff00',
      textStrokeEnabled: true,
      textStrokeColor: '#006400',
      textFont: 'Lobster',
    }
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    icon: '☀️',
    description: 'Warm golden sunset',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#f9d423', '#ff9800', '#ff5722', '#e91e63'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'beach-waves',
    name: 'Beach Waves',
    icon: '🏖️',
    description: 'Sandy beach vibes',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#f5deb3', '#87ceeb', '#00bfff', '#1e90ff'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '🏖️',
      emojiSize: 28,
      emojiSpacing: 52,
      emojiOpacity: 0.6,
      emojiRandomRotation: true,
      emojiJitter: 0.15,
      emojiSeed: 42,
    }
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    icon: '🍉',
    description: 'Sweet summer fruit',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2e8b57', '#ff6b6b', '#ff4757'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '🍉',
      emojiSize: 28,
      emojiSpacing: 48,
      emojiOpacity: 0.75,
      emojiRandomRotation: true,
      emojiJitter: 0.1,
      emojiSeed: 123,
    }
  },

  // ===== WINTER =====
  {
    id: 'ice-cold',
    name: 'Ice Cold',
    icon: '🧊',
    description: 'Frozen tundra vibes',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#e0eafc', '#cfdef3', '#a8c0ff', '#3f87f5'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'snowfall',
    name: 'Snowfall',
    icon: '❄️',
    description: 'Gentle snowflakes',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a1a2e', '#4a4a6a', '#8a8aaa'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '❄️',
      emojiSize: 24,
      emojiSpacing: 36,
      emojiOpacity: 0.8,
      emojiRandomRotation: true,
      emojiJitter: 0.25,
      emojiSeed: 1225,
    }
  },
  {
    id: 'christmas',
    name: 'Christmas',
    icon: '🎄',
    description: 'Holiday spirit',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#165b33', '#bb2528', '#165b33'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🎄',
      emojiSize: 32,
      emojiSpacing: 56,
      emojiOpacity: 0.8,
      emojiSeed: 2512,
    }
  },
  {
    id: 'candy-cane',
    name: 'Candy Cane',
    icon: '🍬',
    description: 'Sweet holiday stripes',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff0000', '#ffffff', '#ff0000', '#ffffff', '#ff0000'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'aurora-borealis',
    name: 'Aurora',
    icon: '🌌',
    description: 'Northern lights magic',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000428', '#004e92', '#00bf8f', '#7b4397'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'cozy-fire',
    name: 'Cozy Fire',
    icon: '🔥',
    description: 'Warm fireplace glow',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a0000', '#8b0000', '#ff4500', '#ff8c00'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '🔥',
      emojiSize: 28,
      emojiSpacing: 48,
      emojiOpacity: 0.6,
      emojiRandomRotation: true,
      emojiJitter: 0.1,
      emojiSeed: 42,
    }
  },

  // ===== GAMING =====
  {
    id: 'pixel-gamer',
    name: 'Pixel Gamer',
    icon: '🎮',
    description: 'Retro gaming vibes',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#1a1a2e', '#16213e'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🎮',
      emojiSize: 28,
      emojiSpacing: 44,
      emojiOpacity: 0.8,
      emojiRotation: 15,
      emojiJitter: 0.1,
      emojiSeed: 88,
      textColor: '#00ff00',
      textStrokeEnabled: true,
      textFont: 'Press Start 2P',
    }
  },
  {
    id: 'pro-gamer',
    name: 'PRO Gamer',
    icon: '🏆',
    description: 'Show off your skills',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0f0f0f', '#1a1a2e', '#16213e'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: 'PRO',
      emojiSize: 24,
      emojiSpacing: 48,
      emojiOpacity: 0.9,
      emojiRotation: -10,
      textColor: '#ffd700',
      textStrokeEnabled: true,
      textStrokeWidth: 3,
      textFont: 'Bebas Neue',
      textBold: true,
    }
  },
  {
    id: 'gg-wp',
    name: 'GG WP',
    icon: '🎯',
    description: 'Good game, well played',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#232526', '#414345'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: 'GG',
      emojiSize: 28,
      emojiSpacing: 44,
      emojiOpacity: 0.7,
      textColor: '#00ff00',
      textStrokeEnabled: true,
      textFont: 'VT323',
    }
  },
  {
    id: 'neon-nights',
    name: 'Neon Nights',
    icon: '🌃',
    description: 'Cyberpunk neon vibes',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0f0c29', '#302b63', '#24243e', '#ff00ff'],
      gradDirection: 'vertical',
      textColor: '#00ffff',
      textFont: 'Orbitron',
    }
  },
  {
    id: 'matrix',
    name: 'Matrix',
    icon: '💚',
    description: 'Enter the matrix',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#001100', '#003300'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '0',
      emojiSize: 16,
      emojiSpacing: 24,
      emojiOpacity: 0.6,
      emojiJitter: 0.2,
      emojiSeed: 1337,
      textColor: '#00ff00',
      textFont: 'monospace',
    }
  },
  {
    id: 'lightning-bolt',
    name: 'Lightning',
    icon: '⚡',
    description: 'Electric energy',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000428', '#004e92', '#00d4ff'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '⚡',
      emojiSize: 40,
      emojiSpacing: 56,
      emojiOpacity: 0.85,
      emojiRandomRotation: true,
      emojiJitter: 0.25,
      emojiSeed: 77,
      textColor: '#ffff00',
      textStrokeEnabled: true,
      textFont: 'Anton',
      textBold: true,
    }
  },

  // ===== MINECRAFT =====
  {
    id: 'creeper',
    name: 'Creeper',
    icon: '💣',
    description: 'Sssssss... BOOM!',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2d5a27', '#3a7a33', '#4a9a40'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '💣',
      emojiSize: 28,
      emojiSpacing: 48,
      emojiOpacity: 0.5,
      emojiRandomRotation: true,
      emojiJitter: 0.15,
      emojiSeed: 404,
      textColor: '#000000',
      textFont: 'Press Start 2P',
    }
  },
  {
    id: 'enderman',
    name: 'Enderman',
    icon: '👾',
    description: 'The End dimension',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a0a0a', '#1a0a2a', '#2a1a4a'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '👾',
      emojiSize: 24,
      emojiSpacing: 48,
      emojiOpacity: 0.4,
      textColor: '#ff00ff',
    }
  },
  {
    id: 'diamond-mine',
    name: 'Diamond Mine',
    icon: '💎',
    description: 'Precious diamonds',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a3a4a', '#2d5a6a', '#4ecdc4'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '💎',
      emojiSize: 28,
      emojiSpacing: 44,
      emojiOpacity: 0.8,
      emojiRandomRotation: true,
      emojiJitter: 0.1,
      emojiSeed: 11,
      textColor: '#00ffff',
    }
  },
  {
    id: 'netherite',
    name: 'Netherite',
    icon: '⬛',
    description: 'Strongest material',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a1a1a', '#2d2d2d', '#3a3a3a', '#4a4040'],
      gradDirection: 'horizontal',
      textColor: '#8b4513',
    }
  },
  {
    id: 'emerald',
    name: 'Emerald',
    icon: '💚',
    description: 'Villager approved',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#004d00', '#008000', '#00b300', '#00e600'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '💚',
      emojiSize: 24,
      emojiSpacing: 40,
      emojiOpacity: 0.6,
      emojiRotation: 45,
      textColor: '#90ee90',
    }
  },
  {
    id: 'redstone',
    name: 'Redstone',
    icon: '🔴',
    description: 'Power it up!',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2a0000', '#5a0000', '#8b0000', '#cc0000'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🔴',
      emojiSize: 20,
      emojiSpacing: 36,
      emojiOpacity: 0.7,
      emojiRandomRotation: true,
      emojiJitter: 0.1,
      emojiSeed: 55,
      textColor: '#ff0000',
      textStrokeEnabled: true,
      textBold: true,
    }
  },
  {
    id: 'lava-flow',
    name: 'Lava Flow',
    icon: '🌋',
    description: 'Hot molten lava',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a0000', '#4a0000', '#8b0000', '#ff4500', '#ff8c00'],
      gradDirection: 'vertical',
      textColor: '#ffd700',
    }
  },

  // ===== GRADIENTS =====
  {
    id: 'forest-mist',
    name: 'Forest Mist',
    icon: '🌲',
    description: 'Mystical forest gradient',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#134e5e', '#71b280', '#a8e063'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'midnight-purple',
    name: 'Midnight',
    icon: '🌙',
    description: 'Deep midnight purple',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0f0f23', '#2d1b4e', '#4a2c7f', '#6b3fa0'],
      gradDirection: 'vertical',
      textColor: '#e0b0ff',
    }
  },
  {
    id: 'cotton-candy',
    name: 'Cotton Candy',
    icon: '🍭',
    description: 'Sweet pastel colors',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#a8edea', '#fed6e3', '#d299c2', '#fef9d7'],
      gradDirection: 'horizontal',
      textColor: '#ff69b4',
      textFont: 'Pacifico',
    }
  },
  {
    id: 'rainbow-party',
    name: 'Rainbow Party',
    icon: '🌈',
    description: 'All the colors!',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#0080ff', '#8000ff'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🌈',
      emojiSize: 36,
      emojiSpacing: 64,
      emojiOpacity: 0.5,
      emojiRotation: -15,
      textStrokeEnabled: true,
      textStrokeWidth: 3,
      textFont: 'Bangers',
      textBold: true,
    }
  },
  {
    id: 'fire-gradient',
    name: 'Fire',
    icon: '🔥',
    description: 'Blazing gradient',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a0000', '#8b0000', '#ff4500', '#ff8c00', '#ffd700'],
      gradDirection: 'vertical',
      textColor: '#ff4500',
    }
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    icon: '🌌',
    description: 'Deep space colors',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0f0c29', '#302b63', '#24243e', '#4a1a8a'],
      gradDirection: 'vertical',
      textColor: '#e0e0ff',
    }
  },

  // ===== FUN & MEME =====
  {
    id: 'starry-night',
    name: 'Starry Night',
    icon: '✨',
    description: 'Sparkling stars on dark sky',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0f0c29', '#302b63', '#24243e'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '✨',
      emojiSize: 24,
      emojiSpacing: 40,
      emojiOpacity: 0.9,
      emojiRandomRotation: true,
      emojiJitter: 0.3,
      emojiSeed: 123,
      textColor: '#ffd700',
    }
  },
  {
    id: 'royal-crown',
    name: 'Royal Crown',
    icon: '👑',
    description: 'Fit for a king',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a0033', '#4a0080', '#7b1fa2'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '👑',
      emojiSize: 36,
      emojiSpacing: 56,
      emojiOpacity: 0.85,
      textColor: '#ffd700',
      textFont: 'Cinzel',
      textBold: true,
    }
  },
  {
    id: 'love-hearts',
    name: 'Love Hearts',
    icon: '💖',
    description: 'Spread the love',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff9a9e', '#fecfef', '#fecfef', '#ff9a9e'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '💖',
      emojiSize: 28,
      emojiSpacing: 42,
      emojiOpacity: 0.75,
      emojiRandomRotation: true,
      emojiJitter: 0.2,
      emojiSeed: 14,
      textColor: '#ff1493',
      textFont: 'Pacifico',
    }
  },
  {
    id: 'skull-dark',
    name: 'Dark Skull',
    icon: '💀',
    description: 'Spooky skeleton pattern',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0d0d0d', '#1a1a1a', '#2d2d2d'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '💀',
      emojiSize: 32,
      emojiSpacing: 50,
      emojiOpacity: 0.6,
      emojiRandomRotation: true,
      emojiJitter: 0.15,
      emojiSeed: 666,
      textFont: 'Creepster',
    }
  },
  {
    id: 'pizza-party',
    name: 'Pizza Party',
    icon: '🍕',
    description: 'Time for pizza!',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff9800', '#f44336', '#ffeb3b'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🍕',
      emojiSize: 32,
      emojiSpacing: 48,
      emojiOpacity: 0.9,
      emojiRandomRotation: true,
      emojiJitter: 0.2,
      emojiSeed: 420,
      textColor: '#ff5722',
      textFont: 'Bangers',
    }
  },
  {
    id: 'money-maker',
    name: 'Money Maker',
    icon: '💰',
    description: 'Cash money',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#004d00', '#006600', '#008800', '#00aa00'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '💰',
      emojiSize: 28,
      emojiSpacing: 44,
      emojiOpacity: 0.75,
      emojiRandomRotation: true,
      emojiJitter: 0.15,
      emojiSeed: 100,
      textColor: '#ffd700',
      textStrokeEnabled: true,
      textStrokeColor: '#004d00',
      textBold: true,
    }
  },
  {
    id: 'space-rocket',
    name: 'Space Rocket',
    icon: '🚀',
    description: 'To the moon!',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000011', '#000033', '#000066', '#0000aa'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '🚀',
      emojiSize: 28,
      emojiSpacing: 56,
      emojiOpacity: 0.8,
      emojiRotation: 45,
      emojiJitter: 0.1,
      emojiSeed: 2024,
      textFont: 'Orbitron',
    }
  },
  {
    id: 'ghost-mode',
    name: 'Ghost Mode',
    icon: '👻',
    description: 'Spooky vibes',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a1a2e', '#2d2d44', '#3d3d5a'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '👻',
      emojiSize: 32,
      emojiSpacing: 52,
      emojiOpacity: 0.5,
      emojiRandomRotation: true,
      emojiJitter: 0.2,
      emojiSeed: 31,
      textFont: 'Creepster',
    }
  },
  {
    id: 'alien-invasion',
    name: 'Alien',
    icon: '👽',
    description: 'We come in peace',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#001100', '#002200', '#003300', '#00ff00'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '👽',
      emojiSize: 28,
      emojiSpacing: 48,
      emojiOpacity: 0.7,
      emojiRandomRotation: true,
      emojiJitter: 0.15,
      emojiSeed: 51,
      textColor: '#00ff00',
      textStrokeEnabled: true,
      textFont: 'Orbitron',
    }
  },
  {
    id: 'cat-lover',
    name: 'Cat Lover',
    icon: '🐱',
    description: 'Meow!',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffecd2', '#fcb69f', '#ff9a9e'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🐱',
      emojiSize: 28,
      emojiSpacing: 44,
      emojiOpacity: 0.85,
      emojiRandomRotation: true,
      emojiJitter: 0.15,
      emojiSeed: 9,
      textColor: '#8b4513',
      textFont: 'Caveat',
    }
  },
  {
    id: 'music-lover',
    name: 'Music Lover',
    icon: '🎵',
    description: 'Feel the beat',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a1a2e', '#4a1a5e', '#7a2a8e', '#aa3abe'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🎵',
      emojiSize: 24,
      emojiSpacing: 40,
      emojiOpacity: 0.8,
      emojiRotation: 15,
      emojiRandomRotation: true,
      emojiJitter: 0.2,
      emojiSeed: 808,
      textColor: '#ff00ff',
      textFont: 'Monoton',
    }
  },
  {
    id: 'sports-champion',
    name: 'Champion',
    icon: '🏅',
    description: 'Gold medal winner',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#b8860b', '#daa520', '#ffd700', '#ffec8b'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '🏅',
      emojiSize: 28,
      emojiSpacing: 48,
      emojiOpacity: 0.8,
      emojiSeed: 1,
      textColor: '#000000',
      textStrokeColor: '#ffffff',
      textFont: 'Anton',
      textBold: true,
    }
  },
  {
    id: 'dragon-fire',
    name: 'Dragon Fire',
    icon: '🐉',
    description: 'Breathe fire',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a0000', '#3a0000', '#5a0000', '#ff4500', '#ffd700'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '🐉',
      emojiSize: 36,
      emojiSpacing: 64,
      emojiOpacity: 0.6,
      emojiRandomRotation: true,
      emojiJitter: 0.1,
      emojiSeed: 888,
      textColor: '#ffd700',
      textStrokeEnabled: true,
      textStrokeColor: '#8b0000',
      textStrokeWidth: 3,
      textFont: 'Cinzel',
      textBold: true,
    }
  },
]

export default templates
