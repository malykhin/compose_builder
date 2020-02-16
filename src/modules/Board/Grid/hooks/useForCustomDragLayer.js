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
    const temporaryItemIndex = items.find((it) => _.isUndefined(it.id))
    if (temporaryItemIndex > -1) {
      items.splice(temporaryItemIndex, 1)
    }
    const { index, dropCoordinates, gridStep } = prepareParamsForDrop(ref, currentOffset, gridShape, items, item)
    items.forEach((it) => {
      _.set(it, 'isShadowVisible', false)
      _.set(it, 'isShadowDanger', false)
    })

    const dropRect = getDropRectangle(item, dropCoordinates, gridStep, gridShape)
    const isDanger = !canDropMap[item.type](items, dropRect, item)
    if (item.id) {
      _.set(items, `${index}.isShadowVisible`, true)
      _.set(items, `${index}.isShadowDanger`, isDanger)
    } else {
      items.push({
        x: item.x,
        y: item.y,
        type: item.type,
        width: _.get(item, 'currentDimensions.width'),
        height: _.get(item, 'currentDimensions.height'),
        isShadowVisible: true,
        isShadowDanger: isDanger,
        id: 1,
      })
    }

    const correctedIndex = index === -1 ? items.length - 1 : index
    if (item.type === ITEM || item.type === BOX) {
      mutateItemForDrag(items, correctedIndex, dropCoordinates, gridStep, gridShape)
    }
    if (item.type === BOX_RESIZE) {
      mutateItemForResize(items, correctedIndex, dropCoordinates, gridStep, gridShape)
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
