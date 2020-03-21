import React from 'react'
import _ from 'lodash'

import { Field } from 'formik'
import { css } from '@emotion/core'

import { MenuItem, Button } from '@blueprintjs/core'

import { Select } from '@blueprintjs/select'

export const renderOption = ({ key, value }, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={key}
      onClick={handleClick}
      text={value}
      label=""
    />
  )
}

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
  const mappedValues = [
    { key: 'none', value: 'none' },
    ...values.map((v) => {
      if (_.isPlainObject(v)) {
        return v
      }
      if (_.isString(v)) {
        return { key: v, value: v }
      }
      return { key: v, value: v }
    }),
  ]

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
    <Field name={name} value={value}>
      {({ form: { setFieldValue } }) => {
        const handleChange = (data) => setFieldValue(name, data.value)

        return (
          <Select itemRenderer={renderOption} items={mappedValues} onItemSelect={handleChange} small>
            <Button rightIcon="caret-down" text={value} />
          </Select>
        )
      }}
    </Field>
  )
}
