import React from 'react'
import { css } from '@emotion/core'

import { computeConnectionLines } from './utils'

export default function Connections({ gridDimensions, gridShape, connections, items }) {
  const { width, height } = gridDimensions
  const linesCoordinates = computeConnectionLines(connections, items, gridDimensions, gridShape)
  if (gridDimensions.width && gridDimensions.height) {
    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMin slice"
        css={css`
          grid-column-start: 1;
          grid-column-end: end;
          grid-row-start: 1;
          grid-row-end: end;
          z-index: -1;
        `}
      >
        {linesCoordinates.map((line) => (
          <path fill="none" stroke="black" key={line.key} d={line.d} />
        ))}
      </svg>
    )
  }
  return null
}
