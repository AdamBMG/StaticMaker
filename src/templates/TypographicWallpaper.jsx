import './TypographicWallpaper.css'

export default function TypographicWallpaper({
  headline = 'Affordable snacks.',
  bgText = 'AFFORDABLE SNACKS',
  bgColor = '#FFD700',
  bgTextColor = '#FF7A00',
  textColor = '#FFFFFF',
  boxImage = '/assets/boxes/box_mobile.png',
  width,
  height,
  format,
}) {
  const isStory = format === 'story'
  const rows = isStory ? 18 : 12

  const logoHeight = isStory ? 48 : 40
  const logoTop = isStory ? 290 : 28
  const logoBottom = logoTop + logoHeight
  const headlineTop = logoBottom + (isStory ? 14 : 6)

  return (
    <div
      className="typo-wallpaper"
      style={{
        width,
        height,
        background: bgColor,
      }}
    >
      <div className="tw-bg-text" style={{ color: bgTextColor }}>
        {Array.from({ length: rows }, (_, i) => (
          <div
            key={i}
            className="tw-bg-row"
            style={{
              fontSize: isStory ? 76 : 68,
              transform: `rotate(-15deg) translateX(${(i % 2) * -80}px)`,
            }}
          >
            {bgText} {bgText} {bgText} {bgText}
          </div>
        ))}
      </div>

      <img
        src="/assets/brand/logo-header.png"
        alt="SnackVerse"
        className="tw-logo"
        style={{
          top: logoTop,
          right: isStory ? 60 : 30,
          height: logoHeight,
          filter: 'brightness(0) invert(1)',
        }}
      />

      <div
        className="tw-headline"
        style={{
          color: textColor,
          fontSize: isStory ? 92 : 80,
          top: headlineTop,
          padding: isStory ? '0 60px' : '0 36px',
          textShadow: `0 4px 20px rgba(0, 0, 0, 0.15), 0 0 60px ${bgColor}`,
        }}
      >
        {headline}
      </div>

      <img
        src={boxImage}
        alt="SnackVerse Box"
        className="tw-box"
        style={{
          bottom: isStory ? 360 : -30,
          height: isStory ? '52%' : '70%',
        }}
      />
    </div>
  )
}
