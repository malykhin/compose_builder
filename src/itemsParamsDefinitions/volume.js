import _ from 'lodash'

export const definition = {
  name: {
    type: 'string',
    uniq: true,
  },
  from: {
    type: 'string',
  },
  to: {
    type: 'string',
  },
}

export const keys = Object.keys(_.omit(definition, ['name']))
