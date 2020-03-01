import React from 'react'
import { Formik, Form } from 'formik'
import _ from 'lodash'

import MetaField from './MetaField'

import { CONTAINER, VOLUME, PROXY, NETWORK } from '../../../constants'

import { definition as containerDefinition } from '../../../itemsParamsDefinitions/container'
import { definition as networkDefinition } from '../../../itemsParamsDefinitions/network'
import { definition as proxyDefinition } from '../../../itemsParamsDefinitions/proxy'
import { definition as volumeDefinition } from '../../../itemsParamsDefinitions/volume'

const modelsMap = {
  [CONTAINER]: containerDefinition,
  [NETWORK]: networkDefinition,
  [VOLUME]: volumeDefinition,
  [PROXY]: proxyDefinition,
}

export default function MetaForm({ item, initialValues = {}, setItem, goBack }) {
  const model = modelsMap[item.kind]
  const fields = Object.entries(model)

  const mergedInitialValues = { ..._.mapValues(model, () => ''), ...initialValues, ...item }
  return (
    <Formik
      initialValues={mergedInitialValues}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        setItem({ ...item, ...values })
        setSubmitting(false)
        goBack()
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          {fields.map(([name, definition]) => (
            <MetaField key={name} name={name} definition={definition} value={values[name]} />
          ))}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}
