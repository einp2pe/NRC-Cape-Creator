import { FC } from 'react'
import { templates, CapeTemplate, categoryInfo, categoryOrder, TemplateCategory } from '../data/templates'

interface TemplateGalleryProps {
  // scope indicates which area the gallery will apply to when a template is chosen
  scope: 'both' | 'elytra' | 'main'
  onSelectTemplate: (template: CapeTemplate, scope: 'both' | 'elytra' | 'main') => void
  onClose: () => void
}

const TemplateGallery: FC<TemplateGalleryProps> = ({ scope, onSelectTemplate, onClose }) => {
  // Group templates by category
  const templatesByCategory = categoryOrder.reduce((acc, category) => {
    acc[category] = templates.filter(t => t.category === category)
    return acc
  }, {} as Record<TemplateCategory, CapeTemplate[]>)

  return (
    <div className="template-overlay" onClick={onClose}>
      <div className="template-modal" onClick={(e) => e.stopPropagation()}>
        <header className="template-header">
          <h2>🎨 Design Templates</h2>
          <p>Choose a template as your starting point</p>
          <button type="button" className="template-close" onClick={onClose} aria-label="Close">×</button>
        </header>
        
        <div className="template-sections">
          {categoryOrder.map((category) => {
            const categoryTemplates = templatesByCategory[category]
            if (categoryTemplates.length === 0) return null
            
            const info = categoryInfo[category]
            
            return (
              <section key={category} className="template-category">
                <h3 className="template-category-title">
                  <span className="template-category-icon">{info.icon}</span>
                  {info.label}
                </h3>
                <div className="template-grid">
                  {categoryTemplates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      className="template-card"
                      onClick={() => {
                        onSelectTemplate(template, scope)
                        onClose()
                      }}
                    >
                      <div 
                        className="template-preview"
                        style={{
                          background: template.settings.gradientColors.length === 1 
                            ? template.settings.gradientColors[0]
                            : `linear-gradient(${template.settings.gradDirection === 'vertical' ? '180deg' : '90deg'}, ${template.settings.gradientColors.join(', ')})`
                        }}
                      >
                        {template.settings.emojiEnabled && (
                          <span className="template-emoji">{template.settings.emoji}</span>
                        )}
                      </div>
                      <div className="template-info">
                        <span className="template-icon">{template.icon}</span>
                        <span className="template-name">{template.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TemplateGallery
