import { useRef } from 'react'
import { useDrag } from 'react-dnd'

export default function useDragForBlock(id, type, currentDimensions) {
  const ref = useRef(null)
  const [{ isDragging }, drag] = useDrag({
    item: {
      type,
      id,
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
