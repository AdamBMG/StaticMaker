import './PricingTier.css'

// QC BENCHMARK: 55%+ card coverage, <10% whitespace, cards fill the frame
const TIERS = [
  { name: 'Mini Box', price: '7.99', snacks: '5+', image: '/assets/boxes/box-mini-illustration-full.jpg', badge: null },
  { name: 'Original Box', price: '13.99', snacks: '10+', image: '/assets/boxes/box-original-illustration-full.jpg', badge: 'BEST SELLER' },
  { name: 'Premium Box', price: '23.99', snacks: '20+', image: '/assets/boxes/box-premium-illustration-full.jpg', badge: 'BEST VALUE' },
]

export default function PricingTier({ headline, bgColor, width, height, format, qcScale = 1.0 }) {
  const isStory = format === 'story'
  const logoHeight = isStory ? 56 : 40
  const logoTop = isStory ? 290 : 26
  const logoBottom = logoTop + logoHeight
  const headlineTop = logoBottom + (isStory ? 12 : 4)

  return (
    <div className="pricing-tier" style={{ width, height, background: `linear-gradient(180deg, ${bgColor} 0%, ${darken(bgColor, 12)} 100%)` }}>
      <img src="/assets/brand/logo-header.png" alt="SnackVerse" className="pt-logo"
        style={{ top: logoTop, left: '50%', transform: 'translateX(-50%)', height: logoHeight, filter: 'brightness(0) invert(1)' }} />

      <div className="pt-headline" style={{ top: headlineTop, fontSize: isStory ? 72 : 58, color: '#FFFFFF' }}>
        {headline}
      </div>

      {/* Cards stretch edge to edge, minimal gaps */}
      <div className="pt-cards" style={{
        top: isStory ? 460 : 160,
        bottom: isStory ? 400 : 10,
        flexDirection: isStory ? 'column' : 'row',
        padding: isStory ? '0 36px' : '0 10px',
        gap: isStory ? 12 : 8,
      }}>
        {TIERS.map((tier, i) => (
          <div key={i} className="pt-card" style={{ flex: 1 }}>
            {tier.badge && <div className="pt-badge" style={{ fontSize: isStory ? 12 : 10 }}>{tier.badge}</div>}
            <div className="pt-tier-image-wrap" style={{ flex: 1, minHeight: 0 }}>
              <img src={tier.image} alt={tier.name} className="pt-tier-image" />
            </div>
            <div className="pt-tier-name" style={{ fontSize: isStory ? 22 : 16 }}>{tier.name}</div>
            <div className="pt-tier-snacks" style={{ fontSize: isStory ? 14 : 11 }}>{tier.snacks} full size snacks</div>
            <div className="pt-tier-price" style={{ fontSize: isStory ? 48 : 38 }}>
              <span className="pt-currency">£</span>{tier.price}
            </div>
            <div className="pt-tier-period" style={{ fontSize: isStory ? 14 : 10 }}>per month</div>
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
