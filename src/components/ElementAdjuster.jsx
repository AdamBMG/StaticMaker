import { ELEMENT_MAPS } from '../data/elementMaps'
import './ElementAdjuster.css'

const PROP_LABELS = {
  top: 'Y pos',
  bottom: 'Y pos',
  left: 'X pos',
  right: 'X pos',
  fontSize: 'Size',
  height: 'Height',
  size: 'Scale',
}

export default function ElementAdjuster({ templateId, overrides, onOverrideChange }) {
  const elements = ELEMENT_MAPS[templateId]
  if (!elements) return null

  const getValue = (elementId, prop) => {
    const key = `${elementId}.${prop}`
    return overrides[key] ?? 0
  }

  const nudge = (elementId, prop, step) => {
    const key = `${elementId}.${prop}`
    const current = overrides[key] ?? 0
    onOverrideChange(key, current + step)
  }

  const reset = (elementId, prop) => {
    const key = `${elementId}.${prop}`
    onOverrideChange(key, 0)
  }

  const hasAnyOverride = Object.values(overrides).some(v => v !== 0)

  return (
    <div className="element-adjuster">
      {elements.map(el => (
        <div key={el.id} className="ea-element">
          <div className="ea-label">{el.label}</div>
          <div className="ea-controls">
            {Object.entries(el.props).map(([prop, config]) => {
              const val = getValue(el.id, prop)
              const unit = config.unit || 'px'
              return (
                <div key={prop} className="ea-prop">
                  <span className="ea-prop-label">{PROP_LABELS[prop] || prop}</span>
                  <button className="ea-btn" onClick={() => nudge(el.id, prop, -config.step)}>-</button>
                  <span className="ea-value">
                    {val > 0 ? '+' : ''}{val}{unit}
                  </span>
                  <button className="ea-btn" onClick={() => nudge(el.id, prop, config.step)}>+</button>
                  {val !== 0 && (
                    <button className="ea-reset" onClick={() => reset(el.id, prop)}>x</button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
      {hasAnyOverride && (
        <button className="ea-reset-all" onClick={() => {
          elements.forEach(el => {
            Object.keys(el.props).forEach(prop => {
              onOverrideChange(`${el.id}.${prop}`, 0)
            })
          })
        }}>
          Reset all
        </button>
      )}
    </div>
  )
}
