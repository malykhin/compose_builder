import _ from 'lodash'

import { CONTAINER, PROXY, VOLUME, ARRAY, KEY_VALUE, LINK } from '../../../constants'

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
  const destinations = connections
    .filter((c) => c.from === itemToEdit || c.to === itemToEdit)
    .map((c) => (c.from === itemToEdit ? c.to : c.from))
  const getItems = (kind, destinations, getTag = (it) => it.name || '') => [
    ...filteredItems
      .filter((item) => item.kind === kind && destinations.includes(item.id))
      .map((item) => ({ key: item.id, value: getTag(item) })),
  ]

  return {
    [CONTAINER]: getItems(CONTAINER, destinations),
    [PROXY]: getItems(PROXY, destinations),
    [VOLUME]: getItems(VOLUME, destinations, getVolumeTag),
  }
}

export function getModelInitialValues(model, links) {
  return _.mapValues(model, (it) => {
    if (it.type === ARRAY) {
      const elementType = _.get(it, 'element.type')
      const elementSource = _.get(it, 'element.source')
      if (elementType === LINK) {
        return ''
      }
      if (elementType === KEY_VALUE) {
        if (elementSource) {
          const sources = elementSource
            .filter((item) => links[item].length)
            .flatMap((item) => links[item].map((it) => ({ name: it.value, id: it.key, key: '', value: '' })))
          return [...sources]
        }
        return [{ key: '', value: '' }]
      }
    }
    return ''
  })
}

export function mergeModelAndExisting(modelValues, existingValues) {
  const merged = {
    ...modelValues,
    ...existingValues,
  }
  return _.mapValues(merged, (it, key) => {
    if (_.isArray(it)) {
      const modelLinked = modelValues[key].filter((item) => item.id)
      if (!_.isEmpty(modelLinked)) {
        const missedLinks = modelLinked.filter((link) => it.every((_it) => _it.id !== link.id))
        const result = [...missedLinks, ...it]
        return result.map((item) => {
          if (!_.isUndefined(item.name)) {
            const correspondingItem = modelLinked.find((_it) => _it.id === item.id)
            return { ...item, name: correspondingItem.name }
          }
          return item
        })
      }
    }
    return it
  })
}
