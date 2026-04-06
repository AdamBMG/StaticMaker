import { useState, useEffect, useCallback } from 'react'
import './QCChecker.css'

const BENCHMARKS = {
  'box-hero': {
    name: 'Box Hero',
    productCoverage: { min: 0.60 },
    maxWhitespace: 0.10,
    allowProductBleed: true,
    sizeMultiplierKey: 'boxScale',
  },
  'feature-points': {
    name: 'Feature Points',
    productCoverage: { min: 0.30 },
    maxWhitespace: 0.15,
    allowProductBleed: false,
    sizeMultiplierKey: 'boxScale',
  },
  'pricing-tier': {
    name: 'Pricing Tiers',
    productCoverage: { min: 0.55 },
    maxWhitespace: 0.10,
    allowProductBleed: false,
    sizeMultiplierKey: 'cardScale',
  },
  'testimonial': {
    name: 'Testimonial',
    productCoverage: { min: 0.50 },
    maxWhitespace: 0.12,
    allowProductBleed: true,
    sizeMultiplierKey: 'boxScale',
  },
  'country-grid': {
    name: 'Country Grid',
    productCoverage: { min: 0.45 },
    maxWhitespace: 0.10,
    allowProductBleed: false,
    sizeMultiplierKey: 'gridScale',
  },
  'numbered-steps': {
    name: 'Numbered Steps',
    productCoverage: { min: 0.35 },
    maxWhitespace: 0.15,
    allowProductBleed: false,
    sizeMultiplierKey: 'boxScale',
  },
  'typo-wallpaper': {
    name: 'Typographic Wallpaper',
    productCoverage: { min: 0.50 },
    maxWhitespace: 0.05,
    allowProductBleed: true,
    sizeMultiplierKey: 'boxScale',
  },
  'starter-pack': {
    name: 'Starter Pack',
    productCoverage: { min: 0.40 },
    maxWhitespace: 0.15,
    allowProductBleed: false,
    sizeMultiplierKey: 'productScale',
  },
}

function measureAd(el, width, height, benchmark) {
  if (!el || !benchmark) return null

  const images = el.querySelectorAll('img:not([class*="logo"])')
  let totalImageArea = 0
  let imageClipped = false
  const canvasArea = width * height

  images.forEach(img => {
    const rect = img.getBoundingClientRect()
    const parentRect = el.getBoundingClientRect()
    const scale = width / parentRect.width

    const imgRect = {
      left: (rect.left - parentRect.left) * scale,
      top: (rect.top - parentRect.top) * scale,
      width: rect.width * scale,
      height: rect.height * scale,
    }

    const visW = Math.min(imgRect.left + imgRect.width, width) - Math.max(imgRect.left, 0)
    const visH = Math.min(imgRect.top + imgRect.height, height) - Math.max(imgRect.top, 0)

    if (visW > 0 && visH > 0) {
      totalImageArea += visW * visH
    }

    if (imgRect.left < -5 || imgRect.top < -5 ||
        imgRect.left + imgRect.width > width + 5 ||
        imgRect.top + imgRect.height > height + 5) {
      if (!benchmark.allowProductBleed) {
        imageClipped = true
      }
    }
  })

  const imageCoverage = totalImageArea / canvasArea
  const whitespaceRatio = Math.max(0, 1 - (totalImageArea * 1.4) / canvasArea) // rough estimate with text

  const issues = []
  const passes = []
  let sizeMultiplier = 1.0

  if (benchmark.productCoverage && imageCoverage < benchmark.productCoverage.min) {
    const needed = benchmark.productCoverage.min
    sizeMultiplier = Math.sqrt(needed / Math.max(imageCoverage, 0.05))
    issues.push({
      type: 'size',
      severity: 'high',
      message: `Product: ${(imageCoverage * 100).toFixed(0)}% (need ${(needed * 100).toFixed(0)}%+)`,
      fix: `Scale up by ${((sizeMultiplier - 1) * 100).toFixed(0)}%`,
      multiplier: sizeMultiplier,
    })
  } else if (benchmark.productCoverage) {
    passes.push(`Product: ${(imageCoverage * 100).toFixed(0)}%`)
  }

  if (whitespaceRatio > benchmark.maxWhitespace) {
    issues.push({
      type: 'whitespace',
      severity: 'medium',
      message: `Whitespace: ~${(whitespaceRatio * 100).toFixed(0)}% (max ${(benchmark.maxWhitespace * 100).toFixed(0)}%)`,
      fix: 'Increase product size',
    })
  } else {
    passes.push(`Whitespace: ~${(whitespaceRatio * 100).toFixed(0)}%`)
  }

  if (imageClipped) {
    issues.push({
      type: 'clipping',
      severity: 'high',
      message: 'Product clipped at edge',
      fix: 'Move inward',
    })
  } else {
    passes.push('No clipping')
  }

  return { issues, passes, imageCoverage, whitespaceRatio, sizeMultiplier }
}

export default function QCChecker({ templateId, adRef, width, height, onApplyFix, qcApplied, onToggleQC }) {
  const [results, setResults] = useState(null)
  const [autoRan, setAutoRan] = useState(false)

  const benchmark = BENCHMARKS[templateId]

  const runCheck = useCallback(() => {
    if (!adRef?.current || !benchmark) return
    // Small delay to let render settle
    setTimeout(() => {
      const r = measureAd(adRef.current, width, height, benchmark)
      setResults(r)
      setAutoRan(true)
    }, 300)
  }, [adRef, width, height, benchmark, templateId])

  // Auto-run on template/format change
  useEffect(() => {
    setAutoRan(false)
    setResults(null)
    const timer = setTimeout(runCheck, 500)
    return () => clearTimeout(timer)
  }, [templateId, width, height, runCheck])

  if (!benchmark) return null

  const hasIssues = results?.issues?.length > 0
  const hasSizeFix = results?.sizeMultiplier > 1.05

  return (
    <div className="qc-checker">
      <div className="qc-header">
        <button className="qc-btn" onClick={runCheck}>
          Re-check
        </button>
        {hasSizeFix && !qcApplied && (
          <button className="qc-fix-btn" onClick={() => onApplyFix(results.sizeMultiplier)}>
            Apply Fix
          </button>
        )}
        {qcApplied && (
          <button className="qc-toggle-btn" onClick={onToggleQC}>
            {qcApplied ? 'Show Original' : 'Show QC Fixed'}
          </button>
        )}
      </div>

      {results && (
        <div className="qc-results">
          {!hasIssues ? (
            <div className="qc-pass-all">All checks passed</div>
          ) : (
            <div className="qc-issues">
              {results.issues.map((issue, i) => (
                <div key={i} className={`qc-issue qc-${issue.severity}`}>
                  <span className="qc-icon">{issue.severity === 'high' ? '!!' : '!'}</span>
                  <div>
                    <div className="qc-msg">{issue.message}</div>
                    <div className="qc-fix">{issue.fix}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="qc-passes">
            {results.passes.map((pass, i) => (
              <div key={i} className="qc-pass-item">{pass}</div>
            ))}
          </div>
          {qcApplied && <div className="qc-applied-badge">QC Fix Applied</div>}
        </div>
      )}
    </div>
  )
}
