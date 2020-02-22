import React from 'react'
import { Formik, Form } from 'formik'
import _ from 'lodash'

import MetaField from './MetaField'

import { CONTAINER, VOLUME, PROXY, NETWORK } from '../../../constants'

import container from '../../../itemsParamsDefinitions/container'
import network from '../../../itemsParamsDefinitions/network'
import proxy from '../../../itemsParamsDefinitions/proxy'
import volume from '../../../itemsParamsDefinitions/volume'

const modelsMap = {
  [CONTAINER]: container,
  [NETWORK]: network,
  [VOLUME]: volume,
  [PROXY]: proxy,
}

export default function MetaForm({ item, initialValues = {} }) {
  const model = modelsMap[item.kind]
  const fields = Object.entries(model)
  const mergedInitialValues = { ..._.mapValues(model, () => ''), ...initialValues }
  return (
    <Formik
      initialValues={mergedInitialValues}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values)
        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {fields.map(([name, definition]) => (
            <MetaField key={name} name={name} definition={definition} />
          ))}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}
