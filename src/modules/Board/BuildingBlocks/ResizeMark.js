import React from 'react'

import { css } from '@emotion/core'

export default function ResizeMark({ resizeRef, isDragging, rowStart, columnStart }) {
  return (
    <div
      ref={resizeRef}
      css={css`
        cursor: nwse-resize;
        border: 1px solid #777;
        height: 10px;
        width: 10px;
        box-sizing: border-box;
        grid-column-start: ${columnStart};
        grid-row-start: ${rowStart};
        align-self: end;
        justify-self: end;
        z-index: 4;
        &:hover {
          background-color: #ccc;
        }
      `}
    />
  )
}
