import { useRef, useEffect } from 'react'
import { Ellipse, Transformer } from 'react-konva'

export default function CanvasCircle({ el, isSelected, onSelect, onUpdate, onSnapDragMove, onSnapDragEnd }) {
  const shapeRef = useRef(null)
  const trRef = useRef(null)

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <Ellipse
        ref={shapeRef}
        x={el.x + el.width / 2}
        y={el.y + el.height / 2}
        radiusX={el.width / 2}
        radiusY={el.height / 2}
        rotation={el.rotation}
        fill={el.fill}
        opacity={el.opacity}
        stroke={el.stroke || undefined}
        strokeWidth={el.strokeWidth || 0}
        draggable
        onClick={() => onSelect(el.id)}
        onTap={() => onSelect(el.id)}
        onDragMove={onSnapDragMove ? (e) => onSnapDragMove(el.id, e.target) : undefined}
        onDragEnd={e => {
          if (onSnapDragEnd) onSnapDragEnd()
          onUpdate(el.id, {
            x: e.target.x() - el.width / 2,
            y: e.target.y() - el.height / 2,
          })
        }}
        onTransformEnd={() => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          node.scaleX(1)
          node.scaleY(1)
          const newRx = Math.max(5, node.radiusX() * scaleX)
          const newRy = Math.max(5, node.radiusY() * scaleY)
          onUpdate(el.id, {
            x: node.x() - newRx,
            y: node.y() - newRy,
            width: newRx * 2,
            height: newRy * 2,
            rotation: node.rotation(),
          })
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          anchorSize={10}
          borderStrokeWidth={2}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 10 || newBox.height < 10) return oldBox
            return newBox
          }}
        />
      )}
    </>
  )
}
