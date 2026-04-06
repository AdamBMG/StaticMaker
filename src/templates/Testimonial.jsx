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
          fontSize: isStory ? 60 : 52,
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
            style={{ height: isStory ? 40 : 32 }}
          />
        </div>
      )}

      <img
        src={productImage}
        alt="Product"
        className="tm-product"
        style={{
          bottom: isStory ? 390 : -10,
          right: isStory ? 20 : -10,
          height: isStory ? '48%' : '58%',
        }}
      />
    </div>
  )
}
