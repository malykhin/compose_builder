import React from 'react'

import { FieldArray } from 'formik'
import { css } from '@emotion/core'
import { Button, FormGroup } from '@blueprintjs/core'

import TextInput from './TextInput'

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
                <FormGroup>
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      width: 100%;
                    `}
                  >
                    <TextInput name={`${name}[${index}].key`} />
                    <div
                      css={css`
                        margin-left: 4px;
                        margin-right: 4px;
                      `}
                    >
                      =
                    </div>
                    <TextInput name={`${name}[${index}].value`} />

                    {!isNamedItem && <Button minimal small icon="minus" onClick={() => arrayHelpers.remove(index)} />}
                  </div>
                </FormGroup>
              </div>
            )
          })}
          <Button minimal small icon="plus" onClick={() => arrayHelpers.push({ key: '', value: '' })} />
        </div>
      )}
    />
  )
}
