import React from 'react'
import { css } from '@emotion/core'

import BlocksManager from './BlocksManager'
import BlockEditor from './BlockEditor'

export default function SidePanel({
  setItems,
  items,
  setConnections,
  connections,
  itemToEditId,
  setItemToEditId,
  setItem,
}) {
  const isBlocksManagerVisible = !itemToEditId
  const isBlockEditorVisible = itemToEditId
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        width: 10%;
        min-width: 200px;
        justify-content: space-between;
        height: 100%;
        overflow-y: auto;
        border-right: 1px solid rgba(16, 22, 26, 0.2);
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        `}
      >
        {isBlocksManagerVisible && (
          <BlocksManager setItems={setItems} items={items} connections={connections} setConnections={setConnections} />
        )}
        {isBlockEditorVisible && (
          <BlockEditor
            items={items}
            connections={connections}
            itemToEditId={itemToEditId}
            setItemToEditId={setItemToEditId}
            setItem={setItem}
          />
        )}
      </div>
    </div>
  )
}
