import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { Transition } from 'react-transition-group'

import BlocksManager from './BlocksManager'
import BlockEditor from './BlockEditor'

const toggleButtonSize = 36
const panelTransitionStyles = {
  entering: 0,
  entered: 0,
  exiting: `calc(-10% + ${toggleButtonSize + 8}px)`,
  exited: `calc(-10% + ${toggleButtonSize + 8}px)`,
}

const duration = 300

export default function SidePanel({ setItems, items, setConnections, connections, itemToEditId, setItemToEditId }) {
  const [isDisplay, setDisplay] = useState(true)

  const toggleDisplay = () => setDisplay(!isDisplay)

  useEffect(() => {
    setDisplay(true)
  }, [itemToEditId])

  const isBlocksManagerVisible = isDisplay && !itemToEditId
  const isBlockEditorVisible = isDisplay && itemToEditId
  return (
    <Transition in={isDisplay} timeout={duration}>
      {(state) => (
        <div
          css={css`
            margin-left: ${panelTransitionStyles[state]};
            transition: margin-left ${duration}ms ease-in-out;
            display: flex;
            flex-direction: row;
            width: 10%;
            min-width: 140px;
            justify-content: space-between;
            height: 100%;
          `}
        >
          <div
            css={css`
              width: 100%;
              border-right: ${isDisplay ? '1px solid #eee' : 'none'};
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
            `}
          >
            {isBlocksManagerVisible && (
              <BlocksManager
                setItems={setItems}
                items={items}
                connections={connections}
                setConnections={setConnections}
              />
            )}
            {isBlockEditorVisible && (
              <BlockEditor
                items={items}
                connections={connections}
                itemToEditId={itemToEditId}
                setItemToEditId={setItemToEditId}
              />
            )}
          </div>
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
              align-self: flex-start;

              &:hover {
                background-color: #ccc;
              }
            `}
          >
            {isDisplay ? <>&larr;</> : <>&rarr;</>}
          </button>
        </div>
      )}
    </Transition>
  )
}
