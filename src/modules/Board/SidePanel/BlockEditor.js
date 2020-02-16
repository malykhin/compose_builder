import React from 'react'
import { css } from '@emotion/core'

export default function BlockEditor({ itemToEditId, setItemToEditId }) {
  const goBack = () => setItemToEditId(null)
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
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
          font-size: 20px;
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
        {itemToEditId}
      </div>
    </div>
  )
}
