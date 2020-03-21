import React from 'react'
import { css } from '@emotion/core'

import { ITEM, BOX } from '../../../constants'

export default function Shadows({ items }) {
  return (
    <>
      {items.map(({ type, x, y, height, width, id, isShadowVisible, isShadowDanger }) =>
        isShadowVisible && (type === ITEM || type === BOX) ? (
          <div
            key={id}
            css={css`
              background-color: ${isShadowDanger ? '#DB3737' : 'rgba(167, 182, 194, 0.3)'};
              grid-column-start: ${x};
              grid-column-end: ${x + width};
              grid-row-start: ${y};
              grid-row-end: ${y + height};
              grid-template-columns: repeat(${width}, ${100 / width}%);
              grid-template-rows: repeat(${height}, ${100 / height}%);
              z-index: -2;
            `}
          />
        ) : null,
      )}
    </>
  )
}
