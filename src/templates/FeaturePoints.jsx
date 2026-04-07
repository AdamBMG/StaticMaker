import './FeaturePoints.css'

// REAL AD: headline top-left, points mid-left, box bottom-right filling ~50% of canvas
export default function FeaturePoints({
  headline, point1, point2, point3, bgColor,
  textColor = '#FFFFFF', accentColor = '#FFD700', boxImage,
  width, height, format, qcScale = 1.0,
}) {
  const isStory = format === 'story'

  return (
    <div className="feature-points" style={{ width, height, background: bgColor }}>
      <div className="fp-deco fp-deco-1" style={{ background: accentColor, opacity: 0.08 }} />

      <div className="fp-headline" style={{
        color: textColor, top: isStory ? 360 : 80,
        fontSize: isStory ? 76 : 54,
        padding: isStory ? '0 50px' : '0 30px',
        width: isStory ? '100%' : '58%',
        zIndex: 10,
      }}>
        {headline}
      </div>

      <div className="fp-points" style={{
        top: isStory ? 680 : 340,
        padding: isStory ? '0 50px' : '0 30px',
        width: isStory ? '100%' : '58%',
        zIndex: 10,
      }}>
        {[point1, point2, point3].filter(Boolean).map((point, i) => (
          <div key={i} className="fp-point" style={{ fontSize: isStory ? 36 : 28 }}>
            <span className="fp-check" style={{ color: accentColor, fontSize: isStory ? 40 : 32 }}>&#10003;</span>
            <span style={{ color: textColor }}>{point}</span>
          </div>
        ))}
      </div>

      {/* Box: bottom-right, fills 55% height on square */}
      <img src={boxImage} alt="SnackVerse Box" className="fp-box" style={{
        bottom: isStory ? 400 : 0,
        right: isStory ? 10 : -10,
        height: `${(isStory ? 44 : 58) * qcScale}%`,
        zIndex: 5,
      }} />

      <div className="fp-cta" style={{
        bottom: isStory ? 410 : 24, left: isStory ? 50 : 30,
        fontSize: isStory ? 28 : 22, background: accentColor, color: bgColor,
        zIndex: 10,
      }}>
        SUBSCRIBE NOW
      </div>
    </div>
  )
}
