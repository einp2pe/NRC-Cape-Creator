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
}

export default ControlsProps
