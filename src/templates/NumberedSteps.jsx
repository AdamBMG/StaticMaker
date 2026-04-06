import './NumberedSteps.css'

const STEPS = [
  { number: '1', label: 'Choose your box' },
  { number: '2', label: 'Subscribe' },
  { number: '3', label: 'Snacks delivered' },
]

export default function NumberedSteps({
  headline = "You'll eat these.",
  bgColor = '#6B2FA0',
  boxImage = '/assets/boxes/box_mobile.png',
  width,
  height,
  format,
}) {
  const isStory = format === 'story'

  const logoHeight = isStory ? 44 : 36
  const logoTop = isStory ? 290 : 28
  const logoBottom = logoTop + logoHeight
  const headlineTop = logoBottom + (isStory ? 14 : 6)

  return (
    <div
      className="numbered-steps"
      style={{
        width,
        height,
        background: `linear-gradient(160deg, ${bgColor} 0%, ${darken(bgColor, 10)} 100%)`,
      }}
    >
      <div className="ns-deco ns-deco-1" />
      <div className="ns-deco ns-deco-2" />

      <img
        src="/assets/brand/logo-header.png"
        alt="SnackVerse"
        className="ns-logo"
        style={{
          top: logoTop,
          right: isStory ? 60 : 30,
          height: logoHeight,
          filter: 'brightness(0) invert(1)',
        }}
      />

      <div
        className="ns-headline"
        style={{
          top: headlineTop,
          right: isStory ? 60 : 30,
          fontSize: isStory ? 68 : 56,
          width: isStory ? '52%' : '48%',
        }}
      >
        {headline}
      </div>

      <img
        src={boxImage}
        alt="SnackVerse Box"
        className="ns-box"
        style={{
          left: isStory ? 10 : -10,
          top: isStory ? 460 : 140,
          height: isStory ? '40%' : '60%',
        }}
      />

      <div
        className="ns-steps"
        style={{
          right: isStory ? 60 : 30,
          top: isStory ? 560 : 240,
          width: isStory ? '52%' : '48%',
          gap: isStory ? 28 : 24,
        }}
      >
        {STEPS.map((step, i) => (
          <div key={i} className="ns-step">
            <div
              className="ns-number"
              style={{
                width: isStory ? 52 : 44,
                height: isStory ? 52 : 44,
                fontSize: isStory ? 28 : 24,
              }}
            >
              {step.number}
            </div>
            <span
              className="ns-label"
              style={{ fontSize: isStory ? 28 : 24 }}
            >
              {step.label}
            </span>
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
