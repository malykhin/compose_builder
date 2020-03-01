import React from 'react'
import { css } from '@emotion/core'
import { Field } from 'formik'

function getField(name, definition, value) {
  if (definition.values) {
    return (
      <Field as="select" name={name} value={value}>
        {Object.values(definition.values).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Field>
    )
  } else {
    return <Field name={name} value={value} />
  }
}

export default function MetaField({ name, definition, value }) {
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
      {getField(name, definition, value)}
    </div>
  )
}
