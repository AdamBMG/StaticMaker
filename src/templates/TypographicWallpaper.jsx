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
  const rows = isStory ? 16 : 10

  const logoHeight = isStory ? 48 : 40
  const logoTop = isStory ? 290 : 36
  const logoBottom = logoTop + logoHeight
  const headlineTop = logoBottom + (isStory ? 20 : 12)

  return (
    <div
      className="typo-wallpaper"
      style={{
        width,
        height,
        background: bgColor,
      }}
    >
      {/* Repeating text background */}
      <div className="tw-bg-text" style={{ color: bgTextColor }}>
        {Array.from({ length: rows }, (_, i) => (
          <div
            key={i}
            className="tw-bg-row"
            style={{
              fontSize: isStory ? 68 : 58,
              transform: `rotate(-15deg) translateX(${(i % 2) * -80}px)`,
            }}
          >
            {bgText} {bgText} {bgText} {bgText}
          </div>
        ))}
      </div>

      {/* Logo top-right */}
      <img
        src="/assets/brand/logo-header.png"
        alt="SnackVerse"
        className="tw-logo"
        style={{
          top: logoTop,
          right: isStory ? 70 : 40,
          height: logoHeight,
          filter: 'brightness(0) invert(1)',
        }}
      />

      {/* Main headline - below logo */}
      <div
        className="tw-headline"
        style={{
          color: textColor,
          fontSize: isStory ? 80 : 68,
          top: headlineTop,
          padding: isStory ? '0 70px' : '0 44px',
          textShadow: `0 4px 20px rgba(0, 0, 0, 0.15), 0 0 60px ${bgColor}`,
        }}
      >
        {headline}
      </div>

      {/* Box product shot */}
      <img
        src={boxImage}
        alt="SnackVerse Box"
        className="tw-box"
        style={{
          bottom: isStory ? 380 : -10,
          height: isStory ? '48%' : '62%',
        }}
      />
    </div>
  )
}
