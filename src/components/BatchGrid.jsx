import { useState, useRef, useCallback } from 'react'
import { toPng } from 'html-to-image'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import BoxHero from '../templates/BoxHero'
import FeaturePoints from '../templates/FeaturePoints'
import PricingTier from '../templates/PricingTier'
import Testimonial from '../templates/Testimonial'
import CountryGrid from '../templates/CountryGrid'
import NumberedSteps from '../templates/NumberedSteps'
import TypographicWallpaper from '../templates/TypographicWallpaper'
import StarterPack from '../templates/StarterPack'
import './BatchGrid.css'

const COMPONENTS = {
  'box-hero': BoxHero,
  'feature-points': FeaturePoints,
  'pricing-tier': PricingTier,
  'testimonial': Testimonial,
  'country-grid': CountryGrid,
  'numbered-steps': NumberedSteps,
  'typo-wallpaper': TypographicWallpaper,
  'starter-pack': StarterPack,
}

const DEFAULTS = {
  'box-hero': { boxImage: '/assets/boxes/box_mobile.png', showLogo: true },
  'feature-points': { boxImage: '/assets/boxes/box_mobile.png', point1: 'From £7.99/month', point2: 'Up to 20+ snacks', point3: 'Free UK shipping', accentColor: '#FFD700' },
  'pricing-tier': {},
  'testimonial': { productImage: '/assets/boxes/box_mobile.png', showTrustpilot: true },
  'country-grid': {},
  'numbered-steps': { boxImage: '/assets/boxes/box_mobile.png' },
  'typo-wallpaper': { boxImage: '/assets/boxes/box_mobile.png', bgText: 'SNACKVERSE', bgTextColor: 'rgba(0,0,0,0.1)' },
  'starter-pack': {},
}

const FORMATS = {
  square: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
}

