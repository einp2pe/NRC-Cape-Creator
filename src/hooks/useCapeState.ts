import { useEffect, useMemo, useState } from 'react'
import { CapeTemplate } from '../data/templates'

const STORAGE_KEY = 'nrc-cape-creator-state'

type PersistedCapeState = {
  frontImageSrc: string | null
  backImageSrc: string | null
  elytraImageSrc: string | null
  gradientColors: string[]
  gradDirection: 'vertical' | 'horizontal'
  separateElytraGradient: boolean
  elytraGradientColors: string[] | null
  elytraGradDirection: 'vertical' | 'horizontal'
}

const readPersistedState = (): PersistedCapeState | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<PersistedCapeState>
    return {
      frontImageSrc: typeof parsed.frontImageSrc === 'string' ? parsed.frontImageSrc : null,
      backImageSrc: typeof parsed.backImageSrc === 'string' ? parsed.backImageSrc : null,
      elytraImageSrc: typeof parsed.elytraImageSrc === 'string' ? parsed.elytraImageSrc : null,
      gradientColors: Array.isArray(parsed.gradientColors) && parsed.gradientColors.length > 0 ? parsed.gradientColors.filter((color): color is string => typeof color === 'string') : ['#ffffff'],
      gradDirection: parsed.gradDirection === 'horizontal' ? 'horizontal' : 'vertical',
      separateElytraGradient: Boolean(parsed.separateElytraGradient),
      elytraGradientColors: Array.isArray(parsed.elytraGradientColors) ? parsed.elytraGradientColors.filter((color): color is string => typeof color === 'string') : null,
      elytraGradDirection: parsed.elytraGradDirection === 'horizontal' ? 'horizontal' : 'vertical',
    }
  } catch {
    return null
  }
}

export const useCapeState = () => {
  const persistedState = useMemo(readPersistedState, [])

  const [frontImage, setFrontImage] = useState<HTMLImageElement | null>(null)
  const [backImage, setBackImage] = useState<HTMLImageElement | null>(null)
  const [resetVersion, setResetVersion] = useState<number>(0)
  const [elytraImage, setElytraImage] = useState<HTMLImageElement | null>(null)
  const [gradientColors, setGradientColors] = useState<string[]>(persistedState?.gradientColors ?? ['#ffffff'])
  const [gradDirection, setGradDirection] = useState<'vertical' | 'horizontal'>(persistedState?.gradDirection ?? 'vertical')
  const [separateElytraGradient, setSeparateElytraGradient] = useState<boolean>(persistedState?.separateElytraGradient ?? false)
  const [elytraGradientColors, setElytraGradientColors] = useState<string[] | null>(persistedState?.elytraGradientColors ?? null)
  const [elytraGradDirection, setElytraGradDirection] = useState<'vertical' | 'horizontal'>(persistedState?.elytraGradDirection ?? 'vertical')

  useEffect(() => {
    if (!persistedState) return

    let cancelled = false

    const loadImage = (src: string | null, setter: (image: HTMLImageElement | null) => void) => {
      if (!src) {
        setter(null)
        return
      }

      const image = new Image()
      image.onload = () => {
        if (!cancelled) setter(image)
      }
      image.onerror = () => {
        if (!cancelled) setter(null)
      }
      image.src = src
    }

    loadImage(persistedState.frontImageSrc, setFrontImage)
    loadImage(persistedState.backImageSrc, setBackImage)
    loadImage(persistedState.elytraImageSrc, setElytraImage)

    return () => {
      cancelled = true
    }
  }, [persistedState])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const payload: PersistedCapeState = {
      frontImageSrc: frontImage?.src ?? null,
      backImageSrc: backImage?.src ?? null,
      elytraImageSrc: elytraImage?.src ?? null,
      gradientColors,
      gradDirection,
      separateElytraGradient,
      elytraGradientColors,
      elytraGradDirection,
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // Ignore localStorage quota/serialization errors
    }
  }, [frontImage, backImage, elytraImage, gradientColors, gradDirection, separateElytraGradient, elytraGradientColors, elytraGradDirection])

  const reset = () => {
    setFrontImage(null)
    setBackImage(null)
    setElytraImage(null)
    setGradientColors(['#ffffff'])
    setGradDirection('vertical')
    setSeparateElytraGradient(false)
    setElytraGradientColors(null)
    setElytraGradDirection('vertical')
    setResetVersion(v => v + 1)

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  const loadTemplate = (template: CapeTemplate, scope: 'both' | 'elytra' | 'main' = 'both') => {
    const s = template.settings
    // overlay/text/emoji settings are ignored by state

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
    separateElytraGradient,
    setSeparateElytraGradient,
    elytraGradientColors,
    setElytraGradientColors,
    elytraGradDirection,
    setElytraGradDirection,
    // vanilla elytra removed
    // text-related setters removed
    reset,
    loadTemplate,
      resetVersion,
  }
}
