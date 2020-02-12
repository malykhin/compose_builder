import { useDragLayer } from 'react-dnd'
import _ from 'lodash'

import { ITEM, BOX, BOX_RESIZE } from '../../../../constants'
import { prepareParamsForDrop, mutateItemForDrag, mutateItemForResize, getDropRectangle, canDropMap } from './utils'

export default function useForCustomDragLayer(itemsIn, ref, gridShape) {
  const items = _.cloneDeep(itemsIn)
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))
  if (currentOffset && ref.current && item) {
    const { index, dropCoordinates, gridStep } = prepareParamsForDrop(ref, currentOffset, gridShape, items, item)

    items.forEach((it) => {
      _.set(it, 'isShadowVisible', false)
      _.set(it, 'isShadowDanger', false)
    })

    const dropRect = getDropRectangle(item, dropCoordinates, gridStep, gridShape)
    const isDanger = !canDropMap[item.type](items, dropRect, item)
    _.set(items, `${index}.isShadowVisible`, true)
    _.set(items, `${index}.isShadowDanger`, isDanger)

    if (item.type === ITEM || item.type === BOX) {
      mutateItemForDrag(items, index, dropCoordinates, gridStep, gridShape)
    }
    if (item.type === BOX_RESIZE) {
      mutateItemForResize(items, index, dropCoordinates, gridStep, gridShape)
    }
  }

  return {
    itemType,
    item,
    items,
    initialOffset,
    currentOffset,
    isDragging,
  }
}
