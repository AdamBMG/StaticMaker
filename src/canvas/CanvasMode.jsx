import { useRef, useEffect } from 'react'
import useCanvasState, { createDefaultText } from './useCanvasState'
import useCanvasKeyboard from './useCanvasKeyboard'
import CanvasStage from './CanvasStage'
import CanvasToolbar from './CanvasToolbar'
import CanvasBackground from './CanvasBackground'
import CanvasProperties from './CanvasProperties'
import CanvasLayers from './CanvasLayers'
import CanvasAssets from './CanvasAssets'
import CanvasTemplates from './CanvasTemplates'
import CanvasSaveLoad from './CanvasSaveLoad'
import CanvasExport from './CanvasExport'
import HeadlineGenerator from '../components/HeadlineGenerator'
import BackgroundGenerator from '../components/BackgroundGenerator'
import './CanvasMode.css'

export default function CanvasMode() {
  const [state, dispatch, { canUndo, canRedo }] = useCanvasState()
  const stageRef = useRef(null)
  const wrapperRef = useRef(null)

  useCanvasKeyboard(state, dispatch, { canUndo, canRedo })

  // Auto-save (debounced 1s)
  const autoSaveTimer = useRef(null)
  useEffect(() => {
    clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem('canvas_autosave', JSON.stringify({
          format: state.format,
          background: state.background,
          elements: state.elements,
        }))
      } catch (e) { /* ignore */ }
    }, 1000)
    return () => clearTimeout(autoSaveTimer.current)
  }, [state.format, state.background, state.elements])

  const maxPreviewWidth = 500
  const maxPreviewHeight = state.format === 'story' ? 700 : 500
  const displayScale = Math.min(
    maxPreviewWidth / state.canvasWidth,
    maxPreviewHeight / state.canvasHeight
  )

  const handleSelectHeadline = (text) => {
    const el = createDefaultText(state.canvasWidth, state.canvasHeight)
    el.text = text
    dispatch({ type: 'ADD_ELEMENT', element: el })
  }

  const handleBackgroundGenerated = (imageDataUrl) => {
    dispatch({ type: 'SET_BACKGROUND', payload: { type: 'image', image: imageDataUrl } })
  }

  return (
    <div className="app-layout">
      <div className="controls-panel">
        <CanvasTemplates state={state} dispatch={dispatch} />
        <CanvasSaveLoad state={state} dispatch={dispatch} />
        <CanvasBackground state={state} dispatch={dispatch} />
        <section className="control-section">
          <h2>AI Generate</h2>
          <HeadlineGenerator
            mode="single"
            onSelectHeadline={handleSelectHeadline}
          />
          <BackgroundGenerator
            format={state.format}
            onBackgroundGenerated={handleBackgroundGenerated}
          />
        </section>
        <CanvasAssets state={state} dispatch={dispatch} />
        <CanvasProperties state={state} dispatch={dispatch} />
        <CanvasLayers state={state} dispatch={dispatch} />
        <CanvasExport stageRef={stageRef} state={state} dispatch={dispatch} format={state.format} />
      </div>
      <div className="preview-panel">
        <CanvasToolbar state={state} dispatch={dispatch} canUndo={canUndo} canRedo={canRedo} />
        <div className="preview-label">
          {state.canvasWidth} x {state.canvasHeight} - Canvas
        </div>
        <div
          ref={wrapperRef}
          className="canvas-wrapper"
          style={{
            width: state.canvasWidth * displayScale,
            height: state.canvasHeight * displayScale,
            position: 'relative',
          }}
        >
          <div style={{
            transform: `scale(${displayScale})`,
            transformOrigin: 'top left',
            width: state.canvasWidth,
            height: state.canvasHeight,
          }}>
            <CanvasStage
              state={state}
              dispatch={dispatch}
              stageRef={stageRef}
              displayScale={displayScale}
              wrapperRef={wrapperRef}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
