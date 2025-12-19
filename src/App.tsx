import { useEffect, useRef, useState } from 'react'
import './App.css'
import CanvasRenderer from './utils/CanvasRenderer'
import LeftColumn from './components/LeftColumn'
import MiddleColumn from './components/MiddleColumn'
import TemplateGallery from './components/TemplateGallery'
import CapePreview3D from './components/CapePreview3D'
import { useCapeState } from './hooks/useCapeState'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [canvasVersion, setCanvasVersion] = useState(0)
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
    emojiEnabled,
    emoji,
    emojiSize,
    emojiSpacing,
    setEmojiEnabled,
    setEmoji,
    setEmojiSize,
    setEmojiSpacing,
    emojiOpacity,
    emojiRotation,
    emojiRandomRotation,
    emojiJitter,
    emojiApplyToElytra,
    emojiSeed,
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
    setTextBold,
    setTextItalic,
    reset,
    loadTemplate,
      resetVersion,
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
      gradDirection,
      {
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
        textColor,
        textStrokeEnabled,
        textStrokeColor,
        textStrokeWidth,
        textFont,
        textBold,
        textItalic,
      }
    )
    // Increment version to trigger 3D preview update
    setCanvasVersion(v => v + 1)
  }, [frontImage, backImage, elytraImage, gradientColors, gradDirection, emojiEnabled, emoji, emojiSize, emojiSpacing, emojiOpacity, emojiRotation, emojiRandomRotation, emojiJitter, emojiApplyToElytra, emojiSeed, textColor, textStrokeEnabled, textStrokeColor, textStrokeWidth, textFont, textBold, textItalic, renderer])

    // Force redraw when resetVersion changes
    useEffect(() => {
      if (!canvasRef.current) return
      renderer.drawCape(
        canvasRef.current,
        null,
        null,
        null,
        ['#ffffff'],
        'vertical',
        {}
      )
      setCanvasVersion(v => v + 1)
    }, [resetVersion])
  // Force initial draw on mount
  useEffect(() => {
    if (!canvasRef.current) return
    
    // Draw the initial cape
    renderer.drawCape(
      canvasRef.current,
      null,
      null,
      null,
      ['#ffffff'],
      'vertical',
      {}
    )
    
    // Trigger 3D preview updates with delays to ensure it syncs
    const timer1 = setTimeout(() => setCanvasVersion(v => v + 1), 100)
    const timer2 = setTimeout(() => setCanvasVersion(v => v + 1), 300)
    const timer3 = setTimeout(() => setCanvasVersion(v => v + 1), 500)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

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
    <div className="app">
      {/* Template Gallery Modal */}
      {showTemplates && (
        <TemplateGallery 
          onSelectTemplate={loadTemplate} 
          onClose={() => setShowTemplates(false)} 
        />
      )}

      <header className="app-header">
        <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="NRC Cape Creator" className="logo" />
      </header>
      
      <main className="app-main">
        {/* Preview section with 2D canvas and 3D viewer */}
        <div className="preview-section">
          <figure className="preview-panel">
            <canvas
              ref={canvasRef}
              id="capeCanvas"
              width={512}
              height={256}
              className="cape-canvas"
              aria-label="Cape texture preview"
            />
            <figcaption className="preview-label">Texture Layout</figcaption>
          </figure>
          <CapePreview3D 
            capeCanvas={canvasRef.current} 
            canvasVersion={canvasVersion}
          />
        </div>

        {/* Controls row: Image | Gradient side by side */}
        <div className="controls-row">
          <LeftColumn
            onFrontImageChange={setFrontImage}
            onBackImageChange={setBackImage}
            onElytraImageChange={setElytraImage}
            onDownload={handleDownload}
            onReset={handleReset}
            onShowTemplates={() => setShowTemplates(true)}
            hasFrontImage={frontImage !== null}
            hasBackImage={backImage !== null}
            hasElytraImage={elytraImage !== null}
          />

          <MiddleColumn
            gradientColors={gradientColors}
            onGradientColorsChange={setGradientColors}
            gradDirection={gradDirection}
            onGradDirectionChange={setGradDirection}
            emojiEnabled={emojiEnabled}
            emoji={emoji}
            emojiSize={emojiSize}
            emojiSpacing={emojiSpacing}
            setEmojiEnabled={setEmojiEnabled}
            setEmoji={setEmoji}
            setEmojiSize={setEmojiSize}
            setEmojiSpacing={setEmojiSpacing}
            emojiOpacity={emojiOpacity}
            emojiRotation={emojiRotation}
            emojiRandomRotation={emojiRandomRotation}
            emojiJitter={emojiJitter}
            emojiApplyToElytra={emojiApplyToElytra}
            emojiSeed={emojiSeed}
            setEmojiOpacity={setEmojiOpacity}
            setEmojiRotation={setEmojiRotation}
            setEmojiRandomRotation={setEmojiRandomRotation}
            setEmojiJitter={setEmojiJitter}
            setEmojiApplyToElytra={setEmojiApplyToElytra}
            setEmojiSeed={setEmojiSeed}
            textColor={textColor}
            textStrokeEnabled={textStrokeEnabled}
            textStrokeColor={textStrokeColor}
            textStrokeWidth={textStrokeWidth}
            textFont={textFont}
            textBold={textBold}
            textItalic={textItalic}
            setTextColor={setTextColor}
            setTextStrokeEnabled={setTextStrokeEnabled}
            setTextStrokeColor={setTextStrokeColor}
            setTextStrokeWidth={setTextStrokeWidth}
            setTextFont={setTextFont}
            setTextBold={setTextBold}
            setTextItalic={setTextItalic}
          />
        </div>
      </main>
    </div>
  )
}

export default App
