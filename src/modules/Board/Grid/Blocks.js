import React from 'react'

import Item from '../BuildingBlocks/Item'
import Box from '../BuildingBlocks/Box'

import { ITEM, BOX } from '../../../constants'

const blocksMap = {
  [ITEM]: Item,
  [BOX]: Box,
}

export default function Blocks({ items, connections, setConnections }) {
  return (
    <>
      {items.map((item) => {
        const Component = blocksMap[item.type]
        return <Component key={item.id} {...item} connections={connections} setConnections={setConnections} />
      })}
    </>
  )
}
