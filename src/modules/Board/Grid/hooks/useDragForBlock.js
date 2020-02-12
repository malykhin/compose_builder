import { useRef } from 'react'
import { useDrag } from 'react-dnd'

export default function useDragForBlock(id, type, currentDimensions) {
  const ref = useRef(null)
  const [{ isDragging }, drag] = useDrag({
    item: {
      type,
      id,
      currentDimensions,
      ...(() => {
        if (ref.current) {
          const { left, top, width, height } = ref.current.getBoundingClientRect()
          return {
            left,
            top,
            width,
            height,
          }
        }
        return {}
      })(),
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  drag(ref)

  return {
    ref,
    isDragging,
  }
}
