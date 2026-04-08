import './BoldHeadline.css'

export default function BoldHeadline({
  headline, bgColor, textColor, ctaText, priceLine, trustBadge,
  logoPosition, heroImage, width, height, format, qcScale = 1.0, ov = {},
}) {
  const isStory = format === 'story'
  const bgGradient = `linear-gradient(180deg, ${bgColor} 0%, ${adjustBrightness(bgColor, -12)} 100%)`
  const logoSrc = isLightColor(bgColor)
    ? '/assets/mobile-tutors/logo-dark.png'
    : '/assets/mobile-tutors/logo-white.png'

  const logoTop = logoPosition === 'bottom'
  const showImage = !!heroImage

  return (
    <div className="mt-bold" style={{ width, height, background: bgGradient }}>
      {/* Decorative accent bar */}
      <div className="mt-bold-accent" style={{
        background: adjustBrightness(bgColor, 15),
        opacity: 0.12,
      }} />

      {/* Logo */}
      <img
        src={logoSrc}
        alt="mobileTutors"
        className={`mt-bold-logo ${logoTop ? 'mt-bold-logo-bottom' : 'mt-bold-logo-top'}`}
        style={{
          height: (isStory ? 48 : 36) + (ov['logo.fontSize'] || 0),
          top: logoTop ? undefined : (isStory ? 60 : 40) + (ov['logo.top'] || 0),
          bottom: logoTop ? (isStory ? 60 : 40) + (ov['logo.bottom'] || 0) : undefined,
          left: (isStory ? 60 : 40) + (ov['logo.left'] || 0),
        }}
      />

      {/* Headline */}
      <div className="mt-bold-headline" style={{
        color: textColor,
        fontSize: (isStory ? 108 : 86) + (ov['headline.fontSize'] || 0),
        top: (isStory ? 160 : 100) + (ov['headline.top'] || 0),
        left: (isStory ? 60 : 40) + (ov['headline.left'] || 0),
        right: showImage ? (isStory ? '45%' : '40%') : (isStory ? 60 : 40),
      }}>
        {headline}
      </div>

      {/* Trust badge */}
      {trustBadge && (
        <div className="mt-bold-trust" style={{
          color: textColor,
          top: (isStory ? 680 : 480) + (ov['trust.top'] || 0),
          left: (isStory ? 60 : 40) + (ov['trust.left'] || 0),
          fontSize: (isStory ? 24 : 20) + (ov['trust.fontSize'] || 0),
          opacity: 0.85,
        }}>
          <img src="/assets/mobile-tutors/trustpilot-stars.svg" alt="Trustpilot" className="mt-bold-stars" style={{
            height: (isStory ? 28 : 22) + (ov['trust.fontSize'] || 0),
          }} />
          {trustBadge}
        </div>
      )}

      {/* Price line */}
      {priceLine && (
        <div className="mt-bold-price" style={{
          color: textColor,
          bottom: (isStory ? 280 : 180) + (ov['price.bottom'] || 0),
          left: (isStory ? 60 : 40) + (ov['price.left'] || 0),
          fontSize: (isStory ? 36 : 28) + (ov['price.fontSize'] || 0),
        }}>
          {priceLine}
        </div>
      )}

      {/* CTA button */}
      {ctaText && (
        <div className="mt-bold-cta" style={{
          bottom: (isStory ? 180 : 100) + (ov['cta.bottom'] || 0),
          left: (isStory ? 60 : 40) + (ov['cta.left'] || 0),
          fontSize: (isStory ? 28 : 22) + (ov['cta.fontSize'] || 0),
        }}>
          {ctaText}
        </div>
      )}

      {/* Hero image slot */}
      {showImage && (
        <img
          src={heroImage}
          alt=""
          className="mt-bold-hero-image"
          style={{
            height: `${((isStory ? 55 : 60) + (ov['image.height'] || 0)) * qcScale}%`,
            right: (isStory ? 20 : 10) + (ov['image.right'] || 0),
            bottom: (isStory ? 140 : 60) + (ov['image.bottom'] || 0),
          }}
        />
      )}
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

function isLightColor(hex) {
  if (!hex || hex.length < 4) return false
  const num = parseInt(hex.replace('#', ''), 16)
  const r = num >> 16
  const g = (num >> 8) & 0xFF
  const b = num & 0xFF
  return (r * 299 + g * 587 + b * 114) / 1000 > 150
}
