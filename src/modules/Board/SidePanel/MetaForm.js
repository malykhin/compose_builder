import React, { useEffect } from 'react'
import { Formik, Form, useFormikContext } from 'formik'
import _ from 'lodash'

import MetaField from './MetaField'

import { CONTAINER, VOLUME, PROXY, NETWORK, ARRAY, KEY_VALUE, LINK } from '../../../constants'

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

export default function MetaForm({ item, initialValues = {}, setItem, links }) {
  const model = modelsMap[item.kind]
  const fields = Object.entries(model)
  const mergedInitialValues = {
    ..._.mapValues(model, (it) => {
      if (it.type === ARRAY) {
        const elementType = _.get(it, 'element.type')
        if (elementType === LINK) {
          return ''
        }
        if (elementType === KEY_VALUE) {
          return [{ key: '', value: '' }]
        }
      }
      return ''
    }),
    ...initialValues,
    ...item,
  }

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
