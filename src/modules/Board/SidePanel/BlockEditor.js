import React from 'react'
import { css } from '@emotion/core'

import MetaForm from './MetaForm'

export default function BlockEditor({ items, itemToEditId, setItemToEditId, setItem }) {
  const goBack = () => setItemToEditId(null)
  const item = { ...items.find((item) => item.id === itemToEditId) }
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 16px;
      `}
    >
      <button
        onClick={goBack}
        css={css`
          align-self: flex-end;
          margin-right: 4px;
          background-color: transparent;
          border: 1px solid #eee;
          cursor: pointer;
          height: 36px;
          outline: none;
          font-size: 16px;
          &:hover {
            background-color: #ccc;
          }
        `}
      >
        &larr; to builder
      </button>
      <div
        css={css`
          margin-top: 8px;
        `}
      >
        <MetaForm item={item} setItem={setItem} goBack={goBack} />
      </div>
    </div>
  )
}
