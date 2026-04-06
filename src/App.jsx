import { useState, useRef, useCallback, useEffect } from 'react'
import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'
import BoxHero from './templates/BoxHero'
import FeaturePoints from './templates/FeaturePoints'
import PricingTier from './templates/PricingTier'
import Testimonial from './templates/Testimonial'
import CountryGrid from './templates/CountryGrid'
import NumberedSteps from './templates/NumberedSteps'
import TypographicWallpaper from './templates/TypographicWallpaper'
import StarterPack from './templates/StarterPack'
import QCChecker from './components/QCChecker'
import './App.css'

const TEMPLATES = [
  {
    id: 'box-hero',
    name: 'Box Hero',
    component: BoxHero,
    description: 'Bold headline + product box hero shot',
    defaults: {
      headline: 'Worldwide snacks.',
      bgColor: '#FF7A00',
      textColor: '#FFFFFF',
      boxImage: '/assets/boxes/box_mobile.png',
      showLogo: true,
    },
    variants: [
      {
        label: 'Orange - "Worldwide snacks."',
        headline: 'Worldwide snacks.',
        bgColor: '#FF7A00',
        textColor: '#FFFFFF',
      },
      {
        label: 'Orange - "Did nothing, snacks arrived."',
        headline: 'Did nothing, snacks arrived.',
        bgColor: '#FF7A00',
        textColor: '#FFFFFF',
      },
      {
        label: 'Purple - "New snacks. Monthly."',
        headline: 'New snacks. Monthly.',
        bgColor: '#6B2FA0',
        textColor: '#FFD700',
      },
      {
        label: 'Orange - "From 7.99"',
        headline: 'From £7.99',
        bgColor: '#FF7A00',
        textColor: '#FFFFFF',
      },
      {
        label: 'Yellow - "Japan Snack Box"',
        headline: 'Japan Snack Box',
        bgColor: '#FFD700',
        textColor: '#E02020',
        boxImage: '/assets/country-boxes/japan-box.png',
      },
      {
        label: 'Orange - "Snacks arrived."',
        headline: 'Snacks arrived.',
        bgColor: '#FF7A00',
        textColor: '#FFFFFF',
      },
      {
        label: 'Yellow - "Canada Snack Box"',
        headline: 'Canada Snack Box',
        bgColor: '#FFD700',
        textColor: '#E02020',
        boxImage: '/assets/country-boxes/canada-box.png',
      },
      {
        label: 'Orange - "A box of snacks."',
        headline: 'A box of snacks.',
        bgColor: '#FF7A00',
        textColor: '#FFFFFF',
      },
      {
        label: 'Purple - "Delivered."',
        headline: 'Delivered.',
        bgColor: '#6B2FA0',
        textColor: '#FFFFFF',
      },
      {
        label: 'Yellow - "Australia Snack Box"',
        headline: 'Australia Snack Box',
        bgColor: '#FFD700',
        textColor: '#E02020',
        boxImage: '/assets/country-boxes/australia-box.png',
      },
      {
        label: 'Orange - "Bored of the same snacks?"',
        headline: 'Bored of the same snacks?',
        bgColor: '#FF7A00',
        textColor: '#FFFFFF',
      },
    ],
  },
  {
    id: 'feature-points',
    name: 'Feature Points',
    component: FeaturePoints,
    description: 'Headline + 3 selling points + box',
    defaults: {
      headline: 'Snacks from a different country every month.',
      point1: 'From £7.99/month',
      point2: 'Up to 20+ snacks',
      point3: 'Free UK shipping',
      bgColor: '#6B2FA0',
      textColor: '#FFFFFF',
      accentColor: '#FFD700',
      boxImage: '/assets/boxes/box_mobile.png',
    },
    variants: [
      {
        label: 'Purple - Country Discovery',
        headline: 'Snacks from a different country every month.',
        point1: 'From £7.99/month',
        point2: 'Up to 20+ snacks',
        point3: 'Free UK shipping',
        bgColor: '#6B2FA0',
        accentColor: '#FFD700',
      },
      {
        label: 'Orange - Value Focused',
        headline: 'The UK\'s favourite snack subscription.',
        point1: 'From just £7.99',
        point2: 'No duplicate snacks',
        point3: 'Cancel anytime',
        bgColor: '#FF7A00',
        accentColor: '#FFFFFF',
      },
      {
        label: 'Purple - How It Works',
        headline: 'You like snacks. We deliver them.',
        point1: '1. Choose your box',
        point2: '2. We pick the snacks',
        point3: '3. Snacks delivered',
        bgColor: '#6B2FA0',
        accentColor: '#FFD700',
      },
    ],
  },
  {
    id: 'pricing-tier',
    name: 'Pricing Tiers',
    component: PricingTier,
    description: '3 box tiers side by side with prices',
    defaults: {
      headline: 'Choose your box.',
      bgColor: '#FF7A00',
    },
    variants: [
      {
        label: 'Orange - "Choose your box."',
        headline: 'Choose your box.',
        bgColor: '#FF7A00',
      },
      {
        label: 'Purple - "Pick your perfect box."',
        headline: 'Pick your perfect box.',
        bgColor: '#6B2FA0',
      },
      {
        label: 'Red - "Starting from £7.99"',
        headline: 'Starting from £7.99',
        bgColor: '#E02020',
      },
    ],
  },
  {
    id: 'testimonial',
    name: 'Testimonial',
    component: Testimonial,
    description: 'Quote + Trustpilot stars + product shot',
    defaults: {
      headline: "I can't imagine how anyone lives without this.",
      bgColor: '#FFD6D6',
      textColor: '#6B2FA0',
      productImage: '/assets/boxes/box_mobile.png',
      showTrustpilot: true,
    },
    variants: [
      {
        label: 'Pink - "Can\'t imagine living without this"',
        headline: "I can't imagine how anyone lives without this.",
        bgColor: '#FFD6D6',
        textColor: '#6B2FA0',
      },
      {
        label: 'Pink - "Trade anything for this"',
        headline: "I'd trade anything for this snack box.",
        bgColor: '#FFD6D6',
        textColor: '#6B2FA0',
      },
      {
        label: 'Pink - "Most affordable snack box"',
        headline: "The most affordable snack box we found.",
        bgColor: '#FFD6D6',
        textColor: '#6B2FA0',
      },
      {
        label: 'Orange - "Quicker than they arrive"',
        headline: "You'll eat these snacks quicker than they arrive.",
        bgColor: '#FF7A00',
        textColor: '#FFFFFF',
      },
    ],
  },
  {
    id: 'country-grid',
    name: 'Country Grid',
    component: CountryGrid,
    description: '6 country cards in a grid layout',
    defaults: {
      headline: 'Taste a different country every month.',
      bgColor: '#FF4040',
    },
    variants: [
      {
        label: 'Red - "Different country every month"',
        headline: 'Taste a different country every month.',
        bgColor: '#FF4040',
      },
      {
        label: 'Purple - "Worldwide flavours"',
        headline: 'Worldwide flavours. Delivered.',
        bgColor: '#6B2FA0',
      },
      {
        label: 'Orange - "6 countries, 6 months"',
        headline: '6 countries. 6 months. 1 subscription.',
        bgColor: '#FF7A00',
      },
    ],
  },
  {
    id: 'numbered-steps',
    name: 'Numbered Steps',
    component: NumberedSteps,
    description: 'How it works - 3 numbered steps + box',
    defaults: {
      headline: "You'll eat these.",
      bgColor: '#6B2FA0',
      boxImage: '/assets/boxes/box_mobile.png',
    },
    variants: [
      {
        label: 'Purple - "You\'ll eat these"',
        headline: "You'll eat these.",
        bgColor: '#6B2FA0',
      },
      {
        label: 'Purple - "We don\'t forget"',
        headline: "We don't forget.",
        bgColor: '#6B2FA0',
      },
      {
        label: 'Purple - "You like snacks"',
        headline: 'You like snacks.',
        bgColor: '#6B2FA0',
      },
    ],
  },
  {
    id: 'typo-wallpaper',
    name: 'Typographic Wallpaper',
    component: TypographicWallpaper,
    description: 'Repeating text background + box hero',
    defaults: {
      headline: 'Affordable snacks.',
      bgText: 'AFFORDABLE SNACKS',
      bgColor: '#FFD700',
      bgTextColor: '#FF7A00',
      textColor: '#FFFFFF',
      boxImage: '/assets/boxes/box_mobile.png',
    },
    variants: [
      {
        label: 'Yellow - "Affordable snacks"',
        headline: 'Affordable snacks.',
        bgText: 'AFFORDABLE SNACKS',
        bgColor: '#FFD700',
        bgTextColor: '#FF7A00',
        textColor: '#FFFFFF',
      },
      {
        label: 'Orange - "Worldwide flavours"',
        headline: 'Worldwide flavours.',
        bgText: 'WORLDWIDE FLAVOURS',
        bgColor: '#FF7A00',
        bgTextColor: '#FFD700',
        textColor: '#FFFFFF',
      },
      {
        label: 'Purple - "New snacks monthly"',
        headline: 'New snacks. Monthly.',
        bgText: 'NEW SNACKS MONTHLY',
        bgColor: '#6B2FA0',
        bgTextColor: '#8B4FC0',
        textColor: '#FFD700',
      },
    ],
  },
  {
    id: 'starter-pack',
    name: 'Starter Pack',
    component: StarterPack,
    description: 'Product showcase with labels + checkerboard border',
    defaults: {
      headline: 'Snack Night Starter Pack',
      bgColor: '#FF7A00',
      textColor: '#FFFFFF',
      accentColor: '#FFD700',
    },
    variants: [
      {
        label: 'Orange - "Snack Night Starter Pack"',
        headline: 'Snack Night Starter Pack',
        bgColor: '#FF7A00',
        accentColor: '#FFD700',
      },
      {
        label: 'Purple - "What\'s In The Box"',
        headline: "What's In The Box",
        bgColor: '#6B2FA0',
        accentColor: '#FFD700',
      },
      {
        label: 'Orange - "Unbox The World"',
        headline: 'Unbox The World',
        bgColor: '#FF7A00',
        accentColor: '#FFFFFF',
      },
      {
        label: 'Purple - "Movie Night Sorted"',
        headline: 'Movie Night Sorted',
        bgColor: '#6B2FA0',
        accentColor: '#FFFFFF',
      },
    ],
  },
]

