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
  const logoTop = isStory ? 290 : 36
  const logoBottom = logoTop + logoHeight
  const headlineTop = logoBottom + (isStory ? 20 : 12)

  return (
    <div
      className="numbered-steps"
      style={{
        width,
        height,
        background: `linear-gradient(160deg, ${bgColor} 0%, ${darken(bgColor, 10)} 100%)`,
      }}
    >
      {/* Decorative circles */}
      <div className="ns-deco ns-deco-1" />
      <div className="ns-deco ns-deco-2" />

      {/* Logo top-right */}
      <img
        src="/assets/brand/logo-header.png"
        alt="SnackVerse"
        className="ns-logo"
        style={{
          top: logoTop,
          right: isStory ? 70 : 40,
          height: logoHeight,
          filter: 'brightness(0) invert(1)',
        }}
      />

      {/* Headline - top right, below logo */}
      <div
        className="ns-headline"
        style={{
          top: headlineTop,
          right: isStory ? 70 : 40,
          fontSize: isStory ? 60 : 48,
          width: isStory ? '50%' : '45%',
        }}
      >
        {headline}
      </div>

      {/* Box Image - left side */}
      <img
        src={boxImage}
        alt="SnackVerse Box"
        className="ns-box"
        style={{
          left: isStory ? 20 : 10,
          top: isStory ? 480 : 160,
          height: isStory ? '36%' : '52%',
        }}
      />

      {/* Steps - right side */}
      <div
        className="ns-steps"
        style={{
          right: isStory ? 70 : 40,
          top: isStory ? 580 : 260,
          width: isStory ? '50%' : '45%',
          gap: isStory ? 26 : 20,
        }}
      >
        {STEPS.map((step, i) => (
          <div key={i} className="ns-step">
            <div
              className="ns-number"
              style={{
                width: isStory ? 48 : 40,
                height: isStory ? 48 : 40,
                fontSize: isStory ? 24 : 20,
              }}
            >
              {step.number}
            </div>
            <span
              className="ns-label"
              style={{ fontSize: isStory ? 24 : 20 }}
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
