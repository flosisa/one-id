import actionTypes from './actionTypes'

export const pinflCheck = payload => ({
  type: actionTypes.PINFL_CHECK.request, payload
})

export const checkPassportBirthDate = payload => ({
  type: actionTypes.CHECK_PASSPORT_BIRTH_DATE.request, payload
})

export const smsAsk = payload => ({
  type: actionTypes.SMS_ASK.request, payload
})

export const smsAskClear = payload => ({
  type: actionTypes.SMS_ASK.clear, payload
})

export const smsCheck = payload => ({
  type: actionTypes.SMS_CHECK.request, payload
})

export const signUp = payload => ({
  type: actionTypes.SIGN_UP.request, payload
})

export const signUpClear = payload => ({
  type: actionTypes.SIGN_UP.clear, payload
})

export const loginGenerate = payload => ({
  type: actionTypes.LOGIN_GENERATE.request, payload
})

export const passwordGenerate = payload => ({
  type: actionTypes.PASSWORD_GENERATE.request, payload
})
