import _ from 'lodash'

export const definition = {
  name: {
    type: 'string',
    uniq: true,
  },
  network_mode: {
    type: 'string',
    values: {
      bridge: 'bridge',
      host: 'host',
      none: 'none',
    },
  },
}

export const keys = Object.keys(_.omit(definition, ['name']))
