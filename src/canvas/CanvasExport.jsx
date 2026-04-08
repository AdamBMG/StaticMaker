import { useState } from 'react'
import { saveAs } from 'file-saver'

export default function CanvasExport({ stageRef, format }) {
  const [exporting, setExporting] = useState(false)

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

  return (
    <section className="control-section export-section">
      <button className="export-btn" onClick={handleExport} disabled={exporting}>
        {exporting ? 'Exporting...' : 'Export PNG'}
      </button>
    </section>
  )
}
