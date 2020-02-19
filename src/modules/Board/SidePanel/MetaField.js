import React from 'react'
import { css } from '@emotion/core'
import { Field } from 'formik'

function getField(name, definition) {
  if (definition.values) {
    return (
      <Field as="select" name={name}>
        {Object.values(definition.values).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Field>
    )
  } else {
    return <Field name={name} />
  }
}

export default function MetaField({ name, definition }) {
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
      {getField(name, definition)}
    </div>
  )
}
