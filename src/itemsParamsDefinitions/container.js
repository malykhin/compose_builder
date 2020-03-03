import _ from 'lodash'
import { STRING, CONTAINER, PROXY, ARRAY, KEY_VALUE, LINK, VOLUME } from '../constants'

export const kind = CONTAINER

export const definition = {
  name: {
    type: STRING,
    uniq: [CONTAINER, PROXY],
  },
  image: {
    type: STRING,
  },
  env: {
    type: ARRAY,
    element: {
      type: KEY_VALUE,
    },
  },
  command: {
    type: STRING,
  },
  entrypoint: {
    type: STRING,
  },
  build: {
    type: STRING,
  },
  labels: {
    type: ARRAY,
    element: {
      type: STRING,
    },
  },
  container_name: {
    type: STRING,
  },
  depends_on: {
    type: ARRAY,
    element: {
      type: LINK,
      source: [CONTAINER, PROXY],
    },
  },
  restart: {
    type: STRING,
    values: {
      no: 'no',
      always: 'always',
      'on-failure': 'on-failure',
      'unless-stopped': 'unless-stopped',
    },
  },
  volumes: {
    type: ARRAY,
    element: {
      readOnly: true,
      type: LINK,
      source: [VOLUME],
    },
  },
}

export const keys = Object.keys(_.omit(definition, ['name', 'volume']))
