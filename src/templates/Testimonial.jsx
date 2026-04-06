import './Testimonial.css'

export default function Testimonial({
  headline,
  bgColor = '#FFD6D6',
  textColor = '#6B2FA0',
  productImage = '/assets/boxes/box_mobile.png',
  showTrustpilot = true,
  width,
  height,
  format,
}) {
  const isStory = format === 'story'

  const logoTop = isStory ? 290 : 30
  const logoHeight = isStory ? 48 : 40
  const logoBottom = logoTop + logoHeight
  const quoteTop = logoBottom + (isStory ? 16 : 8)

  // Text top 35%, product bottom 65%. Big product.
  const textZoneEnd = isStory ? 0.35 : 0.35
  const imageZoneStart = textZoneEnd

  return (
    <div
      className="testimonial"
      style={{
        width,
        height,
        background: bgColor,
      }}
    >
      <img
        src="/assets/brand/logo-header.png"
        alt="SnackVerse"
        className="tm-logo"
        style={{
          top: logoTop,
          left: isStory ? 60 : 36,
          height: logoHeight,
        }}
      />

      {/* Quote in top text zone */}
      <div
        className="tm-quote"
        style={{
          color: textColor,
          top: quoteTop,
          fontSize: isStory ? 60 : 50,
          padding: isStory ? '0 60px' : '0 36px',
          maxHeight: height * textZoneEnd - quoteTop - 10,
          overflow: 'hidden',
        }}
      >
        "{headline}"
      </div>

      {showTrustpilot && (
        <div
          className="tm-stars"
          style={{
            top: height * textZoneEnd - (isStory ? 60 : 50),
            left: isStory ? 60 : 36,
          }}
        >
          <img
            src="/assets/brand/trustpilot-stars-5.svg"
            alt="Trustpilot 5 stars"
            className="tm-tp-svg"
            style={{ height: isStory ? 44 : 36 }}
          />
        </div>
      )}

      {/* Product in bottom image zone, centred, fully visible */}
      <img
        src={productImage}
        alt="Product"
        className="tm-product"
        style={{
          top: height * imageZoneStart,
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          height: 'auto',
          maxHeight: height * (1 - imageZoneStart) - 20,
          maxWidth: '95%',
          right: 'auto',
        }}
      />
    </div>
  )
}
