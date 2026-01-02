import { FC, useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ImageCropperProps {
  imageUrl: string
  onCropComplete: (croppedImage: HTMLImageElement) => void
  onCancel: () => void
  label: string
}

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
  const [aspectScale, setAspectScale] = useState<number>(0.6) // relative size (0-1) of canvas width/height
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
    updateAspectBoxForScale(canvas, aspectScale)
  }

  const updateAspectBoxForScale = (canvas: HTMLCanvasElement, scale: number) => {
    const ratio = aspectRatio
    // attempt using percentage of canvas width
    let width = Math.min(canvas.width * scale, canvas.width)
    let height = width / ratio
    // if height doesn't fit, scale relative to canvas height instead
    if (height > canvas.height) {
      height = Math.min(canvas.height * scale, canvas.height)
      width = height * ratio
    }
    // clamp
    width = Math.max(10, Math.min(width, canvas.width))
    height = Math.max(10, Math.min(height, canvas.height))
    const x = (canvas.width - width) / 2
    const y = (canvas.height - height) / 2
    setAspectBox({ x, y, width, height })
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
    // Draw selection rectangle if exists (free-draw)
    if (!aspectMode && startPos && endPos) {
      const minX = Math.min(startPos.x, endPos.x)
      const minY = Math.min(startPos.y, endPos.y)
      const maxX = Math.max(startPos.x, endPos.x)
      const maxY = Math.max(startPos.y, endPos.y)
      const width = maxX - minX
      const height = maxY - minY

      // Semi-transparent overlay outside selection
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Clear selection area
      ctx.clearRect(minX, minY, width, height)
      ctx.drawImage(image, minX, minY, width, height, minX, minY, width, height)

      // Draw selection border
      ctx.strokeStyle = 'rgba(99, 102, 241, 1)'
      ctx.lineWidth = 3
      ctx.strokeRect(minX, minY, width, height)
    }

    // Draw fixed-aspect selection box if enabled
    if (aspectMode && aspectBox) {
      const { x, y, width, height } = aspectBox

      // Semi-transparent overlay outside selection
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Clear selection area
      ctx.clearRect(x, y, width, height)
      ctx.drawImage(image, x, y, width, height, x, y, width, height)

      // Draw selection border
      ctx.strokeStyle = 'rgba(99, 102, 241, 1)'
      ctx.lineWidth = 3
      ctx.strokeRect(x, y, width, height)
    }
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
  }, [aspectMode, aspectBox])

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

        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="cropper-canvas"
          style={{ maxWidth: '100%', maxHeight: '60vh', cursor: 'crosshair' }}
        />

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
                min={0.1}
                max={1}
                step={0.01}
                value={aspectScale}
                onChange={(ev) => {
                  const v = Number(ev.currentTarget.value)
                  setAspectScale(v)
                  const canvas = canvasRef.current
                  if (!canvas) return
                  updateAspectBoxForScale(canvas, v)
                }}
              />
              <span className="size-percent">{Math.round(aspectScale * 100)}%</span>
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
