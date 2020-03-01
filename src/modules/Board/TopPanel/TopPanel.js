import React from 'react'
import { css } from '@emotion/core'

function TopPanel() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        width: 100%;
        border-bottom: 1px solid #eee;
        grid-row: 1;
        box-sizing: border-box;
        align-items: center;
      `}
    >
      <button
        onClick={() => {}}
        css={css`
          margin-left: 20px;
          background-color: transparent;
          border: 1px solid #eee;
          cursor: pointer;
          outline: none;
          font-size: 16px;
          padding: 8px;

          &:hover {
            background-color: #ccc;
          }
        `}
      >
        Save as docker-compose.yml
      </button>
    </div>
  )
}

export default TopPanel
