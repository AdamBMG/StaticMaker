import { useState, useEffect } from 'react'
import { Stage, Layer, Rect, Line, Image as KonvaImage } from 'react-konva'
import CanvasText from './elements/CanvasText'
import CanvasRect from './elements/CanvasRect'
import CanvasCircle from './elements/CanvasCircle'
import CanvasImage from './elements/CanvasImage'

function useBgImage(src) {
  const [img, setImg] = useState(null)
  useEffect(() => {
    if (!src) { setImg(null); return }
    const image = new window.Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => setImg(image)
    image.src = src
  }, [src])
  return img
}

export default function CanvasStage({ state, dispatch, stageRef, displayScale, wrapperRef, snapGuides }) {
  const { canvasWidth, canvasHeight, background, elements, selectedId } = state
  const bgImage = useBgImage(background.image)
  const guides = snapGuides?.guides || []

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

  const onDragMove = snapGuides ? (id, node) => {
    const el = elements.find(e => e.id === id)
    if (!el) return
    const w = el.width || node.width()
    const h = el.height || node.height()
    const { x, y } = snapGuides.calcGuides(id, node.x(), node.y(), w, h)
    node.x(x)
    node.y(y)
  } : undefined

  const onDragEnd = snapGuides ? () => {
    snapGuides.clearGuides()
  } : undefined

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
        {bgImage && (
          <KonvaImage
            image={bgImage}
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
            listening={false}
          />
        )}
        {elements.map(el => {
          const isSelected = el.id === selectedId
          const snapProps = { onSnapDragMove: onDragMove, onSnapDragEnd: onDragEnd }
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
                {...snapProps}
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
                {...snapProps}
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
                {...snapProps}
              />
            )
          }
          if (el.type === 'image') {
            return (
              <CanvasImage
                key={el.id}
                el={el}
                isSelected={isSelected}
                onSelect={onSelect}
                onUpdate={onUpdate}
                {...snapProps}
              />
            )
          }
          return null
        })}
        {/* Snap guide lines */}
        {guides.map((g, i) => (
          g.type === 'v' ? (
            <Line key={`guide-${i}`} points={[g.x, 0, g.x, canvasHeight]} stroke="#FF7A00" strokeWidth={1} dash={[6, 4]} listening={false} />
          ) : (
            <Line key={`guide-${i}`} points={[0, g.y, canvasWidth, g.y]} stroke="#FF7A00" strokeWidth={1} dash={[6, 4]} listening={false} />
          )
        ))}
      </Layer>
    </Stage>
  )
}
