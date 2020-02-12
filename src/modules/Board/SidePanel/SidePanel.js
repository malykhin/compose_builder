import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Transition } from 'react-transition-group'

const toggleButtonSize = 36
const panelTransitionStyles = {
  entering: 0,
  entered: 0,
  exiting: `calc(-10% + ${toggleButtonSize}px)`,
  exited: `calc(-10% + ${toggleButtonSize}px)`,
}

const duration = 300

export default function SidePanel() {
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
              flex-direction: row;
              justify-content: space-between;
              margin-right: 12px;
            `}
          >
            Panel
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
    </>
  )
}
