// Design Templates for Cape Creator

export type TemplateCategory =
  | 'pride'
  | 'flags'
  | 'summer'
  | 'winter'
  | 'nature'
  | 'space'
  | 'gaming'
  | 'minecraft'
  | 'retro'
  | 'neon'
  | 'gradients'
  | 'pastel'
  | 'metal'
  | 'food'
  | 'dark'
  | 'fun'

export const categoryInfo: Record<TemplateCategory, { label: string; icon: string }> = {
  pride: { label: 'Pride Flags', icon: '🏳️‍🌈' },
  flags: { label: 'Country Flags', icon: '🚩' },
  summer: { label: 'Summer', icon: '☀️' },
  winter: { label: 'Winter', icon: '❄️' },
  nature: { label: 'Nature', icon: '🌿' },
  space: { label: 'Space', icon: '🪐' },
  gaming: { label: 'Gaming', icon: '🎮' },
  minecraft: { label: 'Minecraft', icon: '⛏️' },
  retro: { label: 'Retro & Synthwave', icon: '📼' },
  neon: { label: 'Neon', icon: '💡' },
  gradients: { label: 'Gradients', icon: '🎨' },
  pastel: { label: 'Pastel', icon: '🌸' },
  metal: { label: 'Metals & Stone', icon: '⚙️' },
  food: { label: 'Food & Drinks', icon: '🍔' },
  dark: { label: 'Dark & Gothic', icon: '🌑' },
  fun: { label: 'Fun & Meme', icon: '😄' },
}

export const categoryOrder: TemplateCategory[] = [
  'pride',
  'flags',
  'summer',
  'winter',
  'nature',
  'space',
  'gaming',
  'minecraft',
  'retro',
  'neon',
  'gradients',
  'pastel',
  'metal',
  'food',
  'dark',
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
    // Other legacy/template fields (emoji/text) may exist in data; allow them but they are ignored by the app
    [key: string]: any
  }
}

