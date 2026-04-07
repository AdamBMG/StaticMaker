import { useState } from 'react'
import './HeadlineGenerator.css'

const HOOK_CATEGORIES = [
  { id: 'curiosity', label: 'Curiosity' },
  { id: 'social_proof', label: 'Social Proof' },
  { id: 'pain', label: 'Pain / Frustration' },
  { id: 'pattern_interrupt', label: 'Pattern Interrupt' },
  { id: 'controversy', label: 'Hot Take' },
  { id: 'direct', label: 'Direct' },
  { id: 'reveal', label: 'Reveal / Result' },
  { id: 'authority', label: 'Authority' },
  { id: 'relatability', label: 'Relatability' },
  { id: 'urgency', label: 'Urgency' },
  { id: 'education', label: 'Education' },
  { id: 'subscription', label: 'Subscription' },
]

const PERSONAS = [
  { id: 'any', label: 'Any / Broad' },
  { id: 'young_professional', label: 'Young Professional' },
  { id: 'parent', label: 'Parent' },
  { id: 'gifter', label: 'Gifter' },
  { id: 'foodie', label: 'Foodie' },
  { id: 'nostalgic', label: 'Nostalgic' },
]

export default function HeadlineGenerator({ onSelectHeadline, onAddAllHeadlines, mode = 'single' }) {
  const [hookCategory, setHookCategory] = useState('curiosity')
  const [persona, setPersona] = useState('any')
  const [headlines, setHeadlines] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generate = async () => {
    setLoading(true)
    setError(null)
    setHeadlines([])

    try {
      const res = await fetch('/api/generate-headlines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hookCategory, persona, count: 10 }),
      })

      const data = await res.json()

      if (data.error) {
        setError(data.error)
      } else {
        setHeadlines(data.headlines || [])
      }
    } catch (err) {
      setError('Failed to connect to server')
    }

    setLoading(false)
  }

  return (
    <div className="headline-gen">
      <div className="hg-controls">
        <label className="hg-label">
          Hook
          <select value={hookCategory} onChange={e => setHookCategory(e.target.value)} className="hg-select">
            {HOOK_CATEGORIES.map(h => (
              <option key={h.id} value={h.id}>{h.label}</option>
            ))}
          </select>
        </label>

        <label className="hg-label">
          Persona
          <select value={persona} onChange={e => setPersona(e.target.value)} className="hg-select">
            {PERSONAS.map(p => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </label>
      </div>

      <button className="hg-generate-btn" onClick={generate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Headlines'}
      </button>

      {error && <div className="hg-error">{error}</div>}

      {headlines.length > 0 && (
        <div className="hg-results">
          {mode === 'batch' && onAddAllHeadlines && (
            <button className="hg-add-all" onClick={() => onAddAllHeadlines(headlines)}>
              Add all {headlines.length} to batch
            </button>
          )}
          <div className="hg-chips">
            {headlines.map((h, i) => (
              <button
                key={i}
                className="hg-chip"
                onClick={() => onSelectHeadline(h)}
                title={mode === 'single' ? 'Click to use this headline' : 'Click to add to batch'}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
