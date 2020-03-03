import _ from 'lodash'

import { STRING, VOLUME } from '../constants'

export const kind = VOLUME

export const definition = {
  name: {
    type: STRING,
    uniq: [VOLUME],
  },
  local: {
    type: STRING,
  },
  container: {
    type: STRING,
  },
}

export const keys = Object.keys(_.omit(definition, ['name']))
