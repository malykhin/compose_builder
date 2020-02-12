import React from 'react'

import { css } from '@emotion/core'

import { ITEM } from '../../../constants'
import useDragForBlock from './hooks/useDragForBlock'
import useDragForConnector from './hooks/useDragForConnector'
import useDropForConnector from './hooks/useDropForConnector'

function Item({ x, y, width, height, id, connections, setConnections }) {
  const { ref, isDragging } = useDragForBlock(id, ITEM)
  const { ref: connectorRef } = useDragForConnector(id, ref)
  useDropForConnector(ref, id, connections, setConnections)

  return (
    <div
      ref={ref}
      css={css`
        cursor: ${isDragging ? 'grabbing' : 'pointer'};
        margin: 2px;
        opacity: ${isDragging ? 0 : 1};
        grid-column-start: ${x};
        grid-column-end: ${x + height};
        grid-row-start: ${y};
        grid-row-end: ${y + width};
        display: flex;
        flex-direction: column;
        border: 1px solid #777;
        border-radius: 2px;
        z-index: 4;
        &:hover {
          background-color: #ccc;
        }
      `}
    >
      <div
        ref={connectorRef}
        css={css`
          border: 1px solid #777;
          border-radius: 50%;
          height: 10px;
          width: 10px;
          align-self: flex-end;
          box-sizing: border-box;
          z-index: 6;
          &:hover {
            background-color: #999;
          }
        `}
      />
    </div>
  )
}

export default Item
