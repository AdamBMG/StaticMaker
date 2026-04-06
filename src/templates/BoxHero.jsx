import './BoxHero.css'

export default function BoxHero({ headline, bgColor, textColor, boxImage, showLogo, width, height, format }) {
  const isStory = format === 'story'

  const bgGradient = `linear-gradient(180deg, ${bgColor} 0%, ${adjustBrightness(bgColor, -15)} 100%)`

  const logoHeight = isStory ? 56 : 44
  const logoTop = isStory ? 290 : 30
  const logoBottom = logoTop + logoHeight
  const headlineTop = showLogo ? logoBottom + (isStory ? 16 : 8) : (isStory ? 290 : 30)

  return (
    <div
      className="box-hero"
      style={{
        width,
        height,
        background: bgGradient,
      }}
    >
      <div className="bh-circle bh-circle-1" style={{ opacity: 0.1 }} />
      <div className="bh-circle bh-circle-2" style={{ opacity: 0.07 }} />

      {showLogo && (
        <img
          src="/assets/brand/logo-header.png"
          alt="SnackVerse"
          className="bh-logo"
          style={{
            top: logoTop,
            left: isStory ? 60 : 36,
            height: logoHeight,
          }}
        />
      )}

      <div
        className="bh-headline"
        style={{
          color: textColor,
          top: headlineTop,
          fontSize: isStory ? 120 : 100,
          padding: isStory ? '0 60px' : '0 36px',
          maxWidth: '100%',
        }}
      >
        {headline}
      </div>

      <img
        src={boxImage}
        alt="SnackVerse Box"
        className="bh-box-image"
        style={{
          bottom: isStory ? 380 : -40,
          height: isStory ? '55%' : '75%',
          maxWidth: '95%',
        }}
      />
    </div>
  )
}

function adjustBrightness(hex, percent) {
  if (!hex || hex.length < 4) return hex
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(2.55 * percent)))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(2.55 * percent)))
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(2.55 * percent)))
  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
