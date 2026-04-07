import './BoxHero.css'

// REAL AD BENCHMARK: headline top 5-25%, box starts at 20% and fills to 95%. Headline overlaps box.
export default function BoxHero({ headline, bgColor, textColor, boxImage, width, height, format, qcScale = 1.0, ov = {} }) {
  const isStory = format === 'story'
  const bgGradient = `linear-gradient(180deg, ${bgColor} 0%, ${adjustBrightness(bgColor, -15)} 100%)`

  return (
    <div className="box-hero" style={{ width, height, background: bgGradient }}>
      <div className="bh-circle bh-circle-1" style={{ opacity: 0.1 }} />
      <div className="bh-circle bh-circle-2" style={{ opacity: 0.07 }} />

      {/* Headline: pinned to top, z-index above box */}
      <div className="bh-headline" style={{
        color: textColor,
        top: (isStory ? 290 : 24) + (ov['headline.top'] || 0),
        fontSize: (isStory ? 120 : 104) + (ov['headline.fontSize'] || 0),
        padding: isStory ? '0 50px' : '0 30px',
        marginLeft: ov['headline.left'] || 0,
        zIndex: 10,
      }}>
        {headline}
      </div>

      {/* Box: starts at 22% from top, fills to near bottom. Headline overlaps top of box. */}
      <img src={boxImage} alt="SnackVerse Box" className="bh-box-image" style={{
        bottom: (isStory ? 390 : 10) + (ov['box.bottom'] || 0),
        left: '50%',
        transform: 'translateX(-50%)',
        marginLeft: ov['box.left'] || 0,
        height: `${((isStory ? 52 : 76) + (ov['box.height'] || 0)) * qcScale}%`,
        maxWidth: '98%',
        zIndex: 5,
      }} />
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
