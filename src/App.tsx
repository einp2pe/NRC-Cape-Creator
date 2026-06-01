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
  const previewCapeCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const storageNoticeKey = 'nrc-cape-creator-storage-notice-dismissed'
  const [showTemplates, setShowTemplates] = useState(false)
  const [templateScope, setTemplateScope] = useState<'both' | 'elytra' | 'main'>('both')
  const [canvasVersion, setCanvasVersion] = useState(0)
  const [templateReadyTick, setTemplateReadyTick] = useState(0)
  const [showStorageNotice, setShowStorageNotice] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(storageNoticeKey) !== 'dismissed'
  })
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
    separateElytraGradient,
    setSeparateElytraGradient,
    elytraGradientColors,
    setElytraGradientColors,
    elytraGradDirection,
    setElytraGradDirection,
    // vanilla elytra removed
    // emoji/text removed
    reset,
    loadTemplate,
    resetVersion,
  } = useCapeState()

  const isPixelArtImage = (image: HTMLImageElement | null) => {
    if (!image) return false

    const source = image.currentSrc || image.src || ''
    if (source.startsWith('data:image/svg+xml') || source.endsWith('.svg')) {
      return false
    }

    const sourceWidth = image.naturalWidth || image.width
    const sourceHeight = image.naturalHeight || image.height
    if (!sourceWidth || !sourceHeight) return false

    return sourceWidth <= 256 && sourceHeight <= 256
  }

  const usePixelatedPreview = [frontImage, backImage, elytraImage].every((image) => !image || isPixelArtImage(image))

  const renderer = CanvasRenderer.getInstance()

  const updatePreviewCapeCanvas = () => {
    const sourceCanvas = canvasRef.current
    if (!sourceCanvas) return

    const previewCanvas = previewCapeCanvasRef.current ?? document.createElement('canvas')
    previewCanvas.width = sourceCanvas.width
    previewCanvas.height = sourceCanvas.height

    const ctx = previewCanvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height)
    // Keep the live preview at the same resolution as the editor texture.
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(sourceCanvas, 0, 0)
    previewCapeCanvasRef.current = previewCanvas
  }

  // Redraw immediately when the template image finishes loading.
  useEffect(() => {
    const unsubscribe = renderer.onTemplateReady(() => {
      setTemplateReadyTick((v) => v + 1)
    })
    return unsubscribe
  }, [renderer])

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
        separateElytraGradient,
        elytraGradientColors,
        elytraGradDirection,
      }
    )
    updatePreviewCapeCanvas()
    // Increment version to trigger 3D preview update
    setCanvasVersion(v => v + 1)
  }, [frontImage, backImage, elytraImage, gradientColors, gradDirection, separateElytraGradient, elytraGradientColors, elytraGradDirection, templateReadyTick, renderer])

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
      updatePreviewCapeCanvas()
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
    updatePreviewCapeCanvas()
    
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

  const dismissStorageNotice = () => {
    setShowStorageNotice(false)
    try {
      window.localStorage.setItem(storageNoticeKey, 'dismissed')
    } catch {
      // ignore storage errors
    }
  }

  return (
    <div className="app ui-pixel">
      {showStorageNotice && (
        <div className="storage-notice" role="status" aria-live="polite">
          <div className="storage-notice__text">
            <strong>Local save notice</strong>
            <span> Cape settings and skin cache are stored in your browser only. No analytics cookies are used.</span>
          </div>
          <button type="button" className="storage-notice__button" onClick={dismissStorageNotice}>
            Got it
          </button>
        </div>
      )}

      {/* Template Gallery Modal */}
      {showTemplates && (
        <TemplateGallery 
          scope={templateScope}
          onSelectTemplate={(t, scope) => { loadTemplate(t, scope); setShowTemplates(false) }} 
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
            <div className="preview-canvas-wrapper">
              <canvas
                ref={canvasRef}
                id="capeCanvas"
                width={512}
                height={256}
                className="cape-canvas"
                style={{ imageRendering: usePixelatedPreview ? 'pixelated' : 'auto' }}
                aria-label="Cape texture preview"
              />
            </div>
            <figcaption className="preview-label">Texture Layout</figcaption>
          </figure>
          <CapePreview3D 
            capeCanvas={previewCapeCanvasRef.current} 
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
              onShowTemplates={() => { setTemplateScope('both'); setShowTemplates(true) }}
            hasFrontImage={frontImage !== null}
            hasBackImage={backImage !== null}
            hasElytraImage={elytraImage !== null}
          />

          <MiddleColumn
            gradientColors={gradientColors}
            onGradientColorsChange={setGradientColors}
            gradDirection={gradDirection}
            onGradDirectionChange={setGradDirection}
            separateElytraGradient={separateElytraGradient}
            setSeparateElytraGradient={setSeparateElytraGradient}
            elytraGradientColors={elytraGradientColors}
            setElytraGradientColors={setElytraGradientColors}
            elytraGradDirection={elytraGradDirection}
            setElytraGradDirection={setElytraGradDirection}
            // vanilla elytra props removed
            openTemplateGallery={(scope: 'both' | 'elytra' | 'main') => { setTemplateScope(scope); setShowTemplates(true) }}
            // emoji/text props removed
          />
        </div>
      </main>
    </div>
  )
}

export default App
