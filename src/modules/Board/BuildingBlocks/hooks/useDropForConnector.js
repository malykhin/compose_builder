import { useDrop } from 'react-dnd'
import { CONNECTOR } from '../../../../constants'

export default function useDropForConnector(ref, id, connections, setConnections) {
  const [, drop] = useDrop({
    accept: [CONNECTOR],
    drop: (item, monitor) => {
      const existingConnectionId = connections.findIndex(
        (connection) =>
          (connection.from === item.id && connection.to === id) ||
          (connection.from === id && connection.to === item.id),
      )
      if (existingConnectionId === -1) {
        const newConnection = {
          from: item.id,
          to: id,
        }
        setConnections([...connections, newConnection])
      } else {
        connections.splice(existingConnectionId, 1)
        setConnections([...connections])
      }
    },
  })

  drop(ref)
}
