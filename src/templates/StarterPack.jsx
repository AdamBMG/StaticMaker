import './StarterPack.css'

// REAL AD REF: products scattered big, labels bold, fills the frame
const DEFAULT_PRODUCTS = [
  { image: '/assets/snacks/chip.png', label: 'CRUNCHY CHIPS', x: 2, y: 22, size: 30 },
  { image: '/assets/snacks/cookie.png', label: 'SWEET COOKIES', x: 48, y: 18, size: 36 },
  { image: '/assets/snacks/soda.png', label: 'FIZZY DRINKS', x: 2, y: 52, size: 28 },
  { image: '/assets/snacks/gummy.png', label: 'GUMMY CANDY', x: 30, y: 48, size: 34 },
  { image: '/assets/snacks/candy_green.png', label: 'SOUR SWEETS', x: 62, y: 52, size: 28 },
]

export default function StarterPack({
  headline = 'Snack Night Starter Pack', bgColor = '#FF7A00',
  textColor = '#FFFFFF', accentColor = '#FFD700',
  products = DEFAULT_PRODUCTS,
  width, height, format, qcScale = 1.0,
}) {
  const isStory = format === 'story'
  const logoHeight = isStory ? 44 : 32
  const logoTop = isStory ? 290 : 20
  const storyYOffset = isStory ? 8 : 0

  return (
    <div className="starter-pack" style={{ width, height, background: bgColor }}>
      <div className="sp-checker sp-checker-top" />
      <div className="sp-checker sp-checker-bottom" />

      <img src="/assets/brand/logo-header.png" alt="SnackVerse" className="sp-logo"
        style={{ top: logoTop, left: isStory ? 50 : 24, height: logoHeight, filter: 'brightness(0) invert(1)' }} />

      <div className="sp-headline" style={{
        color: accentColor, top: isStory ? 340 : 58,
        fontSize: isStory ? 82 : 72,
        padding: isStory ? '0 40px' : '0 20px',
        WebkitTextStroke: `3px ${darken(accentColor, 30)}`,
        paintOrder: 'stroke fill',
      }}>
        {headline}
      </div>

      {products.map((product, i) => {
        const productTop = product.y + storyYOffset
        const productSize = (isStory ? product.size * 0.95 : product.size) * qcScale
        return (
          <div key={i} className="sp-product" style={{
            left: `${product.x}%`, top: `${productTop}%`, width: `${productSize}%`,
          }}>
            <div className="sp-circle" />
            <img src={product.image} alt={product.label} className="sp-product-img" />
            <span className="sp-label" style={{ color: textColor, fontSize: isStory ? 28 : 24 }}>
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
