import './NumberedSteps.css'

// QC BENCHMARK: 35%+ product coverage, <15% whitespace, box bottom-left, steps right
const STEPS = [
  { number: '1', label: 'Choose your box' },
  { number: '2', label: 'Subscribe' },
  { number: '3', label: 'Snacks delivered' },
]

export default function NumberedSteps({ headline = "You'll eat these.", bgColor = '#6B2FA0', boxImage = '/assets/boxes/box_mobile.png', width, height, format, qcScale = 1.0 }) {
  const isStory = format === 'story'
  const logoHeight = isStory ? 44 : 34
  const logoTop = isStory ? 290 : 24
  const logoBottom = logoTop + logoHeight
  const headlineTop = logoBottom + (isStory ? 10 : 4)

  return (
    <div className="numbered-steps" style={{ width, height, background: `linear-gradient(160deg, ${bgColor} 0%, ${darken(bgColor, 10)} 100%)` }}>
      <div className="ns-deco ns-deco-1" />
      <div className="ns-deco ns-deco-2" />

      <img src="/assets/brand/logo-header.png" alt="SnackVerse" className="ns-logo"
        style={{ top: logoTop, right: isStory ? 60 : 24, height: logoHeight, filter: 'brightness(0) invert(1)' }} />

      <div className="ns-headline" style={{
        top: headlineTop, right: isStory ? 60 : 24,
        fontSize: isStory ? 64 : 52, width: isStory ? '52%' : '48%',
      }}>
        {headline}
      </div>

      {/* Box bottom-left, big */}
      <img src={boxImage} alt="SnackVerse Box" className="ns-box" style={{
        left: isStory ? 10 : 0,
        bottom: isStory ? 400 : 10,
        top: 'auto',
        height: `${(isStory ? 44 : 65) * qcScale}%`,
      }} />

      {/* Steps right, bigger text */}
      <div className="ns-steps" style={{
        right: isStory ? 60 : 24,
        bottom: isStory ? 440 : 60,
        top: 'auto',
        width: isStory ? '48%' : '44%',
        gap: isStory ? 30 : 26,
      }}>
        {STEPS.map((step, i) => (
          <div key={i} className="ns-step">
            <div className="ns-number" style={{ width: isStory ? 54 : 46, height: isStory ? 54 : 46, fontSize: isStory ? 28 : 24 }}>
              {step.number}
            </div>
            <span className="ns-label" style={{ fontSize: isStory ? 28 : 24 }}>{step.label}</span>
          </div>
        ))}
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
