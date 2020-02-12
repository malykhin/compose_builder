import { linkVertical, linkHorizontal } from 'd3-shape'

const half = 0.5
const small = 0.05
const large = 0.95

export function computeConnectionLines(connections, items, gridDimensions, gridShape) {
  const gridStepX = gridDimensions.width / gridShape.x
  const gridStepY = gridDimensions.height / gridShape.y
  return connections.map((connection) => {
    const from = { ...items.find((it) => it.id === connection.from) }
    const to = { ...items.find((it) => it.id === connection.to) }

    const isHorizontal = Math.abs(from.y - to.y) === 1

    if (isHorizontal) {
      if (from.y !== to.y && from.x > to.x) {
        from.y = from.y - half
        from.x = from.x - large
        to.y = to.y - half
        to.x = to.x - small
      }

      if (from.y !== to.y && from.x < to.x) {
        from.y = from.y - half
        from.x = from.x - small
        to.y = to.y - half
        to.x = to.x - large
      }
    } else {
      if (from.y > to.y && from.x !== to.x) {
        from.y = from.y - large
        from.x = from.x - half
        to.x = to.x - half
        to.y = to.y - small
      }

      if (from.y < to.y && from.x !== to.x) {
        from.x = from.x - half
        from.y = from.y - small
        to.y = to.y - large
        to.x = to.x - half
      }
    }

    if (from.y === to.y && from.x < to.x) {
      from.y = from.y - half
      from.x = from.x - small
      to.y = to.y - half
      to.x = to.x - large
    }
    if (from.y === to.y && from.x > to.x) {
      from.y = from.y - half
      to.y = to.y - half
      to.x = to.x - small
      from.x = from.x - large
    }
    if (from.x === to.x && from.y < to.y) {
      from.x = from.x - half
      from.y = from.y - small
      to.x = to.x - half
      to.y = to.y - large
    }
    if (from.x === to.x && from.y > to.y) {
      from.x = from.x - half
      from.y = from.y - large
      to.x = to.x - half
      to.y = to.y - small
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
