import { useState, useEffect, useCallback } from 'react'
import './QCChecker.css'

const BENCHMARKS = {
  'box-hero': { targetCoverage: 0.60, maxWhitespace: 0.10 },
  'feature-points': { targetCoverage: 0.30, maxWhitespace: 0.15 },
  'pricing-tier': { targetCoverage: 0.55, maxWhitespace: 0.10 },
  'testimonial': { targetCoverage: 0.50, maxWhitespace: 0.12 },
  'country-grid': { targetCoverage: 0.45, maxWhitespace: 0.10 },
  'numbered-steps': { targetCoverage: 0.35, maxWhitespace: 0.15 },
  'typo-wallpaper': { targetCoverage: 0.50, maxWhitespace: 0.05 },
  'starter-pack': { targetCoverage: 0.40, maxWhitespace: 0.15 },
}

function measure(el, width, height) {
  if (!el) return null
  const images = el.querySelectorAll('img:not([class*="logo"]):not([class*="tp-svg"]):not([class*="trustpilot"])')
  let totalArea = 0
  const canvasArea = width * height
  const parentRect = el.getBoundingClientRect()
  const s = width / parentRect.width

  images.forEach(img => {
    const r = img.getBoundingClientRect()
    const w = r.width * s
    const h = r.height * s
    if (w > 20 && h > 20) totalArea += w * h
  })

  return { coverage: Math.min(totalArea / canvasArea, 1.0) }
}

export default function QCChecker({ templateId, adRef, width, height, qcScale, onScaleChange }) {
  const [results, setResults] = useState(null)
  const benchmark = BENCHMARKS[templateId]

  const runCheck = useCallback(() => {
    if (!adRef?.current || !benchmark) return
    setTimeout(() => {
      const m = measure(adRef.current, width, height)
      if (m) setResults(m)
    }, 300)
  }, [adRef, width, height, benchmark])

  useEffect(() => {
    setResults(null)
    const t = setTimeout(runCheck, 500)
    return () => clearTimeout(t)
  }, [templateId, width, height, runCheck])

  if (!benchmark) return null

  const coverage = results?.coverage ?? 0
  const coverageOk = coverage >= benchmark.targetCoverage
  const coveragePct = (coverage * 100).toFixed(0)
  const targetPct = (benchmark.targetCoverage * 100).toFixed(0)

  return (
    <div className="qc-checker">
      {/* Scale controls - always visible, always work */}
      <div className="qc-scale-row">
        <button className="qc-scale-btn" onClick={() => onScaleChange(Math.max(0.5, qcScale - 0.1))}>-</button>
        <span className="qc-scale-label">{(qcScale * 100).toFixed(0)}%</span>
        <button className="qc-scale-btn" onClick={() => onScaleChange(Math.min(2.0, qcScale + 0.1))}>+</button>
        {qcScale !== 1.0 && (
          <button className="qc-reset-btn" onClick={() => onScaleChange(1.0)}>Reset</button>
        )}
      </div>

      {/* QC status */}
      {results && (
        <div className="qc-status">
          <div className={`qc-metric ${coverageOk ? 'qc-ok' : 'qc-fail'}`}>
            Product: {coveragePct}% {coverageOk ? '' : `(need ${targetPct}%+)`}
          </div>
          {!coverageOk && (
            <button className="qc-auto-fix" onClick={() => {
              const needed = benchmark.targetCoverage / Math.max(coverage, 0.01)
              const newScale = qcScale * Math.sqrt(needed) * 1.1
              onScaleChange(Math.min(2.0, newScale))
            }}>
              Auto-fix to {targetPct}%+
            </button>
          )}
        </div>
      )}

      <button className="qc-recheck" onClick={runCheck}>Re-check</button>
    </div>
  )
}
