interface ControlsProps {
  onFrontImageChange: (img: HTMLImageElement | null) => void
  onBackImageChange: (img: HTMLImageElement | null) => void
  onElytraImageChange: (img: HTMLImageElement | null) => void
  gradientColors: string[]
  onGradientColorsChange: (colors: string[]) => void
  gradDirection: 'vertical' | 'horizontal'
  onGradDirectionChange: (direction: 'vertical' | 'horizontal') => void
  onDownload: () => void
  onReset: () => void
  emojiEnabled: boolean
  emoji: string
  emojiSize: number
  emojiSpacing: number
  setEmojiEnabled: (v: boolean) => void
  setEmoji: (e: string) => void
  setEmojiSize: (s: number) => void
  setEmojiSpacing: (s: number) => void
  emojiOpacity: number
  emojiRotation: number
  emojiRandomRotation: boolean
  emojiJitter: number
  emojiApplyToElytra: boolean
  emojiSeed: number
  setEmojiOpacity: (v: number) => void
  setEmojiRotation: (v: number) => void
  setEmojiRandomRotation: (v: boolean) => void
  setEmojiJitter: (v: number) => void
  setEmojiApplyToElytra: (v: boolean) => void
  setEmojiSeed: (v: number) => void
  textColor: string
  textStrokeEnabled: boolean
  textStrokeColor: string
  textStrokeWidth: number
  textFont: string
  textBold: boolean
  textItalic: boolean
  setTextColor: (v: string) => void
  setTextStrokeEnabled: (v: boolean) => void
  setTextStrokeColor: (v: string) => void
  setTextStrokeWidth: (v: number) => void
  setTextFont: (v: string) => void
  setTextBold: (v: boolean) => void
  setTextItalic: (v: boolean) => void
}

export default ControlsProps
