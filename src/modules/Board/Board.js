import React, { useState } from 'react'
import { css } from '@emotion/core'

import Grid from './Grid/Grid'
import SidePanel from './SidePanel/SidePanel'
import TopPanel from './TopPanel/TopPanel'

function Board({ xBoardSize, yBoardSize }) {
  const [items, setItems] = useState([])
  const [connections, setConnections] = useState([])
  const [itemToEditId, setItemToEditId] = useState(null)
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 8vh 92vh;
      `}
    >
      <TopPanel />
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-self: stretch;
          justify-self: stretch;
          grid-row: 2;
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
    </div>
  )
}

export default Board
