import React from 'react'
import { prop, includes, equals } from 'ramda'
import DatePicker, { registerLocale } from 'react-datepicker'
import uz from 'date-fns/locale/uz'
import ru from 'date-fns/locale/ru'
import formNames, { required } from './validate/formNames'
import clsx from 'clsx'

import style from './index.scss'

export default ({
  input,
  dateFormat,
  className,
  label,
  meta: { submitFailed, error, form },
  errorText,
  disabled,
  locale,
}) => {
  const value = prop('value', input)
  const name = prop('name', input)
  const actualLocale = locale === 'ru' ? 'ru' : 'uz'
  const isSignUp = equals(form, formNames.signUp)
  const actualError = (submitFailed && error) || errorText
  const isMobile = window.innerWidth < 850

  const onChange = date => {
    input.onChange(date)
  }

  registerLocale(actualLocale, locale === 'ru' ? ru : uz)

  return (
    <div className={style.formField}>
      <div className={style.fieldTop}>
        <p>
          {label && `${label} ${isSignUp && includes(name, required) ? '*' : ''}`}
        </p>
      </div>
      <div className={clsx(style.formFieldInput, actualError && style.hasError, className)}>
        <DatePicker
          dateFormat={dateFormat || "dd/MM/yyyy"}
          onChange={onChange}
          selected={value || null}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          locale={actualLocale}
          disabled={disabled}
        />
      </div>
      {isMobile && actualError && (
        <span className={style.notify}>{actualError}</span>
      )}
    </div>
  )
}
