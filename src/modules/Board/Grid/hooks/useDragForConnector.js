import { useRef } from 'react'
import { useDrag } from 'react-dnd'

import { CONNECTOR } from '../../../../constants'

export default function useDragForConnector(id, blockRef) {
  const ref = useRef(null)
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: CONNECTOR,
      id,
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
      blockDimensions: (() => {
        if (blockRef.current) {
          const { left, top, width, height } = blockRef.current.getBoundingClientRect()
          return {
            left,
            top,
            right: left + width,
            bottom: top + height,
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
