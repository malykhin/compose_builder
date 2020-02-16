import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { Transition } from 'react-transition-group'

import BlocksManager from './BlocksManager'
import BlockEditor from './BlockEditor'

const toggleButtonSize = 36
const panelTransitionStyles = {
  entering: 0,
  entered: 0,
  exiting: `calc(-10% + ${toggleButtonSize}px)`,
  exited: `calc(-10% + ${toggleButtonSize}px)`,
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
            {!isBlockEditorVisible && (
              <>
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

                <hr
                  css={css`
                    width: 90%;
                    height: 1px;
                    border: none;
                    background-color: #eee;
                    margin-top: 8px;
                    margin-bottom: 0px;
                  `}
                />
              </>
            )}
            {isBlocksManagerVisible && (
              <BlocksManager
                setItems={setItems}
                items={items}
                connections={connections}
                setConnections={setConnections}
              />
            )}
            {isBlockEditorVisible && <BlockEditor itemToEditId={itemToEditId} setItemToEditId={setItemToEditId} />}
          </div>
        )}
      </Transition>
    </>
  )
}
