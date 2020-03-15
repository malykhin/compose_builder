import React from 'react'
import { css } from '@emotion/core'
import { Field } from 'formik'
import _ from 'lodash'

import FormSelect from './FormSelect'
import KeyValueField from './KeyValueField'
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
        return <Field name={name} value={value} />
      }
      return null
    } else {
      return <Field name={name} value={value} />
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
      <div
        css={css`
          text-transform: capitalize;
        `}
      >
        {name}
      </div>
      {field}
    </div>
  )
}