export default function BatchGrid({ ads, onBack }) {
  const [selected, setSelected] = useState(() => new Set(ads.map((_, i) => i)))
  const [exporting, setExporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [previewIdx, setPreviewIdx] = useState(null)
  const renderRef = useRef(null)

  const toggleSelect = (idx) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const selectAll = () => setSelected(new Set(ads.map((_, i) => i)))
  const selectNone = () => setSelected(new Set())

  const exportZip = useCallback(async () => {
    if (!renderRef.current) return
    setExporting(true)
    setProgress(0)

    const zip = new JSZip()
    const selectedAds = ads.filter((_, i) => selected.has(i))
    const total = selectedAds.length

    for (let i = 0; i < selectedAds.length; i++) {
      const ad = selectedAds[i]
      setProgress(Math.round((i / total) * 100))

      // Wait for render
      await new Promise(r => setTimeout(r, 100))

      // Render the ad off-screen
      const container = renderRef.current
      const fmt = FORMATS[ad.format]
      const Component = COMPONENTS[ad.templateId]
      if (!Component) continue

      // Create temporary render element
      const tempDiv = document.createElement('div')
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.style.width = fmt.width + 'px'
      tempDiv.style.height = fmt.height + 'px'
      tempDiv.style.overflow = 'hidden'
      document.body.appendChild(tempDiv)

      // Use ReactDOM to render
      const { createRoot } = await import('react-dom/client')
      const root = createRoot(tempDiv)

      const props = {
        ...DEFAULTS[ad.templateId],
        headline: ad.headline,
        bgColor: ad.bgColor,
        textColor: ad.textColor,
        width: fmt.width,
        height: fmt.height,
        format: ad.format,
        qcScale: 1.0,
      }

      // For typo-wallpaper, set bgText from headline
      if (ad.templateId === 'typo-wallpaper') {
        props.bgText = ad.headline.toUpperCase().replace(/[.!?]/g, '')
        props.bgTextColor = ad.bgColor === '#FFD700' ? '#FF7A00' : 'rgba(255,255,255,0.15)'
      }

      root.render(<Component {...props} />)
      await new Promise(r => setTimeout(r, 300))

      try {
        const dataUrl = await toPng(tempDiv, {
          width: fmt.width,
          height: fmt.height,
          pixelRatio: 1,
        })
        const data = dataUrl.split(',')[1]
        zip.file(ad.fileName + '.png', data, { base64: true })
      } catch (err) {
        console.error('Export failed for', ad.fileName, err)
      }

      root.unmount()
      document.body.removeChild(tempDiv)
    }

    setProgress(100)
    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, `${ads[0]?.batchName || 'batch'}_statics.zip`)
    setExporting(false)
    setProgress(0)
  }, [ads, selected])

  const previewAd = previewIdx != null ? ads[previewIdx] : null
  const PreviewComponent = previewAd ? COMPONENTS[previewAd.templateId] : null
  const previewFmt = previewAd ? FORMATS[previewAd.format] : null

  return (
    <div className="batch-grid-container">
      {/* Toolbar */}
      <div className="batch-toolbar">
        <button className="batch-back-btn" onClick={onBack}>Back</button>
        <span className="batch-info">
          {selected.size}/{ads.length} selected
        </span>
        <button className="batch-sel-btn" onClick={selectAll}>All</button>
        <button className="batch-sel-btn" onClick={selectNone}>None</button>
        <button
          className="batch-export-btn"
          onClick={exportZip}
          disabled={exporting || selected.size === 0}
        >
          {exporting ? `Exporting ${progress}%` : `Export ZIP (${selected.size})`}
        </button>
      </div>

      {/* Progress bar */}
      {exporting && (
        <div className="batch-progress">
          <div className="batch-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Grid + Preview layout */}
      <div className="batch-layout">
        {/* Thumbnail grid */}
        <div className="batch-thumbs">
          {ads.map((ad, i) => {
            const Component = COMPONENTS[ad.templateId]
            const fmt = FORMATS[ad.format]
            if (!Component) return null
            const thumbScale = 160 / fmt.width

            return (
              <div
                key={i}
                className={`batch-thumb ${selected.has(i) ? 'selected' : ''} ${previewIdx === i ? 'previewing' : ''}`}
                onClick={() => setPreviewIdx(i)}
              >
                <div className="batch-thumb-check" onClick={e => { e.stopPropagation(); toggleSelect(i) }}>
                  {selected.has(i) ? '!' : ''}
                </div>
                <div
                  className="batch-thumb-canvas"
                  style={{
                    width: fmt.width * thumbScale,
                    height: fmt.height * thumbScale,
                  }}
                >
                  <div style={{
                    width: fmt.width,
                    height: fmt.height,
                    transform: `scale(${thumbScale})`,
                    transformOrigin: 'top left',
                    overflow: 'hidden',
                  }}>
                    <Component
                      {...DEFAULTS[ad.templateId]}
                      headline={ad.headline}
                      bgColor={ad.bgColor}
                      textColor={ad.textColor}
                      width={fmt.width}
                      height={fmt.height}
                      format={ad.format}
                      qcScale={1.0}
                      {...(ad.templateId === 'typo-wallpaper' ? {
                        bgText: ad.headline.toUpperCase().replace(/[.!?]/g, ''),
                        bgTextColor: ad.bgColor === '#FFD700' ? '#FF7A00' : 'rgba(255,255,255,0.15)',
                      } : {})}
                    />
                  </div>
                </div>
                <div className="batch-thumb-label">
                  {ad.id} - {ad.format === 'story' ? '9:16' : '1:1'}
                </div>
              </div>
            )
          })}
        </div>

        {/* Preview panel */}
        {previewAd && PreviewComponent && previewFmt && (
          <div className="batch-preview">
            <div className="batch-preview-label">
              {previewAd.fileName} ({previewFmt.width}x{previewFmt.height})
            </div>
            <div
              ref={renderRef}
              className="batch-preview-canvas"
              style={{
                width: previewFmt.width * 0.4,
                height: previewFmt.height * 0.4,
              }}
            >
              <div style={{
                width: previewFmt.width,
                height: previewFmt.height,
                transform: 'scale(0.4)',
                transformOrigin: 'top left',
                overflow: 'hidden',
              }}>
                <PreviewComponent
                  {...DEFAULTS[previewAd.templateId]}
                  headline={previewAd.headline}
                  bgColor={previewAd.bgColor}
                  textColor={previewAd.textColor}
                  width={previewFmt.width}
                  height={previewFmt.height}
                  format={previewAd.format}
                  qcScale={1.0}
                  {...(previewAd.templateId === 'typo-wallpaper' ? {
                    bgText: previewAd.headline.toUpperCase().replace(/[.!?]/g, ''),
                    bgTextColor: previewAd.bgColor === '#FFD700' ? '#FF7A00' : 'rgba(255,255,255,0.15)',
                  } : {})}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
