import { useRef } from 'react'
import { useDrag } from 'react-dnd'

import { BOX_RESIZE } from '../../../../constants'

export default function useResizeForBox(id, boxRef, currentPosition) {
  const ref = useRef(null)
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: BOX_RESIZE,
      id,
      currentPosition,
      ...(() => {
        if (ref.current) {
          const { left, top, width, height } = boxRef.current.getBoundingClientRect()
          return {
            top,
            height,
            left,
            width,
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
