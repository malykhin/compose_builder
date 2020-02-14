import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import _ from 'lodash'

import { ITEM, BOX, BOX_RESIZE, CONNECTOR } from '../../../../constants'
import {
  getDropRectangle,
  prepareParamsForDrop,
  mutateItemForDrag,
  mutateItemForResize,
  canDropMap,
  appendItem,
} from './utils'

export default function useDropForGrid(gridShape, items, setItems) {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: [ITEM, BOX, BOX_RESIZE, CONNECTOR],
    drop: (item, monitor) => {
      const dropOffset = monitor.getSourceClientOffset()

      if (dropOffset && ref.current) {
        const { index, dropCoordinates, gridStep } = prepareParamsForDrop(ref, dropOffset, gridShape, items, item)

        if (item.type === ITEM || item.type === BOX) {
          if (index > -1) {
            mutateItemForDrag(items, index, dropCoordinates, gridStep, gridShape)
          } else {
            appendItem(items, item, dropCoordinates, gridStep, gridShape)
          }
        }
        if (item.type === BOX_RESIZE) {
          mutateItemForResize(items, index, dropCoordinates, gridStep, gridShape)
        }
        setItems(_.cloneDeep(items))
      }
    },
    canDrop: (item, monitor) => {
      const dropOffset = monitor.getSourceClientOffset()

      if (dropOffset && ref.current) {
        const { dropCoordinates, gridStep } = prepareParamsForDrop(ref, dropOffset, gridShape, items, item)
        const dropRect = getDropRectangle(item, dropCoordinates, gridStep, gridShape)

        return canDropMap[item.type](items, dropRect, item)
      }
    },
  })

  drop(ref)

  return {
    ref,
  }
}
