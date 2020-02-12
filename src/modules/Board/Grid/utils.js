import { linkVertical, linkHorizontal } from 'd3-shape'

export function computeConnectionLines(connections, items, gridDimensions, gridShape) {
  const gridStepX = gridDimensions.width / gridShape.x
  const gridStepY = gridDimensions.height / gridShape.y
  return connections.map((connection) => {
    const from = { ...items.find((it) => it.id === connection.from) }
    const to = { ...items.find((it) => it.id === connection.to) }

    const isHorizontal = Math.abs(from.y - to.y) === 1

    if (isHorizontal) {
      if (from.y !== to.y && from.x > to.x) {
        from.y = from.y - 0.5
        from.x = from.x - 0.95
        to.y = to.y - 0.5
        to.x = to.x - 0.05
      }

      if (from.y !== to.y && from.x < to.x) {
        from.y = from.y - 0.5
        from.x = from.x - 0.05
        to.y = to.y - 0.5
        to.x = to.x - 0.95
      }
    } else {
      if (from.y > to.y && from.x !== to.x) {
        from.y = from.y - 0.95
        from.x = from.x - 0.5
        to.x = to.x - 0.5
        to.y = to.y - 0.05
      }

      if (from.y < to.y && from.x !== to.x) {
        from.x = from.x - 0.5
        from.y = from.y - 0.05
        to.y = to.y - 0.95
        to.x = to.x - 0.5
      }
    }

    if (from.y === to.y && from.x < to.x) {
      from.y = from.y - 0.5
      from.x = from.x - 0.05
      to.y = to.y - 0.5
      to.x = to.x - 0.95
    }
    if (from.y === to.y && from.x > to.x) {
      from.y = from.y - 0.5
      to.y = to.y - 0.5
      to.x = to.x - 0.05
      from.x = from.x - 0.95
    }
    if (from.x === to.x && from.y < to.y) {
      from.x = from.x - 0.5
      from.y = from.y - 0.05
      to.x = to.x - 0.5
      to.y = to.y - 0.95
    }
    if (from.x === to.x && from.y > to.y) {
      from.x = from.x - 0.5
      from.y = from.y - 0.95
      to.x = to.x - 0.5
      to.y = to.y - 0.05
    }

    const link = isHorizontal ? linkHorizontal : linkVertical
    return {
      key: `${from.id}_${to.id}`,
      d: link()({
        source: [from.x * gridStepX, from.y * gridStepY],
        target: [to.x * gridStepX, to.y * gridStepY],
      }),
    }
  })
}
