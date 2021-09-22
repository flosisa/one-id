import React, { useEffect, useRef } from 'react'
import { prop, includes, path } from 'ramda'
import clsx from 'clsx'
import { required } from './validate/formNames'
import { injectIntl } from 'react-intl'
import Tooltip from 'Components/Tooltip/index.jsx'

import style from './index.scss'

export default injectIntl(({
  input,
  label,
  className,
  autoFocus,
  meta: { error, submitFailed, active },
  disabled,
  maxLength,
  errorText,
  intl
}) => {
  const value = prop('value', input)
  const name = prop('name', input)
  const actualError = (submitFailed && error) || errorText
  const errorMessageId = path(['props', 'id'], actualError)
  const errorMessage = errorMessageId && intl.formatMessage({ id: errorMessageId })
  const isMobile = window.innerWidth < 850

  const inputRef = useRef(null)

  useEffect(() => {
    const input = inputRef.current

    if (input && !isMobile) {
      const tooltip = input.nextSibling

      if (tooltip) {
        const asyncError = typeof errorText === 'string' && errorText

        if ((submitFailed && errorMessage && active) || asyncError) {
          tooltip.style.display = 'block'
        } else {
          tooltip.style.display = 'none'
        }
      }
    }
  }, [value, errorMessage, errorText, active])

  return (
    <div className={style.formFieldTextarea}>
      <div className={style.fieldTop}>
        <p>
          {label && `${label} ${includes(name, required) ? '*' : ''}`}
        </p>
      </div>
      <div className={clsx(style.formFieldInput, actualError && style.hasError, className)}>
        <textarea
          {...input}
          ref={inputRef}
          autoFocus={autoFocus}
          spellCheck={false}
          maxLength={maxLength}
          disabled={disabled}
        />
        <Tooltip
          className={style.tooltip}
          content={actualError}
        />
        {isMobile && actualError && (
          <span className={style.notify}>
            {actualError}
          </span>
        )}
      </div>
    </div>
  )
})
