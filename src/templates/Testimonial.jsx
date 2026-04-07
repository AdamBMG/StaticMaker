import './Testimonial.css'

// REAL AD: quote top 25%, trustpilot stars below, product fills bottom 65%, product is MASSIVE
export default function Testimonial({
  headline, bgColor = '#FFD6D6', textColor = '#6B2FA0',
  productImage = '/assets/boxes/box_mobile.png', showTrustpilot = true,
  width, height, format, qcScale = 1.0,
}) {
  const isStory = format === 'story'

  return (
    <div className="testimonial" style={{ width, height, background: bgColor }}>
      {/* Quote at top */}
      <div className="tm-quote" style={{
        color: textColor, top: isStory ? 290 : 24,
        fontSize: isStory ? 62 : 54,
        padding: isStory ? '0 50px' : '0 30px',
        zIndex: 10,
      }}>
        "{headline}"
      </div>

      {showTrustpilot && (
        <div className="tm-stars" style={{ top: isStory ? 560 : 260, left: isStory ? 50 : 30, zIndex: 10 }}>
          <img src="/assets/brand/trustpilot-stars-5.svg" alt="Trustpilot 5 stars" className="tm-tp-svg"
            style={{ height: isStory ? 44 : 36 }} />
        </div>
      )}

      {/* Product: fills bottom, centred, huge - matches real testimonial ads */}
      <img src={productImage} alt="Product" className="tm-product" style={{
        bottom: isStory ? 390 : 0,
        left: '50%',
        transform: 'translateX(-50%)',
        height: `${(isStory ? 52 : 68) * qcScale}%`,
        maxWidth: '100%',
        right: 'auto',
        zIndex: 5,
      }} />

    </div>
  )
}
