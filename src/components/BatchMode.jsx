import { useState } from 'react'
import HeadlineGenerator from './HeadlineGenerator'
import './BatchMode.css'

const COLOUR_OPTIONS = [
  { label: 'Orange', bg: '#FF7A00', text: '#FFFFFF' },
  { label: 'Purple', bg: '#6B2FA0', text: '#FFD700' },
  { label: 'Yellow', bg: '#FFD700', text: '#E02020' },
  { label: 'Red', bg: '#E02020', text: '#FFFFFF' },
  { label: 'Pink', bg: '#FFD6D6', text: '#6B2FA0' },
]

const TEMPLATE_OPTIONS = [
  { id: 'box-hero', label: 'Box Hero' },
  { id: 'feature-points', label: 'Feature Points' },
  { id: 'testimonial', label: 'Testimonial' },
  { id: 'typo-wallpaper', label: 'Typographic Wallpaper' },
  { id: 'numbered-steps', label: 'Numbered Steps' },
  { id: 'starter-pack', label: 'Starter Pack' },
]

const FORMAT_OPTIONS = [
  { id: 'square', label: '1080x1080' },
  { id: 'story', label: '1080x1920' },
  { id: 'both', label: 'Both' },
]

export default function BatchMode({ onGenerate }) {
  const [headlines, setHeadlines] = useState('')
  const [selectedTemplates, setSelectedTemplates] = useState(['box-hero'])
  const [selectedColours, setSelectedColours] = useState([0])
  const [selectedFormat, setSelectedFormat] = useState('both')
  const [batchName, setBatchName] = useState('')

  const headlineList = headlines.split('\n').map(h => h.trim()).filter(Boolean)
  const formatCount = selectedFormat === 'both' ? 2 : 1
  const totalAds = headlineList.length * selectedTemplates.length * selectedColours.length * formatCount

  const toggleTemplate = (id) => {
    setSelectedTemplates(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const toggleColour = (idx) => {
    setSelectedColours(prev =>
      prev.includes(idx) ? prev.filter(c => c !== idx) : [...prev, idx]
    )
  }

  const handleGenerate = () => {
    if (headlineList.length === 0 || selectedTemplates.length === 0 || selectedColours.length === 0) return

    const ads = []
    let conceptNum = 1

    headlineList.forEach((headline, hi) => {
      let varNum = 1
      selectedTemplates.forEach(templateId => {
        selectedColours.forEach(colourIdx => {
          const colour = COLOUR_OPTIONS[colourIdx]
          const formats = selectedFormat === 'both' ? ['square', 'story'] : [selectedFormat]

          formats.forEach(fmt => {
            ads.push({
              id: `${conceptNum}.${varNum}`,
              headline,
              templateId,
              bgColor: colour.bg,
              textColor: colour.text,
              format: fmt,
              batchName: batchName || 'batch',
              fileName: `${batchName || 'batch'}_${conceptNum}.${varNum}_${fmt}`,
            })
            varNum++
          })
        })
      })
      conceptNum++
    })

    onGenerate(ads)
  }

  return (
    <div className="batch-mode">
      <section className="batch-section">
        <h2>AI Generate</h2>
        <HeadlineGenerator
          mode="batch"
          onSelectHeadline={(h) => setHeadlines(prev => prev ? prev + '\n' + h : h)}
          onAddAllHeadlines={(hs) => setHeadlines(prev => prev ? prev + '\n' + hs.join('\n') : hs.join('\n'))}
        />
      </section>

      <section className="batch-section">
        <h2>Headlines</h2>
        <textarea
          className="batch-headlines"
          placeholder={"Paste headlines here, one per line:\n\nWorldwide snacks.\nDid nothing, snacks arrived.\nFrom £7.99"}
          value={headlines}
          onChange={e => setHeadlines(e.target.value)}
          rows={6}
        />
        <span className="batch-count">{headlineList.length} headline{headlineList.length !== 1 ? 's' : ''}</span>
      </section>

      <section className="batch-section">
        <h2>Templates</h2>
        <div className="batch-checkboxes">
          {TEMPLATE_OPTIONS.map(t => (
            <label key={t.id} className={`batch-checkbox ${selectedTemplates.includes(t.id) ? 'active' : ''}`}>
              <input
                type="checkbox"
                checked={selectedTemplates.includes(t.id)}
                onChange={() => toggleTemplate(t.id)}
              />
              {t.label}
            </label>
          ))}
        </div>
      </section>

      <section className="batch-section">
        <h2>Colours</h2>
        <div className="batch-checkboxes">
          {COLOUR_OPTIONS.map((c, i) => (
            <label key={i} className={`batch-checkbox ${selectedColours.includes(i) ? 'active' : ''}`}>
              <input
                type="checkbox"
                checked={selectedColours.includes(i)}
                onChange={() => toggleColour(i)}
              />
              <span className="batch-swatch" style={{ background: c.bg }} />
              {c.label}
            </label>
          ))}
        </div>
      </section>

      <section className="batch-section">
        <h2>Format</h2>
        <div className="batch-formats">
          {FORMAT_OPTIONS.map(f => (
            <button
              key={f.id}
              className={`batch-format-btn ${selectedFormat === f.id ? 'active' : ''}`}
              onClick={() => setSelectedFormat(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="batch-section">
        <h2>Batch Name</h2>
        <input
          className="batch-name-input"
          type="text"
          placeholder="e.g. 27W25"
          value={batchName}
          onChange={e => setBatchName(e.target.value)}
        />
      </section>

      <div className="batch-summary">
        {totalAds > 0 ? (
          <span>{totalAds} ads will be generated</span>
        ) : (
          <span className="batch-empty">Add headlines and select options</span>
        )}
      </div>

      <button
        className="batch-generate-btn"
        onClick={handleGenerate}
        disabled={totalAds === 0}
      >
        Generate {totalAds} Ads
      </button>
    </div>
  )
}

export { COLOUR_OPTIONS, TEMPLATE_OPTIONS }
