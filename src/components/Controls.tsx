import { FC, useState } from 'react'
import ControlsProps from './ControlsProps'
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
  // emoji/text removed
}) => {
  const [cropperState, setCropperState] = useState<{
    show: boolean
    imageUrl: string
    type: 'front' | 'back' | 'elytra' | null
  }>({ show: false, imageUrl: '', type: null })

  const [openCards, setOpenCards] = useState({
    images: true,
    gradient: true,
    // overlay removed
  })

  const toggleCard = (card: keyof typeof openCards) => {
    setOpenCards(prev => ({ ...prev, [card]: !prev[card] }))
  }

  const handleFileChange = (file: File | null, type: 'front' | 'back' | 'elytra') => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      setCropperState({ show: true, imageUrl, type })
    }
    reader.readAsDataURL(file)
  }

  const handleCropComplete = (croppedImage: HTMLImageElement) => {
    if (cropperState.type === 'front') onFrontImageChange(croppedImage)
    else if (cropperState.type === 'back') onBackImageChange(croppedImage)
    else if (cropperState.type === 'elytra') onElytraImageChange(croppedImage)
    setCropperState({ show: false, imageUrl: '', type: null })
  }

  const handleAddColor = () => onGradientColorsChange([...gradientColors, '#ffffff'])
  const handleRemoveColor = (index: number) => onGradientColorsChange(gradientColors.filter((_, i) => i !== index))
  const handleColorChange = (index: number, color: string) => {
    const newColors = [...gradientColors]
    newColors[index] = color
    onGradientColorsChange(newColors)
  }

  const handleReset = () => {
    const frontInput = document.getElementById('frontInput') as HTMLInputElement
    const backInput = document.getElementById('backInput') as HTMLInputElement
    const elytraInput = document.getElementById('elytraInput') as HTMLInputElement
    if (frontInput) frontInput.value = ''
    if (backInput) backInput.value = ''
    if (elytraInput) elytraInput.value = ''
    onReset()
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

      <div className="controls-sidebar">
        {/* Images Card */}
        <div className="card">
          <div className="card-header" onClick={() => toggleCard('images')}>
            <h3><span className="icon">🖼️</span> Images</h3>
            <span className={`toggle-icon ${openCards.images ? 'open' : ''}`}>▼</span>
          </div>
          {openCards.images && (
            <div className="card-content">
              <div className="form-group">
                <span className="form-label">👤 Front</span>
                <div className="file-input-wrapper">
                  <input id="frontInput" type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'front')} />
                </div>
              </div>
              <div className="form-group">
                <span className="form-label">🔙 Back</span>
                <div className="file-input-wrapper">
                  <input id="backInput" type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'back')} />
                </div>
              </div>
              <div className="form-group">
                <span className="form-label">🦅 Elytra</span>
                <div className="file-input-wrapper">
                  <input id="elytraInput" type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'elytra')} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gradient Card */}
        <div className="card">
          <div className="card-header" onClick={() => toggleCard('gradient')}>
            <h3><span className="icon">🎨</span> Gradient</h3>
            <span className={`toggle-icon ${openCards.gradient ? 'open' : ''}`}>▼</span>
          </div>
          {openCards.gradient && (
            <div className="card-content">
              {gradientColors.map((color, index) => (
                <div key={index} className="gradient-row">
                  <span className="color-label">Color {index + 1}</span>
                  <input type="color" value={color} onChange={(e) => handleColorChange(index, e.target.value)} />
                  {gradientColors.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => handleRemoveColor(index)}>✕</button>
                  )}
                </div>
              ))}
              <button type="button" className="btn-add" onClick={handleAddColor}>+ Add Color</button>
              
              <div className="form-group">
                <span className="form-label">Direction</span>
                <select value={gradDirection} onChange={(e) => onGradDirectionChange(e.target.value as 'vertical' | 'horizontal')}>
                  <option value="vertical">⬇️ Vertical</option>
                  <option value="horizontal">➡️ Horizontal</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Text/Emoji overlay removed */}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button type="button" className="btn btn-download" onClick={onDownload}>
            ⬇️ Download
          </button>
          <button type="button" className="btn btn-reset" onClick={handleReset}>
            ↻ Reset
          </button>
        </div>
      </div>
    </>
  )
}

export default Controls
