import React from 'react'
import { css } from '@emotion/core'

import Container from './Container'
import Folder from './Folder'

import { ITEM, CONTAINER, VOLUME } from '../../../constants'
import useDragForBlock from './hooks/useDragForBlock'
import useDragForConnector from './hooks/useDragForConnector'
import useDropForConnector from './hooks/useDropForConnector'

const iconsMap = {
  [CONTAINER]: Container,
  [VOLUME]: Folder,
}

function Item({ x, y, width, height, id, connections, setConnections, kind }) {
  const { ref, isDragging } = useDragForBlock(id, ITEM, kind, { x, y, width, height })
  const { ref: connectorRef } = useDragForConnector(id, ref)
  useDropForConnector(ref, id, connections, setConnections)

  const KindIcon = iconsMap[kind]
  const canConnect = kind === CONTAINER

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
        justify-content: ${id && canConnect ? 'space-between' : 'center'};
        border: 1px solid #777;
        border-radius: 2px;
        z-index: 4;
        &:hover {
          background-color: #ccc;
        }
      `}
    >
      {id && canConnect && (
        <div
          ref={connectorRef}
          css={css`
            border: 1px solid #777;
            border-radius: 50%;
            flex-shrink: 0;
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
      )}
      {KindIcon && (
        <div
          css={css`
            align-self: center;
          `}
        >
          <KindIcon />
        </div>
      )}
    </div>
  )
}

export default Item
