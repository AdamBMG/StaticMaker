import './Testimonial.css'

// QC BENCHMARK: 50%+ product coverage, <12% whitespace, product dominates bottom
export default function Testimonial({
  headline, bgColor = '#FFD6D6', textColor = '#6B2FA0',
  productImage = '/assets/boxes/box_mobile.png', showTrustpilot = true,
  width, height, format, qcScale = 1.0,
}) {
  const isStory = format === 'story'
  const logoTop = isStory ? 290 : 26
  const logoHeight = isStory ? 44 : 36
  const logoBottom = logoTop + logoHeight
  const quoteTop = logoBottom + (isStory ? 12 : 6)

  return (
    <div className="testimonial" style={{ width, height, background: bgColor }}>
      <img src="/assets/brand/logo-header.png" alt="SnackVerse" className="tm-logo"
        style={{ top: logoTop, left: isStory ? 60 : 36, height: logoHeight }} />

      {/* Quote takes top 30% */}
      <div className="tm-quote" style={{
        color: textColor, top: quoteTop,
        fontSize: isStory ? 60 : 52,
        padding: isStory ? '0 60px' : '0 36px',
      }}>
        "{headline}"
      </div>

      {showTrustpilot && (
        <div className="tm-stars" style={{ top: isStory ? 560 : 280, left: isStory ? 60 : 36 }}>
          <img src="/assets/brand/trustpilot-stars-5.svg" alt="Trustpilot 5 stars" className="tm-tp-svg"
            style={{ height: isStory ? 44 : 36 }} />
        </div>
      )}

      {/* Product: huge, fills bottom 60%+ like real testimonial ads */}
      <img src={productImage} alt="Product" className="tm-product" style={{
        bottom: isStory ? 390 : 10,
        left: '50%',
        transform: 'translateX(-50%)',
        height: `${(isStory ? 50 : 60) * qcScale}%`,
        maxWidth: '95%',
        right: 'auto',
      }} />
    </div>
  )
}
