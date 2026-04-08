import { useState } from 'react'
import { createImageElement } from './useCanvasState'

const ASSET_CATEGORIES = [
  {
    name: 'Boxes',
    assets: [
      { name: 'Mobile Box', src: '/assets/boxes/box_mobile.png' },
      { name: 'Box Inside', src: '/assets/boxes/box_inside.png' },
      { name: 'USA Box', src: '/assets/boxes/usa-original-box.png' },
      { name: 'Mini Box', src: '/assets/boxes/box-mini-illustration-full.jpg' },
      { name: 'Original Box', src: '/assets/boxes/box-original-illustration-full.jpg' },
      { name: 'Premium Box', src: '/assets/boxes/box-premium-illustration-full.jpg' },
    ],
  },
  {
    name: 'Brand',
    assets: [
      { name: 'Logo', src: '/assets/brand/logo.png' },
      { name: 'Logo Header', src: '/assets/brand/logo-header.png' },
      { name: 'Astro', src: '/assets/brand/astro.png' },
      { name: 'Spaceship', src: '/assets/brand/spaceship.png' },
      { name: 'Planet 1', src: '/assets/brand/planet1.png' },
      { name: 'Planet 2', src: '/assets/brand/planet2.png' },
      { name: 'Stellar', src: '/assets/brand/stellar.png' },
      { name: 'Satisfaction', src: '/assets/brand/satisfaction.png' },
      { name: 'Commitment', src: '/assets/brand/commitment.png' },
      { name: 'Shipping', src: '/assets/brand/shipping.png' },
      { name: 'Trustpilot', src: '/assets/brand/trustpilot-stars-5.svg' },
    ],
  },
  {
    name: 'Country Boxes',
    assets: [
      { name: 'Japan', src: '/assets/country-boxes/japan-box.png' },
      { name: 'South Korea', src: '/assets/country-boxes/south-korea-box.png' },
      { name: 'Canada', src: '/assets/country-boxes/canada-box.png' },
      { name: 'USA', src: '/assets/country-boxes/usa-box.png' },
      { name: 'Italy', src: '/assets/country-boxes/italy-box.png' },
      { name: 'France', src: '/assets/country-boxes/france-box.png' },
      { name: 'Germany', src: '/assets/country-boxes/germany-box.png' },
      { name: 'Spain', src: '/assets/country-boxes/spain-box.png' },
      { name: 'Australia', src: '/assets/country-boxes/australia-box.png' },
      { name: 'Netherlands', src: '/assets/country-boxes/netherlands-box.png' },
      { name: 'Greece', src: '/assets/country-boxes/greece-box.png' },
      { name: 'Mexico', src: '/assets/country-boxes/mexico-1.png' },
      { name: 'Denmark', src: '/assets/country-boxes/denmark-box.png' },
      { name: 'Finland', src: '/assets/country-boxes/finland-box.png' },
      { name: 'Austria', src: '/assets/country-boxes/austria-box.png' },
      { name: 'Belgium', src: '/assets/country-boxes/belgium-box.png' },
      { name: 'Hungary', src: '/assets/country-boxes/hungary-box.png' },
      { name: 'Philippines', src: '/assets/country-boxes/philippines-box.png' },
      { name: 'New Zealand', src: '/assets/country-boxes/new-zealand-box.png' },
    ],
  },
  {
    name: 'Snacks',
    assets: [
      { name: 'Candy Green', src: '/assets/snacks/candy_green.png' },
      { name: 'Candy', src: '/assets/snacks/candy_mobile.png' },
      { name: 'Chip', src: '/assets/snacks/chip.png' },
      { name: 'Cookie', src: '/assets/snacks/cookie.png' },
      { name: 'Gum', src: '/assets/snacks/gum.png' },
      { name: 'Gummy', src: '/assets/snacks/gummy.png' },
      { name: 'Soda', src: '/assets/snacks/soda.png' },
    ],
  },
]

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = reject
    img.src = src
  })
}

export default function CanvasAssets({ state, dispatch }) {
  const [activeCategory, setActiveCategory] = useState(0)
  const [loading, setLoading] = useState(false)

  const addAsset = async (src) => {
    setLoading(true)
    try {
      const { width, height } = await loadImage(src)
      const el = createImageElement(state.canvasWidth, state.canvasHeight, src, width, height)
      dispatch({ type: 'ADD_ELEMENT', element: el })
    } catch (err) {
      console.error('Failed to load asset:', err)
    }
    setLoading(false)
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      const src = URL.createObjectURL(file)
      const { width, height } = await loadImage(src)
      const el = createImageElement(state.canvasWidth, state.canvasHeight, src, width, height)
      dispatch({ type: 'ADD_ELEMENT', element: el })
    } catch (err) {
      console.error('Failed to load uploaded image:', err)
    }
    setLoading(false)
    e.target.value = ''
  }

  const category = ASSET_CATEGORIES[activeCategory]

  return (
    <section className="control-section">
      <h2>Assets</h2>

      <label className="upload-btn">
        <input type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        {loading ? 'Loading...' : 'Upload Image'}
      </label>

      <div className="asset-tabs">
        {ASSET_CATEGORIES.map((cat, i) => (
          <button
            key={cat.name}
            className={`asset-tab ${i === activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory(i)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="asset-grid">
        {category.assets.map(asset => (
          <button
            key={asset.src}
            className="asset-thumb"
            onClick={() => addAsset(asset.src)}
            title={asset.name}
          >
            <img src={asset.src} alt={asset.name} />
            <span>{asset.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
