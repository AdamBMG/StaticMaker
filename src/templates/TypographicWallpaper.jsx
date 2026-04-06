import './TypographicWallpaper.css'

// QC BENCHMARK: 50%+ product coverage, <5% whitespace (bg text fills rest), box dominates
export default function TypographicWallpaper({
  headline = 'Affordable snacks.', bgText = 'AFFORDABLE SNACKS',
  bgColor = '#FFD700', bgTextColor = '#FF7A00', textColor = '#FFFFFF',
  boxImage = '/assets/boxes/box_mobile.png',
  width, height, format, qcScale = 1.0,
}) {
  const isStory = format === 'story'
  const rows = isStory ? 22 : 16
  const logoHeight = isStory ? 48 : 36
  const logoTop = isStory ? 290 : 24
  const logoBottom = logoTop + logoHeight
  const headlineTop = logoBottom + (isStory ? 10 : 4)

  return (
    <div className="typo-wallpaper" style={{ width, height, background: bgColor }}>
      {/* Background text fills entire canvas */}
      <div className="tw-bg-text" style={{ color: bgTextColor }}>
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="tw-bg-row" style={{
            fontSize: isStory ? 82 : 74,
            transform: `rotate(-15deg) translateX(${(i % 2) * -80}px)`,
          }}>
            {bgText} {bgText} {bgText} {bgText}
          </div>
        ))}
      </div>

      <img src="/assets/brand/logo-header.png" alt="SnackVerse" className="tw-logo"
        style={{ top: logoTop, right: isStory ? 60 : 24, height: logoHeight, filter: 'brightness(0) invert(1)' }} />

      {/* Headline overlaps box top like real ads */}
      <div className="tw-headline" style={{
        color: textColor, fontSize: isStory ? 100 : 88,
        top: headlineTop, padding: isStory ? '0 50px' : '0 24px',
        textShadow: `0 4px 20px rgba(0, 0, 0, 0.15), 0 0 60px ${bgColor}`,
      }}>
        {headline}
      </div>

      {/* Box huge, fills bottom 70%+  */}
      <img src={boxImage} alt="SnackVerse Box" className="tw-box" style={{
        bottom: isStory ? 380 : 10,
        height: `${(isStory ? 55 : 72) * qcScale}%`,
        maxWidth: `${Math.min(95 * qcScale, 100)}%`,
      }} />
    </div>
  )
}
