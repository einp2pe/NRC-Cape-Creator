import { FC, useRef, useState, useEffect } from 'react'

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

  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.onload = () => {
      imageRef.current = img
      drawImage()
    }
  }, [imageUrl])

  const drawImage = () => {
    const canvas = canvasRef.current
    const image = imageRef.current
    if (!canvas || !image) return

    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(image, 0, 0)

    // Draw selection rectangle if exists
    if (startPos && endPos) {
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
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height

    setStartPos({ x, y })
    setEndPos({ x, y })
    setIsDrawing(true)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height

    setEndPos({ x, y })
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  useEffect(() => {
    drawImage()
  }, [startPos, endPos])

  const handleCrop = () => {
    const canvas = canvasRef.current
    const image = imageRef.current
    if (!canvas || !image || !startPos || !endPos) return

    const minX = Math.max(0, Math.min(startPos.x, endPos.x))
    const minY = Math.max(0, Math.min(startPos.y, endPos.y))
    const maxX = Math.min(canvas.width, Math.max(startPos.x, endPos.x))
    const maxY = Math.min(canvas.height, Math.max(startPos.y, endPos.y))

    const cropWidth = Math.max(1, maxX - minX)
    const cropHeight = Math.max(1, maxY - minY)

    const cropCanvas = document.createElement('canvas')
    cropCanvas.width = cropWidth
    cropCanvas.height = cropHeight

    const cropCtx = cropCanvas.getContext('2d')
    if (!cropCtx) return

    cropCtx.drawImage(
      image,
      minX,
      minY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    )

    const croppedImage = new Image()
    croppedImage.src = cropCanvas.toDataURL()
    croppedImage.onload = () => onCropComplete(croppedImage)
  }

  const handleUseFullImage = () => {
    const image = imageRef.current
    if (!image) return
    onCropComplete(image)
  }

  return (
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
}

export default ImageCropper
