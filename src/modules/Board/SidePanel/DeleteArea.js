import React from 'react'
import { css } from '@emotion/core'

import useDropForDelete from './hooks/useDropForDelete'

export default function DeleteArea({ setItems, items, setConnections, connections }) {
  const { isHover, ref } = useDropForDelete(setItems, items, setConnections, connections)
  return (
    <div
      ref={ref}
      css={css`
        grid-column-start: 2;
        grid-row-start: 8;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${isHover ? 'rgba(167, 182, 194, 0.3)' : 'transparent'};
      `}
    >
      <svg
        fill={isHover ? '#5C7080' : '#A7B6C2'}
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 0 24 24"
        width="48"
      >
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
        <path d="M0 0h24v24H0V0z" fill="none" />
      </svg>
    </div>
  )
}
