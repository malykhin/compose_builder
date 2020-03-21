import React from 'react'
import { css } from '@emotion/core'
import _ from 'lodash'
import { FormGroup } from '@blueprintjs/core'

import TextInput from '../../../components/form/TextInput'

import FormSelect from '../../../components/form/FormSelect'
import KeyValueField from '../../../components/form/KeyValueField'
import { STRING, ARRAY, KEY_VALUE, LINK } from '../../../constants'

function getField(name, definition, value = '', links) {
  if (definition.type === STRING) {
    const source = _.get(definition, 'element.source', [])
    const elementType = _.get(definition, 'element.type')
    if (definition.values) {
      const values = Object.values(definition.values)
      return <FormSelect name={name} value={value} values={values} />
    } else if (elementType === LINK) {
      const elementLinks = source.flatMap((s) => links[s])
      if (!_.isEmpty(elementLinks)) {
        return <TextInput name={name} value={value} />
      }
      return null
    } else {
      return <TextInput name={name} value={value} />
    }
  }
  if (definition.type === ARRAY) {
    const elementType = _.get(definition, 'element.type')
    if (elementType === LINK) {
      const source = _.get(definition, 'element.source', [])
      const readOnly = _.get(definition, 'element.readOnly')

      const values = _.chain(source)
        .map((item) => links[item])
        .flattenDeep()
        .value()

      return <FormSelect name={name} value={value} values={values} readOnly={readOnly} />
    }
    if (elementType === KEY_VALUE) {
      return <KeyValueField name={name} values={value || []} />
    }
  }

  return null
}

export default function MetaField({ name, definition, value, links }) {
  const field = getField(name, definition, value, links)
  if (!field) {
    return null
  }
  return (
    <div
      css={css`
        margin-bottom: 8px;
      `}
    >
      <FormGroup label={_.capitalize(name)}>{field}</FormGroup>
    </div>
  )
}
