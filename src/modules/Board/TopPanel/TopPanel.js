import React from 'react'

import { Alignment, Button, Navbar } from '@blueprintjs/core'

function TopPanel({ saveFile, items, connections }) {
  const saveHandler = () => saveFile(items, connections)

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Button minimal icon="home" text="Home" />
        <Button minimal icon="document" text="Save docker-compose.yml" onClick={saveHandler} />
      </Navbar.Group>
    </Navbar>
  )
}

export default TopPanel
