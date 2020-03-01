import _ from 'lodash'

import { saveAs } from 'file-saver'

import { CONTAINER, NETWORK, VOLUME, PROXY } from '../../constants'
import { baseConfig, toYaml } from '../../toYaml'

import { keys as containerKeys } from '../../itemsParamsDefinitions/container'
import { keys as networkKeys } from '../../itemsParamsDefinitions/network'
import { keys as proxyKeys } from '../../itemsParamsDefinitions/proxy'
import { keys as volumeKeys } from '../../itemsParamsDefinitions/volume'

const keysToPickMap = {
  [CONTAINER]: containerKeys,
  [PROXY]: proxyKeys,
  [NETWORK]: networkKeys,
  [VOLUME]: volumeKeys,
}

export function getComposeJSONDefinition(items, connections) {
  const containers = items.filter((it) => it.kind === CONTAINER || it.kind === PROXY)
  const networks = items.filter((it) => it.kind === NETWORK)
  const allVolumes = items.filter((it) => it.kind === VOLUME)

  const services = _.chain(containers)
    .map((it) => {
      const network = networks.find((network) => {
        const left = network.x
        const right = network.x + network.width
        const top = network.y
        const bottom = network.y + network.height
        return it.x >= left && it.x <= right && it.y >= top && it.y <= bottom
      })

      const connectedItemsIds = connections.filter((connection) => connection.from === it.id).map((it) => it.to)
      const volumes = allVolumes.filter((volume) => connectedItemsIds.includes(volume.id))

      const keysToPick = keysToPickMap[it.kind]

      const name = it.name || it.id

      const container = {
        ..._.chain(it)
          .pick(keysToPick)
          .pickBy((value) => value)
          .value(),
      }
      if (network) {
        container.network = _.pick(network, keysToPickMap[NETWORK])
      }
      if (!_.isEmpty(volumes)) {
        container.volumes = volumes.map((volume) => _.pick(volume, keysToPickMap[VOLUME]))
      }

      return [name, container]
    })
    .fromPairs()
    .value()

  return { ...baseConfig, services }
}

export function saveFile(items, connections) {
  const text = toYaml(getComposeJSONDefinition(items, connections))
  console.log('definition', text)
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, 'docker-compose.yml')
}
