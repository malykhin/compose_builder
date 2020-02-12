import React from 'react'

import Shadows from './Shadows'
import Connections from './Connections'

import useForCustomDragLayer from './hooks/useForCustomDragLayer'

const CustomDragLayer = ({ items, gridRef, gridShape, connections, gridDimensions }) => {
  const { items: formattedItems, isDragging } = useForCustomDragLayer(items, gridRef, gridShape)

  return (
    <>
      <Shadows items={formattedItems} />
      <Connections
        gridDimensions={gridDimensions}
        items={formattedItems}
        connections={connections}
        gridShape={gridShape}
        isDragging={isDragging}
      />
    </>
  )
}
export default CustomDragLayer
