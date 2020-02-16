import React from 'react'
import { css } from '@emotion/core'

import Item from '../BuildingBlocks/Item'
import Box from '../BuildingBlocks/Box'
import DeleteArea from './DeleteArea'

import { CONTAINER, VOLUME, PROXY } from '../../../constants'

export default function BlocksManager({ setItems, items, setConnections, connections }) {
  return (
    <div
      css={css`
        margin-top: 16px;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 8px auto 8px;
        grid-template-rows: repeat(8, 10%);
        grid-row-gap: 16px;
      `}
    >
      <Item x={2} y={1} height={1} width={1} kind={CONTAINER} />
      <Item x={2} y={2} height={1} width={1} kind={VOLUME} />
      <Item x={2} y={3} height={1} width={1} kind={PROXY} />
      <Box x={2} y={4} height={2} width={1} />
      <DeleteArea setItems={setItems} items={items} connections={connections} setConnections={setConnections} />
    </div>
  )
}
