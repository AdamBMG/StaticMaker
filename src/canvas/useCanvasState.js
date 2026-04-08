import { useReducer } from 'react'

function genId() {
  return 'el_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)
}

export function createDefaultText(cw, ch) {
  return {
    id: genId(), type: 'text',
    x: cw * 0.1, y: ch * 0.15,
    width: cw * 0.8, height: 120,
    rotation: 0, opacity: 1,
    text: 'Your headline here',
    fontSize: 72,
    fontFamily: 'Luckiest Guy',
    fill: '#FFFFFF',
    align: 'center',
    fontStyle: '',
  }
}

export function createDefaultRect(cw, ch) {
  return {
    id: genId(), type: 'rect',
    x: cw * 0.2, y: ch * 0.3,
    width: cw * 0.6, height: ch * 0.3,
    rotation: 0, opacity: 1,
    fill: '#FF7A00',
    stroke: '', strokeWidth: 0,
    cornerRadius: 0,
  }
}

export function createImageElement(cw, ch, src, naturalWidth, naturalHeight) {
  const maxW = cw * 0.5
  const maxH = ch * 0.5
  const scale = Math.min(maxW / naturalWidth, maxH / naturalHeight, 1)
  const w = naturalWidth * scale
  const h = naturalHeight * scale
  return {
    id: genId(), type: 'image',
    x: (cw - w) / 2, y: (ch - h) / 2,
    width: w, height: h,
    rotation: 0, opacity: 1,
    src,
  }
}

export function createDefaultCircle(cw, ch) {
  return {
    id: genId(), type: 'circle',
    x: cw * 0.5 - 150, y: ch * 0.5 - 150,
    width: 300, height: 300,
    rotation: 0, opacity: 1,
    fill: '#6B2FA0',
    stroke: '', strokeWidth: 0,
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FORMAT': {
      const isSquare = action.format === 'square'
      return { ...state, format: action.format, canvasWidth: 1080, canvasHeight: isSquare ? 1080 : 1920 }
    }
    case 'SET_BACKGROUND':
      return { ...state, background: { ...state.background, ...action.payload } }
    case 'ADD_ELEMENT':
      return { ...state, elements: [...state.elements, action.element], selectedId: action.element.id }
    case 'UPDATE_ELEMENT':
      return {
        ...state,
        elements: state.elements.map(el => el.id === action.id ? { ...el, ...action.props } : el),
      }
    case 'DELETE_ELEMENT':
      return {
        ...state,
        elements: state.elements.filter(el => el.id !== action.id),
        selectedId: state.selectedId === action.id ? null : state.selectedId,
      }
    case 'SELECT_ELEMENT':
      return { ...state, selectedId: action.id }
    case 'MOVE_LAYER_UP': {
      const idx = state.elements.findIndex(el => el.id === action.id)
      if (idx < 0 || idx >= state.elements.length - 1) return state
      const els = [...state.elements]
      ;[els[idx], els[idx + 1]] = [els[idx + 1], els[idx]]
      return { ...state, elements: els }
    }
    case 'MOVE_LAYER_DOWN': {
      const idx = state.elements.findIndex(el => el.id === action.id)
      if (idx <= 0) return state
      const els = [...state.elements]
      ;[els[idx], els[idx - 1]] = [els[idx - 1], els[idx]]
      return { ...state, elements: els }
    }
    case 'BRING_TO_FRONT': {
      const el = state.elements.find(e => e.id === action.id)
      if (!el) return state
      return { ...state, elements: [...state.elements.filter(e => e.id !== action.id), el] }
    }
    case 'SEND_TO_BACK': {
      const el = state.elements.find(e => e.id === action.id)
      if (!el) return state
      return { ...state, elements: [el, ...state.elements.filter(e => e.id !== action.id)] }
    }
    default:
      return state
  }
}

const initialState = {
  canvasWidth: 1080,
  canvasHeight: 1080,
  format: 'square',
  background: {
    type: 'solid',
    color: '#FF7A00',
    gradientFrom: '#FF7A00',
    gradientTo: '#6B2FA0',
  },
  elements: [],
  selectedId: null,
}

export default function useCanvasState() {
  return useReducer(reducer, initialState)
}
