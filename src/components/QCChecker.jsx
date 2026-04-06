import { useState } from 'react'
import './QCChecker.css'

// Benchmarks derived from analysing ~15 real SnackVerse ads in the Drive folder
const BENCHMARKS = {
  'box-hero': {
    name: 'Box Hero',
    headlineZone: { maxEnd: 0.30 },      // Headline should end by 30% down
    productZone: { minStart: 0.20 },       // Product should start by 20% down
    productCoverage: { min: 0.60 },        // Product should cover 60%+ of canvas
    maxWhitespace: 0.10,                    // No more than 10% pure whitespace
    allowTextOverProduct: true,             // Real ads have headline over box top
    allowProductBleed: true,               // Real ads bleed off edges
  },
  'feature-points': {
    name: 'Feature Points',
    headlineZone: { maxEnd: 0.35 },
    productZone: { minStart: 0.40 },
    productCoverage: { min: 0.30 },
    maxWhitespace: 0.15,
    allowTextOverProduct: false,
    allowProductBleed: false,
  },
  'pricing-tier': {
    name: 'Pricing Tiers',
    headlineZone: { maxEnd: 0.20 },
    productZone: { minStart: 0.18 },
    productCoverage: { min: 0.55 },
    maxWhitespace: 0.10,
    allowTextOverProduct: false,
    allowProductBleed: false,
  },
  'testimonial': {
    name: 'Testimonial',
    headlineZone: { maxEnd: 0.30 },
    productZone: { minStart: 0.28 },
    productCoverage: { min: 0.50 },
    maxWhitespace: 0.12,
    allowTextOverProduct: false,
    allowProductBleed: true,               // Real testimonials have product bleeding
  },
  'country-grid': {
    name: 'Country Grid',
    headlineZone: { maxEnd: 0.90 },        // Headline at bottom
    productCoverage: { min: 0.45 },
    maxWhitespace: 0.10,
    allowTextOverProduct: false,
    allowProductBleed: false,
  },
  'numbered-steps': {
    name: 'Numbered Steps',
    headlineZone: { maxEnd: 0.25 },
    productCoverage: { min: 0.35 },
    maxWhitespace: 0.15,
    allowTextOverProduct: false,
    allowProductBleed: false,
  },
  'typo-wallpaper': {
    name: 'Typographic Wallpaper',
    headlineZone: { maxEnd: 0.28 },
    productZone: { minStart: 0.25 },
    productCoverage: { min: 0.50 },
    maxWhitespace: 0.05,                    // Very little whitespace - bg text fills it
    allowTextOverProduct: true,             // Bg text is behind product
    allowProductBleed: true,
  },
  'starter-pack': {
    name: 'Starter Pack',
    headlineZone: { maxEnd: 0.25 },
    productCoverage: { min: 0.40 },
    maxWhitespace: 0.15,
    allowTextOverProduct: false,
    allowProductBleed: false,
  },
}

export default function QCChecker({ templateId, adRef, width, height }) {
  const [results, setResults] = useState(null)
  const [running, setRunning] = useState(false)

  const benchmark = BENCHMARKS[templateId]

  const runCheck = async () => {
    if (!adRef?.current || !benchmark) return
    setRunning(true)

    const el = adRef.current
    const issues = []
    const passes = []

    // 1. Measure whitespace by sampling the background colour
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    // Get all positioned elements
    const children = el.querySelectorAll('img, div[class*="headline"], div[class*="quote"], div[class*="points"], div[class*="cards"], div[class*="grid"], div[class*="steps"], div[class*="cta"]')

    let totalContentArea = 0
    const rects = []

    children.forEach(child => {
      const rect = child.getBoundingClientRect()
      const parentRect = el.getBoundingClientRect()
      const scale = width / parentRect.width

      const r = {
        left: (rect.left - parentRect.left) * scale,
        top: (rect.top - parentRect.top) * scale,
        width: rect.width * scale,
        height: rect.height * scale,
        isImage: child.tagName === 'IMG',
        isText: !child.tagName !== 'IMG',
        className: child.className,
      }

      // Only count visible elements
      if (r.width > 10 && r.height > 10) {
        rects.push(r)
        // Clamp to canvas bounds
        const visW = Math.min(r.left + r.width, width) - Math.max(r.left, 0)
        const visH = Math.min(r.top + r.height, height) - Math.max(r.top, 0)
        if (visW > 0 && visH > 0) {
          totalContentArea += visW * visH
        }
      }
    })

    const canvasArea = width * height
    const coverageRatio = Math.min(totalContentArea / canvasArea, 1)
    const whitespaceRatio = 1 - coverageRatio

    // 2. Check product images specifically
    const images = el.querySelectorAll('img:not([class*="logo"])')
    let totalImageArea = 0
    let imageClipped = false

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

      // Check if image is clipped
      if (imgRect.left < -5 || imgRect.top < -5 ||
          imgRect.left + imgRect.width > width + 5 ||
          imgRect.top + imgRect.height > height + 5) {
        if (!benchmark.allowProductBleed) {
          imageClipped = true
        }
      }
    })

    const imageCoverage = totalImageArea / canvasArea

    // 3. Run checks against benchmarks
    if (benchmark.productCoverage && imageCoverage < benchmark.productCoverage.min) {
      issues.push({
        type: 'size',
        severity: 'high',
        message: `Product too small: ${(imageCoverage * 100).toFixed(0)}% coverage (need ${(benchmark.productCoverage.min * 100).toFixed(0)}%+)`,
        suggestion: `Increase product size by ~${((benchmark.productCoverage.min - imageCoverage) / imageCoverage * 100).toFixed(0)}%`,
      })
    } else if (benchmark.productCoverage) {
      passes.push(`Product coverage: ${(imageCoverage * 100).toFixed(0)}% (target: ${(benchmark.productCoverage.min * 100).toFixed(0)}%+)`)
    }

    if (whitespaceRatio > benchmark.maxWhitespace) {
      issues.push({
        type: 'whitespace',
        severity: 'medium',
        message: `Too much empty space: ~${(whitespaceRatio * 100).toFixed(0)}% (max ${(benchmark.maxWhitespace * 100).toFixed(0)}%)`,
        suggestion: 'Increase product size or add decorative elements',
      })
    } else {
      passes.push(`Whitespace: ~${(whitespaceRatio * 100).toFixed(0)}% (max: ${(benchmark.maxWhitespace * 100).toFixed(0)}%)`)
    }

    if (imageClipped) {
      issues.push({
        type: 'clipping',
        severity: 'high',
        message: 'Product image is clipped/cut off at the edge',
        suggestion: 'Move image inward or reduce size so it stays fully visible',
      })
    } else {
      passes.push('No image clipping detected')
    }

    setResults({ issues, passes, metrics: { imageCoverage, whitespaceRatio, totalContentArea, canvasArea } })
    setRunning(false)
  }

  if (!benchmark) return null

  return (
    <div className="qc-checker">
      <button className="qc-btn" onClick={runCheck} disabled={running}>
        {running ? 'Checking...' : 'Run QC Check'}
      </button>

      {results && (
        <div className="qc-results">
          {results.issues.length === 0 ? (
            <div className="qc-pass-all">All checks passed</div>
          ) : (
            <div className="qc-issues">
              {results.issues.map((issue, i) => (
                <div key={i} className={`qc-issue qc-${issue.severity}`}>
                  <span className="qc-icon">{issue.severity === 'high' ? '!!' : '!'}</span>
                  <div>
                    <div className="qc-msg">{issue.message}</div>
                    <div className="qc-fix">{issue.suggestion}</div>
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
        </div>
      )}
    </div>
  )
}
