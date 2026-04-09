import { useState } from 'react'
import { ELEMENT_MAPS } from '../data/elementMaps'
import './ElementAdjuster.css'

const PROP_LABELS = {
  top: 'Y pos',
  bottom: 'Y pos',
  left: 'X pos',
  right: 'X pos',
  fontSize: 'Size',
  scale: 'Scale',
  height: 'Height',
  size: 'Scale',
}

function ElementControls({ el, overrides, onOverrideChange, onUnpin, isPinned }) {
  const getValue = (prop) => overrides[`${el.id}.${prop}`] ?? 0

  const nudge = (prop, step) => {
    const key = `${el.id}.${prop}`
    onOverrideChange(key, (overrides[key] ?? 0) + step)
  }

  const reset = (prop) => onOverrideChange(`${el.id}.${prop}`, 0)

  return (
    <div className="ea-element">
      <div className="ea-element-header">
        <span className="ea-label">{el.label}</span>
        {isPinned && <button className="ea-unpin" onClick={onUnpin}>x</button>}
      </div>
      <div className="ea-controls">
        {Object.entries(el.props).map(([prop, config]) => {
          const val = getValue(prop)
          const unit = config.unit || 'px'
          return (
            <div key={prop} className="ea-prop">
              <span className="ea-prop-label">{PROP_LABELS[prop] || prop}</span>
              <button className="ea-btn" onClick={() => nudge(prop, -config.step)}>-</button>
              <span className="ea-value">{val > 0 ? '+' : ''}{val}{unit}</span>
              <button className="ea-btn" onClick={() => nudge(prop, config.step)}>+</button>
              <button className={`ea-reset ${val === 0 ? 'ea-hidden' : ''}`} onClick={() => reset(prop)}>x</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ElementAdjuster({ templateId, overrides, onOverrideChange }) {
  const elements = ELEMENT_MAPS[templateId]
  const [activeId, setActiveId] = useState(elements?.[0]?.id || '')
  const [pinnedIds, setPinnedIds] = useState([])

  if (!elements) return null

  const activeEl = elements.find(e => e.id === activeId)
  const pinnedEls = elements.filter(e => pinnedIds.includes(e.id))
  const hasAnyOverride = Object.values(overrides).some(v => v !== 0)

  // Elements available in dropdown (exclude already pinned ones)
  const dropdownOptions = elements.filter(e => !pinnedIds.includes(e.id))

  const pinCurrent = () => {
    if (activeId && !pinnedIds.includes(activeId)) {
      setPinnedIds(prev => [...prev, activeId])
      // Switch dropdown to next available element
      const remaining = elements.filter(e => !pinnedIds.includes(e.id) && e.id !== activeId)
      if (remaining.length > 0) setActiveId(remaining[0].id)
    }
  }

  const unpin = (id) => {
    setPinnedIds(prev => prev.filter(p => p !== id))
  }

  return (
    <div className="element-adjuster">
      {/* Pinned elements - always visible */}
      {pinnedEls.map(el => (
        <ElementControls
          key={el.id}
          el={el}
          overrides={overrides}
          onOverrideChange={onOverrideChange}
          onUnpin={() => unpin(el.id)}
          isPinned={true}
        />
      ))}

      {/* Dropdown selector for active element */}
      {dropdownOptions.length > 0 && (
        <>
          <select
            className="ea-dropdown"
            value={activeId}
            onChange={e => setActiveId(e.target.value)}
          >
            {dropdownOptions.map(el => (
              <option key={el.id} value={el.id}>{el.label}</option>
            ))}
          </select>

          {activeEl && !pinnedIds.includes(activeId) && (
            <ElementControls
              el={activeEl}
              overrides={overrides}
              onOverrideChange={onOverrideChange}
              isPinned={false}
            />
          )}

          {/* Pin button - adds current element as permanently visible */}
          <button className="ea-pin-btn" onClick={pinCurrent}>
            + Pin "{activeEl?.label}" to panel
          </button>
        </>
      )}

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
