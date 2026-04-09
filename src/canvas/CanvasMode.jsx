import { useRef, useEffect, useState, useCallback } from 'react'
import useCanvasState, { createDefaultText } from './useCanvasState'
import useCanvasKeyboard from './useCanvasKeyboard'
import useSnapGuides from './useSnapGuides'
import CanvasStage from './CanvasStage'
import CanvasToolbar from './CanvasToolbar'
import CanvasBackground from './CanvasBackground'
import CanvasProperties from './CanvasProperties'
import CanvasLayers from './CanvasLayers'
import CanvasAssets from './CanvasAssets'
import CanvasTemplates from './CanvasTemplates'
import CanvasSaveLoad from './CanvasSaveLoad'
import CanvasExport from './CanvasExport'
import CanvasContextMenu from './CanvasContextMenu'
import HeadlineGenerator from '../components/HeadlineGenerator'
import BackgroundGenerator from '../components/BackgroundGenerator'
import './CanvasMode.css'

export default function CanvasMode({ brandConfig } = {}) {
  const [state, dispatch, { canUndo, canRedo }] = useCanvasState()
  const stageRef = useRef(null)
  const wrapperRef = useRef(null)
  const [snapEnabled, setSnapEnabled] = useState(true)
  const snapGuides = useSnapGuides(state, snapEnabled)
  const [zoom, setZoom] = useState(1)
  const [contextMenu, setContextMenu] = useState(null)

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

  // Close context menu on click anywhere
  useEffect(() => {
    if (!contextMenu) return
    const close = () => setContextMenu(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [contextMenu])

  const baseScale = Math.min(
    500 / state.canvasWidth,
    (state.format === 'story' ? 700 : 500) / state.canvasHeight
  )
  const displayScale = baseScale * zoom

  const handleSelectHeadline = (text) => {
    const el = createDefaultText(state.canvasWidth, state.canvasHeight)
    el.text = text
    dispatch({ type: 'ADD_ELEMENT', element: el })
  }

  const handleBackgroundGenerated = (imageDataUrl) => {
    dispatch({ type: 'SET_BACKGROUND', payload: { type: 'image', image: imageDataUrl } })
  }

  const handleContextMenu = useCallback((e, elementId) => {
    e.evt?.preventDefault?.()
    e.preventDefault?.()
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    setContextMenu({
      x: (e.evt?.clientX || e.clientX) - rect.left,
      y: (e.evt?.clientY || e.clientY) - rect.top,
      elementId,
    })
  }, [])

  return (
    <div className="app-layout">
      <div className="controls-panel">
        <CanvasTemplates state={state} dispatch={dispatch} templates={brandConfig?.templates} />
        <CanvasSaveLoad state={state} dispatch={dispatch} />
        <CanvasBackground state={state} dispatch={dispatch} palette={brandConfig?.colours} />
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
        <CanvasAssets state={state} dispatch={dispatch} assetCategories={brandConfig?.assets} />
        <CanvasProperties state={state} dispatch={dispatch} palette={brandConfig?.colours} />
        <CanvasLayers state={state} dispatch={dispatch} />
        <CanvasExport stageRef={stageRef} state={state} dispatch={dispatch} format={state.format} />
      </div>
      <div className="preview-panel">
        <CanvasToolbar state={state} dispatch={dispatch} canUndo={canUndo} canRedo={canRedo} snapEnabled={snapEnabled} onToggleSnap={() => setSnapEnabled(s => !s)} />
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
              snapGuides={snapEnabled ? snapGuides : null}
              onContextMenu={handleContextMenu}
            />
          </div>
          {contextMenu && (
            <CanvasContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              elementId={contextMenu.elementId}
              dispatch={dispatch}
              onClose={() => setContextMenu(null)}
            />
          )}
        </div>
        <div className="zoom-controls">
          <button className="zoom-btn" onClick={() => setZoom(z => Math.max(0.25, z - 0.1))}>-</button>
          <span className="zoom-label">{Math.round(zoom * 100)}%</span>
          <button className="zoom-btn" onClick={() => setZoom(z => Math.min(3, z + 0.1))}>+</button>
          {zoom !== 1 && <button className="zoom-reset" onClick={() => setZoom(1)}>Reset</button>}
        </div>
      </div>
    </div>
  )
}
