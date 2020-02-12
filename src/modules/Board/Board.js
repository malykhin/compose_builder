import React, { useState } from 'react'
import { css } from '@emotion/core'

import uuid from 'uuid'

import { ITEM, BOX } from '../../constants'

import Grid from './Grid/Grid'
import SidePanel from './SidePanel/SidePanel'

function Board({ xBoardSize, yBoardSize }) {
  const [items, setItems] = useState([
    {
      id: uuid(),
      x: 1,
      y: 1,
      width: 1,
      height: 1,
      type: ITEM,
    },
    {
      id: uuid(),
      x: 1,
      y: 2,
      width: 1,
      height: 1,
      type: ITEM,
    },
    {
      id: uuid(),
      x: 1,
      y: 3,
      width: 1,
      height: 1,
      type: ITEM,
    },
    {
      id: uuid(),
      x: 1,
      y: 4,
      width: 1,
      height: 1,
      type: ITEM,
    },
    {
      id: uuid(),
      x: 7,
      y: 7,
      width: 3,
      height: 4,
      type: BOX,
    },
    {
      id: uuid(),
      x: 11,
      y: 7,
      width: 1,
      height: 2,
      type: BOX,
    },
  ])

  const [connections, setConnections] = useState([])

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        height: 100%;
      `}
    >
      <SidePanel />
      <Grid
        setItems={setItems}
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
