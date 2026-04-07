import { useState } from 'react'
import './BackgroundGenerator.css'

const COUNTRIES = [
  'Japan', 'South Korea', 'Canada', 'USA', 'Italy', 'France',
  'Germany', 'Spain', 'Australia', 'Netherlands', 'Greece', 'Mexico',
  'Denmark', 'Finland', 'Austria', 'Belgium', 'Hungary', 'Philippines',
]

const STYLES = [
  { id: 'illustrated', label: 'Illustrated' },
  { id: 'gradient', label: 'Gradient' },
]

export default function BackgroundGenerator({ format, onBackgroundGenerated }) {
  const [country, setCountry] = useState('Japan')
  const [style, setStyle] = useState('illustrated')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generate = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/generate-background', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, style, format }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else if (data.image) {
        onBackgroundGenerated(data.image)
      }
    } catch (err) {
      setError('Failed to connect to server')
    }
    setLoading(false)
  }

  return (
    <div className="bg-gen">
      <div className="bg-gen-row">
        <select className="bg-gen-select" value={country} onChange={e => setCountry(e.target.value)}>
          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="bg-gen-select" value={style} onChange={e => setStyle(e.target.value)}>
          {STYLES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>
      <button className="bg-gen-btn" onClick={generate} disabled={loading}>
        {loading ? 'Generating background...' : 'Generate Background'}
      </button>
      {error && <div className="bg-gen-error">{error}</div>}
    </div>
  )
}
