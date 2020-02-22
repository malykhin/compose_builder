import React from 'react'
import { Global, css } from '@emotion/core'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import Board from './modules/Board/Board'
import { X_BOARD_SIZE, Y_BOARD_SIZE } from './constants'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Global
        styles={css`
          * {
            font-family: Helvetica, sans-serif;
          }

          html,
          body,
          #root {
            height: 100%;
          }
        `}
      />
      <Board xBoardSize={X_BOARD_SIZE} yBoardSize={Y_BOARD_SIZE} />
    </DndProvider>
  )
}

export default App
