import { Stage, Layer, Rect } from 'react-konva'
import CanvasText from './elements/CanvasText'
import CanvasRect from './elements/CanvasRect'
import CanvasCircle from './elements/CanvasCircle'

export default function CanvasStage({ state, dispatch, stageRef, displayScale, wrapperRef }) {
  const { canvasWidth, canvasHeight, background, elements, selectedId } = state

  const onSelect = (id) => dispatch({ type: 'SELECT_ELEMENT', id })
  const onUpdate = (id, props) => dispatch({ type: 'UPDATE_ELEMENT', id, props })

  const bgProps = {}
  if (background.type === 'gradient') {
    bgProps.fillLinearGradientStartPoint = { x: 0, y: 0 }
    bgProps.fillLinearGradientEndPoint = { x: 0, y: canvasHeight }
    bgProps.fillLinearGradientColorStops = [0, background.gradientFrom, 1, background.gradientTo]
  } else {
    bgProps.fill = background.color
  }

  return (
    <Stage
      ref={stageRef}
      width={canvasWidth}
      height={canvasHeight}
      onClick={e => {
        if (e.target === e.target.getStage() || e.target.attrs.id === 'bg-rect') {
          dispatch({ type: 'SELECT_ELEMENT', id: null })
        }
      }}
    >
      <Layer>
        <Rect
          id="bg-rect"
          x={0}
          y={0}
          width={canvasWidth}
          height={canvasHeight}
          {...bgProps}
        />
        {elements.map(el => {
          const isSelected = el.id === selectedId
          if (el.type === 'text') {
            return (
              <CanvasText
                key={el.id}
                el={el}
                isSelected={isSelected}
                onSelect={onSelect}
                onUpdate={onUpdate}
                displayScale={displayScale}
                wrapperRef={wrapperRef}
              />
            )
          }
          if (el.type === 'rect') {
            return (
              <CanvasRect
                key={el.id}
                el={el}
                isSelected={isSelected}
                onSelect={onSelect}
                onUpdate={onUpdate}
              />
            )
          }
          if (el.type === 'circle') {
            return (
              <CanvasCircle
                key={el.id}
                el={el}
                isSelected={isSelected}
                onSelect={onSelect}
                onUpdate={onUpdate}
              />
            )
          }
          return null
        })}
      </Layer>
    </Stage>
  )
}
