import { FC, useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ImageCropperProps {
  imageUrl: string
  onCropComplete: (croppedImage: HTMLImageElement) => void
  onCancel: () => void
  label: string
}

type SelectionRect = { x: number; y: number; width: number; height: number }

const ImageCropper: FC<ImageCropperProps> = ({
  imageUrl,
  onCropComplete,
  onCancel,
  label,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null)
  const [endPos, setEndPos] = useState<{ x: number; y: number } | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [aspectMode, setAspectMode] = useState(true)
  const [aspectRatio] = useState<number>(2 / 3) // width / height (cape ratio)
  const [aspectBox, setAspectBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
  const [aspectScalePercent, setAspectScalePercent] = useState<number>(60) // 1-100 linear scale of max fit size
  const [isDraggingBox, setIsDraggingBox] = useState(false)
  const dragOffset = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.onload = () => {
      imageRef.current = img
      drawImage()
      // initialize aspect box once image is loaded
      const canvas = canvasRef.current
      if (canvas) {
        initAspectBox(canvas)
      }
    }
  }, [imageUrl])

  const initAspectBox = (canvas: HTMLCanvasElement) => {
    updateAspectBoxForScale(canvas, aspectScalePercent, false)
  }

  const updateAspectBoxForScale = (canvas: HTMLCanvasElement, scalePercent: number, keepCenter = true) => {
    const ratio = aspectRatio
    const clampedScale = Math.max(1, Math.min(100, scalePercent))

    // Compute max size that always fits; scale linearly from small to max.
    const maxWidth = Math.min(canvas.width, canvas.height * ratio)
    const minWidth = Math.max(10, maxWidth * 0.05)
    const width = minWidth + (maxWidth - minWidth) * (clampedScale / 100)
    const height = width / ratio

    // Keep current box center when resizing to make interaction stable.
    const centerX = keepCenter && aspectBox ? aspectBox.x + aspectBox.width / 2 : canvas.width / 2
    const centerY = keepCenter && aspectBox ? aspectBox.y + aspectBox.height / 2 : canvas.height / 2

    const x = Math.max(0, Math.min(centerX - width / 2, canvas.width - width))
    const y = Math.max(0, Math.min(centerY - height / 2, canvas.height - height))
    setAspectBox({ x, y, width, height })
  }

  const getActiveSelectionRect = (): SelectionRect | null => {
    if (aspectMode && aspectBox) return aspectBox
    if (!aspectMode && startPos && endPos) {
      const minX = Math.min(startPos.x, endPos.x)
      const minY = Math.min(startPos.y, endPos.y)
      const maxX = Math.max(startPos.x, endPos.x)
      const maxY = Math.max(startPos.y, endPos.y)
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      }
    }
    return null
  }

  const getSelectionOverlayStyle = (): React.CSSProperties | undefined => {
    const canvas = canvasRef.current
    const selection = getActiveSelectionRect()
    if (!canvas || !selection || selection.width <= 0 || selection.height <= 0) return undefined

    return {
      left: `${(selection.x / canvas.width) * 100}%`,
      top: `${(selection.y / canvas.height) * 100}%`,
      width: `${(selection.width / canvas.width) * 100}%`,
      height: `${(selection.height / canvas.height) * 100}%`,
    }
  }

  const drawImage = () => {
    const canvas = canvasRef.current
    const image = imageRef.current
    if (!canvas || !image) return

    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(image, 0, 0)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height

    if (aspectMode && aspectBox) {
      // If click inside aspect box -> start dragging
      if (x >= aspectBox.x && x <= aspectBox.x + aspectBox.width && y >= aspectBox.y && y <= aspectBox.y + aspectBox.height) {
        setIsDraggingBox(true)
        dragOffset.current = { x: x - aspectBox.x, y: y - aspectBox.y }
        return
      }
      // Otherwise ignore starting a free-draw
      return
    }

    setStartPos({ x, y })
    setEndPos({ x, y })
    setIsDrawing(true)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height

    if (aspectMode && isDraggingBox && aspectBox && dragOffset.current) {
      // Move box while keeping it inside canvas
      let newX = x - dragOffset.current.x
      let newY = y - dragOffset.current.y
      newX = Math.max(0, Math.min(newX, canvas.width - aspectBox.width))
      newY = Math.max(0, Math.min(newY, canvas.height - aspectBox.height))
      setAspectBox({ ...aspectBox, x: newX, y: newY })
      return
    }

    if (!isDrawing || !startPos) return

    setEndPos({ x, y })
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    setIsDraggingBox(false)
    dragOffset.current = null
  }

  useEffect(() => {
    drawImage()
  }, [startPos, endPos])

  useEffect(() => {
    drawImage()
  }, [aspectMode, aspectBox, aspectScalePercent])

  const handleCrop = () => {
    const canvas = canvasRef.current
    const image = imageRef.current
    if (!canvas || !image) return

    // If aspect mode is active, use aspectBox; otherwise use free-draw coords
    let minX: number, minY: number, cropWidth: number, cropHeight: number
    if (aspectMode && aspectBox) {
      minX = Math.max(0, Math.min(aspectBox.x, aspectBox.x + aspectBox.width))
      minY = Math.max(0, Math.min(aspectBox.y, aspectBox.y + aspectBox.height))
      cropWidth = Math.max(1, aspectBox.width)
      cropHeight = Math.max(1, aspectBox.height)
    } else {
      if (!startPos || !endPos) return
      minX = Math.max(0, Math.min(startPos.x, endPos.x))
      minY = Math.max(0, Math.min(startPos.y, endPos.y))
      const maxX = Math.min(canvas.width, Math.max(startPos.x, endPos.x))
      const maxY = Math.min(canvas.height, Math.max(startPos.y, endPos.y))
      cropWidth = Math.max(1, maxX - minX)
      cropHeight = Math.max(1, maxY - minY)
    }

    const cropCanvas = document.createElement('canvas')
    cropCanvas.width = cropWidth
    cropCanvas.height = cropHeight

    const cropCtx = cropCanvas.getContext('2d')
    if (!cropCtx) return

    cropCtx.drawImage(image, minX, minY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

    const croppedImage = new Image()
    croppedImage.src = cropCanvas.toDataURL()
    croppedImage.onload = () => onCropComplete(croppedImage)
  }

  const handleUseFullImage = () => {
    const image = imageRef.current
    if (!image) return
    onCropComplete(image)
  }

  const modalContent = (
    <div className="cropper-overlay">
      <div className="cropper-modal">
        <h3>🎬 Crop {label}</h3>
        <p>Drag to select area to crop</p>

        <div className="cropper-stage">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="cropper-canvas"
            style={{ maxWidth: '100%', maxHeight: '60vh', cursor: aspectMode && isDraggingBox ? 'grabbing' : 'crosshair' }}
          />
          {getSelectionOverlayStyle() && (
            <div className="cropper-selection" style={getSelectionOverlayStyle()} />
          )}
        </div>

        <div className="cropper-controls">
          <button
            onClick={() => {
              const canvas = canvasRef.current
              if (!canvas) return
              if (!aspectMode) {
                initAspectBox(canvas)
              }
              setAspectMode(!aspectMode)
            }}
            className={aspectMode ? 'aspect-toggle-btn active' : 'aspect-toggle-btn'}
          >
            {aspectMode ? 'Aspect ON' : 'Aspect OFF'}
          </button>

          {aspectMode && (
            <>
              <span className="size-label">Size:</span>
              <input
                aria-label="aspect-size"
                className="zoom-range"
                type="range"
                min={1}
                max={100}
                step={1}
                value={aspectScalePercent}
                onChange={(ev) => {
                  const v = Number(ev.currentTarget.value)
                  setAspectScalePercent(v)
                  const canvas = canvasRef.current
                  if (!canvas) return
                  updateAspectBoxForScale(canvas, v)
                }}
              />
              <span className="size-percent">{aspectScalePercent}%</span>
            </>
          )}
        </div>

        <div className="cropper-buttons">
          <button onClick={handleCrop} className="crop-btn">
            ✂️ Crop
          </button>
          <button onClick={handleUseFullImage} className="use-full-btn">
            ✓ Use Full Image
          </button>
          <button onClick={onCancel} className="cancel-btn">
            ✕ Cancel
          </button>
        </div>
      </div>
    </div>
  )

  // Use portal to render at document body level, escaping any parent overflow/positioning
  return createPortal(modalContent, document.body)
}

export default ImageCropper
