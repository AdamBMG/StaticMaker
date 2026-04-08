import { useRef, useEffect, useState, useCallback } from 'react'
import { Text, Transformer } from 'react-konva'

export default function CanvasText({ el, isSelected, onSelect, onUpdate, displayScale, wrapperRef }) {
  const textRef = useRef(null)
  const trRef = useRef(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (isSelected && trRef.current && textRef.current) {
      trRef.current.nodes([textRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  const handleDblClick = useCallback(() => {
    setEditing(true)
  }, [])

  const handleFinishEdit = useCallback((newText) => {
    setEditing(false)
    onUpdate(el.id, { text: newText })
  }, [el.id, onUpdate])

  return (
    <>
      <Text
        ref={textRef}
        x={el.x}
        y={el.y}
        width={el.width}
        text={el.text}
        fontSize={el.fontSize}
        fontFamily={el.fontFamily}
        fill={el.fill}
        align={el.align || 'left'}
        fontStyle={el.fontStyle || ''}
        stroke={el.stroke || undefined}
        strokeWidth={el.strokeWidth || 0}
        opacity={editing ? 0 : el.opacity}
        rotation={el.rotation}
        draggable
        onClick={() => onSelect(el.id)}
        onTap={() => onSelect(el.id)}
        onDblClick={handleDblClick}
        onDblTap={handleDblClick}
        onDragEnd={e => {
          onUpdate(el.id, { x: e.target.x(), y: e.target.y() })
        }}
        onTransformEnd={() => {
          const node = textRef.current
          const scaleX = node.scaleX()
          node.scaleX(1)
          node.scaleY(1)
          onUpdate(el.id, {
            x: node.x(),
            y: node.y(),
            width: Math.max(20, node.width() * scaleX),
            rotation: node.rotation(),
          })
        }}
      />
      {isSelected && !editing && (
        <Transformer
          ref={trRef}
          anchorSize={10}
          borderStrokeWidth={2}
          enabledAnchors={['middle-left', 'middle-right']}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 20) return oldBox
            return newBox
          }}
        />
      )}
      {editing && (
        <TextEditOverlay
          el={el}
          displayScale={displayScale}
          wrapperRef={wrapperRef}
          onFinish={handleFinishEdit}
        />
      )}
    </>
  )
}

function TextEditOverlay({ el, displayScale, wrapperRef, onFinish }) {
  const textareaRef = useRef(null)

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.focus()
    ta.select()
  }, [])

  const style = {
    position: 'absolute',
    top: el.y * displayScale,
    left: el.x * displayScale,
    width: el.width * displayScale,
    minHeight: el.fontSize * displayScale * 1.2,
    fontSize: el.fontSize * displayScale,
    fontFamily: el.fontFamily,
    color: el.fill,
    textAlign: el.align || 'left',
    fontStyle: el.fontStyle?.includes('italic') ? 'italic' : 'normal',
    fontWeight: el.fontStyle?.includes('bold') ? 'bold' : 'normal',
    background: 'transparent',
    border: '2px solid var(--ui-accent)',
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    lineHeight: 1,
    padding: 0,
    margin: 0,
    zIndex: 1000,
    transformOrigin: 'top left',
  }

  return (
    <textarea
      ref={textareaRef}
      defaultValue={el.text}
      style={style}
      onBlur={e => onFinish(e.target.value)}
      onKeyDown={e => {
        if (e.key === 'Escape') onFinish(e.target.value)
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onFinish(e.target.value) }
      }}
    />
  )
}
