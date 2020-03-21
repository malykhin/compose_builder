import React from 'react'
import { css } from '@emotion/core'

import { Button } from '@blueprintjs/core'

import MetaForm from './MetaForm'

import { getLinks } from './utils'

export default function BlockEditor({ items, itemToEditId, setItemToEditId, setItem, connections }) {
  const goBack = () => setItemToEditId(null)
  const item = { ...items.find((item) => item.id === itemToEditId) }
  const links = getLinks(items, connections, itemToEditId)
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 16px;
      `}
    >
      <Button onClick={goBack} minimal icon="arrow-left" text="Back" />

      <div
        css={css`
          margin-top: 8px;
        `}
      >
        <MetaForm item={item} setItem={setItem} links={links} />
      </div>
    </div>
  )
}
