import React, { useState } from 'react'
import { css } from '@emotion/core'

import Grid from './Grid/Grid'
import SidePanel from './SidePanel/SidePanel'

function Board({ xBoardSize, yBoardSize }) {
  const [items, setItems] = useState([])
  const [connections, setConnections] = useState([])
  const [itemToEditId, setItemToEditId] = useState(null)
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        height: 100%;
      `}
    >
      <SidePanel
        setItems={setItems}
        items={items}
        connections={connections}
        setConnections={setConnections}
        itemToEditId={itemToEditId}
        setItemToEditId={setItemToEditId}
      />
      <Grid
        setItems={setItems}
        setItemToEditId={setItemToEditId}
        items={items}
        connections={connections}
        setConnections={setConnections}
        gridShape={{
          x: xBoardSize,
          y: yBoardSize,
        }}
      />
    </div>
  )
}

export default Board
