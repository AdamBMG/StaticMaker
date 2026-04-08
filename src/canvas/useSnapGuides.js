import { useState, useCallback } from 'react'

const SNAP_THRESHOLD = 5

export default function useSnapGuides(state, snapEnabled) {
  const [guides, setGuides] = useState([])

  const calcGuides = useCallback((movingId, x, y, width, height) => {
    if (!snapEnabled) { setGuides([]); return { x, y } }

    const { canvasWidth, canvasHeight, elements } = state
    const newGuides = []
    let snapX = x
    let snapY = y

    // Moving element edges/centre
    const mCx = x + width / 2
    const mCy = y + height / 2
    const mRight = x + width
    const mBottom = y + height

    // Canvas centre guides
    const cCx = canvasWidth / 2
    const cCy = canvasHeight / 2

    // Check canvas centre X
    if (Math.abs(mCx - cCx) < SNAP_THRESHOLD) {
      snapX = cCx - width / 2
      newGuides.push({ type: 'v', x: cCx })
    }
    // Check canvas centre Y
    if (Math.abs(mCy - cCy) < SNAP_THRESHOLD) {
      snapY = cCy - height / 2
      newGuides.push({ type: 'h', y: cCy })
    }
    // Check canvas left edge
    if (Math.abs(x) < SNAP_THRESHOLD) {
      snapX = 0
    }
    // Check canvas right edge
    if (Math.abs(mRight - canvasWidth) < SNAP_THRESHOLD) {
      snapX = canvasWidth - width
    }
    // Check canvas top edge
    if (Math.abs(y) < SNAP_THRESHOLD) {
      snapY = 0
    }
    // Check canvas bottom edge
    if (Math.abs(mBottom - canvasHeight) < SNAP_THRESHOLD) {
      snapY = canvasHeight - height
    }

    // Check against other elements
    for (const el of elements) {
      if (el.id === movingId) continue
      const eCx = el.x + (el.width || 0) / 2
      const eCy = el.y + (el.height || 0) / 2
      const eRight = el.x + (el.width || 0)
      const eBottom = el.y + (el.height || 0)

      // Snap centre to centre X
      if (Math.abs(mCx - eCx) < SNAP_THRESHOLD) {
        snapX = eCx - width / 2
        newGuides.push({ type: 'v', x: eCx })
      }
      // Snap centre to centre Y
      if (Math.abs(mCy - eCy) < SNAP_THRESHOLD) {
        snapY = eCy - height / 2
        newGuides.push({ type: 'h', y: eCy })
      }
      // Snap left to left
      if (Math.abs(x - el.x) < SNAP_THRESHOLD) {
        snapX = el.x
        newGuides.push({ type: 'v', x: el.x })
      }
      // Snap right to right
      if (Math.abs(mRight - eRight) < SNAP_THRESHOLD) {
        snapX = eRight - width
        newGuides.push({ type: 'v', x: eRight })
      }
      // Snap top to top
      if (Math.abs(y - el.y) < SNAP_THRESHOLD) {
        snapY = el.y
        newGuides.push({ type: 'h', y: el.y })
      }
      // Snap bottom to bottom
      if (Math.abs(mBottom - eBottom) < SNAP_THRESHOLD) {
        snapY = eBottom - height
        newGuides.push({ type: 'h', y: eBottom })
      }
    }

    setGuides(newGuides)
    return { x: snapX, y: snapY }
  }, [state, snapEnabled])

  const clearGuides = useCallback(() => setGuides([]), [])

  return { guides, calcGuides, clearGuides }
}
