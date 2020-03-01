import _ from 'lodash'

export const definition = {
  name: {
    type: 'string',
    uniq: ['container', 'proxy'],
  },
  type: {
    type: 'string',
    values: {
      traefik: 'traefik',
    },
  },
}

export const keys = Object.keys(_.omit(definition, ['name']))
