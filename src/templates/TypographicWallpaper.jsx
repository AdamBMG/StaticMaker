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
  const rows = isStory ? 20 : 14

  const logoHeight = isStory ? 48 : 40
  const logoTop = isStory ? 290 : 28
  const logoBottom = logoTop + logoHeight
  const headlineTop = logoBottom + (isStory ? 14 : 6)

  // Text zone: top 35%. Image zone: bottom 65%. No overlap.
  const textZoneEnd = isStory ? 0.35 : 0.35
  const imageZoneStart = textZoneEnd

  return (
    <div
      className="typo-wallpaper"
      style={{
        width,
        height,
        background: bgColor,
      }}
    >
      {/* Background text - decorative only, behind everything */}
      <div className="tw-bg-text" style={{ color: bgTextColor }}>
        {Array.from({ length: rows }, (_, i) => (
          <div
            key={i}
            className="tw-bg-row"
            style={{
              fontSize: isStory ? 80 : 72,
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

      {/* Headline in top text zone */}
      <div
        className="tw-headline"
        style={{
          color: textColor,
          fontSize: isStory ? 100 : 88,
          top: headlineTop,
          padding: isStory ? '0 50px' : '0 30px',
          maxHeight: height * textZoneEnd - headlineTop,
          overflow: 'hidden',
          textShadow: `0 4px 20px rgba(0, 0, 0, 0.15), 0 0 60px ${bgColor}`,
        }}
      >
        {headline}
      </div>

      {/* Box in bottom image zone, centred, fully visible */}
      <img
        src={boxImage}
        alt="SnackVerse Box"
        className="tw-box"
        style={{
          top: height * imageZoneStart,
          bottom: 20,
          height: 'auto',
          maxHeight: height * (1 - imageZoneStart) - 30,
          maxWidth: '90%',
        }}
      />
    </div>
  )
}
