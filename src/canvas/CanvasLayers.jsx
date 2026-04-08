export default function CanvasLayers({ state, dispatch }) {
  const { elements, selectedId } = state
  const reversed = [...elements].reverse()

  return (
    <section className="control-section">
      <h2>Layers</h2>
      {reversed.length === 0 ? (
        <p style={{ fontSize: 13, color: 'var(--ui-text-muted)' }}>No elements yet</p>
      ) : (
        <div className="layers-list">
          {reversed.map(el => {
            const isSelected = el.id === selectedId
            const icon = el.type === 'text' ? 'T' : el.type === 'rect' ? '\u25A0' : '\u25CF'
            const label = el.type === 'text' ? (el.text.slice(0, 24) + (el.text.length > 24 ? '...' : '')) : el.type
            return (
              <div
                key={el.id}
                className={`layer-item ${isSelected ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'SELECT_ELEMENT', id: el.id })}
              >
                <span className="layer-icon" style={{ color: el.fill }}>{icon}</span>
                <span className="layer-label">{label}</span>
                {isSelected && (
                  <div className="layer-actions">
                    <button title="Move up" onClick={e => { e.stopPropagation(); dispatch({ type: 'MOVE_LAYER_UP', id: el.id }) }}>{'\u2191'}</button>
                    <button title="Move down" onClick={e => { e.stopPropagation(); dispatch({ type: 'MOVE_LAYER_DOWN', id: el.id }) }}>{'\u2193'}</button>
                    <button title="Delete" onClick={e => { e.stopPropagation(); dispatch({ type: 'DELETE_ELEMENT', id: el.id }) }}>{'\u2715'}</button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
