import { useState } from 'react'
import { createImageElement } from './useCanvasState'

function genId() {
  return 'el_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)
}

const STARTER_TEMPLATES = [
  {
    name: 'Hero + CTA',
    description: 'Big headline, product box, CTA button',
    build: (cw, ch) => ({
      background: { type: 'solid', color: '#FF7A00', gradientFrom: '#FF7A00', gradientTo: '#6B2FA0', image: null },
      elements: [
        {
          id: genId(), type: 'text',
          x: cw * 0.05, y: ch * 0.05,
          width: cw * 0.9, height: 200,
          rotation: 0, opacity: 1,
          text: 'Worldwide snacks.',
          fontSize: 104, fontFamily: 'Luckiest Guy',
          fill: '#FFFFFF', align: 'left', fontStyle: '',
        },
        {
          id: genId(), type: 'image',
          x: cw * 0.15, y: ch * 0.35,
          width: cw * 0.7, height: ch * 0.55,
          rotation: 0, opacity: 1,
          src: '/assets/boxes/box_mobile.png',
        },
        {
          id: genId(), type: 'rect',
          x: cw * 0.05, y: ch * 0.85,
          width: 320, height: 70,
          rotation: 0, opacity: 1,
          fill: '#FFFFFF', stroke: '', strokeWidth: 0, cornerRadius: 40,
        },
        {
          id: genId(), type: 'text',
          x: cw * 0.05 + 20, y: ch * 0.85 + 14,
          width: 280, height: 50,
          rotation: 0, opacity: 1,
          text: 'From \u00A37.99',
          fontSize: 32, fontFamily: 'Readex Pro',
          fill: '#FF7A00', align: 'center', fontStyle: 'bold',
        },
      ],
    }),
  },
  {
    name: 'Feature Points',
    description: 'Headline + 3 selling points + box',
    build: (cw, ch) => ({
      background: { type: 'gradient', color: '#6B2FA0', gradientFrom: '#6B2FA0', gradientTo: '#3D1660', image: null },
      elements: [
        {
          id: genId(), type: 'text',
          x: cw * 0.05, y: ch * 0.04,
          width: cw * 0.55, height: 160,
          rotation: 0, opacity: 1,
          text: 'New snacks.\nMonthly.',
          fontSize: 72, fontFamily: 'Luckiest Guy',
          fill: '#FFD700', align: 'left', fontStyle: '',
        },
        {
          id: genId(), type: 'text',
          x: cw * 0.05, y: ch * 0.28,
          width: cw * 0.5, height: 200,
          rotation: 0, opacity: 1,
          text: '\u2713 Snacks from 30+ countries\n\u2713 New box every month\n\u2713 Cancel anytime',
          fontSize: 28, fontFamily: 'Readex Pro',
          fill: '#FFFFFF', align: 'left', fontStyle: '',
        },
        {
          id: genId(), type: 'image',
          x: cw * 0.45, y: ch * 0.4,
          width: cw * 0.55, height: ch * 0.58,
          rotation: 0, opacity: 1,
          src: '/assets/boxes/box_mobile.png',
        },
        {
          id: genId(), type: 'rect',
          x: cw * 0.05, y: ch * 0.88,
          width: 260, height: 60,
          rotation: 0, opacity: 1,
          fill: '#FF7A00', stroke: '', strokeWidth: 0, cornerRadius: 35,
        },
        {
          id: genId(), type: 'text',
          x: cw * 0.05 + 15, y: ch * 0.88 + 12,
          width: 230, height: 40,
          rotation: 0, opacity: 1,
          text: 'Order Now',
          fontSize: 26, fontFamily: 'Readex Pro',
          fill: '#FFFFFF', align: 'center', fontStyle: 'bold',
        },
      ],
    }),
  },
  {
    name: 'Testimonial',
    description: 'Customer quote + Trustpilot + product',
    build: (cw, ch) => ({
      background: { type: 'solid', color: '#FFFFFF', gradientFrom: '#FFFFFF', gradientTo: '#F0F0F0', image: null },
      elements: [
        {
          id: genId(), type: 'text',
          x: cw * 0.06, y: ch * 0.06,
          width: 120, height: 100,
          rotation: 0, opacity: 0.15,
          text: '\u201C',
          fontSize: 200, fontFamily: 'Readex Pro',
          fill: '#FF7A00', align: 'left', fontStyle: '',
        },
        {
          id: genId(), type: 'text',
          x: cw * 0.08, y: ch * 0.18,
          width: cw * 0.84, height: 200,
          rotation: 0, opacity: 1,
          text: 'Best subscription box I\'ve ever had. The variety is incredible!',
          fontSize: 44, fontFamily: 'Readex Pro',
          fill: '#222222', align: 'left', fontStyle: 'bold',
        },
        {
          id: genId(), type: 'text',
          x: cw * 0.08, y: ch * 0.45,
          width: cw * 0.6, height: 40,
          rotation: 0, opacity: 0.6,
          text: 'Sarah M. - Verified Buyer',
          fontSize: 22, fontFamily: 'Readex Pro',
          fill: '#444444', align: 'left', fontStyle: '',
        },
        {
          id: genId(), type: 'image',
          x: cw * 0.08, y: ch * 0.52,
          width: 200, height: 38,
          rotation: 0, opacity: 1,
          src: '/assets/brand/trustpilot-stars-5.svg',
        },
        {
          id: genId(), type: 'image',
          x: cw * 0.25, y: ch * 0.58,
          width: cw * 0.55, height: ch * 0.42,
          rotation: 0, opacity: 1,
          src: '/assets/boxes/box_mobile.png',
        },
      ],
    }),
  },
  {
    name: 'Country Box',
    description: 'Country headline + flag box',
    build: (cw, ch) => ({
      background: { type: 'solid', color: '#FFD700', gradientFrom: '#FFD700', gradientTo: '#FF7A00', image: null },
      elements: [
        {
          id: genId(), type: 'image',
          x: cw * 0.06, y: ch * 0.04,
          width: 200, height: 50,
          rotation: 0, opacity: 1,
          src: '/assets/brand/logo-header.png',
        },
        {
          id: genId(), type: 'text',
          x: cw * 0.05, y: ch * 0.12,
          width: cw * 0.9, height: 160,
          rotation: 0, opacity: 1,
          text: 'Japan\nSnack Box',
          fontSize: 96, fontFamily: 'Luckiest Guy',
          fill: '#6B2FA0', align: 'left', fontStyle: '',
        },
        {
          id: genId(), type: 'image',
          x: cw * 0.1, y: ch * 0.4,
          width: cw * 0.8, height: ch * 0.55,
          rotation: 0, opacity: 1,
          src: '/assets/country-boxes/japan-box.png',
        },
      ],
    }),
  },
  {
    name: 'Price Focus',
    description: 'Big price callout + product',
    build: (cw, ch) => ({
      background: { type: 'gradient', color: '#FF7A00', gradientFrom: '#FF7A00', gradientTo: '#E02020', image: null },
      elements: [
        {
          id: genId(), type: 'image',
          x: cw * 0.05, y: ch * 0.04,
          width: 180, height: 45,
          rotation: 0, opacity: 1,
          src: '/assets/brand/logo-header.png',
        },
        {
          id: genId(), type: 'text',
          x: cw * 0.05, y: ch * 0.12,
          width: cw * 0.6, height: 100,
          rotation: 0, opacity: 1,
          text: 'From',
          fontSize: 48, fontFamily: 'Readex Pro',
          fill: '#FFFFFF', align: 'left', fontStyle: '',
        },
        {
          id: genId(), type: 'text',
          x: cw * 0.05, y: ch * 0.22,
          width: cw * 0.6, height: 180,
          rotation: 0, opacity: 1,
          text: '\u00A37.99',
          fontSize: 160, fontFamily: 'Luckiest Guy',
          fill: '#FFFFFF', align: 'left', fontStyle: '',
        },
        {
          id: genId(), type: 'text',
          x: cw * 0.05, y: ch * 0.42,
          width: cw * 0.5, height: 50,
          rotation: 0, opacity: 0.85,
          text: 'per month - cancel anytime',
          fontSize: 26, fontFamily: 'Readex Pro',
          fill: '#FFFFFF', align: 'left', fontStyle: '',
        },
        {
          id: genId(), type: 'image',
          x: cw * 0.25, y: ch * 0.5,
          width: cw * 0.65, height: ch * 0.48,
          rotation: 0, opacity: 1,
          src: '/assets/boxes/box_mobile.png',
        },
      ],
    }),
  },
]

export default function CanvasTemplates({ state, dispatch }) {
  const [confirmIdx, setConfirmIdx] = useState(null)

  const loadTemplate = (idx) => {
    const tmpl = STARTER_TEMPLATES[idx]
    const { background, elements } = tmpl.build(state.canvasWidth, state.canvasHeight)
    dispatch({ type: 'SET_BACKGROUND', payload: background })
    dispatch({ type: 'LOAD_ELEMENTS', elements })
    setConfirmIdx(null)
  }

  return (
    <section className="control-section">
      <h2>Start from Template</h2>
      <div className="template-starters">
        {STARTER_TEMPLATES.map((tmpl, i) => (
          <div key={tmpl.name} className="starter-item">
            {confirmIdx === i ? (
              <div className="starter-confirm">
                <span>Replace canvas?</span>
                <button className="starter-yes" onClick={() => loadTemplate(i)}>Yes</button>
                <button className="starter-no" onClick={() => setConfirmIdx(null)}>No</button>
              </div>
            ) : (
              <button className="starter-btn" onClick={() => setConfirmIdx(i)}>
                <strong>{tmpl.name}</strong>
                <span>{tmpl.description}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
