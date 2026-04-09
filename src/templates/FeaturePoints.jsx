import './FeaturePoints.css'

// REAL AD: headline top-left, points mid-left, box bottom-right filling ~50% of canvas
export default function FeaturePoints({
  headline, point1, point2, point3, bgColor,
  textColor = '#FFFFFF', accentColor = '#FFD700', boxImage, bgImage,
  width, height, format, qcScale = 1.0, ov = {},
}) {
  const isStory = format === 'story'

  return (
    <div className="feature-points" style={{ width, height, ...(bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: bgColor }) }}>
      <div className="fp-deco fp-deco-1" style={{ background: accentColor, opacity: 0.08 }} />

      <div className="fp-headline" style={{
        color: textColor, top: (isStory ? 360 : 80) + (ov['headline.top'] || 0),
        fontSize: isStory ? 76 : 54,
        transform: `scale(${1 + (ov['headline.scale'] || 0) / 100})`,
        transformOrigin: 'top left',
        padding: isStory ? '0 50px' : '0 30px',
        marginLeft: ov['headline.left'] || 0,
        width: isStory ? '100%' : '58%',
        zIndex: 10,
      }}>
        {headline}
      </div>

      <div className="fp-points" style={{
        top: (isStory ? 680 : 340) + (ov['points.top'] || 0),
        padding: isStory ? '0 50px' : '0 30px',
        marginLeft: ov['points.left'] || 0,
        width: isStory ? '100%' : '58%',
        zIndex: 10,
      }}>
        {[point1, point2, point3].filter(Boolean).map((point, i) => (
          <div key={i} className="fp-point" style={{ fontSize: isStory ? 36 : 28, transform: `scale(${1 + (ov['points.scale'] || 0) / 100})`, transformOrigin: 'top left' }}>
            <span className="fp-check" style={{ color: accentColor, fontSize: isStory ? 40 : 32 }}>&#10003;</span>
            <span style={{ color: textColor }}>{point}</span>
          </div>
        ))}
      </div>

      {/* Box: bottom-right, fills 55% height on square */}
      <img src={boxImage} alt="SnackVerse Box" className="fp-box" style={{
        bottom: (isStory ? 400 : 0) + (ov['box.bottom'] || 0),
        right: (isStory ? 10 : -10) + (ov['box.right'] || 0),
        height: `${((isStory ? 44 : 58) + (ov['box.height'] || 0)) * qcScale}%`,
        zIndex: 5,
      }} />

      <div className="fp-cta" style={{
        bottom: (isStory ? 410 : 24) + (ov['cta.bottom'] || 0), left: (isStory ? 50 : 30) + (ov['cta.left'] || 0),
        fontSize: isStory ? 28 : 22, transform: `scale(${1 + (ov['cta.scale'] || 0) / 100})`, transformOrigin: 'top left', background: accentColor, color: bgColor,
        zIndex: 10,
      }}>
        SUBSCRIBE NOW
      </div>
    </div>
  )
}