// Default settings template for reuse
const defaultSettings: Record<string, any> = {
  // Keep legacy values here for data completeness; the app ignores text/emoji settings
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
  {
    id: 'pride-philadelphia',
    name: 'Philadelphia',
    icon: '✊🏾',
    description: 'POC-inclusive rainbow flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#613915', '#E40303', '#FF8C00', '#FFED00', '#008026', '#004DFF', '#750787'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-polysexual',
    name: 'Polysexual',
    icon: '💗',
    description: 'Polysexual pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#F61CB9', '#F61CB9', '#07D569', '#07D569', '#1C92F6', '#1C92F6'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-omnisexual',
    name: 'Omnisexual',
    icon: '💞',
    description: 'Omnisexual pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FE9ACE', '#FF53BF', '#200044', '#6760FE', '#8EA6FF'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-demisexual',
    name: 'Demisexual',
    icon: '🤍',
    description: 'Demisexual pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#FFFFFF', '#6E0070', '#D2D2D2'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-demiboy',
    name: 'Demiboy',
    icon: '💙',
    description: 'Demiboy pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#7F7F7F', '#C4C4C4', '#9AD9EB', '#FFFFFF', '#9AD9EB', '#C4C4C4', '#7F7F7F'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-demigirl',
    name: 'Demigirl',
    icon: '💗',
    description: 'Demigirl pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#7F7F7F', '#C4C4C4', '#FFAEC9', '#FFFFFF', '#FFAEC9', '#C4C4C4', '#7F7F7F'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-transmasc',
    name: 'Transmasculine',
    icon: '💙',
    description: 'Transmasculine pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FF8ABD', '#CDF5FE', '#74DFFF', '#FFFFFF', '#74DFFF', '#CDF5FE', '#FF8ABD'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-transfem',
    name: 'Transfeminine',
    icon: '💖',
    description: 'Transfeminine pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#73DEFF', '#FFE1EE', '#FFB8DE', '#FFFFFF', '#FFB8DE', '#FFE1EE', '#73DEFF'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-genderqueer',
    name: 'Genderqueer',
    icon: '💜',
    description: 'Genderqueer pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#B57EDC', '#B57EDC', '#FFFFFF', '#FFFFFF', '#4A8123', '#4A8123'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-intersex',
    name: 'Intersex',
    icon: '💛',
    description: 'Intersex pride colors',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FFD800', '#FFD800', '#7902AA', '#FFD800', '#FFD800'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-bigender',
    name: 'Bigender',
    icon: '💞',
    description: 'Bigender pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#C479A2', '#EDA5CD', '#D6C7E8', '#FFFFFF', '#D6C7E8', '#9AC7E8', '#6D82D1'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-polygender',
    name: 'Polygender',
    icon: '🩶',
    description: 'Polygender pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#939393', '#ED94C5', '#F5ED81', '#64BCE4'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-abrosexual',
    name: 'Abrosexual',
    icon: '💚',
    description: 'Abrosexual pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#75CC91', '#B0E6C1', '#FFFFFF', '#E9A4BC', '#D9426E'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-aroace',
    name: 'Aroace',
    icon: '🧡',
    description: 'Aromantic asexual pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#E28C00', '#ECCD00', '#FFFFFF', '#62AEDC', '#203856'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-neutrois',
    name: 'Neutrois',
    icon: '🤍',
    description: 'Neutrois pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FFFFFF', '#FFFFFF', '#1F9F00', '#1F9F00', '#000000', '#000000'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-pangender',
    name: 'Pangender',
    icon: '💛',
    description: 'Pangender pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FFF798', '#FEDA75', '#FFEBFB', '#FFFFFF', '#FFEBFB', '#FEDA75', '#FFF798'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-genderflux',
    name: 'Genderflux',
    icon: '🌈',
    description: 'Genderflux pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#F47694', '#F2A2B9', '#CECECE', '#7CE0F7', '#3ECDF9', '#FFF48D'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-sapphic',
    name: 'Sapphic',
    icon: '🌷',
    description: 'Sapphic pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FD8BA8', '#FFFFFF', '#FFFFFF', '#FD8BA8'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-achillean',
    name: 'Achillean',
    icon: '🌿',
    description: 'Achillean pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#4A9B93', '#98D9D5', '#FFFFFF', '#98D9D5', '#4A9B93'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-polyamory',
    name: 'Polyamory',
    icon: '💙',
    description: 'Polyamory pride colors',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0000FF', '#0000FF', '#FF0000', '#FF0000', '#000000', '#000000'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-bear',
    name: 'Bear',
    icon: '🐻',
    description: 'Bear brotherhood colors',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#623804', '#D56300', '#FEDD63', '#FEE6B8', '#FFFFFF', '#555555', '#000000'],
      gradDirection: 'vertical',
    }
  },

  // ===== COUNTRY FLAGS =====
  {
    id: 'flag-germany',
    name: 'Germany',
    icon: '🇩🇪',
    description: 'Schwarz Rot Gold',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#000000', '#DD0000', '#DD0000', '#FFCE00', '#FFCE00'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-austria',
    name: 'Austria',
    icon: '🇦🇹',
    description: 'Austrian flag colors',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ED2939', '#ED2939', '#FFFFFF', '#FFFFFF', '#ED2939', '#ED2939'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-switzerland',
    name: 'Switzerland',
    icon: '🇨🇭',
    description: 'Swiss red & white',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FF0000', '#FF0000', '#FFFFFF', '#FF0000', '#FF0000'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-france',
    name: 'France',
    icon: '🇫🇷',
    description: 'Tricolore',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#002395', '#002395', '#FFFFFF', '#FFFFFF', '#ED2939', '#ED2939'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'flag-italy',
    name: 'Italy',
    icon: '🇮🇹',
    description: 'Il Tricolore',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#009246', '#009246', '#FFFFFF', '#FFFFFF', '#CE2B37', '#CE2B37'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'flag-spain',
    name: 'Spain',
    icon: '🇪🇸',
    description: 'Rojigualda',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#AA151B', '#AA151B', '#F1BF00', '#F1BF00', '#AA151B', '#AA151B'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-netherlands',
    name: 'Netherlands',
    icon: '🇳🇱',
    description: 'Dutch tricolour',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#AE1C28', '#AE1C28', '#FFFFFF', '#FFFFFF', '#21468B', '#21468B'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-belgium',
    name: 'Belgium',
    icon: '🇧🇪',
    description: 'Belgian tricolour',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#000000', '#FDDA24', '#FDDA24', '#EF3340', '#EF3340'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'flag-poland',
    name: 'Poland',
    icon: '🇵🇱',
    description: 'White and red',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FFFFFF', '#FFFFFF', '#DC143C', '#DC143C'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-czechia',
    name: 'Czechia',
    icon: '🇨🇿',
    description: 'Czech flag colors',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FFFFFF', '#FFFFFF', '#11457E', '#D7141A', '#D7141A'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-sweden',
    name: 'Sweden',
    icon: '🇸🇪',
    description: 'Blue and gold',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#006AA7', '#006AA7', '#FECC00', '#006AA7', '#006AA7'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-norway',
    name: 'Norway',
    icon: '🇳🇴',
    description: 'Norwegian cross colors',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#BA0C2F', '#FFFFFF', '#00205B', '#FFFFFF', '#BA0C2F'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-denmark',
    name: 'Denmark',
    icon: '🇩🇰',
    description: 'Dannebrog colors',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#C60C30', '#C60C30', '#FFFFFF', '#C60C30', '#C60C30'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-finland',
    name: 'Finland',
    icon: '🇫🇮',
    description: 'Finnish blue cross',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FFFFFF', '#FFFFFF', '#003580', '#FFFFFF', '#FFFFFF'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-uk',
    name: 'United Kingdom',
    icon: '🇬🇧',
    description: 'Union Jack colors',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#012169', '#FFFFFF', '#C8102E', '#FFFFFF', '#012169'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'flag-ireland',
    name: 'Ireland',
    icon: '🇮🇪',
    description: 'Irish tricolour',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#169B62', '#169B62', '#FFFFFF', '#FFFFFF', '#FF883E', '#FF883E'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'flag-portugal',
    name: 'Portugal',
    icon: '🇵🇹',
    description: 'Green and red',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#006600', '#006600', '#FFE900', '#FF0000', '#FF0000'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'flag-greece',
    name: 'Greece',
    icon: '🇬🇷',
    description: 'Greek blue & white',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0D5EAF', '#FFFFFF', '#0D5EAF', '#FFFFFF', '#0D5EAF'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-ukraine',
    name: 'Ukraine',
    icon: '🇺🇦',
    description: 'Blue sky, golden field',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0057B7', '#0057B7', '#FFD700', '#FFD700'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-usa',
    name: 'USA',
    icon: '🇺🇸',
    description: 'Stars and stripes',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#3C3B6E', '#B22234', '#FFFFFF', '#B22234', '#FFFFFF', '#B22234'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-canada',
    name: 'Canada',
    icon: '🇨🇦',
    description: 'Maple leaf colors',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FF0000', '#FF0000', '#FFFFFF', '#FF0000', '#FF0000'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'flag-mexico',
    name: 'Mexico',
    icon: '🇲🇽',
    description: 'Mexican tricolour',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#006847', '#006847', '#FFFFFF', '#FFFFFF', '#CE1126', '#CE1126'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'flag-brazil',
    name: 'Brazil',
    icon: '🇧🇷',
    description: 'Verde e amarelo',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#009C3B', '#FFDF00', '#002776', '#FFDF00', '#009C3B'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-argentina',
    name: 'Argentina',
    icon: '🇦🇷',
    description: 'Celeste y blanco',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#74ACDF', '#74ACDF', '#FFFFFF', '#74ACDF', '#74ACDF'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-japan',
    name: 'Japan',
    icon: '🇯🇵',
    description: 'Rising sun',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FFFFFF', '#FFFFFF', '#BC002D', '#FFFFFF', '#FFFFFF'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-southkorea',
    name: 'South Korea',
    icon: '🇰🇷',
    description: 'Taegeukgi colors',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FFFFFF', '#CD2E3A', '#0047A0', '#000000', '#FFFFFF'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-india',
    name: 'India',
    icon: '🇮🇳',
    description: 'Tiranga',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FF9933', '#FF9933', '#FFFFFF', '#FFFFFF', '#138808', '#138808'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-romania',
    name: 'Romania',
    icon: '🇷🇴',
    description: 'Romanian tricolour',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#002B7F', '#002B7F', '#FCD116', '#FCD116', '#CE1126', '#CE1126'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'flag-hungary',
    name: 'Hungary',
    icon: '🇭🇺',
    description: 'Hungarian tricolour',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#CD2A3E', '#CD2A3E', '#FFFFFF', '#FFFFFF', '#436F4D', '#436F4D'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-turkey',
    name: 'Turkey',
    icon: '🇹🇷',
    description: 'Red and white',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#E30A17', '#E30A17', '#FFFFFF', '#E30A17', '#E30A17'],
      gradDirection: 'horizontal',
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

  // ===== SUMMER (more) =====
  {
    id: 'flamingo-pink',
    name: 'Flamingo',
    icon: '🦩',
    description: 'Hot pink pool party',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff9a9e', '#fc5c9c', '#f857a6', '#ff5858'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'lemonade',
    name: 'Lemonade',
    icon: '🍋',
    description: 'Fresh and zesty',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#fffbd5', '#f9f586', '#f6e05e', '#ffd200'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'mango-tango',
    name: 'Mango Tango',
    icon: '🥭',
    description: 'Juicy tropical mango',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffe259', '#ffa751', '#ff7e5f', '#e94f37'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'ice-cream',
    name: 'Ice Cream',
    icon: '🍦',
    description: 'Three scoops please',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#fff1eb', '#ffc3a0', '#ffafbd', '#c9ffbf'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'pool-party',
    name: 'Pool Party',
    icon: '🏊',
    description: 'Chlorine blue',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#a1ffce', '#4facfe', '#00f2fe', '#0083b0'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'cherry-summer',
    name: 'Cherry',
    icon: '🍒',
    description: 'Sweet cherry red',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#eb3349', '#f45c43', '#ff8177'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'surf-board',
    name: 'Surf',
    icon: '🏄',
    description: 'Catch the wave',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#fceabb', '#00c6ff', '#0072ff', '#004e92'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'sunflower-field',
    name: 'Sunflower',
    icon: '🌻',
    description: 'Golden summer field',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#4b8b3b', '#a8c66c', '#ffd700', '#ff9800'],
      gradDirection: 'vertical',
    }
  },

  // ===== WINTER (more) =====
  {
    id: 'glacier',
    name: 'Glacier',
    icon: '🏔️',
    description: 'Ancient blue ice',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffffff', '#d7f0ff', '#7ec8e3', '#2a6f97'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'polar-night',
    name: 'Polar Night',
    icon: '🌃',
    description: 'Endless arctic night',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000010', '#0b1e3d', '#1b3b6f', '#3c6997'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'hot-cocoa',
    name: 'Hot Cocoa',
    icon: '☕',
    description: 'Warm mug of cocoa',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#3e2723', '#6d4c41', '#a1887f', '#fff8e1'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'winter-pine',
    name: 'Winter Pine',
    icon: '🌲',
    description: 'Snowy pine forest',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0b3d2e', '#1a5d45', '#88b7a1', '#eef7f2'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'silver-bells',
    name: 'Silver Bells',
    icon: '🔔',
    description: 'Festive silver shine',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#232526', '#8e9eab', '#eef2f3', '#8e9eab', '#232526'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'frostbite',
    name: 'Frostbite',
    icon: '🥶',
    description: 'Freezing cold blue',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#00c6fb', '#005bea', '#001f54'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'gingerbread',
    name: 'Gingerbread',
    icon: '🍪',
    description: 'Baked holiday treat',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#7b3f00', '#b5651d', '#e0a96d', '#fff5e1'],
      gradDirection: 'horizontal',
    }
  },

  // ===== NATURE =====
  {
    id: 'sakura-bloom',
    name: 'Sakura',
    icon: '🌸',
    description: 'Cherry blossom season',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffd8e6', '#ffb7d5', '#ff8fb1', '#7a4a5f'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'autumn-leaves',
    name: 'Autumn',
    icon: '🍂',
    description: 'Falling autumn leaves',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#7b3f00', '#c1440e', '#e07a1f', '#f7b733'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'deep-forest',
    name: 'Deep Forest',
    icon: '🌳',
    description: 'Dense green canopy',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0b2611', '#1c4620', '#3a7d44', '#8bc34a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'desert-dunes',
    name: 'Desert Dunes',
    icon: '🏜️',
    description: 'Endless sand',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#f9d29d', '#e0ac69', '#c68642', '#8d5524'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'mountain-peak',
    name: 'Mountain',
    icon: '⛰️',
    description: 'Rocky summit',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2c3e50', '#4b6584', '#a5b1c2', '#ffffff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'waterfall',
    name: 'Waterfall',
    icon: '💧',
    description: 'Rushing fresh water',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0f3057', '#00587a', '#008891', '#e7e7de'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'meadow',
    name: 'Meadow',
    icon: '🌾',
    description: 'Grass and open sky',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#56ccf2', '#a8e063', '#56ab2f', '#2f6b1f'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'coral-reef',
    name: 'Coral Reef',
    icon: '🐠',
    description: 'Colorful underwater life',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff9068', '#fd746c', '#43cea2', '#185a9d'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'thunderstorm',
    name: 'Thunderstorm',
    icon: '⛈️',
    description: 'Storm clouds rolling in',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0f1014', '#2c3e50', '#4b6584', '#f7dc6f'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'rainforest',
    name: 'Rainforest',
    icon: '🦜',
    description: 'Lush tropical jungle',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#004d40', '#00796b', '#4caf50', '#cddc39'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'lavender-field',
    name: 'Lavender Field',
    icon: '💜',
    description: 'Provence in bloom',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#6d4c8c', '#9b7bbf', '#c9a7eb', '#f3e8ff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'volcano-nature',
    name: 'Volcano',
    icon: '🌋',
    description: 'Erupting mountain',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a1a1a', '#4a1c1c', '#a52a0a', '#ff6f00', '#ffd54f'],
      gradDirection: 'vertical',
    }
  },

  // ===== SPACE =====
  {
    id: 'nebula-cloud',
    name: 'Nebula',
    icon: '🌌',
    description: 'Cosmic gas clouds',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#20002c', '#5a189a', '#c74bd9', '#ff8fd8'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'black-hole',
    name: 'Black Hole',
    icon: '🕳️',
    description: 'Point of no return',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#000000', '#3a1c00', '#ff7b00', '#ffd166'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'mars-surface',
    name: 'Mars',
    icon: '🔴',
    description: 'The red planet',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#3b1f0b', '#7a3b1a', '#c1440e', '#e77d11'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'saturn-rings',
    name: 'Saturn',
    icon: '🪐',
    description: 'Ringed gas giant',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1b1b2f', '#c9a227', '#e6d3a3', '#c9a227', '#1b1b2f'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'milky-way',
    name: 'Milky Way',
    icon: '✨',
    description: 'Our home galaxy',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#02010a', '#1b1a3a', '#4b3f9e', '#b39ddb', '#ffffff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'supernova',
    name: 'Supernova',
    icon: '💥',
    description: 'Exploding star',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffffff', '#ffe07a', '#ff6f3c', '#c02425', '#1a0033'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'moonlight',
    name: 'Moonlight',
    icon: '🌕',
    description: 'Silver lunar glow',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0b0c1e', '#2c3050', '#8f9bb3', '#f0f0f5'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    icon: '☀️',
    description: 'Burning star surface',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff0000', '#ff7300', '#ffcc00', '#fff2b2'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'comet-tail',
    name: 'Comet',
    icon: '☄️',
    description: 'Streaking through space',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000021', '#0d2b6b', '#3fa9f5', '#c7f5ff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'deep-void',
    name: 'Deep Void',
    icon: '🌑',
    description: 'Empty space',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#05050f', '#0d0d1f', '#161630'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'astronaut',
    name: 'Astronaut',
    icon: '👨‍🚀',
    description: 'Suit white and visor gold',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#f2f2f2', '#d0d5db', '#5b6c8f', '#ffb300'],
      gradDirection: 'vertical',
    }
  },

  // ===== GAMING (more) =====
  {
    id: 'health-bar',
    name: 'Health Bar',
    icon: '❤️',
    description: 'Full HP',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#00ff00', '#00ff00', '#ffff00', '#ff0000', '#3a0000'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'blurple',
    name: 'Blurple',
    icon: '💬',
    description: 'Chat app vibes',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#23272a', '#2c2f33', '#5865f2', '#7289da'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'stream-purple',
    name: 'Streamer',
    icon: '📺',
    description: 'Live on stream',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0e0e10', '#772ce8', '#9146ff', '#bf94ff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'speedrun',
    name: 'Speedrun',
    icon: '⏱️',
    description: 'Any% world record',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#111111', '#ff2d00', '#ffb400', '#ffffff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'boss-fight',
    name: 'Boss Fight',
    icon: '👹',
    description: 'Final boss energy',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a0000', '#3d0000', '#8b0000', '#ff1e00'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'arcade-cabinet',
    name: 'Arcade',
    icon: '🕹️',
    description: 'Insert coin',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a1a40', '#ff2e63', '#08d9d6', '#eaeaea'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'loot-legendary',
    name: 'Legendary',
    icon: '🟠',
    description: 'Legendary drop rarity',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b1600', '#7a3d00', '#ff8c00', '#ffcf70'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'loot-epic',
    name: 'Epic Loot',
    icon: '🟣',
    description: 'Epic drop rarity',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a0033', '#4b0082', '#8a2be2', '#d5a6ff'],
      gradDirection: 'vertical',
    }
  },

  // ===== MINECRAFT (more) =====
  {
    id: 'grass-block',
    name: 'Grass Block',
    icon: '🟩',
    description: 'The classic block',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5d9c3c', '#7cbb4f', '#8b5a2b', '#5c3a1a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'nether-portal',
    name: 'Nether Portal',
    icon: '🟪',
    description: 'Step through',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a0022', '#4b0082', '#8a2be2', '#c77dff', '#4b0082'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'end-portal',
    name: 'End Portal',
    icon: '🌀',
    description: 'Gateway to the End',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#0a1a2a', '#123a4a', '#1de9b6'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'deepslate',
    name: 'Deepslate',
    icon: '🪨',
    description: 'Deep underground stone',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b2b30', '#3a3a42', '#4a4a55', '#5c5c68'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'amethyst-geode',
    name: 'Amethyst',
    icon: '🔮',
    description: 'Crystal geode',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2d1b4e', '#6a3fa0', '#a678de', '#e0c3fc'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'oxidized-copper',
    name: 'Oxidized Copper',
    icon: '🟢',
    description: 'Weathered copper green',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#b87333', '#a8703a', '#5aa08a', '#4ec3a5'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'gold-ingot',
    name: 'Gold Ingot',
    icon: '🟨',
    description: 'Shiny but soft',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#7a5c00', '#c9a227', '#ffdf5a', '#fff3b0'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'sculk',
    name: 'Sculk',
    icon: '🔵',
    description: 'Deep dark warden vibes',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#050b12', '#0d1b2a', '#123c4a', '#22d3ee'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'prismarine',
    name: 'Prismarine',
    icon: '🌊',
    description: 'Ocean monument blocks',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0f3d3e', '#1c6b6b', '#4fa3a3', '#8bd3c7'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'cherry-grove',
    name: 'Cherry Grove',
    icon: '🌸',
    description: 'Pink biome petals',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffc7e0', '#ff9ac4', '#e0709e', '#6b4a3a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'mushroom-island',
    name: 'Mushroom Island',
    icon: '🍄',
    description: 'Mycelium and mooshrooms',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#6b5b6e', '#8a7a8d', '#c0392b', '#f0e6e6'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'obsidian-block',
    name: 'Obsidian',
    icon: '⬛',
    description: 'Blast resistant purple-black',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a0612', '#150c22', '#241338', '#3a2054'],
      gradDirection: 'horizontal',
    }
  },

  // ===== RETRO & SYNTHWAVE =====
  {
    id: 'vaporwave',
    name: 'Vaporwave',
    icon: '🌴',
    description: 'A E S T H E T I C',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff71ce', '#b967ff', '#01cdfe', '#05ffa1', '#fffb96'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    icon: '🎹',
    description: 'Neon grid horizon',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b1055', '#7597de', '#ff2e97', '#ffb703'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'outrun',
    name: 'Outrun',
    icon: '🚗',
    description: 'Drive into the sunset',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0d0221', '#651a6b', '#ff1e56', '#ff9a00', '#ffe45e'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'miami-80s',
    name: 'Miami 80s',
    icon: '🌴',
    description: 'Pastel neon deco',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff6ec7', '#ffb3de', '#7ae7ff', '#00b3b3'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'crt-green',
    name: 'CRT Terminal',
    icon: '🖥️',
    description: 'Old phosphor monitor',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#001a00', '#00330f', '#00ff41'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'sepia-film',
    name: 'Sepia Film',
    icon: '📷',
    description: 'Old photograph tone',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b1d0e', '#6b4f2a', '#c9a66b', '#f5e6c8'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'y2k-chrome',
    name: 'Y2K',
    icon: '💿',
    description: 'Millennium chrome shine',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#c0c0c0', '#e8e8f0', '#9ecfff', '#ffb3f0', '#c0c0c0'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'cassette-tape',
    name: 'Cassette',
    icon: '📼',
    description: 'Mixtape colors',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a1a1a', '#ff5f1f', '#f7f7f7', '#2e86ab'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'disco-fever',
    name: 'Disco',
    icon: '🪩',
    description: 'Saturday night fever',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#12002e', '#ff0080', '#ffcc00', '#00e5ff', '#12002e'],
      gradDirection: 'horizontal',
    }
  },

  // ===== NEON =====
  {
    id: 'neon-pink',
    name: 'Neon Pink',
    icon: '💖',
    description: 'Glowing hot pink',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0d000d', '#66004d', '#ff00a0', '#ff85d0'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'neon-green',
    name: 'Neon Green',
    icon: '💚',
    description: 'Radioactive glow',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000d00', '#004d1a', '#00e676', '#b9f6ca'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'neon-cyan',
    name: 'Neon Cyan',
    icon: '💙',
    description: 'Electric ice blue',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000a12', '#004d61', '#00e5ff', '#b3f7ff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'neon-violet',
    name: 'Electric Violet',
    icon: '💜',
    description: 'Ultraviolet glow',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a0014', '#3d0066', '#8f00ff', '#d9a6ff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'laser-lemon',
    name: 'Laser Lemon',
    icon: '💛',
    description: 'Blinding yellow',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#141400', '#666600', '#e6ff00', '#f7ffb3'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'toxic-slime',
    name: 'Toxic Slime',
    icon: '☢️',
    description: 'Do not touch',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0b1a00', '#2f5d00', '#7fff00', '#ccff33'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'neon-sunset',
    name: 'Neon Sunset',
    icon: '🌇',
    description: 'Glowing horizon',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#150029', '#7a00b8', '#ff0066', '#ff9e00'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'neon-tokyo',
    name: 'Neon Tokyo',
    icon: '🏮',
    description: 'Rainy city signs',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#05010d', '#1b0035', '#ff2079', '#00e5ff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'rgb-gamer',
    name: 'RGB Mode',
    icon: '🌈',
    description: 'Maximum RGB',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff0000', '#ff00ff', '#0000ff', '#00ffff', '#00ff00', '#ffff00', '#ff0000'],
      gradDirection: 'horizontal',
    }
  },

  // ===== GRADIENTS (more) =====
  {
    id: 'sunrise-gradient',
    name: 'Sunrise',
    icon: '🌄',
    description: 'Early morning light',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1e2a5a', '#ff7e5f', '#feb47b', '#ffeaa7'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'deep-sea',
    name: 'Deep Sea',
    icon: '🐋',
    description: 'Down in the trench',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000010', '#001a33', '#003b5c', '#0077b6'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'ultraviolet',
    name: 'Ultraviolet',
    icon: '🔮',
    description: 'Purple to blue fade',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#654ea3', '#8360c3', '#2ebf91'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'peachy',
    name: 'Peachy',
    icon: '🍑',
    description: 'Soft peach fade',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffecd2', '#fcb69f', '#ff8c69'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'mint-fresh',
    name: 'Mint',
    icon: '🌿',
    description: 'Cool mint fade',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#00b09b', '#96c93d', '#d4fc79'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'blood-orange',
    name: 'Blood Orange',
    icon: '🍊',
    description: 'Deep citrus red',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#7a0000', '#d62828', '#f77f00', '#fcbf49'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    icon: '⚪',
    description: 'Black to white fade',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#404040', '#808080', '#c0c0c0', '#ffffff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'inverted-mono',
    name: 'Inverted Mono',
    icon: '⚫',
    description: 'White to black fade',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffffff', '#c0c0c0', '#808080', '#404040', '#000000'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'bubblegum-grad',
    name: 'Bubblegum',
    icon: '🎀',
    description: 'Pink and blue swirl',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff9ec4', '#f7a8f0', '#a6c1ee', '#84fab0'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'emerald-sea',
    name: 'Emerald Sea',
    icon: '🐬',
    description: 'Teal to navy',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#43cea2', '#185a9d', '#0b2b52'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'crimson-night',
    name: 'Crimson Night',
    icon: '🍷',
    description: 'Dark red into black',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a0000', '#3d0c11', '#8b0f2b', '#d90429'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'northern-sky',
    name: 'Northern Sky',
    icon: '🌠',
    description: 'Cold sky gradient',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1e3c72', '#2a5298', '#7ec8e3', '#f0f8ff'],
      gradDirection: 'vertical',
    }
  },

  // ===== PASTEL =====
  {
    id: 'pastel-rainbow',
    name: 'Pastel Rainbow',
    icon: '🌈',
    description: 'Soft rainbow tones',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#bdb2ff', '#ffc6ff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    icon: '☁️',
    description: 'Dreamy soft fade',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#fbc2eb', '#a6c1ee', '#c2e9fb', '#fdfbfb'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'baby-blue',
    name: 'Baby Blue',
    icon: '🩵',
    description: 'Gentle blue tones',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#e0f7ff', '#b3e5fc', '#81d4fa', '#4fc3f7'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'peach-cream',
    name: 'Peach Cream',
    icon: '🍑',
    description: 'Warm cream tones',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#fff5e6', '#ffe0c2', '#ffcba4', '#ffb385'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'lilac-haze',
    name: 'Lilac Haze',
    icon: '💜',
    description: 'Soft purple mist',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#f3e7ff', '#dcc6ff', '#c3a6ff', '#a986f0'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'mint-cream',
    name: 'Mint Cream',
    icon: '🍏',
    description: 'Fresh pastel green',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#e8fff5', '#b8f2e6', '#8fe3cf', '#5fd0b5'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pastel-goth',
    name: 'Pastel Goth',
    icon: '🖤',
    description: 'Soft colors, dark heart',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a1a1a', '#4a3f55', '#b39ddb', '#f8bbd0'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'cloud-nine',
    name: 'Cloud Nine',
    icon: '🌤️',
    description: 'Sky and clouds',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#89f7fe', '#c3f0ff', '#ffffff', '#e0eafc'],
      gradDirection: 'vertical',
    }
  },

  // ===== METALS & STONE =====
  {
    id: 'gold-bar',
    name: 'Gold',
    icon: '🥇',
    description: 'Polished gold shine',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5a3d00', '#b8860b', '#ffd700', '#fff4c2', '#ffd700', '#b8860b'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'silver-bar',
    name: 'Silver',
    icon: '🥈',
    description: 'Brushed silver',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#4a4a4a', '#8c8c8c', '#e0e0e0', '#ffffff', '#8c8c8c'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'bronze-bar',
    name: 'Bronze',
    icon: '🥉',
    description: 'Warm bronze tone',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#3d2400', '#8c5a2b', '#cd7f32', '#f0b27a'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    icon: '🌹',
    description: 'Pink metallic sheen',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#7a3b3b', '#b76e79', '#e8b4b8', '#fde2e4'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'chrome-metal',
    name: 'Chrome',
    icon: '🪞',
    description: 'Mirror finish',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1c1c1c', '#7d7d7d', '#ffffff', '#5c6b7a', '#1c1c1c'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'steel-blue',
    name: 'Steel',
    icon: '⚙️',
    description: 'Cold hard steel',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#232b32', '#3e4c59', '#6b7c8c', '#a8b6c1'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'rusted-iron',
    name: 'Rust',
    icon: '🔩',
    description: 'Weathered metal',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b1a12', '#6b3a1f', '#a8451c', '#c96f3b'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'marble-white',
    name: 'Marble',
    icon: '🏛️',
    description: 'Polished stone',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffffff', '#f0f0f0', '#d6d6d6', '#b0b0b0', '#ffffff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'granite-stone',
    name: 'Granite',
    icon: '🪨',
    description: 'Speckled grey rock',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#3b3b3b', '#5c5c5c', '#8a8a8a', '#b5b5b5'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'platinum-shine',
    name: 'Platinum',
    icon: '💍',
    description: 'Cool premium white',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#6e7a80', '#a9b8bd', '#e3edf0', '#ffffff'],
      gradDirection: 'horizontal',
    }
  },

  // ===== FOOD & DRINKS =====
  {
    id: 'coffee-cup',
    name: 'Coffee',
    icon: '☕',
    description: 'Fresh brewed',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2c1608', '#4b2e1a', '#7b5136', '#c8a27a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'matcha-latte',
    name: 'Matcha',
    icon: '🍵',
    description: 'Green tea latte',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#3e5e2a', '#7fa650', '#b7d18a', '#f5f0e1'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'strawberry-milk',
    name: 'Strawberry Milk',
    icon: '🍓',
    description: 'Pink and creamy',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#fff0f3', '#ffccd5', '#ff8fa3', '#e5383b'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'chocolate-bar',
    name: 'Chocolate',
    icon: '🍫',
    description: 'Rich dark cocoa',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1b0e05', '#3b2314', '#5d3a22', '#8b5a2b'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'boba-tea',
    name: 'Boba Tea',
    icon: '🧋',
    description: 'Milk tea with pearls',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#e6d3b3', '#c8a27a', '#7b5136', '#2c1608'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'neapolitan',
    name: 'Neapolitan',
    icon: '🍨',
    description: 'Three flavor classic',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffb3c6', '#ffb3c6', '#fff8e7', '#fff8e7', '#5d3a22', '#5d3a22'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'blueberry-jam',
    name: 'Blueberry',
    icon: '🫐',
    description: 'Berry blue and purple',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#12002e', '#3c1361', '#5b2a86', '#9a6fd9'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'honey-jar',
    name: 'Honey',
    icon: '🍯',
    description: 'Golden and sweet',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#7a4a00', '#c98a00', '#ffc300', '#ffe9a8'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'grape-soda',
    name: 'Grape Soda',
    icon: '🥤',
    description: 'Fizzy purple',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b0a3d', '#6a0dad', '#a64ac9', '#e0aaff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'avocado-toast',
    name: 'Avocado',
    icon: '🥑',
    description: 'Green and creamy',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#3d5417', '#6a9113', '#b5d33d', '#f7e8a4'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'donut-glaze',
    name: 'Donut',
    icon: '🍩',
    description: 'Pink glaze with sprinkles',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#e8a87c', '#ff9ec4', '#ffd6e8', '#ff9ec4'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🍩',
      emojiSize: 28,
      emojiSpacing: 46,
      emojiOpacity: 0.7,
      emojiRandomRotation: true,
      emojiJitter: 0.2,
      emojiSeed: 77,
    }
  },

  // ===== DARK & GOTHIC =====
  {
    id: 'pure-black',
    name: 'Void Black',
    icon: '⬛',
    description: 'Just pure darkness',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#0a0a0a', '#000000'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'blood-moon',
    name: 'Blood Moon',
    icon: '🌕',
    description: 'Red eclipse night',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#050505', '#1a0000', '#5a0f0f', '#a71d1d'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'shadow-realm',
    name: 'Shadow Realm',
    icon: '👤',
    description: 'Deep grey shadows',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#101014', '#1e1e26', '#2c2c38'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'gothic-cathedral',
    name: 'Gothic',
    icon: '⛪',
    description: 'Stained glass in the dark',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a0a12', '#2a1b3d', '#44318d', '#8265a7'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'witching-hour',
    name: 'Witching Hour',
    icon: '🧙',
    description: 'Midnight magic',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0d0221', '#2d1155', '#5a189a', '#00ff88'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'halloween-night',
    name: 'Halloween',
    icon: '🎃',
    description: 'Spooky season',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0d0d0d', '#2b0a3d', '#ff6d00', '#ffb703'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '🎃',
      emojiSize: 30,
      emojiSpacing: 52,
      emojiOpacity: 0.7,
      emojiRandomRotation: true,
      emojiJitter: 0.2,
      emojiSeed: 1031,
    }
  },
  {
    id: 'vampire',
    name: 'Vampire',
    icon: '🧛',
    description: 'Black cloak, red lining',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#1a0005', '#4a000f', '#8b0000', '#1a0005'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'toxic-swamp',
    name: 'Toxic Swamp',
    icon: '🧪',
    description: 'Murky and poisonous',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0b0f00', '#1f2b00', '#3d5300', '#7fb800'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'ash-and-smoke',
    name: 'Ash & Smoke',
    icon: '💨',
    description: 'Burned out grey',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0f0f0f', '#2e2e2e', '#5c5c5c', '#8f8f8f'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'cursed-purple',
    name: 'Cursed',
    icon: '🔮',
    description: 'Dark arcane energy',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#1a0033', '#4b0082', '#9d00ff'],
      gradDirection: 'vertical',
    }
  },

  // ===== FUN & MEME (more) =====
  {
    id: 'unicorn-magic',
    name: 'Unicorn',
    icon: '🦄',
    description: 'Magical sparkle mane',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffb3f0', '#c3a6ff', '#a6d8ff', '#a6ffcb', '#fff2a6'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🦄',
      emojiSize: 30,
      emojiSpacing: 54,
      emojiOpacity: 0.7,
      emojiRandomRotation: true,
      emojiJitter: 0.2,
      emojiSeed: 7,
    }
  },
  {
    id: 'frog-vibes',
    name: 'Frog',
    icon: '🐸',
    description: 'Ribbit',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1b3a1b', '#3d7c3d', '#6cc551', '#c8f5a0'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '🐸',
      emojiSize: 28,
      emojiSpacing: 46,
      emojiOpacity: 0.75,
      emojiRandomRotation: true,
      emojiJitter: 0.15,
      emojiSeed: 33,
    }
  },
  {
    id: 'panda-mode',
    name: 'Panda',
    icon: '🐼',
    description: 'Black and white bear',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#ffffff', '#ffffff', '#000000'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🐼',
      emojiSize: 30,
      emojiSpacing: 50,
      emojiOpacity: 0.7,
      emojiSeed: 2,
    }
  },
  {
    id: 'party-time',
    name: 'Party Time',
    icon: '🎉',
    description: 'Confetti everywhere',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff6b6b', '#ffd93d', '#6bcB77', '#4d96ff', '#c77dff'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🎉',
      emojiSize: 30,
      emojiSpacing: 48,
      emojiOpacity: 0.75,
      emojiRandomRotation: true,
      emojiJitter: 0.25,
      emojiSeed: 999,
    }
  },
  {
    id: 'brain-rot',
    name: 'Big Brain',
    icon: '🧠',
    description: 'Galaxy brain moment',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0f0c29', '#302b63', '#ff9ec4', '#ffd6e8'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '🧠',
      emojiSize: 28,
      emojiSpacing: 48,
      emojiOpacity: 0.6,
      emojiRandomRotation: true,
      emojiJitter: 0.2,
      emojiSeed: 200,
    }
  },
  {
    id: 'sus-red',
    name: 'Sus',
    icon: '🔺',
    description: 'Kinda sus ngl',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a0a1a', '#c51111', '#ff4d4d', '#7bc8ff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'trollface',
    name: 'Troll',
    icon: '😈',
    description: 'Problem?',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffffff', '#e0e0e0', '#9e9e9e', '#000000'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '😈',
      emojiSize: 30,
      emojiSpacing: 52,
      emojiOpacity: 0.6,
      emojiRandomRotation: true,
      emojiJitter: 0.2,
      emojiSeed: 404,
    }
  },
  {
    id: 'coffee-addict',
    name: 'Caffeinated',
    icon: '☕',
    description: 'Powered by coffee',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2c1608', '#6b4226', '#c8a27a', '#f5e6d3'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '☕',
      emojiSize: 26,
      emojiSpacing: 44,
      emojiOpacity: 0.7,
      emojiRandomRotation: true,
      emojiJitter: 0.15,
      emojiSeed: 5,
    }
  },
  {
    id: 'bee-buzz',
    name: 'Bee',
    icon: '🐝',
    description: 'Buzz buzz',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffd200', '#000000', '#ffd200', '#000000', '#ffd200'],
      gradDirection: 'horizontal',
      emojiEnabled: true,
      emoji: '🐝',
      emojiSize: 26,
      emojiSpacing: 44,
      emojiOpacity: 0.8,
      emojiRandomRotation: true,
      emojiJitter: 0.2,
      emojiSeed: 66,
    }
  },
  {
    id: 'shark-attack',
    name: 'Shark',
    icon: '🦈',
    description: 'Fin above water',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0b2b52', '#1d6fa5', '#7fb3d5', '#d6eaf8'],
      gradDirection: 'vertical',
      emojiEnabled: true,
      emoji: '🦈',
      emojiSize: 30,
      emojiSpacing: 52,
      emojiOpacity: 0.6,
      emojiRandomRotation: true,
      emojiJitter: 0.15,
      emojiSeed: 12,
    }
  },

  // ===== PRIDE FLAGS (wave 2) =====
  {
    id: 'pride-rainbow-horizontal',
    name: 'Rainbow Horizontal',
    icon: '🌈',
    description: 'Rainbow flag, sideways',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#E40303', '#FF8C00', '#FFED00', '#008026', '#24408E', '#732982'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'pride-lesbian-sunset',
    name: 'Lesbian Sunset',
    icon: '🌇',
    description: 'Five stripe lesbian flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#D62900', '#FF9B55', '#FFFFFF', '#D461A6', '#A50062'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-gay-five',
    name: 'Gay (5 Stripe)',
    icon: '💚',
    description: 'Simplified gay men flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#078D70', '#98E8C1', '#FFFFFF', '#7BADE2', '#3D1A78'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-graysexual',
    name: 'Graysexual',
    icon: '🩶',
    description: 'Graysexual pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#740194', '#AEB1AA', '#FFFFFF', '#AEB1AA', '#740194'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-demiromantic',
    name: 'Demiromantic',
    icon: '💚',
    description: 'Demiromantic pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#FFFFFF', '#3DA542', '#A9A9A9', '#FFFFFF'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-androgyne',
    name: 'Androgyne',
    icon: '💗',
    description: 'Androgyne pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FE9DD3', '#B57EDC', '#6A9EDA'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-genderfae',
    name: 'Genderfae',
    icon: '🧚',
    description: 'Genderfae pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#97C3A5', '#C3DEAE', '#FFFFFF', '#FCA2C4', '#DB8AE4', '#A97EDD'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-genderfaun',
    name: 'Genderfaun',
    icon: '🦌',
    description: 'Genderfaun pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FCD689', '#FFF09B', '#FAF9CD', '#FFFFFF', '#8EDED9', '#8CACDE', '#9782EC'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-trigender',
    name: 'Trigender',
    icon: '💠',
    description: 'Trigender pride flag',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FF95C5', '#9581FF', '#67D967', '#9581FF', '#FF95C5'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pride-ally',
    name: 'Ally',
    icon: '🤝',
    description: 'Straight ally colors',
    category: 'pride',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#FFFFFF', '#E40303', '#FF8C00', '#FFED00', '#008026', '#24408E', '#732982'],
      gradDirection: 'horizontal',
    }
  },

  // ===== COUNTRY FLAGS (wave 2) =====
  {
    id: 'flag-luxembourg',
    name: 'Luxembourg',
    icon: '🇱🇺',
    description: 'Red, white, light blue',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ED2939', '#ED2939', '#FFFFFF', '#FFFFFF', '#00A1DE', '#00A1DE'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-estonia',
    name: 'Estonia',
    icon: '🇪🇪',
    description: 'Blue, black, white',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0072CE', '#0072CE', '#000000', '#000000', '#FFFFFF', '#FFFFFF'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-latvia',
    name: 'Latvia',
    icon: '🇱🇻',
    description: 'Carmine and white',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#9E3039', '#9E3039', '#FFFFFF', '#9E3039', '#9E3039'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-lithuania',
    name: 'Lithuania',
    icon: '🇱🇹',
    description: 'Yellow, green, red',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FDB913', '#FDB913', '#006A44', '#006A44', '#C1272D', '#C1272D'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-slovakia',
    name: 'Slovakia',
    icon: '🇸🇰',
    description: 'White, blue, red',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FFFFFF', '#FFFFFF', '#0B4EA2', '#0B4EA2', '#EE1C25', '#EE1C25'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-slovenia',
    name: 'Slovenia',
    icon: '🇸🇮',
    description: 'White, blue, red',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FFFFFF', '#FFFFFF', '#0000FF', '#0000FF', '#FF0000', '#FF0000'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-croatia',
    name: 'Croatia',
    icon: '🇭🇷',
    description: 'Red, white, blue',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FF0000', '#FF0000', '#FFFFFF', '#FFFFFF', '#171796', '#171796'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-bulgaria',
    name: 'Bulgaria',
    icon: '🇧🇬',
    description: 'White, green, red',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FFFFFF', '#FFFFFF', '#00966E', '#00966E', '#D62612', '#D62612'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-colombia',
    name: 'Colombia',
    icon: '🇨🇴',
    description: 'Yellow, blue, red',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FCD116', '#FCD116', '#FCD116', '#003893', '#CE1126'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-peru',
    name: 'Peru',
    icon: '🇵🇪',
    description: 'Red and white bands',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#D91023', '#D91023', '#FFFFFF', '#FFFFFF', '#D91023', '#D91023'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'flag-chile',
    name: 'Chile',
    icon: '🇨🇱',
    description: 'Blue, white, red',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0039A6', '#FFFFFF', '#FFFFFF', '#D52B1E', '#D52B1E'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-thailand',
    name: 'Thailand',
    icon: '🇹🇭',
    description: 'Red, white, navy',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#A51931', '#F4F5F8', '#2D2A4A', '#2D2A4A', '#F4F5F8', '#A51931'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-vietnam',
    name: 'Vietnam',
    icon: '🇻🇳',
    description: 'Red with gold star',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#DA251D', '#DA251D', '#FFFF00', '#DA251D', '#DA251D'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-indonesia',
    name: 'Indonesia',
    icon: '🇮🇩',
    description: 'Red over white',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#FF0000', '#FF0000', '#FFFFFF', '#FFFFFF'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-nigeria',
    name: 'Nigeria',
    icon: '🇳🇬',
    description: 'Green and white bands',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#008751', '#008751', '#FFFFFF', '#FFFFFF', '#008751', '#008751'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'flag-kenya',
    name: 'Kenya',
    icon: '🇰🇪',
    description: 'Black, red, green',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#FFFFFF', '#BB0000', '#FFFFFF', '#006600'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-southafrica',
    name: 'South Africa',
    icon: '🇿🇦',
    description: 'Rainbow nation colors',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#E03C31', '#FFFFFF', '#007A4D', '#FFB612', '#000000', '#001489'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'flag-egypt',
    name: 'Egypt',
    icon: '🇪🇬',
    description: 'Red, white, black',
    category: 'flags',
    settings: {
      ...defaultSettings,
      gradientColors: ['#CE1126', '#CE1126', '#FFFFFF', '#FFFFFF', '#000000', '#000000'],
      gradDirection: 'vertical',
    }
  },

  // ===== SUMMER (wave 2) =====
  {
    id: 'coconut-water',
    name: 'Coconut Water',
    icon: '🥥',
    description: 'Creamy tropical white',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#6b4226', '#c8a27a', '#f5efe0', '#ffffff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'popsicle',
    name: 'Popsicle',
    icon: '🍧',
    description: 'Frozen fruit stripes',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff5f6d', '#ffc371', '#8fd3f4', '#84fab0'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'hibiscus',
    name: 'Hibiscus',
    icon: '🌺',
    description: 'Tropical flower red',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1b5e20', '#e91e63', '#ff5a8a', '#ffd6e0'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'sunburn',
    name: 'Sunburn',
    icon: '🥵',
    description: 'Too much sun',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffe0c2', '#ffb08a', '#ff6f52', '#c62828'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'sea-breeze',
    name: 'Sea Breeze',
    icon: '🌬️',
    description: 'Light coastal air',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#e0f7fa', '#b2ebf2', '#4dd0e1', '#0097a7'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'bonfire-night',
    name: 'Bonfire Night',
    icon: '🔥',
    description: 'Beach fire after dark',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0b1026', '#3a1c2e', '#c1440e', '#ffb703'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'festival-summer',
    name: 'Festival',
    icon: '🎪',
    description: 'Open air summer fest',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff477e', '#ff8c42', '#ffd166', '#06d6a0', '#118ab2'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'tropical-sunset',
    name: 'Tropical Sunset',
    icon: '🌅',
    description: 'Palms against orange sky',
    category: 'summer',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2a1b3d', '#ff5e62', '#ff9966', '#ffd194'],
      gradDirection: 'vertical',
    }
  },

  // ===== WINTER (wave 2) =====
  {
    id: 'snow-globe',
    name: 'Snow Globe',
    icon: '🔮',
    description: 'Shaken and sparkling',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0b1e3d', '#2e5c8a', '#a8d8f0', '#ffffff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'reindeer',
    name: 'Reindeer',
    icon: '🦌',
    description: 'Brown fur and red nose',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#3e2723', '#6d4c41', '#a1887f', '#d32f2f'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'frozen-lake',
    name: 'Frozen Lake',
    icon: '⛸️',
    description: 'Ice over deep water',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#e8f6ff', '#a4d8ef', '#3d7ea6', '#0b2b3d'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'blizzard',
    name: 'Blizzard',
    icon: '🌨️',
    description: 'Whiteout conditions',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#c9d6df', '#f0f4f8', '#ffffff', '#dbe4ec'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'icicles',
    name: 'Icicles',
    icon: '🧊',
    description: 'Hanging frozen spikes',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5b8fb9', '#9fd3e8', '#dff6ff', '#ffffff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'winter-sunrise',
    name: 'Winter Sunrise',
    icon: '🌄',
    description: 'Cold morning light',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1b2a4a', '#6a7fa8', '#f7b7a3', '#ffe6c7'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'ski-slope',
    name: 'Ski Slope',
    icon: '🎿',
    description: 'Fresh powder run',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffffff', '#dcecf7', '#5b8fb9', '#1b3b5f'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'new-year',
    name: 'New Year',
    icon: '🎆',
    description: 'Midnight fireworks',
    category: 'winter',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0b0b1a', '#2d1b4e', '#ffd700', '#fff6c2'],
      gradDirection: 'vertical',
    }
  },

  // ===== NATURE (wave 2) =====
  {
    id: 'moss-stone',
    name: 'Moss',
    icon: '🌿',
    description: 'Damp green moss',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1f2b1a', '#3e5622', '#6b8f3a', '#a3bf6a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'bamboo-forest',
    name: 'Bamboo',
    icon: '🎋',
    description: 'Tall green stalks',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2f4f2f', '#6b8e23', '#a3c14a', '#e6f0c2'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'canyon-rock',
    name: 'Canyon',
    icon: '🏞️',
    description: 'Layered red rock',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#7b2f1a', '#b5561f', '#d98b4a', '#f0c99a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'wildflowers',
    name: 'Wildflowers',
    icon: '🌼',
    description: 'Meadow full of blooms',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#7cb342', '#ffee58', '#ff7043', '#ab47bc'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'ocean-cliff',
    name: 'Ocean Cliff',
    icon: '🌊',
    description: 'Green cliffs, blue sea',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#4a7c59', '#8fbf7f', '#4fa3c4', '#12496b'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'swamp-nature',
    name: 'Swamp',
    icon: '🐊',
    description: 'Murky wetlands',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a2416', '#3a4a2a', '#5f6b3a', '#8b8f4a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'tundra',
    name: 'Tundra',
    icon: '🦌',
    description: 'Cold barren plains',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5c6b73', '#9db4c0', '#c2d3d8', '#eef4f6'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'redwood',
    name: 'Redwood',
    icon: '🌲',
    description: 'Giant ancient trees',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b1a0e', '#6b3a1f', '#9c5c33', '#3d5c2a'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'foggy-morning',
    name: 'Foggy Morning',
    icon: '🌫️',
    description: 'Mist over the hills',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2f3e35', '#6b7d70', '#b8c4bc', '#eef2ef'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'rainbow-after-rain',
    name: 'After the Rain',
    icon: '🌦️',
    description: 'Rainbow over wet grass',
    category: 'nature',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5c6b73', '#9bb7d4', '#ffd166', '#06d6a0', '#3a7d44'],
      gradDirection: 'vertical',
    }
  },

  // ===== SPACE (wave 2) =====
  {
    id: 'jupiter-bands',
    name: 'Jupiter',
    icon: '🟠',
    description: 'Gas giant storm bands',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#8b5a2b', '#d9a066', '#f0d9b5', '#c0703a', '#a83c1f'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'neptune-blue',
    name: 'Neptune',
    icon: '🔵',
    description: 'Ice giant deep blue',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a1a4a', '#1e3a8a', '#3b6fd4', '#8fb8f0'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'venus-clouds',
    name: 'Venus',
    icon: '🟡',
    description: 'Thick golden atmosphere',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#6b4a1f', '#c9942f', '#e8c07a', '#fbe6bb'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pluto-dwarf',
    name: 'Pluto',
    icon: '🤍',
    description: 'Distant icy dwarf',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b2621', '#6b5f52', '#b8a894', '#f0e6d8'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'andromeda',
    name: 'Andromeda',
    icon: '🌀',
    description: 'Neighboring galaxy',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#05010f', '#211a54', '#5c4bb5', '#c2a8ff', '#fff0f5'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'space-station',
    name: 'Space Station',
    icon: '🛰️',
    description: 'Orbital metal and solar',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#12141c', '#3c4250', '#a8b2bf', '#1b3a6b'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'meteor-shower',
    name: 'Meteor Shower',
    icon: '🌠',
    description: 'Streaks across the sky',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#02010a', '#141433', '#4a5bb5', '#ffe08a', '#ffffff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'wormhole',
    name: 'Wormhole',
    icon: '🕳️',
    description: 'Bending spacetime',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#1a0a3d', '#4a1fa8', '#00e5ff', '#ffffff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'alien-planet',
    name: 'Alien Planet',
    icon: '🪐',
    description: 'Strange world surface',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a0d2b', '#5b1f6b', '#a83fa8', '#3fffc4'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'star-cluster',
    name: 'Star Cluster',
    icon: '⭐',
    description: 'Thousands of suns',
    category: 'space',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000018', '#1b2a6b', '#7f9fd4', '#fff8e0'],
      gradDirection: 'vertical',
    }
  },

  // ===== GAMING (wave 2) =====
  {
    id: 'mana-bar',
    name: 'Mana Bar',
    icon: '🔵',
    description: 'Full mana',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#001a3d', '#0055ff', '#00aaff', '#a8e0ff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'loot-rare',
    name: 'Rare Loot',
    icon: '🔷',
    description: 'Rare drop rarity',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#001428', '#0a3d6b', '#1e90ff', '#a8d8ff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'loot-mythic',
    name: 'Mythic',
    icon: '🔶',
    description: 'Mythic drop rarity',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b0011', '#8b0033', '#ff1e6b', '#ffb3cc'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'ranked-diamond',
    name: 'Diamond Rank',
    icon: '💠',
    description: 'Top of the ladder',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a1a2b', '#1e5f8b', '#5fd3f0', '#d8f7ff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'game-over',
    name: 'Game Over',
    icon: '💀',
    description: 'You died',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#1a0000', '#5a0000', '#ff0000'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'victory-screen',
    name: 'Victory',
    icon: '🥇',
    description: 'Winner winner',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a1400', '#7a5c00', '#ffd700', '#fff6c2'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'checkpoint',
    name: 'Checkpoint',
    icon: '🚩',
    description: 'Progress saved',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0d1b1e', '#1b998b', '#5fe0c0', '#e0fff8'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'pixel-sky',
    name: 'Pixel Sky',
    icon: '🌤️',
    description: '8-bit daytime',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5c94fc', '#5c94fc', '#9ad8ff', '#ffffff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'retro-console',
    name: 'Retro Console',
    icon: '🎮',
    description: 'Grey plastic and purple',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#d8d8d0', '#a8a8a0', '#5a4a7a', '#2b2340'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'speed-boost',
    name: 'Speed Boost',
    icon: '💨',
    description: 'Nitro engaged',
    category: 'gaming',
    settings: {
      ...defaultSettings,
      gradientColors: ['#001a33', '#0077ff', '#00e5ff', '#ffffff'],
      gradDirection: 'horizontal',
    }
  },

  // ===== MINECRAFT (wave 2) =====
  {
    id: 'lapis-ore',
    name: 'Lapis Lazuli',
    icon: '🔵',
    description: 'Deep blue enchanting dye',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0b1f4a', '#1b3d8f', '#3a6bd4', '#8fb8f0'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'iron-ingot',
    name: 'Iron Ingot',
    icon: '⬜',
    description: 'Reliable grey metal',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5a5a5a', '#8f8f8f', '#d8d8d8', '#f5f5f5'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'coal-ore',
    name: 'Coal',
    icon: '⚫',
    description: 'Stone with black specks',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a1a1a', '#3a3a3a', '#6b6b6b', '#8f8f8f'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'desert-biome',
    name: 'Desert Biome',
    icon: '🏜️',
    description: 'Sand and sandstone',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#87ceeb', '#f0e0a8', '#dbc47a', '#b8a05a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'ice-spikes',
    name: 'Ice Spikes',
    icon: '🧊',
    description: 'Packed ice biome',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#7fc8e8', '#b8e4f5', '#e8f7ff', '#ffffff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'warped-forest',
    name: 'Warped Forest',
    icon: '🟦',
    description: 'Teal nether fungus',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0d2b2b', '#166b6b', '#2ba3a3', '#5fd8c4'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'crimson-forest',
    name: 'Crimson Forest',
    icon: '🟥',
    description: 'Red nether fungus',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b0a0a', '#7a1f1f', '#b53a2b', '#e06b4a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'soul-sand-valley',
    name: 'Soul Sand Valley',
    icon: '👻',
    description: 'Blue soul fire glow',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b2318', '#4a3a28', '#1b6b8f', '#5fd8f0'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'lush-cave',
    name: 'Lush Cave',
    icon: '🌱',
    description: 'Moss and glow berries',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a2b12', '#3d6b28', '#7aad3a', '#ffb703'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'dripstone-cave',
    name: 'Dripstone Cave',
    icon: '🪨',
    description: 'Pointed brown stone',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b2018', '#5a4636', '#8b7057', '#b89b7a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'beacon-beam',
    name: 'Beacon',
    icon: '🔆',
    description: 'Beam into the sky',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a0a1a', '#1b3d5c', '#7fd8f0', '#ffffff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'bee-nest',
    name: 'Bee Nest',
    icon: '🍯',
    description: 'Honeycomb and wood',
    category: 'minecraft',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5a3a18', '#a86b28', '#e8a33a', '#ffd98f'],
      gradDirection: 'horizontal',
    }
  },

  // ===== RETRO (wave 2) =====
  {
    id: 'pixel-sunset',
    name: 'Pixel Sunset',
    icon: '🌇',
    description: 'Dithered 8-bit dusk',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b1055', '#7b2d8b', '#e05a8b', '#ffb56b', '#ffe9a8'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'retro-diner',
    name: 'Retro Diner',
    icon: '🍔',
    description: 'Chrome, red vinyl, checker',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#e63946', '#f1faee', '#a8dadc', '#1d3557'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'bowling-alley',
    name: 'Bowling Alley',
    icon: '🎳',
    description: 'Loud carpet energy',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#12005e', '#ff2e97', '#00e5ff', '#ffe14d'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'vhs-glitch',
    name: 'VHS Glitch',
    icon: '📺',
    description: 'Tracking error colors',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#ff0044', '#ffffff', '#00e5ff', '#000000'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    icon: '🖼️',
    description: 'Bold comic panel colors',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffe14d', '#ff4d6d', '#4d9bff', '#ffffff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'newspaper',
    name: 'Newspaper',
    icon: '📰',
    description: 'Aged print and ink',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#f2ead3', '#d9cdb0', '#8a8070', '#1a1a1a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    icon: '📸',
    description: 'Faded instant photo',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#fdf6e3', '#e8d5b7', '#c9a88a', '#7a6a5a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'win95',
    name: '90s Desktop',
    icon: '🖱️',
    description: 'Teal desktop and grey box',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#008080', '#c0c0c0', '#dfdfdf', '#000080'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'roller-disco',
    name: 'Roller Disco',
    icon: '🛼',
    description: 'Skate rink neon',
    category: 'retro',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b0a3d', '#e0218a', '#ff8c42', '#ffe14d'],
      gradDirection: 'vertical',
    }
  },

  // ===== NEON (wave 2) =====
  {
    id: 'neon-orange',
    name: 'Neon Orange',
    icon: '🧡',
    description: 'Burning bright orange',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#140800', '#663300', '#ff6600', '#ffc199'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'neon-red',
    name: 'Neon Red',
    icon: '❤️',
    description: 'Glowing danger red',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#120000', '#5c0000', '#ff1a1a', '#ff9999'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'neon-ice',
    name: 'Neon Ice',
    icon: '🧊',
    description: 'Frozen electric white',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#001018', '#00566b', '#66e8ff', '#ffffff'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'neon-mint',
    name: 'Neon Mint',
    icon: '🌿',
    description: 'Glowing mint green',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#001410', '#00614a', '#00ffbb', '#b3ffe8'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'cyber-grid',
    name: 'Cyber Grid',
    icon: '🔲',
    description: 'Glowing wireframe floor',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#02000a', '#1a0033', '#6600cc', '#00ffe5'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'blacklight',
    name: 'Blacklight',
    icon: '🔦',
    description: 'UV party glow',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#05000f', '#2b0066', '#7a00ff', '#e0b3ff', '#00ff88'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'plasma-ball',
    name: 'Plasma',
    icon: '⚡',
    description: 'Arcs of charged gas',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a0014', '#5c00a3', '#c400ff', '#ff66e0', '#ffffff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'hot-wire',
    name: 'Hot Wire',
    icon: '🔥',
    description: 'Glowing filament',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a0000', '#4d0f00', '#ff4d00', '#ffcc66', '#ffffff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'neon-split',
    name: 'Split Neon',
    icon: '🎆',
    description: 'Pink meets cyan',
    category: 'neon',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff00a0', '#8f00ff', '#0066ff', '#00e5ff'],
      gradDirection: 'horizontal',
    }
  },

  // ===== GRADIENTS (wave 2) =====
  {
    id: 'nordic-fade',
    name: 'Nordic',
    icon: '🇸🇪',
    description: 'Cool muted blues',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2e3440', '#4c566a', '#81a1c1', '#eceff4'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'purple-haze',
    name: 'Purple Haze',
    icon: '🟣',
    description: 'Smoky violet fade',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1a0b2e', '#432371', '#7b4397', '#c471ed'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'teal-rose',
    name: 'Teal & Rose',
    icon: '🌹',
    description: 'Complementary contrast',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0f4c5c', '#5f9ea0', '#e5989b', '#ffcdb2'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'aqua-fire',
    name: 'Aqua Fire',
    icon: '🔥',
    description: 'Cold to hot',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#00c9ff', '#4facfe', '#ff8c42', '#ff3c38'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'copper-sky',
    name: 'Copper Sky',
    icon: '🌇',
    description: 'Metallic dusk',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1b263b', '#5c4033', '#b87333', '#e8b88a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'slate-fade',
    name: 'Slate',
    icon: '🩶',
    description: 'Cool grey blue fade',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#141c26', '#2c3e50', '#5d7185', '#9fb3c8'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'berry-smoothie',
    name: 'Berry Smoothie',
    icon: '🥤',
    description: 'Blended berry mix',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#3a015c', '#8a0f5f', '#d81e5b', '#ff9ec4'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'twilight-fade',
    name: 'Twilight',
    icon: '🌆',
    description: 'Just after sundown',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0b1026', '#3a2a5c', '#8a5a8f', '#f0a08a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'sand-and-sea',
    name: 'Sand & Sea',
    icon: '🏝️',
    description: 'Shoreline colors',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#f4e3c1', '#e0c9a6', '#5eb1bf', '#04619f'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'lime-navy',
    name: 'Lime & Navy',
    icon: '🟢',
    description: 'Sharp sport contrast',
    category: 'gradients',
    settings: {
      ...defaultSettings,
      gradientColors: ['#001233', '#023e7d', '#8ac926', '#d6ff8f'],
      gradDirection: 'horizontal',
    }
  },

  // ===== PASTEL (wave 2) =====
  {
    id: 'pastel-sunset',
    name: 'Pastel Sunset',
    icon: '🌅',
    description: 'Soft evening sky',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffd1dc', '#ffc8a2', '#ffe5b4', '#cdb4db'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pastel-ocean',
    name: 'Pastel Ocean',
    icon: '🐚',
    description: 'Soft sea tones',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#e0fbfc', '#bde0fe', '#a2d2ff', '#8ecae6'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pastel-lemon',
    name: 'Pastel Lemon',
    icon: '🍋',
    description: 'Gentle yellow',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#fffcf0', '#fdf6b2', '#f9e79f', '#f4d35e'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pastel-coral',
    name: 'Pastel Coral',
    icon: '🪸',
    description: 'Soft warm coral',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#fff0ee', '#ffd6cc', '#ffb3a7', '#ff8f80'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'powder-pink',
    name: 'Powder Pink',
    icon: '🎀',
    description: 'Barely there pink',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#fff5f8', '#ffe3ec', '#ffc9de', '#ffafcc'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'sage-green',
    name: 'Sage',
    icon: '🌿',
    description: 'Muted herbal green',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#f2f5ee', '#dbe5d5', '#b7c9a8', '#8fa87c'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'vanilla-cream',
    name: 'Vanilla',
    icon: '🍦',
    description: 'Warm off-white',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#fffdf7', '#fdf3dd', '#f5e3c0', '#e8cfa3'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pastel-galaxy',
    name: 'Pastel Galaxy',
    icon: '🌌',
    description: 'Soft cosmic swirl',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#cdb4db', '#bdb2ff', '#a0c4ff', '#ffc6ff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'pastel-lilac-mint',
    name: 'Lilac & Mint',
    icon: '💐',
    description: 'Two soft tones',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#e4c1f9', '#d0d1ff', '#b8f2e6', '#aaf0d1'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'pastel-neapolitan',
    name: 'Soft Neapolitan',
    icon: '🍨',
    description: 'Pastel three flavors',
    category: 'pastel',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffd6e0', '#fff8ee', '#e0c3a8'],
      gradDirection: 'horizontal',
    }
  },

  // ===== METALS & STONE (wave 2) =====
  {
    id: 'copper-metal',
    name: 'Copper',
    icon: '🟠',
    description: 'Fresh polished copper',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#4a2410', '#8b4513', '#b87333', '#e8a878'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'brass-metal',
    name: 'Brass',
    icon: '🎺',
    description: 'Warm yellow alloy',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5a4a10', '#a8912b', '#d4af37', '#f0dc8a'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'titanium',
    name: 'Titanium',
    icon: '🔧',
    description: 'Light and strong grey',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#3a3f45', '#6b7278', '#a8afb5', '#dfe4e8'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'gunmetal',
    name: 'Gunmetal',
    icon: '⚫',
    description: 'Dark blue-grey metal',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#12161a', '#232b32', '#3d4a54', '#5c6b78'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'sandstone-rock',
    name: 'Sandstone',
    icon: '🧱',
    description: 'Warm layered rock',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#8b6f47', '#c2a06b', '#e0c9a0', '#f5ecd8'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'basalt-rock',
    name: 'Basalt',
    icon: '🌑',
    description: 'Cooled volcanic stone',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0f0f12', '#22222a', '#3a3a44', '#55555f'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'quartz-crystal',
    name: 'Quartz',
    icon: '💎',
    description: 'Clear crystalline white',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffffff', '#f2f4f7', '#dfe6ef', '#c2cede'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'jade-stone',
    name: 'Jade',
    icon: '🟩',
    description: 'Polished green stone',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0b3d2e', '#1f6b52', '#4fa88a', '#a8dfc9'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'amber-stone',
    name: 'Amber',
    icon: '🟧',
    description: 'Fossilized resin glow',
    category: 'metal',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5a2b00', '#a85a00', '#e08f1f', '#ffcf7a'],
      gradDirection: 'vertical',
    }
  },

  // ===== FOOD & DRINKS (wave 2) =====
  {
    id: 'espresso',
    name: 'Espresso',
    icon: '☕',
    description: 'Dark shot with crema',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#120a05', '#2b1608', '#6b3a1a', '#c08a52'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'caramel',
    name: 'Caramel',
    icon: '🍮',
    description: 'Sticky golden sauce',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5a2f0a', '#a8631a', '#d9963d', '#f5cf9a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'mint-chocolate',
    name: 'Mint Choc',
    icon: '🍫',
    description: 'Green and brown chips',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#a8e6cf', '#6bcfa8', '#3b2314', '#1b0e05'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'raspberry',
    name: 'Raspberry',
    icon: '🍇',
    description: 'Tart pink-red berry',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#4a0d20', '#8b1a3d', '#d62d5c', '#ff8fae'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'lime-soda',
    name: 'Lime Soda',
    icon: '🥤',
    description: 'Fizzy green refresher',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#1f4d1f', '#4a9c2b', '#8fd44a', '#e0f5b8'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pumpkin-spice',
    name: 'Pumpkin Spice',
    icon: '🎃',
    description: 'Autumn latte season',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#4a2b0f', '#a8551a', '#e08a2b', '#f7d9a8'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'ramen-bowl',
    name: 'Ramen',
    icon: '🍜',
    description: 'Broth, noodles, egg',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#5a2b14', '#a86b2b', '#e8c98a', '#fff2d8'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'cheese-wheel',
    name: 'Cheese',
    icon: '🧀',
    description: 'Aged yellow wheel',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#8a5a00', '#d4a017', '#f5c542', '#fff0b3'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'cola-drink',
    name: 'Cola',
    icon: '🥤',
    description: 'Dark fizzy classic',
    category: 'food',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0d0603', '#3b1a0c', '#7a3a18', '#c98a52'],
      gradDirection: 'vertical',
    }
  },

  // ===== DARK & GOTHIC (wave 2) =====
  {
    id: 'nightmare',
    name: 'Nightmare',
    icon: '🌃',
    description: 'Bad dream red-black',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#12000a', '#3d0022', '#7a0044'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'grim-reaper',
    name: 'Grim Reaper',
    icon: '☠️',
    description: 'Hooded and silent',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#0f0f14', '#22222b', '#4a4a55'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'black-metal',
    name: 'Black Metal',
    icon: '🎸',
    description: 'Grim and frostbitten',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#0a0a0a', '#1f1f1f', '#000000'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'crypt',
    name: 'Crypt',
    icon: '⚰️',
    description: 'Cold stone tomb',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0d0f0d', '#232b23', '#3f4a3f', '#6b756b'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'solar-eclipse',
    name: 'Eclipse',
    icon: '🌘',
    description: 'Dark disc with corona',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#000000', '#2b1a00', '#ffb703', '#000000'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'raven-black',
    name: 'Raven',
    icon: '🐦‍⬛',
    description: 'Iridescent black feathers',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#05050a', '#12121f', '#1f1a33', '#2b2b4a'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'abyss',
    name: 'Abyss',
    icon: '🌊',
    description: 'Bottom of the ocean',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#000000', '#000a14', '#001428', '#002b4a'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'dark-knight',
    name: 'Dark Knight',
    icon: '🦇',
    description: 'Black armor, gold trim',
    category: 'dark',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a0a0f', '#1a1a24', '#3a3a4a', '#c9a227'],
      gradDirection: 'vertical',
    }
  },

  // ===== FUN & MEME (wave 2) =====
  {
    id: 'rubber-duck',
    name: 'Rubber Duck',
    icon: '🦆',
    description: 'Debugging companion',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffd93d', '#ffe97a', '#fff6c2', '#ff8c42'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'doge-coin',
    name: 'Doge',
    icon: '🐕',
    description: 'Such cape. Very wow.',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#8b5a2b', '#d9a066', '#f0d9b5', '#ffd700'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'clown-mode',
    name: 'Clown',
    icon: '🤡',
    description: 'Honk honk',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ff4d6d', '#ffffff', '#4d9bff', '#ffe14d'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'robot-mode',
    name: 'Robot',
    icon: '🤖',
    description: 'Beep boop',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#2b2f36', '#5c6570', '#a8b2bf', '#00e5ff'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'ninja-mode',
    name: 'Ninja',
    icon: '🥷',
    description: 'Silent and unseen',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0a0a0f', '#1a1a24', '#2b2b3a', '#8b0000'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'pirate-mode',
    name: 'Pirate',
    icon: '🏴‍☠️',
    description: 'Yarr, treasure ahead',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0d0d0d', '#3b2314', '#8b0000', '#c9a227'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'wizard-mode',
    name: 'Wizard',
    icon: '🧙',
    description: 'You shall not pass',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#12002e', '#3c1361', '#6a3fa0', '#ffd700'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'superhero',
    name: 'Superhero',
    icon: '🦸',
    description: 'Classic hero colors',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#0d1b6b', '#1e3fbf', '#e02020', '#ffd700'],
      gradDirection: 'vertical',
    }
  },
  {
    id: 'taco-tuesday',
    name: 'Taco Tuesday',
    icon: '🌮',
    description: 'Shell, lettuce, salsa',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#f5c542', '#8fd44a', '#d62d2d', '#fff2d8'],
      gradDirection: 'horizontal',
    }
  },
  {
    id: 'axolotl',
    name: 'Axolotl',
    icon: '🩷',
    description: 'Pink smiling friend',
    category: 'fun',
    settings: {
      ...defaultSettings,
      gradientColors: ['#ffd6e8', '#ffaad4', '#ff7ab8', '#c94f8a'],
      gradDirection: 'vertical',
    }
  },
]

export default templates



