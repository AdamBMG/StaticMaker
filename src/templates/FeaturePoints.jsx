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

  const logoHeight = isStory ? 52 : 40
  const logoTop = isStory ? 290 : 30
  const logoBottom = logoTop + logoHeight
  const headlineTop = logoBottom + (isStory ? 16 : 8)

  // Left column: text (55% width). Right column: box (48% width). No overlap.
  const textWidth = isStory ? '100%' : '55%'
  const boxWidth = isStory ? '50%' : '48%'

  return (
    <div
      className="feature-points"
      style={{
        width,
        height,
        background: bgColor,
      }}
    >
      <div className="fp-deco fp-deco-1" style={{ background: accentColor, opacity: 0.08 }} />
      <div className="fp-deco fp-deco-2" style={{ background: accentColor, opacity: 0.05 }} />

      <img
        src="/assets/brand/logo-header.png"
        alt="SnackVerse"
        className="fp-logo"
        style={{
          top: logoTop,
          right: isStory ? 60 : 36,
          height: logoHeight,
          filter: 'brightness(0) invert(1)',
        }}
      />

      {/* Headline: left side on square, full width on story */}
      <div
        className="fp-headline"
        style={{
          color: textColor,
          top: headlineTop,
          fontSize: isStory ? 76 : 52,
          padding: isStory ? '0 60px' : '0 36px',
          width: textWidth,
        }}
      >
        {headline}
      </div>

      {/* Points: left side */}
      <div
        className="fp-points"
        style={{
          top: isStory ? 680 : 370,
          padding: isStory ? '0 60px' : '0 36px',
          width: textWidth,
        }}
      >
        {[point1, point2, point3].filter(Boolean).map((point, i) => (
          <div key={i} className="fp-point" style={{ fontSize: isStory ? 36 : 26 }}>
            <span className="fp-check" style={{ color: accentColor, fontSize: isStory ? 40 : 30 }}>
              &#10003;
            </span>
            <span style={{ color: textColor }}>{point}</span>
          </div>
        ))}
      </div>

      {/* Box: right side, fully visible, no overlap with text */}
      <img
        src={boxImage}
        alt="SnackVerse Box"
        className="fp-box"
        style={{
          bottom: isStory ? 400 : 70,
          right: isStory ? 30 : 16,
          width: boxWidth,
          height: 'auto',
        }}
      />

      <div
        className="fp-cta"
        style={{
          bottom: isStory ? 410 : 30,
          left: isStory ? 60 : 36,
          fontSize: isStory ? 28 : 20,
          background: accentColor,
          color: bgColor,
        }}
      >
        SUBSCRIBE NOW
      </div>
    </div>
  )
}
