import React, { useState, useCallback } from 'react'

import { css } from '@emotion/core'

import Blocks from './Blocks'
import CustomDragLayer from './CustomDragLayer'

import useDropForGrid from './hooks/useDropForGrid'

function Grid({ gridShape, items, setItems, connections, setConnections }) {
  const { ref } = useDropForGrid(gridShape, items, setItems)

  const [gridDimensions, setGridDimensions] = useState({})
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const { width, height } = node.getBoundingClientRect()
      setGridDimensions({ width, height })
    }
  }, [])

  const { x, y } = gridShape

  return (
    <div
      ref={measuredRef}
      css={css`
        width: 100%;
        height: 100%;
      `}
    >
      <div
        ref={ref}
        css={css`
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(${x}, ${100 / x}%);
          grid-template-rows: repeat(${y}, ${100 / y}%);
        `}
      >
        <CustomDragLayer
          gridRef={ref}
          items={items}
          gridShape={gridShape}
          connections={connections}
          gridDimensions={gridDimensions}
        />
        <Blocks items={items} connections={connections} setConnections={setConnections} />
      </div>
    </div>
  )
}

export default Grid
