import _ from 'lodash'

import { STRING, NETWORK } from '../constants'

export const kind = NETWORK

export const definition = {
  name: {
    type: STRING,
    uniq: [NETWORK],
  },
  network_mode: {
    type: STRING,
    values: {
      bridge: 'bridge',
      host: 'host',
      none: 'none',
    },
  },
}

export const keys = Object.keys(_.omit(definition, ['name']))
