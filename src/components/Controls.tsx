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
}) => {
  const [cropperState, setCropperState] = useState<{
    show: boolean
    imageUrl: string
    type: 'front' | 'back' | 'elytra' | null
  }>({ show: false, imageUrl: '', type: null })

  const [openCards, setOpenCards] = useState({
    images: true,
    gradient: true,
    overlay: true,
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

        {/* Emoji/Text Overlay Card */}
        <div className="card">
          <div className="card-header" onClick={() => toggleCard('overlay')}>
            <h3><span className="icon">✨</span> Text / Emoji</h3>
            <span className={`toggle-icon ${openCards.overlay ? 'open' : ''}`}>▼</span>
          </div>
          {openCards.overlay && (
            <div className="card-content">
              <div className="form-row">
                <label className="checkbox-wrapper">
                  <input type="checkbox" checked={emojiEnabled} onChange={(e) => setEmojiEnabled(e.target.checked)} />
                  <span>Enable Overlay</span>
                </label>
              </div>

              <div className="form-group">
                <span className="form-label">Text or Emoji</span>
                <input type="text" placeholder="Type text or paste emoji..." value={emoji} onChange={(e) => setEmoji(e.target.value)} style={{ width: '100%' }} />
              </div>

              {emojiEnabled && (
                <>
                  <div className="form-row">
                    <div className="slider-group">
                      <div className="slider-label">
                        <span>Size</span>
                        <span className="slider-value">{emojiSize}px</span>
                      </div>
                      <input type="range" min={16} max={128} step={4} value={emojiSize} onChange={(e) => setEmojiSize(Number(e.target.value))} />
                    </div>
                    <div className="slider-group">
                      <div className="slider-label">
                        <span>Spacing</span>
                        <span className="slider-value">{emojiSpacing}px</span>
                      </div>
                      <input type="range" min={16} max={128} step={4} value={emojiSpacing} onChange={(e) => setEmojiSpacing(Number(e.target.value))} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="slider-group">
                      <div className="slider-label">
                        <span>Opacity</span>
                        <span className="slider-value">{Math.round(emojiOpacity * 100)}%</span>
                      </div>
                      <input type="range" min={0} max={1} step={0.01} value={emojiOpacity} onChange={(e) => setEmojiOpacity(Number(e.target.value))} />
                    </div>
                    <div className="slider-group">
                      <div className="slider-label">
                        <span>Rotation</span>
                        <span className="slider-value">{emojiRotation}°</span>
                      </div>
                      <input type="range" min={-180} max={180} step={1} value={emojiRotation} onChange={(e) => setEmojiRotation(Number(e.target.value))} />
                    </div>
                  </div>

                  <div className="form-row wrap">
                    <label className="checkbox-wrapper">
                      <input type="checkbox" checked={emojiRandomRotation} onChange={(e) => setEmojiRandomRotation(e.target.checked)} />
                      <span>Random Rotation</span>
                    </label>
                    <label className="checkbox-wrapper">
                      <input type="checkbox" checked={emojiApplyToElytra} onChange={(e) => setEmojiApplyToElytra(e.target.checked)} />
                      <span>Apply to Elytra</span>
                    </label>
                  </div>

                  <div className="form-row">
                    <div className="slider-group">
                      <div className="slider-label">
                        <span>Jitter</span>
                        <span className="slider-value">{Math.round(emojiJitter * 100)}%</span>
                      </div>
                      <input type="range" min={0} max={0.5} step={0.01} value={emojiJitter} onChange={(e) => setEmojiJitter(Number(e.target.value))} />
                    </div>
                    <div style={{ width: '100px' }}>
                      <span className="form-label" style={{ marginBottom: '6px', display: 'block' }}>Seed</span>
                      <input type="number" value={emojiSeed} onChange={(e) => setEmojiSeed(Number(e.target.value))} style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* Text Style Box */}
                  <div className="text-style-box">
                    <div className="box-title">🎨 Text Style</div>
                    <div className="form-row" style={{ marginBottom: '12px' }}>
                      <div>
                        <span className="form-label" style={{ marginBottom: '6px', display: 'block' }}>Color</span>
                        <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <span className="form-label" style={{ marginBottom: '6px', display: 'block' }}>Font</span>
                        <select value={textFont} onChange={(e) => setTextFont(e.target.value)} style={{ width: '100%' }}>
                          <optgroup label="System">
                            <option value="sans-serif">Sans-serif</option>
                            <option value="serif">Serif</option>
                            <option value="monospace">Monospace</option>
                            <option value="Impact">Impact</option>
                            <option value="Comic Sans MS">Comic Sans</option>
                          </optgroup>
                          <optgroup label="Google Fonts">
                            <option value="Roboto">Roboto</option>
                            <option value="Oswald">Oswald</option>
                            <option value="Bebas Neue">Bebas Neue</option>
                            <option value="Lobster">Lobster</option>
                            <option value="Pacifico">Pacifico</option>
                            <option value="Bangers">Bangers</option>
                            <option value="Permanent Marker">Permanent Marker</option>
                            <option value="Fredoka">Fredoka</option>
                            <option value="Caveat">Caveat</option>
                            <option value="Shadows Into Light">Shadows Into Light</option>
                            <option value="Press Start 2P">Press Start 2P</option>
                            <option value="Russo One">Russo One</option>
                          </optgroup>
                        </select>
                      </div>
                      <div className="style-toggles">
                        <button type="button" className={`style-toggle ${textBold ? 'active' : ''}`} onClick={() => setTextBold(!textBold)}><strong>B</strong></button>
                        <button type="button" className={`style-toggle ${textItalic ? 'active' : ''}`} onClick={() => setTextItalic(!textItalic)}><em>I</em></button>
                      </div>
                    </div>
                    <div className="form-row">
                      <label className="checkbox-wrapper" style={{ flex: 'none' }}>
                        <input type="checkbox" checked={textStrokeEnabled} onChange={(e) => setTextStrokeEnabled(e.target.checked)} />
                        <span>Stroke</span>
                      </label>
                      {textStrokeEnabled && (
                        <>
                          <input type="color" value={textStrokeColor} onChange={(e) => setTextStrokeColor(e.target.value)} />
                          <div className="slider-group">
                            <div className="slider-label">
                              <span>Width</span>
                              <span className="slider-value">{textStrokeWidth}px</span>
                            </div>
                            <input type="range" min={1} max={10} step={1} value={textStrokeWidth} onChange={(e) => setTextStrokeWidth(Number(e.target.value))} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Emoji Presets */}
                  <div className="emoji-presets">
                    {['🤖','🌈','✨','🔥','⚡','🍕','🍩','🎮','👑','💀'].map((emo) => (
                      <button key={emo} type="button" className="emoji-preset-btn" onClick={() => setEmoji(emo)}>{emo}</button>
                    ))}
                    <button type="button" className="emoji-preset-btn random" onClick={() => { 
                      const list = ['🤖','🌈','✨','🔥','⚡','🍕','🍩','🎮','👑','💀']
                      setEmoji(list[Math.floor(Math.random() * list.length)])
                    }}>🎲 Random</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

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
