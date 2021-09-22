import actionTypes from './actionTypes'

export const personalData = payload => ({
  type: actionTypes.PERSONAL_DATA.request, payload
})

export const personalDataClear = payload => ({
  type: actionTypes.PERSONAL_DATA.clear, payload
})

export const personalPhoto = payload => ({
  type: actionTypes.PERSONAL_PHOTO.request, payload
})

export const personalDataRefresh = payload => ({
  type: actionTypes.PERSONAL_DATA_REFRESH.request, payload
})

export const changeEmail = payload => ({
  type: actionTypes.CHANGE_EMAIL.request, payload
})

export const changePhone = payload => ({
  type: actionTypes.CHANGE_PHONE.request, payload
})

export const changePhoneSmsCheck = payload => ({
  type: actionTypes.CHANGE_PHONE_SMS_CHECK.request, payload
})

export const changePhoneSmsCheckClear = payload => ({
  type: actionTypes.CHANGE_PHONE_SMS_CHECK.clear, payload
})

export const changeLogin = payload => ({
  type: actionTypes.CHANGE_LOGIN.request, payload
})

export const changePassword = payload => ({
  type: actionTypes.CHANGE_PASSWORD.request, payload
})

export const signOut = payload => ({
  type: actionTypes.SIGN_OUT.request, payload
})
