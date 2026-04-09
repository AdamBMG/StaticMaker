import './GuaranteeResults.css'

export default function GuaranteeResults({
  headline, bgColor, textColor, ctaText, priceLine, trustBadge,
  subheadline, width, height, format, qcScale = 1.0, ov = {},
}) {
  const isStory = format === 'story'
  const logoSrc = '/assets/mobile-tutors/logo-white.png'

  return (
    <div className="mt-guarantee" style={{ width, height, background: bgColor }}>
      {/* Subtle accent circle */}
      <div className="mt-guar-circle" />

      {/* Logo */}
      <img
        src={logoSrc}
        alt="mobileTutors"
        className="mt-guar-logo"
        style={{
          height: isStory ? 44 : 32,
          transform: `scale(${1 + (ov['logo.scale'] || 0) / 100})`,
          transformOrigin: 'top left',
          top: (isStory ? 50 : 35) + (ov['logo.top'] || 0),
          left: (isStory ? 50 : 35) + (ov['logo.left'] || 0),
        }}
      />

      {/* Main headline */}
      <div className="mt-guar-headline" style={{
        color: textColor,
        fontSize: isStory ? 88 : 72,
        transform: `scale(${1 + (ov['headline.scale'] || 0) / 100})`,
        transformOrigin: 'top left',
        top: (isStory ? 180 : 110) + (ov['headline.top'] || 0),
        left: (isStory ? 50 : 35) + (ov['headline.left'] || 0),
        right: isStory ? 50 : 35,
      }}>
        {headline}
      </div>

      {/* Subheadline / proof points */}
      {subheadline && (
        <div className="mt-guar-sub" style={{
          color: textColor,
          fontSize: isStory ? 28 : 22,
          transform: `scale(${1 + (ov['trust.scale'] || 0) / 100})`,
          transformOrigin: 'top left',
          top: (isStory ? 650 : 460) + (ov['trust.top'] || 0),
          left: (isStory ? 50 : 35) + (ov['trust.left'] || 0),
          right: isStory ? 50 : 35,
        }}>
          {subheadline}
        </div>
      )}

      {/* Trust badge */}
      {trustBadge && (
        <div className="mt-guar-trust" style={{
          bottom: (isStory ? 320 : 220) + (ov['trust.top'] || 0),
          left: (isStory ? 50 : 35) + (ov['trust.left'] || 0),
          fontSize: isStory ? 22 : 18,
          transform: `scale(${1 + (ov['trust.scale'] || 0) / 100})`,
          transformOrigin: 'top left',
        }}>
          <img src="/assets/mobile-tutors/trustpilot-stars.svg" alt="Trustpilot" style={{
            height: isStory ? 26 : 20,
          }} />
          {trustBadge}
        </div>
      )}

      {/* Price */}
      {priceLine && (
        <div className="mt-guar-price" style={{
          color: '#DBB539',
          bottom: (isStory ? 250 : 160) + (ov['price.bottom'] || 0),
          left: (isStory ? 50 : 35) + (ov['price.left'] || 0),
          fontSize: isStory ? 32 : 26,
          transform: `scale(${1 + (ov['price.scale'] || 0) / 100})`,
          transformOrigin: 'top left',
        }}>
          {priceLine}
        </div>
      )}

      {/* CTA */}
      {ctaText && (
        <div className="mt-guar-cta" style={{
          bottom: (isStory ? 150 : 80) + (ov['cta.bottom'] || 0),
          left: (isStory ? 50 : 35) + (ov['cta.left'] || 0),
          fontSize: isStory ? 26 : 20,
          transform: `scale(${1 + (ov['cta.scale'] || 0) / 100})`,
          transformOrigin: 'top left',
        }}>
          {ctaText}
        </div>
      )}
    </div>
  )
}
