export default {
  name: {
    type: 'string',
    uniq: ['container', 'proxy'],
  },
  image: {
    type: 'string',
  },
  env: {
    type: 'array',
    element: {
      type: 'key_value',
    },
  },
  command: {
    type: 'string',
  },
  entrypoint: {
    type: 'string',
  },
  build: {
    type: 'string',
  },
  labels: {
    type: 'array',
    element: {
      type: 'string',
    },
  },
  container_name: {
    type: 'string',
  },
  depends_on: {
    type: 'array',
    element: {
      type: 'link',
      source: 'container',
    },
  },
  restart: {
    type: 'string',
    values: {
      no: 'no',
      always: 'always',
      'on-failure': 'on-failure',
      'unless-stopped': 'unless-stopped',
    },
  },
  volume: {
    type: 'array',
    element: {
      type: 'link',
      source: 'volume',
    },
  },
}
