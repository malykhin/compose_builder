import React from 'react'

import { css } from '@emotion/core'

import ResizeMark from './ResizeMark'

import { BOX } from '../../../constants'
import useDragForBlock from './hooks/useDragForBlock'
import useResizeForBox from './hooks/useResizeForBox'

function Box({ x, y, width, height, id, name = 'Network', setItemToEditId = () => {} }) {
  const { ref: boxRef, isDragging: isBoxDragging } = useDragForBlock(id, BOX, null, { x, y, width, height })
  const { ref: resizeRef, isDragging: isResizeDragging } = useResizeForBox(id, boxRef, { x, y })

  const _setItemToEditId = () => setItemToEditId(id)

  return (
    <div
      ref={boxRef}
      css={css`
        grid-column-start: ${x};
        grid-column-end: ${x + width};
        grid-row-start: ${y};
        grid-row-end: ${y + height};
        display: grid;
        grid-template-columns: repeat(${width}, ${100 / width}%);
        grid-template-rows: repeat(${height}, ${100 / height}%);
        z-index: 2;
      `}
    >
      <div
        css={css`
          border: 1px solid #777;
          grid-column-start: 1;
          grid-row-start: 1;
          grid-column-end: end;
          grid-row-end: end;
          z-index: 2;
        `}
      />
      <div
        onClick={_setItemToEditId}
        css={css`
          cursor: ${isBoxDragging ? 'grabbing' : 'pointer'};
          display: inline-block;
          border: 1px solid #777;
          grid-column-start: 1;
          grid-row-start: 1;
          grid-column-end: end;
          padding: 2px;
          cursor: pointer;
          z-index: 2;
          &:hover {
            background-color: #ccc;
          }
        `}
      >
        {name}
      </div>
      {id && <ResizeMark resizeRef={resizeRef} isDragging={isResizeDragging} rowStart={height} columnStart={width} />}
    </div>
  )
}

export default Box
