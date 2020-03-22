import React, { useState } from 'react'
import { css } from '@emotion/core'
import _ from 'lodash'

import Grid from './Grid/Grid'
import SidePanel from './SidePanel/SidePanel'
import TopPanel from './TopPanel/TopPanel'

import { saveFile } from './utils'

function Board({ xBoardSize, yBoardSize }) {
  const [items, setItems] = useState([])
  const [connections, setConnections] = useState([])
  const [itemToEditId, setItemToEditId] = useState(null)

  const setItem = (item) => {
    const clonedItems = _.cloneDeep(items)
    const index = clonedItems.findIndex((it) => it.id === item.id)

    clonedItems[index] = _.cloneDeep(item)
    setItems(clonedItems)
  }
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 50px 92vh;
      `}
    >
      <TopPanel saveFile={saveFile} items={items} connections={connections} />

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
          setItem={setItem}
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
