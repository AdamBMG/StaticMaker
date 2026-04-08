import { useState, useRef, useCallback, useEffect } from 'react'
import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'
import BoldHeadline from './mt-templates/BoldHeadline'
import Testimonial from './mt-templates/Testimonial'
import GuaranteeResults from './mt-templates/GuaranteeResults'
import QCChecker from './components/QCChecker'
import HeadlineGenerator from './components/HeadlineGenerator'
import ElementAdjuster from './components/ElementAdjuster'
import './App.css'

const TEMPLATES = [
  {
    id: 'bold-headline',
    name: 'Bold Headline',
    component: BoldHeadline,
    description: 'Big headline + CTA on solid colour',
    defaults: {
      headline: 'The UK\'s most affordable private tutoring',
      bgColor: '#1D1A63',
      textColor: '#FFFFFF',
      ctaText: 'Book Free Consultation',
      priceLine: 'From £5 per lesson',
      trustBadge: 'Excellent - 4.9/5',
      logoPosition: 'top',
      heroImage: '',
    },
    variants: [
      {
        label: 'Navy - "Most affordable"',
        headline: 'The UK\'s most affordable private tutoring',
        bgColor: '#1D1A63',
        textColor: '#FFFFFF',
      },
      {
        label: 'Navy - "2 grades higher"',
        headline: '2 grades higher in 12 weeks. Guaranteed.',
        bgColor: '#1D1A63',
        textColor: '#FFFFFF',
      },
      {
        label: 'Gold - "From £5/lesson"',
        headline: 'Expert tutoring from £5 per lesson',
        bgColor: '#DBB539',
        textColor: '#000000',
        ctaText: 'Get Started',
      },
      {
        label: 'Navy - "Get your child ahead"',
        headline: 'Get your child ahead',
        bgColor: '#1D1A63',
        textColor: '#FFFFFF',
      },
      {
        label: 'Gold - "No contracts"',
        headline: 'No contracts. Real results.',
        bgColor: '#DBB539',
        textColor: '#000000',
      },
      {
        label: 'Navy - "GCSE & A-Level"',
        headline: 'GCSE & A-Level success starts here',
        bgColor: '#1D1A63',
        textColor: '#DBB539',
      },
      {
        label: 'Teal - "Maths Private Tutoring"',
        headline: 'Maths Private Tutoring',
        bgColor: '#0D9488',
        textColor: '#FFFFFF',
        priceLine: 'from £5 per lesson',
      },
      {
        label: 'Teal - "English Private Tutoring"',
        headline: 'English Private Tutoring',
        bgColor: '#0D9488',
        textColor: '#FFFFFF',
        priceLine: 'from £5 per lesson',
      },
      {
        label: 'Orange - "Most loved service"',
        headline: 'The UK\'s most loved private tutoring service',
        bgColor: '#E85D26',
        textColor: '#FFFFFF',
        trustBadge: 'Trusted by 3,000+ families',
      },
      {
        label: 'Navy - "Don\'t wait"',
        headline: 'Don\'t wait until your child is behind',
        bgColor: '#1D1A63',
        textColor: '#FFFFFF',
      },
    ],
  },
  {
    id: 'testimonial',
    name: 'Testimonial',
    component: Testimonial,
    description: 'Parent review + Trustpilot stars',
    defaults: {
      headline: 'MobileTutors gave my son extra confidence in Maths GCSE when he was really struggling.',
      bgColor: '#FAFBFF',
      textColor: '#1D1A63',
      ctaText: 'Book Free Consultation',
      priceLine: '',
      trustBadge: 'Excellent - 4.9/5',
      logoPosition: 'top',
      attribution: 'Liz, Parent - Verified Review',
      heroImage: '',
    },
    variants: [
      {
        label: 'White - "Confidence in Maths"',
        headline: 'MobileTutors gave my son extra confidence in Maths GCSE when he was really struggling.',
        bgColor: '#FAFBFF',
        textColor: '#1D1A63',
        attribution: 'Liz, Parent - Verified Review',
      },
      {
        label: 'White - "Daughter progressing"',
        headline: 'Having private online lessons has helped my daughter progress more quickly than we ever expected.',
        bgColor: '#FAFBFF',
        textColor: '#1D1A63',
        attribution: 'Mrs. Parent - Verified Review',
      },
      {
        label: 'White - "Focused and tailored"',
        headline: 'The online format works brilliantly - it\'s focused, convenient, and tailored exactly to what my son needs.',
        bgColor: '#FAFBFF',
        textColor: '#1D1A63',
        attribution: 'Mark, Parent - Verified Review',
      },
      {
        label: 'White - "Couldn\'t be happier"',
        headline: 'I couldn\'t be happier with my child\'s progress since starting with MobileTutors.',
        bgColor: '#FAFBFF',
        textColor: '#1D1A63',
        attribution: 'Sarah, Parent - Verified Review',
      },
    ],
  },
  {
    id: 'guarantee-results',
    name: 'Guarantee',
    component: GuaranteeResults,
    description: 'Bold guarantee + proof points',
    defaults: {
      headline: '2 grades higher in 12 weeks. Guaranteed.',
      bgColor: '#1D1A63',
      textColor: '#FFFFFF',
      ctaText: 'Book Free Consultation',
      priceLine: 'From \u00A35 per lesson',
      trustBadge: 'Excellent - 4.9/5',
      subheadline: 'Structured. Proven. Examiner-led.',
      logoPosition: 'top',
      heroImage: '',
    },
    variants: [
      {
        label: 'Navy - "2 grades higher"',
        headline: '2 grades higher in 12 weeks. Guaranteed.',
        bgColor: '#1D1A63',
        textColor: '#FFFFFF',
        subheadline: 'Structured. Proven. Examiner-led.',
      },
      {
        label: 'Navy - "Secure a 2-grade jump"',
        headline: 'Secure a 2-grade jump in 12 weeks. Guaranteed.',
        bgColor: '#1D1A63',
        textColor: '#FFFFFF',
        subheadline: 'With examiner-led GCSE prep.',
      },
      {
        label: 'Navy - "Guaranteed improvement"',
        headline: 'Guaranteed grade improvement in 12 weeks',
        bgColor: '#1D1A63',
        textColor: '#DBB539',
        subheadline: 'Live lessons. Mock exams. Unlimited support.',
      },
      {
        label: 'Gold - "Jump 2 grades"',
        headline: 'Jump 2 grades in 12 weeks guaranteed',
        bgColor: '#DBB539',
        textColor: '#000000',
        subheadline: 'With structured GCSE exam preparation.',
      },
      {
        label: 'Navy - "GCSE & A-Level success"',
        headline: 'GCSE & A-Level success starts here',
        bgColor: '#1D1A63',
        textColor: '#FFFFFF',
        subheadline: 'Qualified teachers. No contract. From \u00A35/lesson.',
      },
    ],
  },
]