const FORMATS = [
  { id: 'square', label: '1080 x 1080', width: 1080, height: 1080 },
  { id: 'story', label: '1080 x 1920', width: 1080, height: 1920 },
]

// Meta safe zones for 1080x1920 (9:16)
const SAFE_ZONES = {
  story: {
    top: 0.14,      // 14% - status bar + username
    bottom: 0.20,    // 20% - CTA + swipe
    left: 0.06,      // 6%
    right: 0.06,     // 6%
  },
  reels: {
    top: 0.14,       // 14% - status bar + Reels header
    bottom: 0.35,    // 35% - likes, comments, CTA, nav
    left: 0.06,      // 6%
    right: 0.06,     // 6%
  },
}

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const [selectedFormat, setSelectedFormat] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [customProps, setCustomProps] = useState({})
  const [exporting, setExporting] = useState(false)
  const [showSafeZones, setShowSafeZones] = useState(false)
  const [safeZoneType, setSafeZoneType] = useState('story')
  const adRef = useRef(null)

  const template = TEMPLATES[selectedTemplate]
  const format = FORMATS[selectedFormat]

  // QC scale: saved per template+variant+format in localStorage
  const scaleKey = `qc_${template.id}_${selectedVariant}_${format.id}`

  const [qcScale, setQcScaleRaw] = useState(() => {
    const saved = localStorage.getItem(scaleKey)
    return saved ? parseFloat(saved) : 1.0
  })

  // When template/variant/format changes, load the saved scale
  useEffect(() => {
    const saved = localStorage.getItem(scaleKey)
    setQcScaleRaw(saved ? parseFloat(saved) : 1.0)
  }, [scaleKey])

  // Wrapper that saves to localStorage whenever scale changes
  const setQcScale = useCallback((val) => {
    const v = typeof val === 'function' ? val(qcScale) : val
    setQcScaleRaw(v)
    localStorage.setItem(scaleKey, v.toString())
  }, [scaleKey, qcScale])
  const variant = template.variants[selectedVariant] || {}
  const adProps = { ...template.defaults, ...variant, ...customProps }
  const TemplateComponent = template.component

  const scale = Math.min(
    500 / format.width,
    (format.id === 'story' ? 700 : 500) / format.height
  )

  const handleExport = useCallback(async () => {
    if (!adRef.current) return
    setExporting(true)
    try {
      const dataUrl = await toPng(adRef.current, {
        width: format.width,
        height: format.height,
        pixelRatio: 1,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: format.width + 'px',
          height: format.height + 'px',
        },
      })
      const name = `snackverse_${template.id}_${format.id}_v${selectedVariant + 1}.png`
      saveAs(dataUrl, name)
    } catch (err) {
      console.error('Export failed:', err)
    }
    setExporting(false)
  }, [adRef, format, template, selectedVariant])

  const handleExportAll = useCallback(async () => {
    if (!adRef.current) return
    setExporting(true)
    try {
      for (let fi = 0; fi < FORMATS.length; fi++) {
        for (let vi = 0; vi < template.variants.length; vi++) {
          setSelectedFormat(fi)
          setSelectedVariant(vi)
          await new Promise(r => setTimeout(r, 200))
          const f = FORMATS[fi]
          const dataUrl = await toPng(adRef.current, {
            width: f.width,
            height: f.height,
            pixelRatio: 1,
            style: {
              transform: 'scale(1)',
              transformOrigin: 'top left',
              width: f.width + 'px',
              height: f.height + 'px',
            },
          })
          const name = `snackverse_${template.id}_${f.id}_v${vi + 1}.png`
          saveAs(dataUrl, name)
          await new Promise(r => setTimeout(r, 300))
        }
      }
    } catch (err) {
      console.error('Batch export failed:', err)
    }
    setExporting(false)
  }, [adRef, template])

  return (
    <div className="app">
      <header className="app-header">
        <img src="/assets/brand/logo-header.png" alt="SnackVerse" className="app-logo" />
        <h1>Static Ad Maker</h1>
      </header>

      <div className="app-layout">
        {/* Left panel - Controls */}
        <div className="controls-panel">
          <section className="control-section">
            <h2>Template</h2>
            <div className="template-grid">
              {TEMPLATES.map((t, i) => (
                <button
                  key={t.id}
                  className={`template-card ${i === selectedTemplate ? 'active' : ''}`}
                  onClick={() => { setSelectedTemplate(i); setSelectedVariant(0); setCustomProps({}) }}
                >
                  <strong>{t.name}</strong>
                  <span>{t.description}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="control-section">
            <h2>Format</h2>
            <div className="format-toggle">
              {FORMATS.map((f, i) => (
                <button
                  key={f.id}
                  className={`format-btn ${i === selectedFormat ? 'active' : ''}`}
                  onClick={() => setSelectedFormat(i)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </section>

          {format.id === 'story' && (
            <section className="control-section">
              <h2>Safe Zones</h2>
              <div className="safe-zone-controls">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={showSafeZones}
                    onChange={e => setShowSafeZones(e.target.checked)}
                  />
                  Show safe zones
                </label>
                {showSafeZones && (
                  <div className="format-toggle">
                    <button
                      className={`format-btn ${safeZoneType === 'story' ? 'active' : ''}`}
                      onClick={() => setSafeZoneType('story')}
                    >
                      Stories
                    </button>
                    <button
                      className={`format-btn ${safeZoneType === 'reels' ? 'active' : ''}`}
                      onClick={() => setSafeZoneType('reels')}
                    >
                      Reels
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          <section className="control-section">
            <h2>Variant</h2>
            <div className="variant-list">
              {template.variants.map((v, i) => (
                <button
                  key={i}
                  className={`variant-btn ${i === selectedVariant ? 'active' : ''}`}
                  onClick={() => { setSelectedVariant(i); setCustomProps({}) }}
                >
                  <span className="variant-swatch" style={{ background: v.bgColor || template.defaults.bgColor }} />
                  {v.label}
                </button>
              ))}
            </div>
          </section>

          <section className="control-section">
            <h2>Customise</h2>
            <div className="custom-fields">
              <label>
                Headline
                <input
                  type="text"
                  value={customProps.headline ?? adProps.headline}
                  onChange={e => setCustomProps(p => ({ ...p, headline: e.target.value }))}
                />
              </label>
              {template.id === 'feature-points' && (
                <>
                  <label>
                    Point 1
                    <input
                      type="text"
                      value={customProps.point1 ?? adProps.point1}
                      onChange={e => setCustomProps(p => ({ ...p, point1: e.target.value }))}
                    />
                  </label>
                  <label>
                    Point 2
                    <input
                      type="text"
                      value={customProps.point2 ?? adProps.point2}
                      onChange={e => setCustomProps(p => ({ ...p, point2: e.target.value }))}
                    />
                  </label>
                  <label>
                    Point 3
                    <input
                      type="text"
                      value={customProps.point3 ?? adProps.point3}
                      onChange={e => setCustomProps(p => ({ ...p, point3: e.target.value }))}
                    />
                  </label>
                </>
              )}
            </div>
          </section>

          <section className="control-section">
            <h2>Quality Check</h2>
            <QCChecker
              templateId={template.id}
              adRef={adRef}
              width={format.width}
              height={format.height}
              qcScale={qcScale}
              onScaleChange={setQcScale}
            />
          </section>

          <section className="control-section export-section">
            <button className="export-btn" onClick={handleExport} disabled={exporting}>
              {exporting ? 'Exporting...' : 'Export PNG'}
            </button>
            <button className="export-all-btn" onClick={handleExportAll} disabled={exporting}>
              {exporting ? 'Exporting...' : 'Export All Variants'}
            </button>
          </section>
        </div>

        {/* Right panel - Preview */}
        <div className="preview-panel">
          <div className="preview-label">
            {format.width} x {format.height} - {template.name} - Variant {selectedVariant + 1}
          </div>
          <div
            className="preview-container"
            style={{
              width: format.width * scale,
              height: format.height * scale,
            }}
          >
            <div
              ref={adRef}
              className="ad-canvas"
              style={{
                width: format.width,
                height: format.height,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            >
              <TemplateComponent
                {...adProps}
                width={format.width}
                height={format.height}
                format={format.id}
                qcScale={qcScale}
              />
            </div>
            {/* Safe zone overlay - only shown on story format, not exported */}
            {format.id === 'story' && showSafeZones && (() => {
              const sz = SAFE_ZONES[safeZoneType]
              const topH = sz.top * format.height * scale
              const bottomH = sz.bottom * format.height * scale
              return (
                <div className="safe-zone-overlay">
                  <div className="sz-line sz-line-top" style={{ top: topH }} />
                  <div className="sz-line sz-line-bottom" style={{ bottom: bottomH }} />
                </div>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
