export default function CanvasContextMenu({ x, y, elementId, dispatch, onClose }) {
  if (!elementId) return null

  const handleAction = (type, extra = {}) => {
    dispatch({ type, id: elementId, ...extra })
    onClose()
  }

  return (
    <div
      className="context-menu"
      style={{ left: x, top: y }}
      onMouseLeave={onClose}
    >
      <button onClick={() => handleAction('DUPLICATE_ELEMENT')}>Duplicate</button>
      <button onClick={() => handleAction('BRING_TO_FRONT')}>Bring to Front</button>
      <button onClick={() => handleAction('SEND_TO_BACK')}>Send to Back</button>
      <hr />
      <button onClick={() => handleAction('MOVE_LAYER_UP')}>Move Up</button>
      <button onClick={() => handleAction('MOVE_LAYER_DOWN')}>Move Down</button>
      <hr />
      <button className="context-delete" onClick={() => handleAction('DELETE_ELEMENT')}>Delete</button>
    </div>
  )
}
