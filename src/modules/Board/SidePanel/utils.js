import { CONTAINER, PROXY, VOLUME } from '../../../constants'

const getVolumeTag = (item) => {
  const local = (item.local || '').trim()
  const container = (item.container || '').trim()
  if (local && container) {
    return `${local}:${container}`
  }
  if (local) {
    return local
  }
  if (container) {
    return container
  }
  return ''
}

export function getLinks(items, connections, itemToEdit) {
  const filteredItems = items.filter((item) => item.id !== itemToEdit)
  const destinations = connections.filter((c) => c.from === itemToEdit).map((c) => c.to)

  const getItems = (kind) => [
    ...filteredItems.filter((item) => item.kind === kind).map((item) => ({ key: item.id, value: item.name || '' })),
  ]

  return {
    [CONTAINER]: getItems(CONTAINER),
    [PROXY]: getItems(PROXY),
    [VOLUME]: filteredItems
      .filter((item) => item.kind === VOLUME && destinations.includes(item.id))
      .map((item) => ({ key: item.id, value: getVolumeTag(item) })),
  }
}
