import './Testimonial.css'

export default function Testimonial({
  headline, bgColor, textColor, ctaText, priceLine, trustBadge,
  logoPosition, quote, attribution, width, height, format, qcScale = 1.0, ov = {},
}) {
  const isStory = format === 'story'

  return (
    <div className="mt-testimonial" style={{ width, height, background: bgColor === '#FFFFFF' || bgColor === '#FAFBFF' ? '#FAFBFF' : bgColor }}>
      {/* Logo */}
      <img
        src="/assets/mobile-tutors/logo-dark.png"
        alt="mobileTutors"
        className="mt-test-logo"
        style={{
          height: isStory ? 44 : 32,
          transform: `scale(${1 + (ov['logo.scale'] || 0) / 100})`,
          transformOrigin: 'top left',
          top: (isStory ? 50 : 35) + (ov['logo.top'] || 0),
          left: (isStory ? 50 : 35) + (ov['logo.left'] || 0),
        }}
      />

      {/* Big quote mark */}
      <div className="mt-test-quotemark" style={{
        top: (isStory ? 160 : 90) + (ov['headline.top'] || 0),
        left: (isStory ? 50 : 35) + (ov['headline.left'] || 0),
        fontSize: isStory ? 220 : 180,
        transform: `scale(${1 + (ov['headline.scale'] || 0) / 100})`,
        transformOrigin: 'top left',
      }}>
        {'\u201C'}
      </div>

      {/* Quote text */}
      <div className="mt-test-quote" style={{
        color: textColor === '#FFFFFF' ? '#1D1A63' : textColor,
        fontSize: isStory ? 52 : 42,
        transform: `scale(${1 + (ov['headline.scale'] || 0) / 100})`,
        transformOrigin: 'top left',
        top: (isStory ? 300 : 200) + (ov['headline.top'] || 0),
        left: (isStory ? 50 : 35) + (ov['headline.left'] || 0),
        right: isStory ? 50 : 35,
      }}>
        {headline}
      </div>

      {/* Attribution */}
      <div className="mt-test-attr" style={{
        top: (isStory ? 600 : 440) + (ov['trust.top'] || 0),
        left: (isStory ? 50 : 35) + (ov['trust.left'] || 0),
        fontSize: isStory ? 22 : 18,
        transform: `scale(${1 + (ov['trust.scale'] || 0) / 100})`,
        transformOrigin: 'top left',
      }}>
        {attribution || 'Parent - Verified Review'}
      </div>

      {/* Trustpilot */}
      <img
        src="/assets/mobile-tutors/trustpilot-stars.svg"
        alt="Trustpilot"
        className="mt-test-stars"
        style={{
          height: isStory ? 30 : 24,
          top: (isStory ? 650 : 480) + (ov['trust.top'] || 0),
          left: (isStory ? 50 : 35) + (ov['trust.left'] || 0),
        }}
      />

      {/* CTA */}
      {ctaText && (
        <div className="mt-test-cta" style={{
          bottom: (isStory ? 180 : 100) + (ov['cta.bottom'] || 0),
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
