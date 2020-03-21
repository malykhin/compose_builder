import React from 'react'
import { css } from '@emotion/core'

import { Icon } from '@blueprintjs/core'

import { ITEM, CONTAINER, VOLUME, PROXY } from '../../../constants'
import useDragForBlock from './hooks/useDragForBlock'
import useDragForConnector from './hooks/useDragForConnector'
import useDropForConnector from './hooks/useDropForConnector'

const iconsMap = {
  [CONTAINER]: 'box',
  [VOLUME]: 'folder-close',
  [PROXY]: 'flow-branch',
}

function Item({ x, y, width, height, id, connections, setConnections, kind, setItemToEditId = () => {} }) {
  const { ref, isDragging } = useDragForBlock(id, ITEM, kind, { x, y, width, height })
  const { ref: connectorRef } = useDragForConnector(id, ref)
  useDropForConnector(ref, id, connections, setConnections)

  const canConnect = kind === CONTAINER
  const icon = iconsMap[kind]
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
        border: 1px solid #8a9ba8;
        border-radius: 2px;
        z-index: 4;
        min-width: 50px;
        &:hover {
          background-color: rgba(167, 182, 194, 0.3);
        }
      `}
    >
      {id && canConnect && (
        <div
          ref={connectorRef}
          css={css`
            border: 1px solid #8a9ba8;
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
              background-color: #5c7080;
            }
          `}
        />
      )}
      {icon && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-self: center;
            justify-self: center;
            grid-column: 1;
            grid-row: 1;
          `}
        >
          <Icon icon={icon} />
        </div>
      )}
    </div>
  )
}

export default Item
