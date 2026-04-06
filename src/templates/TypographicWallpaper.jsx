import './TypographicWallpaper.css'

// REAL AD: bg text fills everything, headline at top, box 75%+ of canvas, headline over box
export default function TypographicWallpaper({
  headline = 'Affordable snacks.', bgText = 'AFFORDABLE SNACKS',
  bgColor = '#FFD700', bgTextColor = '#FF7A00', textColor = '#FFFFFF',
  boxImage = '/assets/boxes/box_mobile.png',
  width, height, format, qcScale = 1.0,
}) {
  const isStory = format === 'story'
  const rows = isStory ? 24 : 16

  return (
    <div className="typo-wallpaper" style={{ width, height, background: bgColor }}>
      <div className="tw-bg-text" style={{ color: bgTextColor }}>
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="tw-bg-row" style={{
            fontSize: isStory ? 84 : 76,
            transform: `rotate(-15deg) translateX(${(i % 2) * -80}px)`,
          }}>
            {bgText} {bgText} {bgText} {bgText}
          </div>
        ))}
      </div>

      <img src="/assets/brand/logo-header.png" alt="SnackVerse" className="tw-logo"
        style={{ top: isStory ? 290 : 20, right: isStory ? 50 : 20, height: isStory ? 48 : 36, filter: 'brightness(0) invert(1)', zIndex: 10 }} />

      {/* Headline over the box, like real ads */}
      <div className="tw-headline" style={{
        color: textColor, fontSize: isStory ? 104 : 92,
        top: isStory ? 290 : 20, padding: isStory ? '0 50px' : '0 24px',
        textShadow: `0 4px 20px rgba(0, 0, 0, 0.15), 0 0 60px ${bgColor}`,
        zIndex: 10,
      }}>
        {headline}
      </div>

      {/* Box: starts at 20%, fills to bottom like real ads */}
      <img src={boxImage} alt="SnackVerse Box" className="tw-box" style={{
        top: `${isStory ? 38 : 20}%`,
        bottom: isStory ? 380 : 8,
        left: '50%',
        transform: 'translateX(-50%)',
        height: 'auto',
        maxHeight: `${(isStory ? 54 : 78) * qcScale}%`,
        maxWidth: '98%',
        zIndex: 5,
      }} />
    </div>
  )
}
