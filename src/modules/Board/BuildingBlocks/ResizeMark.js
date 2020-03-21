import React from 'react'

import { css } from '@emotion/core'

export default function ResizeMark({ resizeRef, rowStart, columnStart }) {
  return (
    <div
      ref={resizeRef}
      css={css`
        cursor: nwse-resize;
        border: 1px solid #8a9ba8;
        height: 10px;
        width: 10px;
        box-sizing: border-box;
        grid-column-start: ${columnStart};
        grid-row-start: ${rowStart};
        align-self: end;
        justify-self: end;
        z-index: 4;
        &:hover {
          background-color: rgba(167, 182, 194, 0.3);
        }
      `}
    />
  )
}
