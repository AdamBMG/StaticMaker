import './NumberedSteps.css'

// REAL AD: box left 50%, steps right, both big, headline top-right above steps
const STEPS = [
  { number: '1', label: 'Choose your box' },
  { number: '2', label: 'Subscribe' },
  { number: '3', label: 'Snacks delivered' },
]

export default function NumberedSteps({ headline = "You'll eat these.", bgColor = '#6B2FA0', boxImage = '/assets/boxes/box_mobile.png', width, height, format, qcScale = 1.0, ov = {} }) {
  const isStory = format === 'story'

  return (
    <div className="numbered-steps" style={{ width, height, background: `linear-gradient(160deg, ${bgColor} 0%, ${darken(bgColor, 10)} 100%)` }}>
      <div className="ns-deco ns-deco-1" />
      <div className="ns-deco ns-deco-2" />

      <div className="ns-headline" style={{
        top: (isStory ? 350 : 60) + (ov['headline.top'] || 0), right: (isStory ? 50 : 20) + (ov['headline.right'] || 0),
        fontSize: isStory ? 66 : 54, transform: `scale(${1 + (ov['headline.scale'] || 0) / 100})`, transformOrigin: 'top left', width: isStory ? '52%' : '48%',
      }}>
        {headline}
      </div>

      {/* Box: fills left half, big */}
      <img src={boxImage} alt="SnackVerse Box" className="ns-box" style={{
        left: (isStory ? 0 : -10) + (ov['box.left'] || 0),
        bottom: (isStory ? 400 : 0) + (ov['box.bottom'] || 0),
        top: 'auto',
        height: `${((isStory ? 46 : 70) + (ov['box.height'] || 0)) * qcScale}%`,
      }} />

      {/* Steps: right side, vertically centred in lower half */}
      <div className="ns-steps" style={{
        right: (isStory ? 50 : 20) + (ov['steps.right'] || 0),
        bottom: (isStory ? 440 : 50) + (ov['steps.bottom'] || 0),
        top: 'auto',
        width: isStory ? '48%' : '46%',
        gap: isStory ? 34 : 30,
      }}>
        {STEPS.map((step, i) => (
          <div key={i} className="ns-step">
            <div className="ns-number" style={{ width: isStory ? 56 : 50, height: isStory ? 56 : 50, fontSize: isStory ? 30 : 28 }}>
              {step.number}
            </div>
            <span className="ns-label" style={{ fontSize: isStory ? 30 : 28, transform: `scale(${1 + (ov['steps.scale'] || 0) / 100})`, transformOrigin: 'top left' }}>{step.label}</span>
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
