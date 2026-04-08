import { useState } from 'react'
import { BRAND_COLOURS, BRAND_FONTS } from './data/brandPalette'

function NudgeControl({ label, value, step, onChange }) {
  return (
    <div className="ea-prop">
      <span className="ea-prop-label">{label}</span>
      <button className="ea-btn" onClick={() => onChange(value - step)}>-</button>
      <span className="ea-value">{Math.round(value)}</span>
      <button className="ea-btn" onClick={() => onChange(value + step)}>+</button>
    </div>
  )
}

export default function CanvasProperties({ state, dispatch, palette }) {
  const colours = palette || BRAND_COLOURS
  const { elements, selectedId } = state
  const el = elements.find(e => e.id === selectedId)
  const [lockRatio, setLockRatio] = useState(true)

  if (!el) {
    return (
      <section className="control-section">
        <h2>Properties</h2>
        <p style={{ fontSize: 13, color: 'var(--ui-text-muted)' }}>Select an element to edit its properties</p>
      </section>
    )
  }

  const update = (props) => dispatch({ type: 'UPDATE_ELEMENT', id: el.id, props })

  const aspectRatio = (el.width && el.height) ? el.width / el.height : 1

  const handleScale = (newScale) => {
    const s = Math.max(0.1, Math.min(3, newScale))
    const baseW = el._baseWidth || el.width
    const baseH = el._baseHeight || el.height
    update({
      width: Math.round(baseW * s),
      height: Math.round(baseH * s),
      _baseWidth: baseW,
      _baseHeight: baseH,
      _scale: s,
    })
  }

  const currentScale = el._scale || 1

  const handleWidthChange = (w) => {
    if (lockRatio && el.height) {
      update({ width: w, height: Math.round(w / aspectRatio) })
    } else {
      update({ width: w })
    }
  }

  const handleHeightChange = (h) => {
    if (lockRatio && el.width) {
      update({ height: h, width: Math.round(h * aspectRatio) })
    } else {
      update({ height: h })
    }
  }

  return (
    <section className="control-section">
      <h2>Properties - {el.type}</h2>
      <div className="custom-fields">
        {el.type === 'text' && (
          <>
            <label>
              Text
              <textarea
                value={el.text}
                onChange={e => update({ text: e.target.value })}
                rows={3}
                style={{ padding: '8px 10px', border: '1px solid var(--ui-border)', borderRadius: 6, background: 'rgba(0,0,0,0.3)', color: 'var(--ui-text)', fontFamily: 'inherit', fontSize: 13, resize: 'vertical' }}
              />
            </label>
            <label>
              Font
              <select value={el.fontFamily} onChange={e => update({ fontFamily: e.target.value })} style={{ padding: '8px 10px', border: '1px solid var(--ui-border)', borderRadius: 6, background: 'rgba(0,0,0,0.3)', color: 'var(--ui-text)', fontFamily: 'inherit', fontSize: 13 }}>
                {BRAND_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </label>
            <label>
              Font Size
              <input type="number" value={el.fontSize} onChange={e => update({ fontSize: Number(e.target.value) })} min={8} max={400} />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <label>
                Stroke Colour
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input type="color" value={el.stroke || '#000000'} onChange={e => update({ stroke: e.target.value })} style={{ width: 28, height: 28, padding: 0, border: 'none', cursor: 'pointer' }} />
                  <input type="text" value={el.stroke || ''} onChange={e => update({ stroke: e.target.value })} placeholder="none" style={{ flex: 1, padding: '6px 8px', border: '1px solid var(--ui-border)', borderRadius: 6, background: 'rgba(0,0,0,0.3)', color: 'var(--ui-text)', fontFamily: 'inherit', fontSize: 12 }} />
                </div>
              </label>
              <label>
                Stroke Width
                <input type="number" value={el.strokeWidth || 0} onChange={e => update({ strokeWidth: Number(e.target.value) })} min={0} max={20} />
              </label>
            </div>
            <label>
              Alignment
              <div className="format-toggle">
                {['left', 'center', 'right'].map(a => (
                  <button key={a} className={`format-btn ${el.align === a ? 'active' : ''}`} onClick={() => update({ align: a })}>{a}</button>
                ))}
              </div>
            </label>
          </>
        )}

        {/* Colour - text and shapes only */}
        {el.type !== 'image' && <label>Colour</label>}
        {el.type !== 'image' && (
          <>
            <div className="colour-swatches">
              {colours.map(c => (
                <button
                  key={c.value}
                  className={`colour-swatch ${el.fill === c.value ? 'active' : ''}`}
                  style={{ background: c.value }}
                  onClick={() => update({ fill: c.value })}
                  title={c.name}
                />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
              <input type="color" value={el.fill} onChange={e => update({ fill: e.target.value })} style={{ width: 32, height: 32, padding: 0, border: 'none', cursor: 'pointer' }} />
              <input type="text" value={el.fill} onChange={e => update({ fill: e.target.value })} style={{ flex: 1, padding: '8px 10px', border: '1px solid var(--ui-border)', borderRadius: 6, background: 'rgba(0,0,0,0.3)', color: 'var(--ui-text)', fontFamily: 'inherit', fontSize: 13 }} />
            </div>
          </>
        )}

        {el.type === 'rect' && (
          <label>
            Corner Radius
            <input type="number" value={el.cornerRadius || 0} onChange={e => update({ cornerRadius: Number(e.target.value) })} min={0} max={500} />
          </label>
        )}

        <label>
          Opacity
          <input type="range" value={el.opacity} onChange={e => update({ opacity: Number(e.target.value) })} min={0} max={1} step={0.05} style={{ width: '100%' }} />
        </label>

        {/* Position - nudge style */}
        <div className="ea-element" style={{ marginTop: 8 }}>
          <div className="ea-element-header">
            <span className="ea-label">Position</span>
            <button
              className="centre-btn"
              onClick={() => {
                const elW = el.width || 0
                const elH = el.height || 0
                update({
                  x: Math.round((state.canvasWidth - elW) / 2),
                  y: Math.round((state.canvasHeight - elH) / 2),
                })
              }}
            >
              Centre
            </button>
          </div>
          <div className="ea-controls">
            <NudgeControl label="Y pos" value={el.y} step={10} onChange={v => update({ y: v })} />
            <NudgeControl label="X pos" value={el.x} step={10} onChange={v => update({ x: v })} />
          </div>
        </div>

        {/* Size - nudge style with lock + slider */}
        <div className="ea-element">
          <div className="ea-element-header">
            <span className="ea-label">Size</span>
            <label className="lock-toggle">
              <input
                type="checkbox"
                checked={lockRatio}
                onChange={e => setLockRatio(e.target.checked)}
              />
              <span className="lock-icon">{lockRatio ? '\uD83D\uDD12' : '\uD83D\uDD13'}</span>
              Lock
            </label>
          </div>
          <div className="ea-controls">
            <NudgeControl label="Width" value={el.width} step={10} onChange={v => handleWidthChange(Math.max(10, v))} />
            {el.type !== 'text' && (
              <NudgeControl label="Height" value={el.height || 0} step={10} onChange={v => handleHeightChange(Math.max(10, v))} />
            )}
          </div>
          <div style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, color: 'var(--ui-text-muted)' }}>
              <span>Scale</span>
              <input
                type="range"
                value={currentScale}
                onChange={e => handleScale(Number(e.target.value))}
                min={0.1}
                max={3}
                step={0.05}
                style={{ flex: 1 }}
              />
              <span style={{ fontFamily: 'monospace', width: 40, textAlign: 'right' }}>{Math.round(currentScale * 100)}%</span>
            </div>
          </div>
        </div>

        <div className="ea-element">
          <div className="ea-element-header">
            <span className="ea-label">Rotation</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, color: 'var(--ui-text-muted)' }}>
            <input
              type="range"
              value={el.rotation || 0}
              onChange={e => update({ rotation: Number(e.target.value) })}
              min={0}
              max={360}
              style={{ flex: 1 }}
            />
            <span style={{ fontFamily: 'monospace', width: 30, textAlign: 'right' }}>{Math.round(el.rotation || 0)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
