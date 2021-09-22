import React, { useState, useEffect, useRef } from 'react'
import Tooltip from 'Components/Tooltip/index.jsx'
import { equals, prop, includes, toUpper, length, slice, join, path } from 'ramda'
import EyeIcon from 'Assets/svg/eye.svg'
import EyeDisabledIcon from 'Assets/svg/eye-disabled.svg'
import clsx from 'clsx'
import formNames, { required } from './validate/formNames'
import { injectIntl } from 'react-intl'
import Locale from 'Components/Locale'

import style from './index.scss'

export default injectIntl(({
  input,
  type,
  label,
  autoFocus,
  disabled,
  autoComplete,
  info,
  containerClassName,
  className,
  meta: { error, submitFailed, form, active },
  errorText,
  maxLength,
  intl,
  initialValue
}) => {
  const value = prop('value', input)
  const name = prop('name', input)
  const isPassport = equals(name, 'passSeriaNumber')
  const isPassword = equals(type, 'password')
  const isPhone = equals(type, 'tel')
  const isNumber = equals(type, 'number')
  const isSignUp = equals(form, formNames.signUp)
  const isCaptchaCode = equals(name, 'captchaCode')
  const actualError = (submitFailed && error) || errorText
  const errorMessageId = path(['props', 'id'], actualError)
  const errorMessage = errorMessageId && intl.formatMessage({ id: errorMessageId })
  const isMobile = window.innerWidth < 850

  const [visiblePassword, setVisiblePassword] = useState(false)
  const [cursor, setCursor] = useState(0)
  const [capsLock, setCapsLock] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    if (isPassword) {
      const listener = e => {
        const capsLockState = e.getModifierState('CapsLock')
        setCapsLock(capsLockState)
      }

      document.addEventListener('keyup', listener)

      return () => {
        document.removeEventListener('keyup', listener)
      }
    }
  }, [])

  useEffect(() => {
    if (initialValue) {
      const onChange = input.onChange

      onChange(initialValue)
      setVisiblePassword(true)
    }
  }, [initialValue])

  useEffect(() => {
    const input = inputRef.current

    if (input) {
      input.selectionStart = input.selectionEnd = cursor
    }
  }, [value])

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
  }, [errorMessage, errorText, active])

  const onChange = e => {
    const t = e.target
    let newValue = t.value
    var cursor = t.selectionStart
    const onChange = input.onChange

    if (t.validity.valid) {
      const vLen = length(value)
      const nVLen = length(newValue)

      if (isPassport) {
        newValue = toUpper(newValue)

        if (nVLen === 3) {
          if (vLen < nVLen) {
            newValue = join('', [slice(0, 2, newValue), ' ', slice(2, Infinity, newValue)])
            cursor += 1
          }
        }
      }
      else if (isPhone) {
        if (nVLen === 5 || nVLen === 8 || nVLen === 12 || nVLen === 15) {
          if (vLen < nVLen) {
            newValue = join('', [slice(0, nVLen - 1, newValue), ' ', slice(nVLen - 1, Infinity, newValue)])
            cursor += 1
          }
        }
      }
      else if (isCaptchaCode) {
        newValue = toUpper(newValue)
      }
    } else {
      newValue = value
      cursor -= 1
    }

    setCursor(cursor)
    if (newValue !== value) {
      onChange(newValue)
    }
  }

  return (
    <div className={clsx(style.formField, containerClassName)}>
      <div className={style.fieldTop}>
        <p>
          {label && `${label} ${isSignUp && includes(name, required) ? '*' : ''}`}
          {info && <em>{info}</em>}
        </p>
        {capsLock && (
          <span className={style.warn}>
            <Locale id="capslock-enabled" />
          </span>
        )}
      </div>
      <div className={clsx(style.formFieldInput, actualError && style.hasError, className)}>
        <input
          {...input}
          ref={inputRef}
          type={isNumber ? 'tel' : visiblePassword ? 'text' : type}
          autoComplete={autoComplete || 'off'}
          autoFocus={autoFocus}
          spellCheck={false}
          disabled={disabled}
          maxLength={maxLength}
          pattern={(isNumber || isPhone) ? `${isPhone ? '^\\+998' : ''}[0-9 ]*$` : undefined}
          onChange={onChange}
        />
        <Tooltip
          className={style.tooltip}
          content={actualError}
        />
        {!disabled && value && isPassword && (
          <div
            className={clsx(style.togglePassword, visiblePassword && style.eyeDisabled)}
            onClick={() => setVisiblePassword(!visiblePassword)}
          >
            {!visiblePassword ? <EyeIcon /> : <EyeDisabledIcon />}
          </div>
        )}
      </div>
      {isMobile && actualError && (
        <span className={style.notify}>{actualError}</span>
      )}
    </div>
  )
})
