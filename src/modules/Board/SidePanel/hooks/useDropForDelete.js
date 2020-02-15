import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import _ from 'lodash'

import { ITEM, BOX } from '../../../../constants'

export default function useDropForGrid(setItems, itemsIn, setConnections, connections) {
  const ref = useRef(null)
  const items = _.cloneDeep(itemsIn)
  const [{ isHover }, drop] = useDrop({
    accept: [ITEM, BOX],
    drop: (item) => {
      if (item.id) {
        const index = items.findIndex((it) => it.id === item.id)
        if (index > -1) {
          items.splice(index, 1)
          setItems(items)
          const newConnections = connections.filter(
            (connection) => connection.from !== item.id && connection.to !== item.id,
          )
          setConnections(newConnections)
        }
      }
    },
    collect: (monitor) => ({ isHover: monitor.isOver() }),
  })

  drop(ref)

  return { ref, isHover }
}
