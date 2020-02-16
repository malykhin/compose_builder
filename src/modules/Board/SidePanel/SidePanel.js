import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Transition } from 'react-transition-group'

import Item from '../BuildingBlocks/Item'
import Box from '../BuildingBlocks/Box'
import DeleteArea from './DeleteArea'

import { CONTAINER, VOLUME, PROXY } from '../../../constants'

const toggleButtonSize = 36
const panelTransitionStyles = {
  entering: 0,
  entered: 0,
  exiting: `calc(-10% + ${toggleButtonSize}px)`,
  exited: `calc(-10% + ${toggleButtonSize}px)`,
}

const duration = 300

export default function SidePanel({ setItems, items, setConnections, connections }) {
  const [isDisplay, setDisplay] = useState(true)

  const toggleDisplay = () => setDisplay(!isDisplay)

  return (
    <>
      <Transition in={isDisplay} timeout={duration}>
        {(state) => (
          <div
            css={css`
              width: 10%;
              transition: margin-left ${duration}ms ease-in-out;
              margin-left: ${panelTransitionStyles[state]};
              border-right: 1px solid #eee;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              margin-right: 12px;
            `}
          >
            <button
              onClick={toggleDisplay}
              css={css`
                background-color: transparent;
                border: 1px solid #eee;
                cursor: pointer;
                width: ${toggleButtonSize}px;
                height: ${toggleButtonSize}px;
                outline: none;
                margin-right: 4px;
                font-size: 20px;
                align-self: flex-end;
                &:hover {
                  background-color: #ccc;
                }
              `}
            >
              {isDisplay ? <>&larr;</> : <>&rarr;</>}
            </button>
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
          </div>
        )}
      </Transition>
    </>
  )
}
