import React, { useEffect } from 'react'
import { Formik, Form, useFormikContext } from 'formik'

import MetaField from './MetaField'

import { getModelInitialValues, mergeModelAndExisting } from './utils'

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

const AutoSubmit = () => {
  const { values, submitForm } = useFormikContext()
  useEffect(() => {
    submitForm()
  }, [values, submitForm])
  return null
}

export default function MetaForm({ item, setItem, links }) {
  const model = modelsMap[item.kind]
  const fields = Object.entries(model)
  const mergedInitialValues = mergeModelAndExisting(getModelInitialValues(model, links), item)

  const handleSubmit = (values, { setSubmitting }) => {
    setItem({ ...item, ...values })
    setSubmitting(false)
  }

  return (
    <Formik initialValues={mergedInitialValues} enableReinitialize onSubmit={handleSubmit}>
      {({ values }) => (
        <Form>
          {fields.map(([name, definition]) => (
            <MetaField key={name} name={name} definition={definition} value={values[name]} links={links} />
          ))}
          <AutoSubmit />
        </Form>
      )}
    </Formik>
  )
}
