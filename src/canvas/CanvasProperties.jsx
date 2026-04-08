import { BRAND_COLOURS, BRAND_FONTS } from './data/brandPalette'

export default function CanvasProperties({ state, dispatch }) {
  const { elements, selectedId } = state
  const el = elements.find(e => e.id === selectedId)

  if (!el) {
    return (
      <section className="control-section">
        <h2>Properties</h2>
        <p style={{ fontSize: 13, color: 'var(--ui-text-muted)' }}>Select an element to edit its properties</p>
      </section>
    )
  }

  const update = (props) => dispatch({ type: 'UPDATE_ELEMENT', id: el.id, props })

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
              {BRAND_COLOURS.map(c => (
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <label>
            X
            <input type="number" value={Math.round(el.x)} onChange={e => update({ x: Number(e.target.value) })} />
          </label>
          <label>
            Y
            <input type="number" value={Math.round(el.y)} onChange={e => update({ y: Number(e.target.value) })} />
          </label>
          <label>
            Width
            <input type="number" value={Math.round(el.width)} onChange={e => update({ width: Number(e.target.value) })} />
          </label>
          <label>
            Height
            <input type="number" value={Math.round(el.height || 0)} onChange={e => update({ height: Number(e.target.value) })} />
          </label>
        </div>

        <label>
          Rotation
          <input type="range" value={el.rotation || 0} onChange={e => update({ rotation: Number(e.target.value) })} min={0} max={360} style={{ width: '100%' }} />
        </label>
      </div>
    </section>
  )
}
