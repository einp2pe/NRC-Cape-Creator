import { useState } from 'react'

export const useCapeState = () => {
  const [frontImage, setFrontImage] = useState<HTMLImageElement | null>(null)
  const [backImage, setBackImage] = useState<HTMLImageElement | null>(null)
  const [elytraImage, setElytraImage] = useState<HTMLImageElement | null>(null)
  const [gradientColors, setGradientColors] = useState<string[]>(['#ffffff'])
  const [gradDirection, setGradDirection] = useState<'vertical' | 'horizontal'>('vertical')

  const reset = () => {
    setFrontImage(null)
    setBackImage(null)
    setElytraImage(null)
    setGradientColors(['#ffffff'])
    setGradDirection('vertical')
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
    reset,
  }
}
