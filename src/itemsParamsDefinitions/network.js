export default {
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
