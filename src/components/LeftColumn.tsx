import { FC, useState } from 'react'
import ImageCropper from './ImageCropper'

interface LeftColumnProps {
  onFrontImageChange: (img: HTMLImageElement | null) => void
  onBackImageChange: (img: HTMLImageElement | null) => void
  onElytraImageChange: (img: HTMLImageElement | null) => void
  onDownload: () => void
  onReset: () => void
  onShowTemplates: () => void
  hasFrontImage: boolean
  hasBackImage: boolean
  hasElytraImage: boolean
}

const LeftColumn: FC<LeftColumnProps> = ({
  onFrontImageChange,
  onBackImageChange,
  onElytraImageChange,
  onDownload,
  onReset,
  onShowTemplates,
  hasFrontImage,
  hasBackImage,
  hasElytraImage,
}) => {
  const [cropperState, setCropperState] = useState<{
    show: boolean
    imageUrl: string
    type: 'front' | 'back' | 'elytra' | null
  }>({ show: false, imageUrl: '', type: null })

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

  const handleRemoveImage = (type: 'front' | 'back' | 'elytra') => {
    const input = document.getElementById(`${type}Input`) as HTMLInputElement
    if (input) input.value = ''
    if (type === 'front') onFrontImageChange(null)
    else if (type === 'back') onBackImageChange(null)
    else if (type === 'elytra') onElytraImageChange(null)
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
    <aside className="panel panel-left" aria-label="Image uploads and actions">
      {cropperState.show && (
        <ImageCropper
          imageUrl={cropperState.imageUrl}
          label={cropperState.type === 'front' ? 'Front' : cropperState.type === 'back' ? 'Back' : 'Elytra'}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropperState({ show: false, imageUrl: '', type: null })}
        />
      )}

      <button
        type="button"
        className="btn btn-templates-panel"
        onClick={onShowTemplates}
        aria-label="Browse design templates"
      >
        🎨 Templates
      </button>

      <section className="panel-section">
        <h2 className="section-title">🖼️ Images</h2>
        <div className="upload-grid">
          <div className={`upload-slot-wrapper ${hasFrontImage ? 'has-image' : ''}`}>
            <label className="upload-slot" htmlFor="frontInput">
              <span className="upload-icon">👤</span>
              <span className="upload-text">Front</span>
              <input id="frontInput" type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'front')} />
            </label>
            {hasFrontImage && (
              <button type="button" className="remove-image-btn" onClick={() => handleRemoveImage('front')} aria-label="Remove front image">×</button>
            )}
          </div>
          <div className={`upload-slot-wrapper ${hasBackImage ? 'has-image' : ''}`}>
            <label className="upload-slot" htmlFor="backInput">
              <span className="upload-icon">🔙</span>
              <span className="upload-text">Back</span>
              <input id="backInput" type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'back')} />
            </label>
            {hasBackImage && (
              <button type="button" className="remove-image-btn" onClick={() => handleRemoveImage('back')} aria-label="Remove back image">×</button>
            )}
          </div>
          <div className={`upload-slot-wrapper ${hasElytraImage ? 'has-image' : ''}`}>
            <label className="upload-slot" htmlFor="elytraInput">
              <span className="upload-icon">🦅</span>
              <span className="upload-text">Elytra</span>
              <input id="elytraInput" type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files?.[0] || null, 'elytra')} />
            </label>
            {hasElytraImage && (
              <button type="button" className="remove-image-btn" onClick={() => handleRemoveImage('elytra')} aria-label="Remove elytra image">×</button>
            )}
          </div>
        </div>
      </section>

      <div className="action-bar">
        <button type="button" className="btn btn-download" onClick={onDownload} aria-label="Download cape">
          ⬇️ Download
        </button>
        <button type="button" className="btn btn-reset" onClick={handleReset} aria-label="Reset all">
          ↻ Reset
        </button>
      </div>
    </aside>
  )
}

export default LeftColumn
