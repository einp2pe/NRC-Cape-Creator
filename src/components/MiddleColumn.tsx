import { FC, useState } from 'react'

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
}

type TabType = 'gradient'

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

  const handleAddColor = () => onGradientColorsChange([...gradientColors, '#ffffff'])
  const handleRemoveColor = (index: number) => onGradientColorsChange(gradientColors.filter((_, i) => i !== index))
  const handleColorChange = (index: number, color: string) => {
    const newColors = [...gradientColors]
    newColors[index] = color
    onGradientColorsChange(newColors)
  }

  // Preset application removed from UI; presets were previously on the front page.

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
          Gradient
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
                    setElytraGradientColors([...gradientColors])
                  }
                }} />
                <span>Separate Elytra Gradient</span>
              </label>
              {/* Vanilla elytra option removed */}
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
              {/* Preset gradients removed from front page */}
            
            {/* Direction toggle */}
            <div className="direction-toggle">
              <span className="toggle-label">Direction</span>
              <div className="toggle-buttons">
                <button
                  type="button"
                  className={`toggle-btn ${gradDirection === 'vertical' ? 'active' : ''}`}
                  onClick={() => onGradDirectionChange('vertical')}
                    >Vertical</button>
                    <button
                  type="button"
                  className={`toggle-btn ${gradDirection === 'horizontal' ? 'active' : ''}`}
                  onClick={() => onGradDirectionChange('horizontal')}
                >Horizontal</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default MiddleColumn
