import './BoxHero.css'

export default function BoxHero({ headline, bgColor, textColor, boxImage, showLogo, width, height, format }) {
  const isStory = format === 'story'

  // Gradient background - lighter at top, darker at bottom (matches real ads)
  const bgGradient = `linear-gradient(180deg, ${bgColor} 0%, ${adjustBrightness(bgColor, -15)} 100%)`

  // Logo takes fixed space at top. Headline always starts below it.
  const logoHeight = isStory ? 56 : 44
  const logoTop = isStory ? 290 : 36
  const logoBottom = logoTop + logoHeight
  const headlineTop = showLogo ? logoBottom + (isStory ? 24 : 16) : (isStory ? 290 : 36)

  return (
    <div
      className="box-hero"
      style={{
        width,
        height,
        background: bgGradient,
      }}
    >
      {/* Decorative circles */}
      <div className="bh-circle bh-circle-1" style={{ opacity: 0.1 }} />
      <div className="bh-circle bh-circle-2" style={{ opacity: 0.07 }} />

      {/* Logo - fixed position, headline always starts below */}
      {showLogo && (
        <img
          src="/assets/brand/logo-header.png"
          alt="SnackVerse"
          className="bh-logo"
          style={{
            top: logoTop,
            left: isStory ? 70 : 44,
            height: logoHeight,
          }}
        />
      )}

      {/* Headline - always below the logo, never overlapping */}
      <div
        className="bh-headline"
        style={{
          color: textColor,
          top: headlineTop,
          fontSize: isStory ? 110 : 86,
          padding: isStory ? '0 70px' : '0 44px',
          maxWidth: '100%',
        }}
      >
        {headline}
      </div>

      {/* Product Box - large, centred, dominant */}
      <img
        src={boxImage}
        alt="SnackVerse Box"
        className="bh-box-image"
        style={{
          bottom: isStory ? 400 : -20,
          height: isStory ? '52%' : '65%',
          maxWidth: '92%',
        }}
      />
    </div>
  )
}

// Darken/lighten a hex colour
function adjustBrightness(hex, percent) {
  if (!hex || hex.length < 4) return hex
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(2.55 * percent)))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(2.55 * percent)))
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(2.55 * percent)))
  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
