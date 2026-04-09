import { useEffect, useRef } from 'react'

export default function useCanvasKeyboard(state, dispatch, { canUndo, canRedo }) {
  const clipboardRef = useRef([])

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

      // Copy: Ctrl/Cmd + C
      if (mod && e.key === 'c' && !isTyping) {
        e.preventDefault()
        const ids = state.selectedIds?.length ? state.selectedIds : state.selectedId ? [state.selectedId] : []
        const copied = state.elements.filter(el => ids.includes(el.id))
        if (copied.length) clipboardRef.current = copied
        return
      }

      // Paste: Ctrl/Cmd + V
      if (mod && e.key === 'v' && !isTyping) {
        e.preventDefault()
        if (clipboardRef.current.length) {
          dispatch({ type: 'PASTE_ELEMENTS', elements: clipboardRef.current })
        }
        return
      }

      // Duplicate: Ctrl/Cmd + D
      if (mod && e.key === 'd') {
        e.preventDefault()
        if (state.selectedId) dispatch({ type: 'DUPLICATE_ELEMENT', id: state.selectedId })
        return
      }

      // Select all: Ctrl/Cmd + A
      if (mod && e.key === 'a' && !isTyping) {
        e.preventDefault()
        if (state.elements.length) {
          const allIds = state.elements.map(el => el.id)
          dispatch({ type: 'SELECT_ELEMENT', id: allIds[allIds.length - 1] })
          // Use multiple TOGGLE_SELECT to select all
          for (const el of state.elements) {
            dispatch({ type: 'TOGGLE_SELECT', id: el.id })
          }
        }
        return
      }

      // Skip remaining shortcuts when typing in inputs
      if (isTyping) return

      // Delete / Backspace
      if ((e.key === 'Delete' || e.key === 'Backspace')) {
        const ids = state.selectedIds?.length ? state.selectedIds : state.selectedId ? [state.selectedId] : []
        if (ids.length) {
          e.preventDefault()
          dispatch({ type: 'DELETE_SELECTED', ids })
        }
        return
      }

      // Arrow keys - nudge position
      const arrowMap = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }
      if (arrowMap[e.key] && state.selectedId) {
        e.preventDefault()
        const step = e.shiftKey ? 10 : 1
        const [dx, dy] = arrowMap[e.key]
        const ids = state.selectedIds?.length ? state.selectedIds : [state.selectedId]
        for (const id of ids) {
          const el = state.elements.find(el => el.id === id)
          if (el) {
            dispatch({ type: 'UPDATE_ELEMENT', id, props: { x: el.x + dx * step, y: el.y + dy * step } })
          }
        }
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [state, dispatch, canUndo, canRedo])
}
