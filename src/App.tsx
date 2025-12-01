import { useEffect, useRef } from 'react'
import './App.css'
import CanvasRenderer from './utils/CanvasRenderer'
import LeftColumn from './components/LeftColumn'
import MiddleColumn from './components/MiddleColumn'
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
  }, [frontImage, backImage, elytraImage, gradientColors, gradDirection, emojiEnabled, emoji, emojiSize, emojiSpacing, emojiOpacity, emojiRotation, emojiRandomRotation, emojiJitter, emojiApplyToElytra, emojiSeed, textColor, textStrokeEnabled, textStrokeColor, textStrokeWidth, textFont, textBold, textItalic, renderer])

  // On first load, run the same routine as Reset
  useEffect(() => {
    // Trigger the same state logic as clicking Reset
    handleReset()
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
      <header className="app-header">
        <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="NRC Cape Creator" className="logo" />
      </header>
      
      <main className="app-main">
        {/* Preview - large and prominent */}
        <figure className="preview-panel">
          <canvas
            ref={canvasRef}
            id="capeCanvas"
            width={512}
            height={256}
            className="cape-canvas"
            aria-label="Cape preview"
          />
        </figure>

        {/* Controls row: Image | Gradient side by side */}
        <div className="controls-row">
          <LeftColumn
            onFrontImageChange={setFrontImage}
            onBackImageChange={setBackImage}
            onElytraImageChange={setElytraImage}
            onDownload={handleDownload}
            onReset={handleReset}
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
