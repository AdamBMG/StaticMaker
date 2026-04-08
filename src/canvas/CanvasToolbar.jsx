import { createDefaultText, createDefaultRect, createDefaultCircle } from './useCanvasState'

export default function CanvasToolbar({ state, dispatch }) {
  const { canvasWidth, canvasHeight, format } = state

  return (
    <div className="canvas-toolbar">
      <div className="canvas-toolbar-group">
        <button className="canvas-tool-btn" onClick={() => dispatch({ type: 'ADD_ELEMENT', element: createDefaultText(canvasWidth, canvasHeight) })}>
          + Text
        </button>
        <button className="canvas-tool-btn" onClick={() => dispatch({ type: 'ADD_ELEMENT', element: createDefaultRect(canvasWidth, canvasHeight) })}>
          + Rectangle
        </button>
        <button className="canvas-tool-btn" onClick={() => dispatch({ type: 'ADD_ELEMENT', element: createDefaultCircle(canvasWidth, canvasHeight) })}>
          + Circle
        </button>
      </div>
      <div className="format-toggle">
        <button
          className={`format-btn ${format === 'square' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_FORMAT', format: 'square' })}
        >
          1080 x 1080
        </button>
        <button
          className={`format-btn ${format === 'story' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'SET_FORMAT', format: 'story' })}
        >
          1080 x 1920
        </button>
      </div>
    </div>
  )
}
