import React from 'react'

import { Field } from 'formik'

import { InputGroup } from '@blueprintjs/core'

export default function TextInput({ name, value }) {
  return (
    <Field name={name} value={value}>
      {({ field }) => <InputGroup {...field} small />}
    </Field>
  )
}
