import './FeaturePoints.css'

export default function FeaturePoints({
  headline,
  point1,
  point2,
  point3,
  bgColor,
  textColor = '#FFFFFF',
  accentColor = '#FFD700',
  boxImage,
  width,
  height,
  format,
}) {
  const isStory = format === 'story'

  // Logo gets fixed space. Headline always starts below it.
  const logoHeight = isStory ? 52 : 40
  const logoTop = isStory ? 290 : 40
  const logoBottom = logoTop + logoHeight
  const headlineTop = logoBottom + (isStory ? 24 : 16)

  return (
    <div
      className="feature-points"
      style={{
        width,
        height,
        background: bgColor,
      }}
    >
      {/* Decorative elements */}
      <div className="fp-deco fp-deco-1" style={{ background: accentColor, opacity: 0.08 }} />
      <div className="fp-deco fp-deco-2" style={{ background: accentColor, opacity: 0.05 }} />

      {/* Logo - fixed top right */}
      <img
        src="/assets/brand/logo-header.png"
        alt="SnackVerse"
        className="fp-logo"
        style={{
          top: logoTop,
          right: isStory ? 70 : 44,
          height: logoHeight,
          filter: 'brightness(0) invert(1)',
        }}
      />

      {/* Headline - always below logo */}
      <div
        className="fp-headline"
        style={{
          color: textColor,
          top: headlineTop,
          fontSize: isStory ? 68 : 48,
          padding: isStory ? '0 70px' : '0 44px',
        }}
      >
        {headline}
      </div>

      {/* Feature Points */}
      <div
        className="fp-points"
        style={{
          top: isStory ? 700 : 400,
          padding: isStory ? '0 70px' : '0 44px',
        }}
      >
        {[point1, point2, point3].filter(Boolean).map((point, i) => (
          <div key={i} className="fp-point" style={{ fontSize: isStory ? 32 : 24 }}>
            <span className="fp-check" style={{ color: accentColor, fontSize: isStory ? 36 : 28 }}>
              &#10003;
            </span>
            <span style={{ color: textColor }}>{point}</span>
          </div>
        ))}
      </div>

      {/* Box Image */}
      <img
        src={boxImage}
        alt="SnackVerse Box"
        className="fp-box"
        style={{
          bottom: isStory ? 420 : 20,
          right: isStory ? -40 : -30,
          height: isStory ? '38%' : '42%',
        }}
      />

      {/* CTA Button */}
      <div
        className="fp-cta"
        style={{
          bottom: isStory ? 420 : 40,
          left: isStory ? 70 : 44,
          fontSize: isStory ? 26 : 20,
          background: accentColor,
          color: bgColor,
        }}
      >
        SUBSCRIBE NOW
      </div>
    </div>
  )
}
