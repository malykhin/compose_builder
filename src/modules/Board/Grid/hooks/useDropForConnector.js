import { useDrop } from 'react-dnd'
import { CONNECTOR } from '../../../../constants'

export default function useDropForConnector(ref, id, connections, setConnections) {
  const [, drop] = useDrop({
    accept: [CONNECTOR],
    drop: (item, monitor) => {
      const existingConnections = connections.find(
        (connection) =>
          (connection.from === item.id && connection.to === item.id) ||
          (connection.from === id && connection.to === id),
      )
      if (!existingConnections) {
        const newConnection = {
          from: item.id,
          to: id,
        }
        setConnections([...connections, newConnection])
      }
    },
  })

  drop(ref)
}
