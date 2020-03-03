import React from 'react'
import _ from 'lodash'

import { Field } from 'formik'
import { css } from '@emotion/core'

export default function FormSelect({ name, value, values, readOnly }) {
  if (_.isEmpty(values)) {
    return (
      <div
        css={css`
          font-size: 14px;
          padding-left: 8px;
        `}
      >
        No values
      </div>
    )
  }
  const mappedValues = values.map((v) => {
    if (_.isPlainObject(v)) {
      return v
    }
    if (_.isString(v)) {
      return { key: v, value: v }
    }
    return { key: v, value: v }
  })

  return readOnly ? (
    <div>
      {mappedValues.map((_value) => (
        <div
          key={_value.key}
          css={css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
            padding-left: 8px;
          `}
        >
          {_value.value}
        </div>
      ))}
    </div>
  ) : (
    <Field as="select" name={name} value={value}>
      {[{ key: 'none', value: 'none' }, ...mappedValues].map((_value) => (
        <option key={_value.key} value={_value.value}>
          {_value.value}
        </option>
      ))}
    </Field>
  )
}
