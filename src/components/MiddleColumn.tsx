import { FC, useState } from 'react'
import { filterContent } from '../utils/contentFilter'

interface MiddleColumnProps {
  gradientColors: string[]
  onGradientColorsChange: (colors: string[]) => void
  gradDirection: 'vertical' | 'horizontal'
  onGradDirectionChange: (direction: 'vertical' | 'horizontal') => void
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
            {/* Info about gradient area */}
            <div className="gradient-info">
              <span>↙️ Applied to cape area (368×176px)</span>
            </div>
            
            {/* Live gradient preview */}
            <div 
              className="gradient-preview"
              style={{
                background: gradientColors.length === 1 
                  ? gradientColors[0]
                  : `linear-gradient(${gradDirection === 'vertical' ? '180deg' : '90deg'}, ${gradientColors.join(', ')})`
              }}
            />
            
            {/* Inline color strip */}
            <div className="color-strip">
              {gradientColors.map((color, index) => (
                <div key={index} className="color-chip">
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

            {/* Preset gradients */}
            <div className="gradient-presets">
              <button type="button" className="preset-btn" onClick={() => onGradientColorsChange(['#ff6b6b', '#feca57'])} title="Sunset">🌅</button>
              <button type="button" className="preset-btn" onClick={() => onGradientColorsChange(['#a8edea', '#fed6e3'])} title="Pastel">🌸</button>
              <button type="button" className="preset-btn" onClick={() => onGradientColorsChange(['#667eea', '#764ba2'])} title="Purple">💜</button>
              <button type="button" className="preset-btn" onClick={() => onGradientColorsChange(['#11998e', '#38ef7d'])} title="Green">🌿</button>
              <button type="button" className="preset-btn" onClick={() => onGradientColorsChange(['#fc4a1a', '#f7b733'])} title="Fire">🔥</button>
              <button type="button" className="preset-btn" onClick={() => onGradientColorsChange(['#00c6ff', '#0072ff'])} title="Ocean">🌊</button>
              <button type="button" className="preset-btn" onClick={() => onGradientColorsChange(['#232526', '#414345'])} title="Dark">🌑</button>
              <button type="button" className="preset-btn" onClick={() => onGradientColorsChange(['#f5f7fa', '#c3cfe2'])} title="Light">☁️</button>
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
