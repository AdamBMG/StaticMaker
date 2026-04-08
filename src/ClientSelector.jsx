import { CLIENTS } from './clients'
import './ClientSelector.css'

export default function ClientSelector({ onSelect }) {
  return (
    <div className="selector-page">
      <div className="selector-content">
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
      </div>
    </div>
  )
}
