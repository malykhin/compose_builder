import { useRef } from 'react'
import { useDrag } from 'react-dnd'

export default function useDragForBlock(id, type, kind, currentDimensions) {
  const ref = useRef(null)
  const [{ isDragging }, drag] = useDrag({
    item: {
      type,
      id,
      kind,
      currentDimensions,
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  drag(ref)

  return {
    ref,
    isDragging,
  }
}
