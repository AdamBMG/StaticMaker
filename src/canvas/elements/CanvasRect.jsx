import { useRef, useEffect } from 'react'
import { Rect, Transformer } from 'react-konva'

export default function CanvasRect({ el, isSelected, onSelect, onUpdate, onSnapDragMove, onSnapDragEnd }) {
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
      <Rect
        ref={shapeRef}
        x={el.x}
        y={el.y}
        width={el.width}
        height={el.height}
        rotation={el.rotation}
        fill={el.fill}
        opacity={el.opacity}
        stroke={el.stroke || undefined}
        strokeWidth={el.strokeWidth || 0}
        cornerRadius={el.cornerRadius || 0}
        draggable
        onClick={(e) => onSelect(el.id, e)}
        onTap={(e) => onSelect(el.id, e)}
        onContextMenu={(e) => { e.evt?.preventDefault(); onSelect(el.id, e) }}
        onDragMove={onSnapDragMove ? (e) => onSnapDragMove(el.id, e.target) : undefined}
        onDragEnd={e => {
          if (onSnapDragEnd) onSnapDragEnd()
          onUpdate(el.id, { x: e.target.x(), y: e.target.y() })
        }}
        onTransformEnd={() => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          node.scaleX(1)
          node.scaleY(1)
          onUpdate(el.id, {
            x: node.x(),
            y: node.y(),
            width: Math.max(10, node.width() * scaleX),
            height: Math.max(10, node.height() * scaleY),
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
