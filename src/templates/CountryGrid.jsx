import './CountryGrid.css'

const COUNTRIES = [
  { name: 'Japan', month: 'DEC', image: '/assets/country-boxes/japan-box.png', bg: '#6B2FA0' },
  { name: 'Netherlands', month: 'NOV', image: '/assets/country-boxes/netherlands-box.png', bg: '#FF7A00' },
  { name: 'Italy', month: 'OCT', image: '/assets/country-boxes/italy-box.png', bg: '#6B2FA0' },
  { name: 'Canada', month: 'SEP', image: '/assets/country-boxes/canada-box.png', bg: '#FF7A00' },
  { name: 'Australia', month: 'AUG', image: '/assets/country-boxes/australia-box.png', bg: '#6B2FA0' },
  { name: 'France', month: 'JUL', image: '/assets/country-boxes/france-box.png', bg: '#FF7A00' },
]

export default function CountryGrid({
  headline = 'Taste a different country every month.',
  bgColor = '#FF4040',
  width,
  height,
  format,
}) {
  const isStory = format === 'story'
  const gridCols = isStory ? 2 : 3
  const gridRows = isStory ? 3 : 2

  const logoHeight = isStory ? 44 : 36
  const logoTop = isStory ? 290 : 36

  return (
    <div
      className="country-grid"
      style={{
        width,
        height,
        background: `linear-gradient(180deg, ${bgColor} 0%, ${darken(bgColor, 10)} 100%)`,
      }}
    >
      {/* Logo top-left */}
      <img
        src="/assets/brand/logo-header.png"
        alt="SnackVerse"
        className="cg-logo"
        style={{
          top: logoTop,
          left: isStory ? 50 : 40,
          height: logoHeight,
          filter: 'brightness(0) invert(1)',
        }}
      />

      {/* Grid of country cards */}
      <div
        className="cg-grid"
        style={{
          top: isStory ? 360 : 90,
          padding: isStory ? '0 50px' : '0 36px',
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
          gap: isStory ? 14 : 12,
          bottom: isStory ? 520 : 200,
        }}
      >
        {COUNTRIES.slice(0, gridCols * gridRows).map((country, i) => (
          <div
            key={i}
            className="cg-card"
            style={{ background: country.bg }}
          >
            <span className="cg-month" style={{ fontSize: isStory ? 13 : 10 }}>
              {country.month}
            </span>
            <span className="cg-name" style={{ fontSize: isStory ? 20 : 16 }}>
              {country.name}
            </span>
            <img src={country.image} alt={country.name} className="cg-box-img" />
          </div>
        ))}
      </div>

      {/* Headline at bottom */}
      <div
        className="cg-headline"
        style={{
          bottom: isStory ? 420 : 60,
          fontSize: isStory ? 48 : 40,
          padding: isStory ? '0 50px' : '0 36px',
        }}
      >
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
