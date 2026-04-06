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

      <div
        className="tm-quote"
        style={{
          color: textColor,
          top: quoteTop,
          fontSize: isStory ? 64 : 56,
          padding: isStory ? '0 60px' : '0 36px',
        }}
      >
        "{headline}"
      </div>

      {showTrustpilot && (
        <div
          className="tm-stars"
          style={{
            top: isStory ? 600 : 310,
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

      {/* Product way bigger, fills bottom half */}
      <img
        src={productImage}
        alt="Product"
        className="tm-product"
        style={{
          bottom: isStory ? 370 : -40,
          right: isStory ? -10 : -40,
          height: isStory ? '52%' : '68%',
        }}
      />
    </div>
  )
}
