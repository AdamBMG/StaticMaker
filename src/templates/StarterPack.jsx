import './StarterPack.css'

const DEFAULT_PRODUCTS = [
  { image: '/assets/snacks/chip.png', label: 'CRUNCHY CHIPS', x: 8, y: 28, size: 22 },
  { image: '/assets/snacks/cookie.png', label: 'SWEET COOKIES', x: 55, y: 25, size: 26 },
  { image: '/assets/snacks/soda.png', label: 'FIZZY DRINKS', x: 10, y: 58, size: 20 },
  { image: '/assets/snacks/gummy.png', label: 'GUMMY CANDY', x: 38, y: 55, size: 24 },
  { image: '/assets/snacks/candy_green.png', label: 'SOUR SWEETS', x: 68, y: 58, size: 18 },
]

export default function StarterPack({
  headline = 'Snack Night Starter Pack',
  bgColor = '#FF7A00',
  textColor = '#FFFFFF',
  accentColor = '#FFD700',
  products = DEFAULT_PRODUCTS,
  width,
  height,
  format,
}) {
  const isStory = format === 'story'

  const logoHeight = isStory ? 44 : 36
  const logoTop = isStory ? 290 : 36
  const logoBottom = logoTop + logoHeight
  const headlineTop = logoBottom + (isStory ? 16 : 10)

  // Scale product positions for story format
  const storyYOffset = isStory ? 8 : 0

  return (
    <div
      className="starter-pack"
      style={{
        width,
        height,
        background: bgColor,
      }}
    >
      {/* Checkerboard border top */}
      <div className="sp-checker sp-checker-top" />
      {/* Checkerboard border bottom */}
      <div className="sp-checker sp-checker-bottom" />

      {/* Logo */}
      <img
        src="/assets/brand/logo-header.png"
        alt="SnackVerse"
        className="sp-logo"
        style={{
          top: logoTop,
          left: isStory ? 70 : 44,
          height: logoHeight,
          filter: 'brightness(0) invert(1)',
        }}
      />

      {/* Headline */}
      <div
        className="sp-headline"
        style={{
          color: accentColor,
          top: headlineTop,
          fontSize: isStory ? 72 : 64,
          padding: isStory ? '0 60px' : '0 40px',
          WebkitTextStroke: `3px ${darken(accentColor, 30)}`,
          paintOrder: 'stroke fill',
        }}
      >
        {headline}
      </div>

      {/* Products with labels */}
      {products.map((product, i) => {
        const productTop = product.y + storyYOffset
        const productSize = isStory ? product.size * 0.9 : product.size
        return (
          <div
            key={i}
            className="sp-product"
            style={{
              left: `${product.x}%`,
              top: `${productTop}%`,
              width: `${productSize}%`,
            }}
          >
            {/* Dashed circle */}
            <div className="sp-circle" />
            <img src={product.image} alt={product.label} className="sp-product-img" />
            <span
              className="sp-label"
              style={{
                color: textColor,
                fontSize: isStory ? 24 : 20,
              }}
            >
              {product.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function darken(hex, percent) {
  if (!hex || hex.length < 4) return hex
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) - Math.round(2.55 * percent)))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) - Math.round(2.55 * percent)))
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) - Math.round(2.55 * percent)))
  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
