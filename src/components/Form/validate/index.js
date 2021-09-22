import React from 'react'
import { mapObjIndexed, isEmpty, forEach, toLower, test, propEq, prop, pick, endsWith } from 'ramda'
import formNames, { required } from './formNames'
import Locale from 'Components/Locale'

export const pinflLength = 14
export const passportDataLength = 9
export const tinLength = 9
export const initialValues = { phoneNumber: '+998' }

export default (values, props) => {
  const errors = {}

  const checkPinfl = value => {
    return test(/^[0-9]{14}$/, value)
  }
  const checkPassportData = value => {
    return test(/^[A-Z]{2}\s?[0-9]{7}$/i, value)
  }

  const pinflCheck = propEq('pinflCheck', true, values)
  const passportDataCheck = propEq('passportDataCheck', true, values)
  if (pinflCheck) {
    return checkPinfl(prop('pinfl', values))
  }
  if (passportDataCheck) {
    return checkPassportData(prop('passportData', values))
  }

  const { password, confirmPassword, oldPassword, newPassword } = pick([
    'password',
    'confirmPassword',
    'oldPassword',
    'newPassword',
  ], values)
  const form = prop('form', props)
  const isSignUp = form === formNames.signUp
  const isChangePassword = form === formNames.changePassword

  if (isSignUp) {
    if (password !== confirmPassword) {
      errors.confirmPassword = <Locale id='password-mismatch' />
    }
  }
  if (isChangePassword) {
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = <Locale id='password-mismatch' />
    } else if (oldPassword === newPassword) {
      errors.newPassword = <Locale id='passwords-same' />
    }
  }

  mapObjIndexed((value, key) => {
    forEach(r => {
      const v = values[r]

      if (!v || isEmpty(v)) {
        errors[r] = <Locale id='required-field' />
      }
    })(required)

    if (!errors[key]) {
      if (endsWith('login', toLower(key)) && !test(/(?=^.{3,}$)^[a-zA-Z0-9#@\-_.,]+$/, value)) {
        errors[key] = <Locale id='login-invalid' />
      } else if ((isSignUp || (isChangePassword && key !== 'oldPassword')) && endsWith('password', toLower(key)) && !test(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,}$/, value)) {
        errors[key] = <Locale id='password-invalid' />
      } else if (key === 'pinfl' && !checkPinfl(value)) {
        errors[key] = <Locale id='pinfl-invalid' />
      } else if (key === 'passSeriaNumber' && !checkPassportData(value)) {
        errors[key] = <Locale id='passport-invalid' />
      } else if (endsWith('phonenumber', toLower(key)) && !test(/^\+998\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/, value)) {
        errors[key] = <Locale id='phone-invalid' />
      } else if (key === 'smsCode' && !test(/^[0-9]{6}$/, value)) {
        errors[key] = <Locale id='sms-code-invalid' />
      } else if (endsWith('email', toLower(key)) && !test(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, value)) {
        errors[key] = <Locale id='email-invalid' />
      } else if (key === 'tin' && !test(/^[0-9]{9}$/, value)) {
        errors[key] = <Locale id='tin-invalid' />
      }
    }
  })(isEmpty(values) ? { ['i-am-unknown']: 'no-name' } : values)

  return errors
}