const FORMATS = [
  { id: 'square', label: '1080 x 1080', width: 1080, height: 1080 },
  { id: 'story', label: '1080 x 1920', width: 1080, height: 1920 },
]

const SAFE_ZONES = {
  story: { top: 0.14, bottom: 0.20 },
  reels: { top: 0.14, bottom: 0.35 },
}

export default function MobileTutorsApp({ onBack }) {
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

  // QC scale: saved per template+variant+format, synced to server + localStorage
  const scaleKey = `qc_mt_${template.id}_${selectedVariant}_${format.id}`
  const [qcScale, setQcScaleRaw] = useState(1.0)
  const [serverScales, setServerScales] = useState({})

  useEffect(() => {
    fetch('/api/scales').then(r => r.json()).then(data => {
      setServerScales(data)
    }).catch(() => {
      const local = {}
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k.startsWith('qc_mt_')) local[k] = parseFloat(localStorage.getItem(k))
      }
      setServerScales(local)
    })
  }, [])

  useEffect(() => {
    const saved = serverScales[scaleKey]
    setQcScaleRaw(saved != null ? parseFloat(saved) : 1.0)
  }, [scaleKey, serverScales])

  const setQcScale = useCallback((val) => {
    const v = typeof val === 'function' ? val(qcScale) : val
    setQcScaleRaw(v)
    setServerScales(prev => ({ ...prev, [scaleKey]: v }))
    localStorage.setItem(scaleKey, String(v))
    fetch('/api/scales/' + encodeURIComponent(scaleKey), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: v }),
    }).catch(() => {})
  }, [scaleKey, qcScale])

  // Element position overrides
  const overridesKey = `ov_mt_${template.id}_${selectedVariant}_${format.id}`
  const [elementOverrides, setElementOverrides] = useState({})

  useEffect(() => {
    fetch('/api/scales').then(r => r.json()).then(data => {
      const ovKeys = Object.keys(data).filter(k => k.startsWith('ov_mt_'))
      const ovData = {}
      ovKeys.forEach(k => { ovData[k] = data[k] })
      setElementOverrides(prev => ({ ...prev, ...ovData }))
    }).catch(() => {})
  }, [])

  const currentOverrides = elementOverrides[overridesKey] || {}

  const setOverride = useCallback((propKey, value) => {
    const updated = { ...currentOverrides, [propKey]: value }
    Object.keys(updated).forEach(k => { if (updated[k] === 0) delete updated[k] })
    setElementOverrides(prev => ({ ...prev, [overridesKey]: updated }))
    localStorage.setItem(overridesKey, JSON.stringify(updated))
    fetch('/api/scales/' + encodeURIComponent(overridesKey), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: updated }),
    }).catch(() => {})
  }, [overridesKey, currentOverrides])

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
      const name = `mobiletutors_${template.id}_${format.id}_v${selectedVariant + 1}.png`
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
          const name = `mobiletutors_${template.id}_${f.id}_v${vi + 1}.png`
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
        {onBack && (
          <button className="back-btn" onClick={onBack} title="Back to clients">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <img src="/assets/mobile-tutors/logo-dark.png" alt="Mobile Tutors" className="app-logo" />
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
              <label>
                CTA Text
                <input
                  type="text"
                  value={customProps.ctaText ?? adProps.ctaText}
                  onChange={e => setCustomProps(p => ({ ...p, ctaText: e.target.value }))}
                />
              </label>
              <label>
                Price Line
                <input
                  type="text"
                  value={customProps.priceLine ?? adProps.priceLine}
                  onChange={e => setCustomProps(p => ({ ...p, priceLine: e.target.value }))}
                />
              </label>
              <label>
                Trust Badge
                <input
                  type="text"
                  value={customProps.trustBadge ?? adProps.trustBadge}
                  onChange={e => setCustomProps(p => ({ ...p, trustBadge: e.target.value }))}
                />
              </label>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={(customProps.logoPosition ?? adProps.logoPosition) === 'bottom'}
                  onChange={e => setCustomProps(p => ({ ...p, logoPosition: e.target.checked ? 'bottom' : 'top' }))}
                />
                Logo at bottom
              </label>
            </div>
            <HeadlineGenerator
              mode="single"
              onSelectHeadline={(h) => setCustomProps(p => ({ ...p, headline: h }))}
            />
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

          <section className="control-section">
            <h2>Adjust Elements</h2>
            <ElementAdjuster
              templateId={template.id}
              overrides={currentOverrides}
              onOverrideChange={setOverride}
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
                ov={currentOverrides}
              />
            </div>
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
