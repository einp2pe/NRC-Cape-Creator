import { useCallback, useState } from 'react'
import { CapeTemplate } from '../data/templates'
import { loadRemoteCapeTemplate } from '../utils/templateImporter'

export const useCapeState = () => {
  const [frontImage, setFrontImage] = useState<HTMLImageElement | null>(null)
  const [backImage, setBackImage] = useState<HTMLImageElement | null>(null)
  const [resetVersion, setResetVersion] = useState<number>(0)
  const [elytraImage, setElytraImage] = useState<HTMLImageElement | null>(null)
  const [gradientColors, setGradientColors] = useState<string[]>(['#ffffff'])
  const [gradDirection, setGradDirection] = useState<'vertical' | 'horizontal'>('vertical')
  const [separateElytraGradient, setSeparateElytraGradient] = useState<boolean>(false)
  const [elytraGradientColors, setElytraGradientColors] = useState<string[] | null>(null)
  const [elytraGradDirection, setElytraGradDirection] = useState<'vertical' | 'horizontal'>('vertical')
  const [emojiEnabled, setEmojiEnabled] = useState<boolean>(false)
  const [emoji, setEmoji] = useState<string>('')
  const [emojiSize, setEmojiSize] = useState<number>(48)
  const [emojiSpacing, setEmojiSpacing] = useState<number>(64)
  const [emojiOpacity, setEmojiOpacity] = useState<number>(1)
  const [emojiRotation, setEmojiRotation] = useState<number>(0)
  const [emojiRandomRotation, setEmojiRandomRotation] = useState<boolean>(false)
  const [emojiJitter, setEmojiJitter] = useState<number>(0)
  const [emojiApplyToElytra, setEmojiApplyToElytra] = useState<boolean>(true)
  const [emojiSeed, setEmojiSeed] = useState<number>(0)
  const [textColor, setTextColor] = useState<string>('#000000')
  const [textStrokeEnabled, setTextStrokeEnabled] = useState<boolean>(false)
  const [textStrokeColor, setTextStrokeColor] = useState<string>('#000000')
  const [textStrokeWidth, setTextStrokeWidth] = useState<number>(2)
  const [textFont, setTextFont] = useState<string>('sans-serif')
  const [textBold, setTextBold] = useState<boolean>(false)
  const [textItalic, setTextItalic] = useState<boolean>(false)

  const reset = () => {
    setFrontImage(null)
    setBackImage(null)
    setElytraImage(null)
    setGradientColors(['#ffffff'])
    setGradDirection('vertical')
    setSeparateElytraGradient(false)
    setElytraGradientColors(null)
    setElytraGradDirection('vertical')
    setEmojiEnabled(false)
    setEmoji('')
    setEmojiSize(48)
    setEmojiSpacing(64)
    setEmojiOpacity(1)
    setEmojiRotation(0)
    setEmojiRandomRotation(false)
    setEmojiJitter(0)
    setEmojiApplyToElytra(true)
    setEmojiSeed(0)
    setTextColor('#000000')
    setTextStrokeEnabled(false)
    setTextStrokeColor('#000000')
    setTextStrokeWidth(2)
    setTextFont('sans-serif')
    setTextBold(false)
    setTextItalic(false)
    setResetVersion(v => v + 1)
  }

  const loadTemplate = (template: CapeTemplate, scope: 'both' | 'elytra' | 'main' = 'both') => {
    const s = template.settings
    // Apply overlay/text/emoji settings always
    setEmojiEnabled(s.emojiEnabled)
    setEmoji(s.emoji)
    setEmojiSize(s.emojiSize)
    setEmojiSpacing(s.emojiSpacing)
    setEmojiOpacity(s.emojiOpacity)
    setEmojiRotation(s.emojiRotation)
    setEmojiRandomRotation(s.emojiRandomRotation)
    setEmojiJitter(s.emojiJitter)
    setEmojiApplyToElytra(s.emojiApplyToElytra)
    setEmojiSeed(s.emojiSeed)
    setTextColor(s.textColor)
    setTextStrokeEnabled(s.textStrokeEnabled)
    setTextStrokeColor(s.textStrokeColor)
    setTextStrokeWidth(s.textStrokeWidth)
    setTextFont(s.textFont)
    setTextBold(s.textBold)
    setTextItalic(s.textItalic)

    if (scope === 'both' || scope === 'main') {
      setGradientColors(s.gradientColors)
      setGradDirection(s.gradDirection)
    }

    if (scope === 'elytra') {
      // Only enable the separate elytra toggle when explicitly applying to elytra
      setSeparateElytraGradient(true)
      setElytraGradientColors(s.elytraGradientColors ?? s.gradientColors ?? null)
      setElytraGradDirection(s.elytraGradDirection ?? s.gradDirection ?? 'vertical')
    } else if (scope === 'both') {
      // Apply elytra colors but do not toggle the separate-elytra setting
      setElytraGradientColors(s.elytraGradientColors ?? s.gradientColors ?? null)
      setElytraGradDirection(s.elytraGradDirection ?? s.gradDirection ?? 'vertical')
    }

    // Note: Images are preserved when loading a template
  }

  const importTemplateFromUrl = useCallback(async (url: string, signal?: AbortSignal) => {
    const remoteSections = await loadRemoteCapeTemplate(url, signal)
    setFrontImage(remoteSections.front)
    setBackImage(remoteSections.back)
    setElytraImage(remoteSections.elytra)
  }, [])

  return {
    frontImage,
    backImage,
    elytraImage,
    gradientColors,
    gradDirection,
    setFrontImage,
    setBackImage,
    setElytraImage,
    setGradientColors,
    setGradDirection,
    emojiEnabled,
    emoji,
    emojiSize,
    emojiSpacing,
    emojiOpacity,
    emojiRotation,
    emojiRandomRotation,
    emojiJitter,
    emojiApplyToElytra,
    emojiSeed,
    setEmojiEnabled,
    setEmoji,
    setEmojiSize,
    setEmojiSpacing,
    setEmojiOpacity,
    setEmojiRotation,
    setEmojiRandomRotation,
    setEmojiJitter,
    setEmojiApplyToElytra,
    setEmojiSeed,
    textColor,
    textStrokeEnabled,
    textStrokeColor,
    textStrokeWidth,
    textFont,
    textBold,
    textItalic,
    setTextColor,
    setTextStrokeEnabled,
    setTextStrokeColor,
    setTextStrokeWidth,
    setTextFont,
    separateElytraGradient,
    setSeparateElytraGradient,
    elytraGradientColors,
    setElytraGradientColors,
    elytraGradDirection,
    setElytraGradDirection,
    setTextBold,
    setTextItalic,
    reset,
    loadTemplate,
    resetVersion,
    importTemplateFromUrl,
  }
}
