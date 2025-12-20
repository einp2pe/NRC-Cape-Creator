import { FC, useState } from 'react'
import { filterContent } from '../utils/contentFilter'

interface MiddleColumnProps {
  gradientColors: string[]
  onGradientColorsChange: (colors: string[]) => void
  gradDirection: 'vertical' | 'horizontal'
  onGradDirectionChange: (direction: 'vertical' | 'horizontal') => void
  separateElytraGradient: boolean
  setSeparateElytraGradient: (v: boolean) => void
  elytraGradientColors: string[] | null
  setElytraGradientColors: (c: string[] | null) => void
  elytraGradDirection: 'vertical' | 'horizontal'
  setElytraGradDirection: (d: 'vertical' | 'horizontal') => void
  openTemplateGallery: (scope: 'both' | 'elytra' | 'main') => void
  emojiEnabled: boolean
  emoji: string
  emojiSize: number
  emojiSpacing: number
  setEmojiEnabled: (v: boolean) => void
  setEmoji: (e: string) => void
  setEmojiSize: (s: number) => void
  setEmojiSpacing: (s: number) => void
  emojiOpacity: number
  emojiRotation: number
  emojiRandomRotation: boolean
  emojiJitter: number
  emojiApplyToElytra: boolean
  emojiSeed: number
  setEmojiOpacity: (v: number) => void
  setEmojiRotation: (v: number) => void
  setEmojiRandomRotation: (v: boolean) => void
  setEmojiJitter: (v: number) => void
  setEmojiApplyToElytra: (v: boolean) => void
  setEmojiSeed: (v: number) => void
  textColor: string
  textStrokeEnabled: boolean
  textStrokeColor: string
  textStrokeWidth: number
  textFont: string
  textBold: boolean
  textItalic: boolean
  setTextColor: (v: string) => void
  setTextStrokeEnabled: (v: boolean) => void
  setTextStrokeColor: (v: string) => void
  setTextStrokeWidth: (v: number) => void
  setTextFont: (v: string) => void
  setTextBold: (v: boolean) => void
  setTextItalic: (v: boolean) => void
}

type TabType = 'gradient' | 'overlay'

