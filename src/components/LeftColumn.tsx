import { FC, useState } from 'react'
import ImageCropper from './ImageCropper'
import { validateTemplateUrl } from '../utils/templateImporter'

interface LeftColumnProps {
  onFrontImageChange: (img: HTMLImageElement | null) => void
  onBackImageChange: (img: HTMLImageElement | null) => void
  onElytraImageChange: (img: HTMLImageElement | null) => void
  onImportTemplate: (url: string) => Promise<void>
  onClearTemplate: () => void
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
  onImportTemplate,
  onClearTemplate,
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
  const [templateUrl, setTemplateUrl] = useState<string>('')
  const [templateStatus, setTemplateStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [templateMessage, setTemplateMessage] = useState<string>('')

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

  const handleTemplateImport = async () => {
    if (!templateUrl.trim()) {
      setTemplateStatus('error')
      setTemplateMessage('Enter a template URL to import')
      return
    }

    try {
      validateTemplateUrl(templateUrl)
    } catch (error) {
      setTemplateStatus('error')
      setTemplateMessage(error instanceof Error ? error.message : 'Invalid template URL')
      return
    }

    try {
      setTemplateStatus('loading')
      setTemplateMessage('Loading template…')
      await onImportTemplate(templateUrl)
      setTemplateStatus('success')
      setTemplateMessage('Template loaded from URL')
    } catch (error) {
      setTemplateStatus('error')
      setTemplateMessage(error instanceof Error ? error.message : 'Failed to import template')
    }
  }

  const handleClearTemplate = () => {
    onClearTemplate()
    setTemplateStatus('idle')
    setTemplateMessage('')
    setTemplateUrl('')
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
        <div className="template-import-card">
          <label htmlFor="templateUrl" className="template-import-label">Import template via URL</label>
          <input
            id="templateUrl"
            type="url"
            className="template-import-input"
            placeholder="https://cdn.norisk.gg/.../cape.png"
            value={templateUrl}
            onChange={(e) => setTemplateUrl(e.target.value)}
            aria-label="Template URL"
          />
          {templateMessage && (
            <p className={`template-import-message ${templateStatus}`} role="status">{templateMessage}</p>
          )}
          <div className="template-import-actions">
            <button
              type="button"
              className="btn btn-import"
              onClick={handleTemplateImport}
              disabled={templateStatus === 'loading'}
            >
              {templateStatus === 'loading' ? 'Loading…' : 'Load Template'}
            </button>
            <button type="button" className="btn btn-clear" onClick={handleClearTemplate}>
              Clear
            </button>
          </div>
          <p className="template-import-hint">Allowed domains: cdn.norisk.gg, Discord CDN (.png only)</p>
        </div>
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
