import { useState, useRef, useCallback } from 'react'
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

function ElementControls({ el, overrides, onOverrideChange, onUnpin, isPinned, adRef, canvasWidth, canvasHeight }) {
  const getValue = (prop) => overrides[`${el.id}.${prop}`] ?? 0

  const nudge = (prop, step) => {
    const key = `${el.id}.${prop}`
    onOverrideChange(key, (overrides[key] ?? 0) + step)
  }

  const reset = (prop) => onOverrideChange(`${el.id}.${prop}`, 0)

  const centreH = () => {
    if (!adRef?.current || !canvasWidth) return
    // Find the element in the rendered ad by class/data matching
    const container = adRef.current
    const candidates = container.querySelectorAll('[class*="headline"], [class*="cta"], [class*="points"], [class*="quote"], [class*="price"], [class*="logo"], [class*="trust"], [class*="steps"]')
    // Try to find element matching this adjuster's id
    let target = null
    for (const node of candidates) {
      const cls = node.className || ''
      if (cls.includes(el.id) || (el.id === 'headline' && cls.includes('headline')) ||
          (el.id === 'quote' && cls.includes('quote')) || (el.id === 'cta' && cls.includes('cta')) ||
          (el.id === 'points' && cls.includes('points')) || (el.id === 'price' && cls.includes('price')) ||
          (el.id === 'logo' && cls.includes('logo')) || (el.id === 'trust' && cls.includes('trust')) ||
          (el.id === 'steps' && cls.includes('steps'))) {
        target = node
        break
      }
    }
    if (!target) return
    const containerRect = container.getBoundingClientRect()
    const elRect = target.getBoundingClientRect()
    // Scale factor (preview is scaled down)
    const scaleX = canvasWidth / containerRect.width
    // Current element position and width in canvas pixels
    const elLeft = (elRect.left - containerRect.left) * scaleX
    const elWidth = elRect.width * scaleX
    // Offset needed to centre horizontally
    const currentCentre = elLeft + elWidth / 2
    const targetCentre = canvasWidth / 2
    const offsetNeeded = targetCentre - currentCentre
    // Apply as override
    if (el.props.left) {
      const currentVal = overrides[`${el.id}.left`] ?? 0
      onOverrideChange(`${el.id}.left`, Math.round(currentVal + offsetNeeded))
    }
  }

  const centreV = () => {
    if (!adRef?.current || !canvasHeight) return
    const container = adRef.current
    const candidates = container.querySelectorAll('[class*="headline"], [class*="cta"], [class*="points"], [class*="quote"], [class*="price"], [class*="logo"], [class*="trust"], [class*="steps"], [class*="box"]')
    let target = null
    for (const node of candidates) {
      const cls = node.className || ''
      if (cls.includes(el.id) || (el.id === 'headline' && cls.includes('headline')) ||
          (el.id === 'quote' && cls.includes('quote')) || (el.id === 'cta' && cls.includes('cta')) ||
          (el.id === 'box' && cls.includes('box')) || (el.id === 'points' && cls.includes('points')) ||
          (el.id === 'price' && cls.includes('price')) || (el.id === 'logo' && cls.includes('logo')) ||
          (el.id === 'trust' && cls.includes('trust')) || (el.id === 'steps' && cls.includes('steps'))) {
        target = node
        break
      }
    }
    if (!target) return
    const containerRect = container.getBoundingClientRect()
    const elRect = target.getBoundingClientRect()
    const scaleY = canvasHeight / containerRect.height
    const elTop = (elRect.top - containerRect.top) * scaleY
    const elHeight = elRect.height * scaleY
    const currentCentre = elTop + elHeight / 2
    const targetCentre = canvasHeight / 2
    const offsetNeeded = targetCentre - currentCentre
    if (el.props.top) {
      const currentVal = overrides[`${el.id}.top`] ?? 0
      onOverrideChange(`${el.id}.top`, Math.round(currentVal + offsetNeeded))
    } else if (el.props.bottom) {
      const currentVal = overrides[`${el.id}.bottom`] ?? 0
      onOverrideChange(`${el.id}.bottom`, Math.round(currentVal - offsetNeeded))
    }
  }

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
      {(el.props.left || el.props.right || el.props.top || el.props.bottom) && (
        <div className="ea-centre-btns">
          {(el.props.left || el.props.right) && (
            <button className="ea-centre-btn" onClick={centreH}>Centre H</button>
          )}
          {(el.props.top || el.props.bottom) && (
            <button className="ea-centre-btn" onClick={centreV}>Centre V</button>
          )}
        </div>
      )}
    </div>
  )
}

export default function ElementAdjuster({ templateId, overrides, onOverrideChange, adRef, canvasWidth, canvasHeight, overrideHistory }) {
  const elements = ELEMENT_MAPS[templateId]
  const [activeId, setActiveId] = useState(elements?.[0]?.id || '')
  const [pinnedIds, setPinnedIds] = useState([])

  if (!elements) return null

  const activeEl = elements.find(e => e.id === activeId)
  const pinnedEls = elements.filter(e => pinnedIds.includes(e.id))
  const hasAnyOverride = Object.values(overrides).some(v => v !== 0)

  const dropdownOptions = elements.filter(e => !pinnedIds.includes(e.id))

  const pinCurrent = () => {
    if (activeId && !pinnedIds.includes(activeId)) {
      setPinnedIds(prev => [...prev, activeId])
      const remaining = elements.filter(e => !pinnedIds.includes(e.id) && e.id !== activeId)
      if (remaining.length > 0) setActiveId(remaining[0].id)
    }
  }

  const unpin = (id) => {
    setPinnedIds(prev => prev.filter(p => p !== id))
  }

  return (
    <div className="element-adjuster">
      {/* Undo/Redo */}
      {overrideHistory && (
        <div className="ea-undo-redo">
          <button className="ea-undo-btn" onClick={overrideHistory.undo} disabled={!overrideHistory.canUndo} title="Undo">Undo</button>
          <button className="ea-undo-btn" onClick={overrideHistory.redo} disabled={!overrideHistory.canRedo} title="Redo">Redo</button>
        </div>
      )}

      {/* Pinned elements */}
      {pinnedEls.map(el => (
        <ElementControls
          key={el.id}
          el={el}
          overrides={overrides}
          onOverrideChange={onOverrideChange}
          onUnpin={() => unpin(el.id)}
          isPinned={true}
          adRef={adRef}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
        />
      ))}

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
              adRef={adRef}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
            />
          )}

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
