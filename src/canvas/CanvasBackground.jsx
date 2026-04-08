import { BRAND_COLOURS } from './data/brandPalette'

export default function CanvasBackground({ state, dispatch }) {
  const { background } = state

  const setType = (type) => dispatch({ type: 'SET_BACKGROUND', payload: { type, image: null } })
  const setColor = (color) => dispatch({ type: 'SET_BACKGROUND', payload: { color } })
  const setGradientFrom = (gradientFrom) => dispatch({ type: 'SET_BACKGROUND', payload: { gradientFrom } })
  const setGradientTo = (gradientTo) => dispatch({ type: 'SET_BACKGROUND', payload: { gradientTo } })

  return (
    <section className="control-section">
      <h2>Background</h2>
      {background.image && (
        <div className="bg-image-indicator">
          <span>AI background active</span>
          <button onClick={() => dispatch({ type: 'SET_BACKGROUND', payload: { image: null, type: 'solid' } })}>Clear</button>
        </div>
      )}
      <div className="format-toggle" style={{ marginBottom: 12 }}>
        <button className={`format-btn ${background.type === 'solid' && !background.image ? 'active' : ''}`} onClick={() => setType('solid')}>Solid</button>
        <button className={`format-btn ${background.type === 'gradient' ? 'active' : ''}`} onClick={() => setType('gradient')}>Gradient</button>
      </div>

      {background.type === 'solid' ? (
        <>
          <div className="colour-swatches">
            {BRAND_COLOURS.map(c => (
              <button
                key={c.value}
                className={`colour-swatch ${background.color === c.value ? 'active' : ''}`}
                style={{ background: c.value }}
                onClick={() => setColor(c.value)}
                title={c.name}
              />
            ))}
          </div>
          <div className="custom-fields" style={{ marginTop: 8 }}>
            <label>
              Custom
              <input type="text" value={background.color} onChange={e => setColor(e.target.value)} />
            </label>
          </div>
        </>
      ) : (
        <div className="custom-fields">
          <label>
            From
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="color" value={background.gradientFrom} onChange={e => setGradientFrom(e.target.value)} style={{ width: 32, height: 32, padding: 0, border: 'none', cursor: 'pointer' }} />
              <input type="text" value={background.gradientFrom} onChange={e => setGradientFrom(e.target.value)} />
            </div>
          </label>
          <label>
            To
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="color" value={background.gradientTo} onChange={e => setGradientTo(e.target.value)} style={{ width: 32, height: 32, padding: 0, border: 'none', cursor: 'pointer' }} />
              <input type="text" value={background.gradientTo} onChange={e => setGradientTo(e.target.value)} />
            </div>
          </label>
        </div>
      )}
    </section>
  )
}
