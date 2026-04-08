import { useState } from 'react'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

export default function CanvasExport({ stageRef, state, dispatch, format }) {
  const [exporting, setExporting] = useState(false)
  const [showBatch, setShowBatch] = useState(false)
  const [batchHeadlines, setBatchHeadlines] = useState('')
  const [batchTarget, setBatchTarget] = useState('')

  const textElements = (state?.elements || []).filter(e => e.type === 'text')

  const handleExport = async () => {
    if (!stageRef.current) return
    setExporting(true)
    try {
      await document.fonts.ready
      const dataUrl = stageRef.current.toDataURL({ pixelRatio: 1, mimeType: 'image/png' })
      const name = `snackverse_canvas_${format}_${Date.now()}.png`
      saveAs(dataUrl, name)
    } catch (err) {
      console.error('Canvas export failed:', err)
    }
    setExporting(false)
  }

  const handleBatchExport = async () => {
    if (!stageRef.current || !batchTarget || !dispatch) return
    const headlines = batchHeadlines.split('\n').map(h => h.trim()).filter(Boolean)
    if (headlines.length === 0) return

    setExporting(true)
    try {
      await document.fonts.ready
      const targetEl = state.elements.find(e => e.id === batchTarget)
      if (!targetEl) return

      const originalText = targetEl.text
      const zip = new JSZip()

      for (let i = 0; i < headlines.length; i++) {
        dispatch({ type: 'UPDATE_ELEMENT', id: batchTarget, props: { text: headlines[i] } })
        // Wait for render
        await new Promise(r => requestAnimationFrame(() => setTimeout(r, 100)))
        const dataUrl = stageRef.current.toDataURL({ pixelRatio: 1, mimeType: 'image/png' })
        const base64 = dataUrl.split(',')[1]
        zip.file(`canvas_${format}_${i + 1}.png`, base64, { base64: true })
      }

      // Restore original text
      dispatch({ type: 'UPDATE_ELEMENT', id: batchTarget, props: { text: originalText } })

      const blob = await zip.generateAsync({ type: 'blob' })
      saveAs(blob, `canvas_batch_${format}_${Date.now()}.zip`)
    } catch (err) {
      console.error('Batch export failed:', err)
    }
    setExporting(false)
  }

  return (
    <section className="control-section export-section">
      <button className="export-btn" onClick={handleExport} disabled={exporting}>
        {exporting ? 'Exporting...' : 'Export PNG'}
      </button>
      <button className="export-all-btn" onClick={() => setShowBatch(!showBatch)}>
        {showBatch ? 'Hide Batch' : 'Batch Export'}
      </button>

      {showBatch && (
        <div className="batch-export-panel">
          {textElements.length === 0 ? (
            <p style={{ fontSize: 12, color: 'var(--ui-text-muted)' }}>Add a text element first</p>
          ) : (
            <>
              <label style={{ fontSize: 12, color: 'var(--ui-text-muted)' }}>
                Swap text in:
                <select
                  value={batchTarget}
                  onChange={e => setBatchTarget(e.target.value)}
                  style={{ width: '100%', marginTop: 4, padding: '6px 8px', border: '1px solid var(--ui-border)', borderRadius: 6, background: 'rgba(0,0,0,0.3)', color: 'var(--ui-text)', fontFamily: 'inherit', fontSize: 12 }}
                >
                  <option value="">Select element...</option>
                  {textElements.map(el => (
                    <option key={el.id} value={el.id}>{el.text.slice(0, 30)}</option>
                  ))}
                </select>
              </label>
              <label style={{ fontSize: 12, color: 'var(--ui-text-muted)', marginTop: 8 }}>
                Headlines (one per line):
                <textarea
                  value={batchHeadlines}
                  onChange={e => setBatchHeadlines(e.target.value)}
                  rows={5}
                  placeholder="Worldwide snacks.&#10;New snacks. Monthly.&#10;From 7.99"
                  style={{ width: '100%', marginTop: 4, padding: '8px', border: '1px solid var(--ui-border)', borderRadius: 6, background: 'rgba(0,0,0,0.3)', color: 'var(--ui-text)', fontFamily: 'inherit', fontSize: 12, resize: 'vertical' }}
                />
              </label>
              <button
                className="export-btn"
                onClick={handleBatchExport}
                disabled={exporting || !batchTarget || !batchHeadlines.trim()}
                style={{ marginTop: 8 }}
              >
                {exporting ? 'Exporting...' : `Export ${batchHeadlines.split('\n').filter(h => h.trim()).length} variants as ZIP`}
              </button>
            </>
          )}
        </div>
      )}
    </section>
  )
}
