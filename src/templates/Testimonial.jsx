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

  // Logo bottom-left, fixed position
  const logoTop = isStory ? 290 : 40
  const logoHeight = isStory ? 44 : 36
  const logoBottom = logoTop + logoHeight
  const quoteTop = logoBottom + (isStory ? 20 : 16)

  return (
    <div
      className="testimonial"
      style={{
        width,
        height,
        background: bgColor,
      }}
    >
      {/* Logo top-left */}
      <img
        src="/assets/brand/logo-header.png"
        alt="SnackVerse"
        className="tm-logo"
        style={{
          top: logoTop,
          left: isStory ? 70 : 44,
          height: logoHeight,
        }}
      />

      {/* Quote - below logo */}
      <div
        className="tm-quote"
        style={{
          color: textColor,
          top: quoteTop,
          fontSize: isStory ? 52 : 44,
          padding: isStory ? '0 70px' : '0 44px',
        }}
      >
        "{headline}"
      </div>

      {/* Trustpilot Stars */}
      {showTrustpilot && (
        <div
          className="tm-stars"
          style={{
            top: isStory ? 600 : 320,
            left: isStory ? 70 : 44,
          }}
        >
          <img
            src="/assets/brand/trustpilot-stars-5.svg"
            alt="Trustpilot 5 stars"
            className="tm-tp-svg"
            style={{ height: isStory ? 36 : 28 }}
          />
        </div>
      )}

      {/* Product Image */}
      <img
        src={productImage}
        alt="Product"
        className="tm-product"
        style={{
          bottom: isStory ? 420 : 20,
          right: isStory ? 40 : 20,
          height: isStory ? '42%' : '48%',
        }}
      />
    </div>
  )
}
