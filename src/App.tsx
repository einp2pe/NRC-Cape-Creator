import { useEffect, useRef } from 'react'
import './App.css'
import CanvasRenderer from './utils/CanvasRenderer'
import Controls from './components/Controls'
import { useCapeState } from './hooks/useCapeState'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {
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
  } = useCapeState()

  const renderer = CanvasRenderer.getInstance()

  // Draw cape when state changes
  useEffect(() => {
    if (!canvasRef.current) return
    renderer.drawCape(
      canvasRef.current,
      frontImage,
      backImage,
      elytraImage,
      gradientColors,
      gradDirection
    )
  }, [frontImage, backImage, elytraImage, gradientColors, gradDirection, renderer])

  // Draw initial cape on mount with white gradient
  useEffect(() => {
    if (!canvasRef.current) return
    renderer.drawCape(
      canvasRef.current,
      null,
      null,
      null,
      ['#ffffff'],
      'vertical'
    )
  }, [renderer])

  const handleDownload = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'custom_cape.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div className="wrapper">
      <div className="logo-container">
        <img src="/logo.svg" alt="CLIENT CAPE Logo" className="logo-img" />
      </div>
      <div className="container">
        <Controls
          onFrontImageChange={setFrontImage}
          onBackImageChange={setBackImage}
          onElytraImageChange={setElytraImage}
          gradientColors={gradientColors}
          onGradientColorsChange={setGradientColors}
          gradDirection={gradDirection}
          onGradDirectionChange={setGradDirection}
          onDownload={handleDownload}
          onReset={handleReset}
        />
        <canvas
          ref={canvasRef}
          id="capeCanvas"
          width={512}
          height={256}
          className="cape-canvas"
        />
      </div>
    </div>
  )
}

export default App
