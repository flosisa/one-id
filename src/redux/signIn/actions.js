import actionTypes from './actionTypes'

export const signIn = payload => ({
  type: actionTypes.SIGN_IN.request, payload
})

export const signInClear = payload => ({
  type: actionTypes.SIGN_IN.clear, payload
})

export const checkToken = payload => ({
  type: actionTypes.CHECK_TOKEN.request, payload
})

export const uuid = payload => ({
  type: actionTypes.UUID.request, payload
})

export const digitalSign = payload => ({
  type: actionTypes.DIGITAL_SIGN.request, payload
})

export const passwordReset = payload => ({
  type: actionTypes.PASSWORD_RESET.request, payload
})

export const passwordResetClear = payload => ({
  type: actionTypes.PASSWORD_RESET.clear, payload
})
