import React from 'react'

import { Field, FieldArray } from 'formik'
import { css } from '@emotion/core'

export default function KeyValueField({ name, values }) {
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div>
          {values.map((item, index) => {
            const isNamedItem = item.id && item.name
            return (
              <div key={index}>
                {isNamedItem && <div>{item.name}:</div>}
                <div
                  css={css`
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    & > input {
                      width: 50%;
                    }
                  `}
                >
                  <Field name={`${name}[${index}].key`} />
                  {'='}
                  <Field name={`${name}[${index}].value`} />
                  {!isNamedItem && (
                    <button type="button" onClick={() => arrayHelpers.remove(index)}>
                      -
                    </button>
                  )}
                </div>
              </div>
            )
          })}
          <button type="button" onClick={() => arrayHelpers.push({ key: '', value: '' })}>
            +
          </button>
        </div>
      )}
    />
  )
}
