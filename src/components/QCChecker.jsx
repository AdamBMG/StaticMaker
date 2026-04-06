import { useState, useEffect, useCallback } from 'react'
import './QCChecker.css'

const BENCHMARKS = {
  'box-hero': { name: 'Box Hero', targetCoverage: 0.60, maxWhitespace: 0.10 },
  'feature-points': { name: 'Feature Points', targetCoverage: 0.30, maxWhitespace: 0.15 },
  'pricing-tier': { name: 'Pricing Tiers', targetCoverage: 0.55, maxWhitespace: 0.10 },
  'testimonial': { name: 'Testimonial', targetCoverage: 0.50, maxWhitespace: 0.12 },
  'country-grid': { name: 'Country Grid', targetCoverage: 0.45, maxWhitespace: 0.10 },
  'numbered-steps': { name: 'Numbered Steps', targetCoverage: 0.35, maxWhitespace: 0.15 },
  'typo-wallpaper': { name: 'Typographic Wallpaper', targetCoverage: 0.50, maxWhitespace: 0.05 },
  'starter-pack': { name: 'Starter Pack', targetCoverage: 0.40, maxWhitespace: 0.15 },
}

function measure(el, width, height) {
  if (!el) return null
  const images = el.querySelectorAll('img:not([class*="logo"]):not([class*="tp-svg"]):not([class*="trustpilot"])')
  let totalImageArea = 0
  const canvasArea = width * height
  const parentRect = el.getBoundingClientRect()
  const scale = width / parentRect.width

  images.forEach(img => {
    const rect = img.getBoundingClientRect()
    const w = rect.width * scale
    const h = rect.height * scale
    if (w > 20 && h > 20) totalImageArea += w * h
  })

  return {
    coverage: Math.min(totalImageArea / canvasArea, 1.0),
    whitespace: Math.max(0, 1 - (totalImageArea * 1.3) / canvasArea),
  }
}

export default function QCChecker({ templateId, adRef, width, height, onApplyFix, qcApplied, onToggleQC }) {
  const [results, setResults] = useState(null)

  const benchmark = BENCHMARKS[templateId]

  const runCheck = useCallback(() => {
    if (!adRef?.current || !benchmark) return
    setTimeout(() => {
      const m = measure(adRef.current, width, height)
      if (!m) return

      const issues = []
      const passes = []
      let needsScale = 1.0

      // Coverage check
      if (m.coverage < benchmark.targetCoverage) {
        // Calculate how much to scale: if at 40% and need 60%, scale = 60/40 = 1.5
        // But since coverage scales with area (square of linear scale), use sqrt
        needsScale = Math.sqrt(benchmark.targetCoverage / Math.max(m.coverage, 0.01))
        // Cap at 2x to avoid insane scaling
        needsScale = Math.min(needsScale, 2.0)

        issues.push({
          type: 'size',
          message: `Product: ${(m.coverage * 100).toFixed(0)}% coverage (target: ${(benchmark.targetCoverage * 100).toFixed(0)}%+)`,
          fix: `Scale product by ${(needsScale).toFixed(2)}x`,
        })
      } else {
        passes.push(`Product: ${(m.coverage * 100).toFixed(0)}% coverage`)
      }

      // Whitespace check
      if (m.whitespace > benchmark.maxWhitespace) {
        issues.push({
          type: 'whitespace',
          message: `Whitespace: ~${(m.whitespace * 100).toFixed(0)}% (max: ${(benchmark.maxWhitespace * 100).toFixed(0)}%)`,
          fix: 'Increase product size',
        })
      } else {
        passes.push(`Whitespace: ~${(m.whitespace * 100).toFixed(0)}%`)
      }

      setResults({ issues, passes, coverage: m.coverage, needsScale })
    }, 400)
  }, [adRef, width, height, benchmark, templateId])

  // Auto-run when template/format changes
  useEffect(() => {
    setResults(null)
    runCheck()
  }, [templateId, width, height, runCheck])

  if (!benchmark) return null

  const hasIssues = results?.issues?.length > 0
  const canFix = results?.needsScale > 1.05

  return (
    <div className="qc-checker">
      <div className="qc-header">
        <button className="qc-btn" onClick={runCheck}>Re-check</button>
        {canFix && !qcApplied && (
          <button className="qc-fix-btn" onClick={() => onApplyFix(results.needsScale)}>
            Apply Fix ({results.needsScale.toFixed(2)}x)
          </button>
        )}
        {qcApplied && (
          <button className="qc-toggle-btn" onClick={onToggleQC}>
            Show Original
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
                <div key={i} className="qc-issue qc-high">
                  <span className="qc-icon">!!</span>
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
