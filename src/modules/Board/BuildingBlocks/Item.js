import React from 'react'
import { css } from '@emotion/core'

import Container from './Container'
import Folder from './Folder'
import ProxyItem from './ProxyItem'

import { ITEM, CONTAINER, VOLUME, PROXY } from '../../../constants'
import useDragForBlock from './hooks/useDragForBlock'
import useDragForConnector from './hooks/useDragForConnector'
import useDropForConnector from './hooks/useDropForConnector'

const iconsMap = {
  [CONTAINER]: Container,
  [VOLUME]: Folder,
  [PROXY]: ProxyItem,
}

function Item({ x, y, width, height, id, connections, setConnections, kind, setItemToEditId = () => {} }) {
  const { ref, isDragging } = useDragForBlock(id, ITEM, kind, { x, y, width, height })
  const { ref: connectorRef } = useDragForConnector(id, ref)
  useDropForConnector(ref, id, connections, setConnections)

  const KindIcon = iconsMap[kind]
  const canConnect = kind === CONTAINER

  const _setItemToEditId = () => setItemToEditId(id)

  return (
    <div
      ref={ref}
      onClick={_setItemToEditId}
      css={css`
        cursor: ${isDragging ? 'grabbing' : 'pointer'};
        margin: 4px;
        opacity: ${isDragging ? 0 : 1};
        grid-column-start: ${x};
        grid-column-end: ${x + height};
        grid-row-start: ${y};
        grid-row-end: ${y + width};
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%;
        border: 1px solid #777;
        border-radius: 2px;
        z-index: 4;
        min-width: 50px;
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
            grid-column: 1;
            grid-row: 1;
            height: 10px;
            width: 10px;
            justify-self: end;
            align-self: start;
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
            min-width: 24px;
            min-height: 24px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-self: center;
            justify-self: center;
            grid-column: 1;
            grid-row: 1;
          `}
        >
          <KindIcon />
        </div>
      )}
    </div>
  )
}

export default Item
