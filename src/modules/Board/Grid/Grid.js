import React from 'react'

import { css } from '@emotion/core'

import Blocks from './Blocks'
import CustomDragLayer from './CustomDragLayer'

import useDropForGrid from './hooks/useDropForGrid'
import useResizeObserver from 'use-resize-observer'

export default function Grid({ gridShape, items, setItems, connections, setConnections, setItemToEditId }) {
  const { ref: measuredRef, width = 1, height = 1 } = useResizeObserver()
  const { ref } = useDropForGrid(measuredRef, gridShape, items, setItems)

  const gridDimensions = { width, height }

  const { x, y } = gridShape

  return (
    <div
      ref={measuredRef}
      css={css`
        width: 100%;
      `}
    >
      <div
        ref={ref}
        css={css`
          width: 100%;
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
        <Blocks
          items={items}
          connections={connections}
          setConnections={setConnections}
          setItemToEditId={setItemToEditId}
        />
      </div>
    </div>
  )
}
