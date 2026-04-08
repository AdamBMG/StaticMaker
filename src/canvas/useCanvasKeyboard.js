import { useEffect } from 'react'

export default function useCanvasKeyboard(state, dispatch, { canUndo, canRedo }) {
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase()
      const isTyping = tag === 'input' || tag === 'textarea' || tag === 'select'
      const mod = e.metaKey || e.ctrlKey

      // Undo: Ctrl/Cmd + Z
      if (mod && !e.shiftKey && e.key === 'z') {
        e.preventDefault()
        if (canUndo) dispatch({ type: 'UNDO' })
        return
      }

      // Redo: Ctrl/Cmd + Shift + Z
      if (mod && e.shiftKey && e.key === 'z') {
        e.preventDefault()
        if (canRedo) dispatch({ type: 'REDO' })
        return
      }

      // Duplicate: Ctrl/Cmd + D
      if (mod && e.key === 'd') {
        e.preventDefault()
        if (state.selectedId) dispatch({ type: 'DUPLICATE_ELEMENT', id: state.selectedId })
        return
      }

      // Skip remaining shortcuts when typing in inputs
      if (isTyping) return

      // Delete / Backspace
      if ((e.key === 'Delete' || e.key === 'Backspace') && state.selectedId) {
        e.preventDefault()
        dispatch({ type: 'DELETE_ELEMENT', id: state.selectedId })
        return
      }

      // Arrow keys - nudge position
      const arrowMap = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }
      if (arrowMap[e.key] && state.selectedId) {
        e.preventDefault()
        const step = e.shiftKey ? 10 : 1
        const [dx, dy] = arrowMap[e.key]
        const el = state.elements.find(el => el.id === state.selectedId)
        if (el) {
          dispatch({ type: 'UPDATE_ELEMENT', id: state.selectedId, props: { x: el.x + dx * step, y: el.y + dy * step } })
        }
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [state, dispatch, canUndo, canRedo])
}
