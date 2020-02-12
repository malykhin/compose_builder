import _ from 'lodash'

import { MIN_BOX_HEIGHT, MIN_BOX_WIDTH, ITEM, BOX, BOX_RESIZE, CONNECTOR } from '../../../../constants'

export function convertToPosition(coordinate, step, maxSteps) {
  const position = Math.ceil(coordinate / step)
  if (position <= 0) {
    return 1
  }
  if (position > maxSteps) {
    return maxSteps
  }
  return position
}

export function convertDimension(delta, step) {
  return Math.round(delta / step)
}

export function getDropCoordinates(dropOffset, dropTargetDimensions) {
  const deltaX = dropOffset.x - dropTargetDimensions.left
  const deltaY = dropOffset.y - dropTargetDimensions.top
  return {
    x: deltaX <= 0 ? 0 : deltaX,
    y: deltaY <= 0 ? 0 : deltaY,
  }
}

export function getGridStep(dropTargetDimensions, gridShape) {
  return {
    x: dropTargetDimensions.width / gridShape.x,
    y: dropTargetDimensions.height / gridShape.y,
  }
}

export function mutateItemForDrag(items, index, dropCoordinates, gridStep, gridShape) {
  _.set(items, `${index}.x`, convertToPosition(dropCoordinates.x, gridStep.x, gridShape.x))
  _.set(items, `${index}.y`, convertToPosition(dropCoordinates.y, gridStep.y, gridShape.y))
}

export function mutateItemForResize(items, index, dropCoordinates, gridStep, gridShape) {
  const width = convertToPosition(dropCoordinates.x, gridStep.x, gridShape.x) - items[index].x
  const height = convertToPosition(dropCoordinates.y, gridStep.y, gridShape.y) - items[index].y
  _.set(items, `${index}.width`, width >= MIN_BOX_WIDTH ? width : MIN_BOX_WIDTH)
  _.set(items, `${index}.height`, height >= MIN_BOX_HEIGHT ? height : MIN_BOX_HEIGHT)
}

export function prepareParamsForDrop(ref, dropOffset, gridShape, items, item) {
  const dropTargetDimensions = ref.current.getBoundingClientRect()
  const dropCoordinates = getDropCoordinates(dropOffset, dropTargetDimensions)
  const gridStep = getGridStep(dropTargetDimensions, gridShape)
  const index = items.findIndex((it) => it.id === item.id)

  return {
    dropCoordinates,
    gridStep,
    index,
  }
}

export function canDropItem(items, dropRect, item) {
  return items.every((it) => {
    if (it.type === ITEM) {
      return item.id === it.id || dropRect.x !== it.x || dropRect.y !== it.y
    }
    if (it.type === BOX) {
      return dropRect.x < it.x || dropRect.x > it.x + it.width - 1 || dropRect.y !== it.y
    }
    return true
  })
}

export function canDropBox(items, dropRect, item) {
  const dropWidth = dropRect.width || item.currentDimensions.width
  const dropHeight = dropRect.height || item.currentDimensions.height
  if (!dropWidth || !dropHeight) {
    return false
  }
  return items.every((it) => {
    if (it.type === ITEM) {
      return dropRect.x + dropWidth <= it.x || dropRect.x > it.x || dropRect.y < it.y || dropRect.y > it.y
    }
    if (it.type === BOX) {
      return (
        item.id === it.id ||
        dropRect.x + dropWidth <= it.x ||
        dropRect.x >= it.x + it.width ||
        dropRect.y + dropHeight <= it.y ||
        dropRect.y >= it.y + it.height
      )
    }
    return true
  })
}

export function canResizeBox(items, dropRect, item) {
  return items.every((it) => {
    if (it.type === ITEM) {
      return item.currentPosition.y !== it.y || dropRect.x < it.x || item.currentPosition.x > it.x
    }
    if (it.type === BOX) {
      return (
        item.id === it.id ||
        dropRect.x <= it.x ||
        dropRect.y <= it.y ||
        item.currentPosition.x >= it.x + it.width ||
        item.currentPosition.y >= it.y + it.height
      )
    }
    return true
  })
}

export const canDropMap = {
  [ITEM]: canDropItem,
  [BOX]: canDropBox,
  [BOX_RESIZE]: canResizeBox,
  [CONNECTOR]: () => true,
}

export function getDropRectangle(item, dropCoordinates, gridStep, gridShape) {
  return {
    x: convertToPosition(dropCoordinates.x, gridStep.x, gridShape.x),
    y: convertToPosition(dropCoordinates.y, gridStep.y, gridShape.y),
    width: convertDimension(item.width, gridStep.x),
    height: convertDimension(item.height, gridStep.y),
  }
}
