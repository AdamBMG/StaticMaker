import { useRef, useEffect, useState } from 'react'
import { Image, Transformer } from 'react-konva'

export default function CanvasImage({ el, isSelected, onSelect, onUpdate }) {
  const imageRef = useRef(null)
  const trRef = useRef(null)
  const [img, setImg] = useState(null)

  useEffect(() => {
    const image = new window.Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => setImg(image)
    image.src = el.src
  }, [el.src])

  useEffect(() => {
    if (isSelected && trRef.current && imageRef.current) {
      trRef.current.nodes([imageRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  if (!img) return null

  return (
    <>
      <Image
        ref={imageRef}
        image={img}
        x={el.x}
        y={el.y}
        width={el.width}
        height={el.height}
        rotation={el.rotation}
        opacity={el.opacity}
        draggable
        onClick={() => onSelect(el.id)}
        onTap={() => onSelect(el.id)}
        onDragEnd={e => {
          onUpdate(el.id, { x: e.target.x(), y: e.target.y() })
        }}
        onTransformEnd={() => {
          const node = imageRef.current
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
