import './CountryGrid.css'

// REAL AD: grid fills 70%+, tight gaps, headline at bottom, minimal whitespace
const COUNTRIES = [
  { name: 'Japan', month: 'DEC', image: '/assets/country-boxes/japan-box.png', bg: '#6B2FA0' },
  { name: 'Netherlands', month: 'NOV', image: '/assets/country-boxes/netherlands-box.png', bg: '#FF7A00' },
  { name: 'Italy', month: 'OCT', image: '/assets/country-boxes/italy-box.png', bg: '#6B2FA0' },
  { name: 'Canada', month: 'SEP', image: '/assets/country-boxes/canada-box.png', bg: '#FF7A00' },
  { name: 'Australia', month: 'AUG', image: '/assets/country-boxes/australia-box.png', bg: '#6B2FA0' },
  { name: 'France', month: 'JUL', image: '/assets/country-boxes/france-box.png', bg: '#FF7A00' },
]

export default function CountryGrid({ headline = 'Taste a different country every month.', bgColor = '#FF4040', width, height, format, qcScale = 1.0 }) {
  const isStory = format === 'story'
  const gridCols = isStory ? 2 : 3
  const gridRows = isStory ? 3 : 2

  return (
    <div className="country-grid" style={{ width, height, background: `linear-gradient(180deg, ${bgColor} 0%, ${darken(bgColor, 10)} 100%)` }}>
      {/* Grid: fills from 6% to 82% on square */}
      <div className="cg-grid" style={{
        top: isStory ? 340 : 58,
        bottom: isStory ? 480 : 130,
        padding: isStory ? '0 30px' : '0 12px',
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        gap: isStory ? 8 : 6,
      }}>
        {COUNTRIES.slice(0, gridCols * gridRows).map((country, i) => (
          <div key={i} className="cg-card" style={{ background: country.bg }}>
            <span className="cg-month" style={{ fontSize: isStory ? 14 : 11 }}>{country.month}</span>
            <span className="cg-name" style={{ fontSize: isStory ? 24 : 20 }}>{country.name}</span>
            <img src={country.image} alt={country.name} className="cg-box-img" style={{ width: `${75 * qcScale}%` }} />
          </div>
        ))}
      </div>

      <div className="cg-headline" style={{
        bottom: isStory ? 410 : 20,
        fontSize: isStory ? 54 : 46,
        padding: isStory ? '0 30px' : '0 12px',
      }}>
        {headline}
      </div>
    </div>
  )
}

function darken(hex, percent) {
  if (!hex || hex.length < 4) return hex
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) - Math.round(2.55 * percent)))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) - Math.round(2.55 * percent)))
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) - Math.round(2.55 * percent)))
  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
