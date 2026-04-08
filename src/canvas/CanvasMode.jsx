import { useRef } from 'react'
import useCanvasState from './useCanvasState'
import CanvasStage from './CanvasStage'
import CanvasToolbar from './CanvasToolbar'
import CanvasBackground from './CanvasBackground'
import CanvasProperties from './CanvasProperties'
import CanvasLayers from './CanvasLayers'
import CanvasAssets from './CanvasAssets'
import CanvasExport from './CanvasExport'
import './CanvasMode.css'

export default function CanvasMode() {
  const [state, dispatch] = useCanvasState()
  const stageRef = useRef(null)
  const wrapperRef = useRef(null)

  const maxPreviewWidth = 500
  const maxPreviewHeight = state.format === 'story' ? 700 : 500
  const displayScale = Math.min(
    maxPreviewWidth / state.canvasWidth,
    maxPreviewHeight / state.canvasHeight
  )

  return (
    <div className="app-layout">
      <div className="controls-panel">
        <CanvasBackground state={state} dispatch={dispatch} />
        <CanvasAssets state={state} dispatch={dispatch} />
        <CanvasProperties state={state} dispatch={dispatch} />
        <CanvasLayers state={state} dispatch={dispatch} />
        <CanvasExport stageRef={stageRef} format={state.format} />
      </div>
      <div className="preview-panel">
        <CanvasToolbar state={state} dispatch={dispatch} />
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
