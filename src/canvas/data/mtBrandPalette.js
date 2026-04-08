export const MT_BRAND_COLOURS = [
  { name: 'Navy', value: '#1D1A63' },
  { name: 'Gold', value: '#DBB539' },
  { name: 'Teal', value: '#0D9488' },
  { name: 'Orange', value: '#E85D26' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
  { name: 'Light', value: '#FAFBFF' },
  { name: 'Yellow CTA', value: '#FEC40B' },
]

export const MT_BRAND_FONTS = [
  'SF Pro Display',
  '-apple-system',
  'BlinkMacSystemFont',
  'Readex Pro',
]

export const MT_ASSET_CATEGORIES = [
  {
    name: 'Brand',
    assets: [
      { name: 'Logo (Dark)', src: '/assets/mobile-tutors/logo-dark.png' },
      { name: 'Logo (White)', src: '/assets/mobile-tutors/logo-white.png' },
      { name: 'App Icon', src: '/assets/mobile-tutors/icon.png' },
      { name: 'Trustpilot Stars', src: '/assets/mobile-tutors/trustpilot-stars.svg' },
    ],
  },
]

export const MT_STARTER_TEMPLATES = [
  {
    name: 'Bold Headline',
    description: 'Big headline + CTA on navy',
    build: (cw, ch) => {
      const genId = () => 'el_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)
      return {
        background: { type: 'solid', color: '#1D1A63', gradientFrom: '#1D1A63', gradientTo: '#0D0B3E', image: null },
        elements: [
          {
            id: genId(), type: 'image',
            x: cw * 0.04, y: ch * 0.03,
            width: 200, height: 50,
            rotation: 0, opacity: 1,
            src: '/assets/mobile-tutors/logo-white.png',
          },
          {
            id: genId(), type: 'text',
            x: cw * 0.04, y: ch * 0.12,
            width: cw * 0.92, height: 300,
            rotation: 0, opacity: 1,
            text: 'The UK\'s most affordable private tutoring',
            fontSize: 86, fontFamily: 'SF Pro Display',
            fill: '#FFFFFF', align: 'left', fontStyle: '',
            stroke: '', strokeWidth: 0,
          },
          {
            id: genId(), type: 'image',
            x: cw * 0.04, y: ch * 0.52,
            width: 220, height: 42,
            rotation: 0, opacity: 1,
            src: '/assets/mobile-tutors/trustpilot-stars.svg',
          },
          {
            id: genId(), type: 'text',
            x: cw * 0.25, y: ch * 0.52,
            width: 300, height: 40,
            rotation: 0, opacity: 0.85,
            text: 'Excellent - 4.9/5',
            fontSize: 22, fontFamily: 'SF Pro Display',
            fill: '#FFFFFF', align: 'left', fontStyle: '',
            stroke: '', strokeWidth: 0,
          },
          {
            id: genId(), type: 'text',
            x: cw * 0.04, y: ch * 0.72,
            width: cw * 0.6, height: 40,
            rotation: 0, opacity: 0.9,
            text: 'From \u00A35 per lesson',
            fontSize: 28, fontFamily: 'SF Pro Display',
            fill: '#FFFFFF', align: 'left', fontStyle: '',
            stroke: '', strokeWidth: 0,
          },
          {
            id: genId(), type: 'rect',
            x: cw * 0.04, y: ch * 0.82,
            width: 360, height: 70,
            rotation: 0, opacity: 1,
            fill: '#FEC40B', stroke: '#000000', strokeWidth: 3, cornerRadius: 50,
          },
          {
            id: genId(), type: 'text',
            x: cw * 0.04 + 20, y: ch * 0.82 + 16,
            width: 320, height: 40,
            rotation: 0, opacity: 1,
            text: 'Book Free Consultation',
            fontSize: 24, fontFamily: 'SF Pro Display',
            fill: '#000000', align: 'center', fontStyle: 'bold',
            stroke: '', strokeWidth: 0,
          },
        ],
      }
    },
  },
  {
    name: 'Testimonial',
    description: 'Parent review + Trustpilot',
    build: (cw, ch) => {
      const genId = () => 'el_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)
      return {
        background: { type: 'solid', color: '#FAFBFF', gradientFrom: '#FAFBFF', gradientTo: '#F0F0F0', image: null },
        elements: [
          {
            id: genId(), type: 'image',
            x: cw * 0.05, y: ch * 0.04,
            width: 180, height: 45,
            rotation: 0, opacity: 1,
            src: '/assets/mobile-tutors/logo-dark.png',
          },
          {
            id: genId(), type: 'text',
            x: cw * 0.05, y: ch * 0.12,
            width: 100, height: 100,
            rotation: 0, opacity: 0.15,
            text: '\u201C',
            fontSize: 200, fontFamily: 'Georgia',
            fill: '#DBB539', align: 'left', fontStyle: '',
            stroke: '', strokeWidth: 0,
          },
          {
            id: genId(), type: 'text',
            x: cw * 0.06, y: ch * 0.25,
            width: cw * 0.88, height: 200,
            rotation: 0, opacity: 1,
            text: 'MobileTutors gave my son extra confidence in Maths GCSE when he was really struggling.',
            fontSize: 44, fontFamily: 'SF Pro Display',
            fill: '#1D1A63', align: 'left', fontStyle: 'bold',
            stroke: '', strokeWidth: 0,
          },
          {
            id: genId(), type: 'text',
            x: cw * 0.06, y: ch * 0.55,
            width: cw * 0.6, height: 30,
            rotation: 0, opacity: 0.6,
            text: 'Liz, Parent - Verified Review',
            fontSize: 20, fontFamily: 'SF Pro Display',
            fill: '#444', align: 'left', fontStyle: '',
            stroke: '', strokeWidth: 0,
          },
          {
            id: genId(), type: 'image',
            x: cw * 0.06, y: ch * 0.62,
            width: 200, height: 38,
            rotation: 0, opacity: 1,
            src: '/assets/mobile-tutors/trustpilot-stars.svg',
          },
          {
            id: genId(), type: 'rect',
            x: cw * 0.06, y: ch * 0.82,
            width: 360, height: 70,
            rotation: 0, opacity: 1,
            fill: '#FEC40B', stroke: '#000000', strokeWidth: 3, cornerRadius: 50,
          },
          {
            id: genId(), type: 'text',
            x: cw * 0.06 + 20, y: ch * 0.82 + 16,
            width: 320, height: 40,
            rotation: 0, opacity: 1,
            text: 'Book Free Consultation',
            fontSize: 24, fontFamily: 'SF Pro Display',
            fill: '#000000', align: 'center', fontStyle: 'bold',
            stroke: '', strokeWidth: 0,
          },
        ],
      }
    },
  },
  {
    name: 'Guarantee',
    description: '2-grade guarantee + proof',
    build: (cw, ch) => {
      const genId = () => 'el_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)
      return {
        background: { type: 'solid', color: '#1D1A63', gradientFrom: '#1D1A63', gradientTo: '#0D0B3E', image: null },
        elements: [
          {
            id: genId(), type: 'image',
            x: cw * 0.04, y: ch * 0.03,
            width: 200, height: 50,
            rotation: 0, opacity: 1,
            src: '/assets/mobile-tutors/logo-white.png',
          },
          {
            id: genId(), type: 'text',
            x: cw * 0.04, y: ch * 0.14,
            width: cw * 0.92, height: 350,
            rotation: 0, opacity: 1,
            text: '2 grades higher in 12 weeks. Guaranteed.',
            fontSize: 82, fontFamily: 'SF Pro Display',
            fill: '#FFFFFF', align: 'left', fontStyle: '',
            stroke: '', strokeWidth: 0,
          },
          {
            id: genId(), type: 'text',
            x: cw * 0.04, y: ch * 0.55,
            width: cw * 0.8, height: 40,
            rotation: 0, opacity: 0.75,
            text: 'Structured. Proven. Examiner-led.',
            fontSize: 26, fontFamily: 'SF Pro Display',
            fill: '#FFFFFF', align: 'left', fontStyle: '',
            stroke: '', strokeWidth: 0,
          },
          {
            id: genId(), type: 'text',
            x: cw * 0.04, y: ch * 0.68,
            width: cw * 0.5, height: 35,
            rotation: 0, opacity: 1,
            text: 'From \u00A35 per lesson',
            fontSize: 30, fontFamily: 'SF Pro Display',
            fill: '#DBB539', align: 'left', fontStyle: 'bold',
            stroke: '', strokeWidth: 0,
          },
          {
            id: genId(), type: 'rect',
            x: cw * 0.04, y: ch * 0.82,
            width: 360, height: 70,
            rotation: 0, opacity: 1,
            fill: '#FEC40B', stroke: '#000000', strokeWidth: 3, cornerRadius: 50,
          },
          {
            id: genId(), type: 'text',
            x: cw * 0.04 + 20, y: ch * 0.82 + 16,
            width: 320, height: 40,
            rotation: 0, opacity: 1,
            text: 'Book Free Consultation',
            fontSize: 24, fontFamily: 'SF Pro Display',
            fill: '#000000', align: 'center', fontStyle: 'bold',
            stroke: '', strokeWidth: 0,
          },
        ],
      }
    },
  },
]