const MiddleColumn: FC<MiddleColumnProps> = ({
  gradientColors,
  onGradientColorsChange,
  gradDirection,
  onGradDirectionChange,
  separateElytraGradient,
  setSeparateElytraGradient,
  elytraGradientColors,
  setElytraGradientColors,
  elytraGradDirection,
  setElytraGradDirection,
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
  openTemplateGallery,
}) => {
  // Helper to move color within an array
  const moveColor = (arr: string[], from: number, to: number) => {
    if (to < 0 || to >= arr.length) return arr
    const copy = [...arr]
    const [item] = copy.splice(from, 1)
    copy.splice(to, 0, item)
    return copy
  }
  // Drag state
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('gradient')
  const [contentWarning, setContentWarning] = useState<string | null>(null)

  // Handle text/emoji input with content filtering
  const handleEmojiChange = (value: string) => {
    const result = filterContent(value)
    if (result.isClean) {
      setEmoji(value)
      setContentWarning(null)
    } else {
      setContentWarning('⚠️ Inappropriate content blocked')
      // Clear warning after 3 seconds
      setTimeout(() => setContentWarning(null), 3000)
    }
  }

  const handleAddColor = () => onGradientColorsChange([...gradientColors, '#ffffff'])
  const handleRemoveColor = (index: number) => onGradientColorsChange(gradientColors.filter((_, i) => i !== index))
  const handleColorChange = (index: number, color: string) => {
    const newColors = [...gradientColors]
    newColors[index] = color
    onGradientColorsChange(newColors)
  }

  
  const applyPreset = (colors: string[], dir: 'vertical' | 'horizontal' = 'vertical') => {
    // Apply preset to main gradient only. Do not auto-enable separate elytra.
    onGradientColorsChange(colors)
    onGradDirectionChange(dir)
  }

  // Elytra gradient handlers
  const handleAddElyColor = () => {
    const base = elytraGradientColors ?? gradientColors
    const next = [...base, '#ffffff']
    setElytraGradientColors(next)
  }
  const handleRemoveElyColor = (index: number) => {
    if (!elytraGradientColors) return
    const next = elytraGradientColors.filter((_, i) => i !== index)
    setElytraGradientColors(next)
  }
  const handleElyColorChange = (index: number, color: string) => {
    if (!elytraGradientColors) return
    const next = [...elytraGradientColors]
    next[index] = color
    setElytraGradientColors(next)
  }
  

  return (
    <section className="panel panel-middle" aria-label="Style settings">
      {/* Tab Navigation */}
      <nav className="tab-nav" role="tablist">
        <button 
          role="tab"
          aria-selected={activeTab === 'gradient'}
          className={`tab-btn ${activeTab === 'gradient' ? 'active' : ''}`}
          onClick={() => setActiveTab('gradient')}
        >
          🎨 Gradient
        </button>
        <button 
          role="tab"
          aria-selected={activeTab === 'overlay'}
          className={`tab-btn ${activeTab === 'overlay' ? 'active' : ''}`}
          onClick={() => setActiveTab('overlay')}
        >
          ✨ Text/Emoji
        </button>
      </nav>

      {/* Tab Content */}
      <div className="tab-content" role="tabpanel">
        {activeTab === 'gradient' && (
          <div className="gradient-panel">
            {/* Live gradient preview */}
            <div 
              className="gradient-preview"
              onClick={() => openTemplateGallery('main')}
              role="button"
              tabIndex={0}
              style={{
                background: gradientColors.length === 1 
                  ? gradientColors[0]
                  : `linear-gradient(${gradDirection === 'vertical' ? '180deg' : '90deg'}, ${gradientColors.join(', ')})`
              }}
            />
            
            {/* Inline color strip */}
            <div className="color-strip">
              {gradientColors.map((color, index) => (
                <div
                  key={index}
                  className={`color-chip draggable ${dragIndex === index ? 'dragging' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
                  draggable
                  onDragStart={(e) => {
                    setDragIndex(index)
                    e.dataTransfer?.setData('text/plain', String(index))
                    // show move cursor
                    e.dataTransfer!.effectAllowed = 'move'
                  }}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOverIndex(index)
                    e.dataTransfer!.dropEffect = 'move'
                  }}
                  onDragEnd={() => { setDragIndex(null); setDragOverIndex(null) }}
                  onDrop={(e) => {
                    e.preventDefault()
                    const from = Number(e.dataTransfer?.getData('text/plain'))
                    const to = index
                    if (!Number.isNaN(from) && from !== to) {
                      onGradientColorsChange(moveColor(gradientColors, from, to))
                    }
                    setDragIndex(null)
                    setDragOverIndex(null)
                  }}
                >
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    title={`Color ${index + 1}`}
                  />
                  
                  {gradientColors.length > 1 && (
                    <button
                      type="button"
                      className="chip-remove"
                      onClick={() => handleRemoveColor(index)}
                      aria-label={`Remove color ${index + 1}`}
                    >×</button>
                  )}
                </div>
              ))}
              <button type="button" className="color-add" onClick={handleAddColor} aria-label="Add color">+</button>
            </div>

            <div className="separate-elytra">
              <label className="checkbox-compact">
                <input type="checkbox" checked={separateElytraGradient} onChange={(e) => {
                  const on = e.target.checked
                  setSeparateElytraGradient(on)
                  if (on && elytraGradientColors == null) {
                    // initialize elytra gradient with current main gradient
                    setElytraGradientColors([...gradientColors])
                  }
                }} />
                <span>Separate Elytra Gradient</span>
              </label>
            </div>

            {separateElytraGradient && (
              <div className="elytra-gradient-panel">
                <div 
                  className="gradient-preview elytra"
                  onClick={() => openTemplateGallery('elytra')}
                  role="button"
                  tabIndex={0}
                  style={{
                    background: (elytraGradientColors && elytraGradientColors.length === 1) 
                      ? (elytraGradientColors![0])
                      : `linear-gradient(${elytraGradDirection === 'vertical' ? '180deg' : '90deg'}, ${(elytraGradientColors ?? gradientColors).join(', ')})`
                  }}
                />
                <div className="color-strip">
                    {(elytraGradientColors ?? gradientColors).map((color, index) => (
                      <div
                        key={index}
                        className={`color-chip draggable ${dragIndex === index ? 'dragging' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
                        draggable
                        onDragStart={(e) => {
                          // mark drag from elytra - encode with prefix
                          setDragIndex(index)
                          e.dataTransfer?.setData('text/plain', `ely:${index}`)
                          e.dataTransfer!.effectAllowed = 'move'
                        }}
                        onDragOver={(e) => { e.preventDefault(); setDragOverIndex(index); e.dataTransfer!.dropEffect = 'move' }}
                        onDragEnd={() => { setDragIndex(null); setDragOverIndex(null) }}
                        onDrop={(e) => {
                          e.preventDefault()
                          const payload = e.dataTransfer?.getData('text/plain') || ''
                          if (payload.startsWith('ely:')) {
                            const from = Number(payload.split(':')[1])
                            const to = index
                            if (!Number.isNaN(from) && from !== to && elytraGradientColors) {
                              setElytraGradientColors(moveColor(elytraGradientColors, from, to))
                            }
                          } else {
                            // dragging from main to elytra: insert color into elytra gradient
                            const from = Number(payload)
                            if (!Number.isNaN(from) && gradientColors[from]) {
                              const base = elytraGradientColors ?? gradientColors
                              const copy = [...base]
                              const [item] = gradientColors.splice(from, 1)
                              copy.splice(index, 0, item)
                              setElytraGradientColors(copy)
                            }
                          }
                          setDragIndex(null)
                          setDragOverIndex(null)
                        }}
                      >
                        <input type="color" value={color} onChange={(e) => handleElyColorChange(index, e.target.value)} />
                        
                        {( (elytraGradientColors ?? gradientColors).length > 1) && (
                          <button type="button" className="chip-remove" onClick={() => handleRemoveElyColor(index)}>×</button>
                        )}
                      </div>
                    ))}
                  <button type="button" className="color-add" onClick={handleAddElyColor}>+</button>
                </div>
                <div className="direction-toggle">
                  <span className="toggle-label">Elytra Direction</span>
                  <div className="toggle-buttons">
                    <button 
                      type="button"
                      className={`toggle-btn ${elytraGradDirection === 'vertical' ? 'active' : ''}`}
                      onClick={() => setElytraGradDirection('vertical')}
                    >⬇️ Vertical</button>
                    <button 
                      type="button"
                      className={`toggle-btn ${elytraGradDirection === 'horizontal' ? 'active' : ''}`}
                      onClick={() => setElytraGradDirection('horizontal')}
                    >➡️ Horizontal</button>
                  </div>
                </div>
              </div>
            )}

            {/* Preset gradients */}
            <div className="gradient-presets">
              <button type="button" className="preset-btn" onClick={() => applyPreset(['#ff6b6b', '#feca57'], 'vertical')} title="Sunset">🌅</button>
              <button type="button" className="preset-btn" onClick={() => applyPreset(['#a8edea', '#fed6e3'], 'vertical')} title="Pastel">🌸</button>
              <button type="button" className="preset-btn" onClick={() => applyPreset(['#667eea', '#764ba2'], 'vertical')} title="Purple">💜</button>
              <button type="button" className="preset-btn" onClick={() => applyPreset(['#11998e', '#38ef7d'], 'vertical')} title="Green">🌿</button>
              <button type="button" className="preset-btn" onClick={() => applyPreset(['#fc4a1a', '#f7b733'], 'vertical')} title="Fire">🔥</button>
              <button type="button" className="preset-btn" onClick={() => applyPreset(['#00c6ff', '#0072ff'], 'vertical')} title="Ocean">🌊</button>
              <button type="button" className="preset-btn" onClick={() => applyPreset(['#232526', '#414345'], 'vertical')} title="Dark">🌑</button>
              <button type="button" className="preset-btn" onClick={() => applyPreset(['#f5f7fa', '#c3cfe2'], 'vertical')} title="Light">☁️</button>
            </div>
            
            {/* Direction toggle */}
            <div className="direction-toggle">
              <span className="toggle-label">Direction</span>
              <div className="toggle-buttons">
                <button 
                  type="button"
                  className={`toggle-btn ${gradDirection === 'vertical' ? 'active' : ''}`}
                  onClick={() => onGradDirectionChange('vertical')}
                >⬇️ Vertical</button>
                <button 
                  type="button"
                  className={`toggle-btn ${gradDirection === 'horizontal' ? 'active' : ''}`}
                  onClick={() => onGradDirectionChange('horizontal')}
                >➡️ Horizontal</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'overlay' && (
          <div className="overlay-panel">
            {/* Content warning */}
            {contentWarning && (
              <div className="content-warning">{contentWarning}</div>
            )}
            
            {/* Enable toggle + Input in one row */}
            <div className="overlay-header">
              <label className="switch">
                <input type="checkbox" checked={emojiEnabled} onChange={(e) => setEmojiEnabled(e.target.checked)} />
                <span className="switch-slider"></span>
              </label>
              <input 
                type="text" 
                className="overlay-input"
                placeholder="Type text or emoji..." 
                value={emoji} 
                onChange={(e) => handleEmojiChange(e.target.value)}
                disabled={!emojiEnabled}
              />
            </div>

            {emojiEnabled && (
              <>
                {/* Quick emoji presets */}
                <div className="emoji-quick">
                  {['🤖','🌈','✨','🔥','⚡','🍕','🎮','👑','💀','🎲'].map((emo) => (
                    <button 
                      key={emo} 
                      type="button" 
                      className="emoji-btn" 
                      onClick={() => emo === '🎲' 
                        ? setEmoji(['🤖','🌈','✨','🔥','⚡','🍕','🎮','👑','💀'][Math.floor(Math.random() * 9)])
                        : setEmoji(emo)
                      }
                    >{emo}</button>
                  ))}
                </div>

                {/* Compact slider grid */}
                <div className="slider-grid">
                  <div className="mini-slider">
                    <label>Size <span>{emojiSize}px</span></label>
                    <input type="range" min={16} max={128} step={4} value={emojiSize} onChange={(e) => setEmojiSize(Number(e.target.value))} />
                  </div>
                  <div className="mini-slider">
                    <label>Spacing <span>{emojiSpacing}px</span></label>
                    <input type="range" min={16} max={128} step={4} value={emojiSpacing} onChange={(e) => setEmojiSpacing(Number(e.target.value))} />
                  </div>
                  <div className="mini-slider">
                    <label>Opacity <span>{Math.round(emojiOpacity * 100)}%</span></label>
                    <input type="range" min={0} max={1} step={0.01} value={emojiOpacity} onChange={(e) => setEmojiOpacity(Number(e.target.value))} />
                  </div>
                  <div className="mini-slider">
                    <label>Rotation <span>{emojiRotation}°</span></label>
                    <input type="range" min={-180} max={180} step={1} value={emojiRotation} onChange={(e) => setEmojiRotation(Number(e.target.value))} />
                  </div>
                  <div className="mini-slider">
                    <label>Jitter <span>{Math.round(emojiJitter * 100)}%</span></label>
                    <input type="range" min={0} max={0.5} step={0.01} value={emojiJitter} onChange={(e) => setEmojiJitter(Number(e.target.value))} />
                  </div>
                  <div className="mini-input">
                    <label>Seed</label>
                    <input type="number" value={emojiSeed} onChange={(e) => setEmojiSeed(Number(e.target.value))} />
                  </div>
                </div>

                {/* Checkbox row */}
                <div className="option-row">
                  <label className="checkbox-compact">
                    <input type="checkbox" checked={emojiRandomRotation} onChange={(e) => setEmojiRandomRotation(e.target.checked)} />
                    <span>Random rotation</span>
                  </label>
                  <label className="checkbox-compact">
                    <input type="checkbox" checked={emojiApplyToElytra} onChange={(e) => setEmojiApplyToElytra(e.target.checked)} />
                    <span>Elytra overlay</span>
                  </label>
                </div>

                {/* Text styling toolbar */}
                <div className="text-toolbar">
                  <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} title="Text color" />
                  <select value={textFont} onChange={(e) => setTextFont(e.target.value)} title="Font" className="font-select">
                    <optgroup label="🖥️ System">
                      <option value="sans-serif">Sans-serif</option>
                      <option value="serif">Serif</option>
                      <option value="monospace">Monospace</option>
                      <option value="Impact">Impact</option>
                      <option value="Comic Sans MS">Comic Sans</option>
                    </optgroup>
                    <optgroup label="🔥 Bold & Impact">
                      <option value="Anton">Anton</option>
                      <option value="Archivo Black">Archivo Black</option>
                      <option value="Bebas Neue">Bebas Neue</option>
                      <option value="Black Ops One">Black Ops One</option>
                      <option value="Bungee">Bungee</option>
                      <option value="Fugaz One">Fugaz One</option>
                      <option value="Gravitas One">Gravitas One</option>
                      <option value="Lilita One">Lilita One</option>
                      <option value="Luckiest Guy">Luckiest Guy</option>
                      <option value="Oswald">Oswald</option>
                      <option value="Passion One">Passion One</option>
                      <option value="Russo One">Russo One</option>
                      <option value="Titan One">Titan One</option>
                      <option value="Ultra">Ultra</option>
                    </optgroup>
                    <optgroup label="🎮 Gaming & Tech">
                      <option value="Bangers">Bangers</option>
                      <option value="Chakra Petch">Chakra Petch</option>
                      <option value="Orbitron">Orbitron</option>
                      <option value="Play">Play</option>
                      <option value="Press Start 2P">Press Start 2P</option>
                      <option value="Rubik Mono One">Rubik Mono One</option>
                      <option value="Silkscreen">Silkscreen</option>
                      <option value="Teko">Teko</option>
                      <option value="VT323">VT323</option>
                    </optgroup>
                    <optgroup label="🎉 Fun & Display">
                      <option value="Concert One">Concert One</option>
                      <option value="Creepster">Creepster</option>
                      <option value="Goblin One">Goblin One</option>
                      <option value="Kavoon">Kavoon</option>
                      <option value="Knewave">Knewave</option>
                      <option value="Monoton">Monoton</option>
                      <option value="Nosifer">Nosifer</option>
                      <option value="Righteous">Righteous</option>
                    </optgroup>
                    <optgroup label="✍️ Handwritten">
                      <option value="Caveat">Caveat</option>
                      <option value="Dancing Script">Dancing Script</option>
                      <option value="Gloria Hallelujah">Gloria Hallelujah</option>
                      <option value="Indie Flower">Indie Flower</option>
                      <option value="Kalam">Kalam</option>
                      <option value="Lobster">Lobster</option>
                      <option value="Pacifico">Pacifico</option>
                      <option value="Patrick Hand">Patrick Hand</option>
                      <option value="Permanent Marker">Permanent Marker</option>
                      <option value="Shadows Into Light">Shadows Into Light</option>
                      <option value="Yellowtail">Yellowtail</option>
                    </optgroup>
                    <optgroup label="🏛️ Elegant">
                      <option value="Abril Fatface">Abril Fatface</option>
                      <option value="Cinzel">Cinzel</option>
                      <option value="Comfortaa">Comfortaa</option>
                      <option value="Fredoka">Fredoka</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Special Elite">Special Elite</option>
                      <option value="Stint Ultra Expanded">Stint Ultra</option>
                    </optgroup>
                  </select>
                  <button type="button" className={`toolbar-btn ${textBold ? 'active' : ''}`} onClick={() => setTextBold(!textBold)}><b>B</b></button>
                  <button type="button" className={`toolbar-btn ${textItalic ? 'active' : ''}`} onClick={() => setTextItalic(!textItalic)}><i>I</i></button>
                  <div className="stroke-controls">
                    <label className="checkbox-compact">
                      <input type="checkbox" checked={textStrokeEnabled} onChange={(e) => setTextStrokeEnabled(e.target.checked)} />
                      <span>Stroke</span>
                    </label>
                    {textStrokeEnabled && (
                      <>
                        <input type="color" value={textStrokeColor} onChange={(e) => setTextStrokeColor(e.target.value)} />
                        <input type="range" min={1} max={10} value={textStrokeWidth} onChange={(e) => setTextStrokeWidth(Number(e.target.value))} title={`${textStrokeWidth}px`} />
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default MiddleColumn
