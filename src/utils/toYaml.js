import _ from 'lodash'

export const baseConfig = {
  version: '3.7',
}

function generateIndent(ident = 0, isArray) {
  const correctedIdent = ident < 0 ? 0 : ident
  return isArray
    ? ''
    : Array(correctedIdent * 2)
        .fill(' ')
        .join('')
}

function getPrefix(key) {
  return key ? `${key}:\n` : ''
}

function getScalarPrefix(key) {
  return key ? `${key}: ` : ''
}

export function toYaml(value, key = '', ident = -1, isArray) {
  if (_.isString(value)) {
    return `${generateIndent(ident, isArray)}${getScalarPrefix(key)}"${value}"`
  }
  if (_.isNumber(value)) {
    return `${generateIndent(ident, isArray)}${getScalarPrefix(key)}${value}`
  }
  if (_.isPlainObject(value)) {
    return `${generateIndent(ident, isArray)}${getPrefix(key)}${_.toPairs(value)
      .map(([key, value]) => toYaml(value, key, ident + 1))
      .join(`\n`)}`
  }
  if (_.isArray(value)) {
    return `${generateIndent(ident, isArray)}${getPrefix(key)}${value
      .map((it) => `${generateIndent(ident, isArray)}- ${toYaml(it, '', ident, true)}`)
      .join('\n')}`.replace(/-\s\s+/g, '- ')
  }
  return ''
}
