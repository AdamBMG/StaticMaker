import { useState, useEffect } from 'react'
import { CLIENTS } from './clients'
import './ClientSelector.css'

function getRecentDesigns() {
  try {
    const index = JSON.parse(localStorage.getItem('canvas_designs_index') || '[]')
    return index.slice(-4).reverse()
  } catch { return [] }
}

export default function ClientSelector({ onSelect }) {
  const [recentDesigns, setRecentDesigns] = useState([])

  useEffect(() => {
    setRecentDesigns(getRecentDesigns())
  }, [])

  return (
    <div className="selector-page">
      <div className="selector-content">
        <img src="/assets/brand/bmg-header.png" alt="BMG" className="selector-logo" />
        <h1 className="selector-title">Static Ad Maker</h1>
        <p className="selector-subtitle">Select a client</p>
        <div className="client-grid">
          {CLIENTS.map(client => (
            <button
              key={client.id}
              className={`client-card ${client.status === 'coming-soon' ? 'coming-soon' : ''}`}
              onClick={() => client.status === 'active' && onSelect(client.id)}
              style={{ '--card-accent': client.accentColor }}
            >
              <div className="client-card-thumb">
                {client.thumbnail ? (
                  <img src={client.thumbnail} alt={client.name} />
                ) : (
                  <span className="client-card-letter">{client.name[0]}</span>
                )}
              </div>
              <strong className="client-card-name">{client.name}</strong>
              <span className="client-card-desc">{client.description}</span>
              {client.status === 'coming-soon' && (
                <span className="client-card-badge">Coming Soon</span>
              )}
            </button>
          ))}
        </div>
        {recentDesigns.length > 0 && (
          <div className="recent-designs">
            <p className="recent-title">Recent Designs</p>
            <div className="recent-list">
              {recentDesigns.map(d => (
                <div key={d.id} className="recent-item">
                  <span className="recent-name">{d.name}</span>
                  <span className="recent-date">{new Date(d.savedAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
