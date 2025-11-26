import { FC, useState } from 'react'
import ControlsProps from './ControlsProps'
import GradientColorInput from './GradientColorInput'
import ImageCropper from './ImageCropper'

const Controls: FC<ControlsProps> = ({
  onFrontImageChange,
  onBackImageChange,
  onElytraImageChange,
  gradientColors,
  onGradientColorsChange,
  gradDirection,
  onGradDirectionChange,
  onDownload,
  onReset,
}) => {
  const [cropperState, setCropperState] = useState<{
    show: boolean
    imageUrl: string
    type: 'front' | 'back' | 'elytra' | null
  }>({ show: false, imageUrl: '', type: null })

  const handleFileChange = (
    file: File | null,
    type: 'front' | 'back' | 'elytra'
  ) => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      setCropperState({ show: true, imageUrl, type })
    }
    reader.readAsDataURL(file)
  }

  const handleCropComplete = (croppedImage: HTMLImageElement) => {
    if (cropperState.type === 'front') {
      onFrontImageChange(croppedImage)
    } else if (cropperState.type === 'back') {
      onBackImageChange(croppedImage)
    } else if (cropperState.type === 'elytra') {
      onElytraImageChange(croppedImage)
    }
    setCropperState({ show: false, imageUrl: '', type: null })
  }

  const handleAddColor = () => {
    onGradientColorsChange([...gradientColors, '#ffffff'])
  }

  const handleRemoveColor = (index: number) => {
    onGradientColorsChange(gradientColors.filter((_, i) => i !== index))
  }

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...gradientColors]
    newColors[index] = color
    onGradientColorsChange(newColors)
  }

  return (
    <>
      {cropperState.show && (
        <ImageCropper
          imageUrl={cropperState.imageUrl}
          label={cropperState.type === 'front' ? 'Front' : cropperState.type === 'back' ? 'Back' : 'Elytra'}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropperState({ show: false, imageUrl: '', type: null })}
        />
      )}
      <div className="controls">
        <label>👤 Front</label>
        <input
          id="frontInput"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'front')}
        />

        <label>🔙 Back</label>
        <input
          id="backInput"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'back')}
        />

        <label>🦅 Elytra</label>
        <input
          id="elytraInput"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'elytra')}
        />

        <div id="gradientControls">
          {gradientColors.map((color, index) => (
            <GradientColorInput
              key={index}
              index={index}
              color={color}
              totalColors={gradientColors.length}
              onColorChange={(newColor) => handleColorChange(index, newColor)}
              onRemove={() => handleRemoveColor(index)}
            />
          ))}
          <button type="button" onClick={handleAddColor}>
            ✨ Farbe hinzufügen
          </button>

          <label>🎨 Richtung:</label>
          <select
            value={gradDirection}
            onChange={(e) => onGradDirectionChange(e.target.value as 'vertical' | 'horizontal')}
          >
            <option value="vertical">⬇️ Vertikal</option>
            <option value="horizontal">➡️ Horizontal</option>
          </select>
        </div>

        <div className="button-group">
          <button type="button" onClick={onDownload}>
            ⬇️ Download
          </button>
          <button
            type="button"
            onClick={() => {
              // Reset all inputs
              const frontInput = document.getElementById('frontInput') as HTMLInputElement
              const backInput = document.getElementById('backInput') as HTMLInputElement
              const elytraInput = document.getElementById('elytraInput') as HTMLInputElement
              if (frontInput) frontInput.value = ''
              if (backInput) backInput.value = ''
              if (elytraInput) elytraInput.value = ''
              onReset()
            }}
          >
            ↻ Reset
          </button>
        </div>
      </div>
    </>
  )
}

export default Controls
