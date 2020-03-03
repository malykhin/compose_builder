import _ from 'lodash'

import { STRING, CONTAINER, PROXY } from '../constants'

export const kind = PROXY

export const definition = {
  name: {
    type: STRING,
    uniq: [CONTAINER, PROXY],
  },
  proxy_type: {
    type: STRING,
    values: {
      traefik: 'traefik',
    },
  },
}

export const keys = Object.keys(_.omit(definition, ['name']))
