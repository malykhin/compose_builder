export default {
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
