import './PricingTier.css'

const TIERS = [
  {
    name: 'Mini Box',
    price: '7.99',
    snacks: '5+',
    image: '/assets/boxes/box-mini-illustration-full.jpg',
    badge: null,
  },
  {
    name: 'Original Box',
    price: '13.99',
    snacks: '10+',
    image: '/assets/boxes/box-original-illustration-full.jpg',
    badge: 'BEST SELLER',
  },
  {
    name: 'Premium Box',
    price: '23.99',
    snacks: '20+',
    image: '/assets/boxes/box-premium-illustration-full.jpg',
    badge: 'BEST VALUE',
  },
]

export default function PricingTier({ headline, bgColor, width, height, format }) {
  const isStory = format === 'story'

  const logoHeight = isStory ? 56 : 44
  const logoTop = isStory ? 290 : 36
  const logoBottom = logoTop + logoHeight
  const headlineTop = logoBottom + (isStory ? 20 : 12)

  return (
    <div
      className="pricing-tier"
      style={{
        width,
        height,
        background: `linear-gradient(180deg, ${bgColor} 0%, ${darken(bgColor, 12)} 100%)`,
      }}
    >
      {/* Logo */}
      <img
        src="/assets/brand/logo-header.png"
        alt="SnackVerse"
        className="pt-logo"
        style={{
          top: logoTop,
          left: '50%',
          transform: 'translateX(-50%)',
          height: logoHeight,
          filter: 'brightness(0) invert(1)',
        }}
      />

      {/* Headline */}
      <div
        className="pt-headline"
        style={{
          top: headlineTop,
          fontSize: isStory ? 68 : 56,
          color: '#FFFFFF',
        }}
      >
        {headline}
      </div>

      {/* Tier Cards */}
      <div
        className="pt-cards"
        style={{
          top: isStory ? 500 : 210,
          bottom: isStory ? 420 : 50,
          flexDirection: isStory ? 'column' : 'row',
          padding: isStory ? '0 60px' : '0 30px',
          gap: isStory ? 18 : 14,
        }}
      >
        {TIERS.map((tier, i) => (
          <div
            key={i}
            className="pt-card"
            style={{ flex: 1 }}
          >
            {tier.badge && (
              <div className="pt-badge" style={{ fontSize: isStory ? 11 : 9 }}>{tier.badge}</div>
            )}
            <div className="pt-tier-image-wrap" style={{ height: isStory ? 110 : 100 }}>
              <img src={tier.image} alt={tier.name} className="pt-tier-image" />
            </div>
            <div className="pt-tier-name" style={{ fontSize: isStory ? 20 : 15 }}>
              {tier.name}
            </div>
            <div className="pt-tier-snacks" style={{ fontSize: isStory ? 14 : 11 }}>
              {tier.snacks} full size snacks
            </div>
            <div className="pt-tier-price" style={{ fontSize: isStory ? 40 : 30 }}>
              <span className="pt-currency">£</span>
              {tier.price}
            </div>
            <div className="pt-tier-period" style={{ fontSize: isStory ? 14 : 10 }}>
              per month
            </div>
          </div>
        ))}
      </div>
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
