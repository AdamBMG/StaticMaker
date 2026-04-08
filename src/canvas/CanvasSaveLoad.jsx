import { useState, useEffect } from 'react'

function genDesignId() {
  return 'design_' + Date.now()
}

function getIndex() {
  try {
    return JSON.parse(localStorage.getItem('canvas_designs_index') || '[]')
  } catch { return [] }
}

function saveIndex(index) {
  localStorage.setItem('canvas_designs_index', JSON.stringify(index))
}

export default function CanvasSaveLoad({ state, dispatch }) {
  const [designs, setDesigns] = useState(getIndex)
  const [showList, setShowList] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [showSave, setShowSave] = useState(false)

  // Refresh design list when panel opens
  useEffect(() => {
    if (showList) setDesigns(getIndex())
  }, [showList])

  const handleSave = () => {
    if (!saveName.trim()) return
    const id = genDesignId()
    const design = {
      id,
      name: saveName.trim(),
      savedAt: new Date().toISOString(),
      state: {
        format: state.format,
        background: state.background,
        elements: state.elements,
      },
    }
    localStorage.setItem('canvas_design_' + id, JSON.stringify(design))
    const index = [...getIndex(), { id, name: design.name, savedAt: design.savedAt }]
    saveIndex(index)
    setDesigns(index)
    setSaveName('')
    setShowSave(false)
  }

  const handleLoad = (id) => {
    try {
      const design = JSON.parse(localStorage.getItem('canvas_design_' + id))
      if (design?.state) {
        dispatch({ type: 'LOAD_DESIGN', design: design.state })
      }
    } catch { /* ignore */ }
  }

  const handleDelete = (id) => {
    localStorage.removeItem('canvas_design_' + id)
    const index = getIndex().filter(d => d.id !== id)
    saveIndex(index)
    setDesigns(index)
  }

  return (
    <section className="control-section">
      <h2>Designs</h2>
      <div className="save-load-btns">
        <button className="canvas-tool-btn" onClick={() => { setShowSave(!showSave); setShowList(false) }}>
          Save
        </button>
        <button className="canvas-tool-btn" onClick={() => { setShowList(!showList); setShowSave(false) }}>
          Load ({designs.length})
        </button>
      </div>

      {showSave && (
        <div className="save-form">
          <input
            type="text"
            placeholder="Design name..."
            value={saveName}
            onChange={e => setSaveName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            autoFocus
          />
          <button className="save-confirm" onClick={handleSave} disabled={!saveName.trim()}>Save</button>
        </div>
      )}

      {showList && (
        <div className="design-list">
          {designs.length === 0 ? (
            <p style={{ fontSize: 12, color: 'var(--ui-text-muted)' }}>No saved designs</p>
          ) : (
            designs.map(d => (
              <div key={d.id} className="design-item">
                <div className="design-info">
                  <strong>{d.name}</strong>
                  <span>{new Date(d.savedAt).toLocaleDateString()}</span>
                </div>
                <div className="design-actions">
                  <button onClick={() => handleLoad(d.id)}>Load</button>
                  <button className="design-delete" onClick={() => handleDelete(d.id)}>x</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  )
}
