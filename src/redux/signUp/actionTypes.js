import createActionType from 'Util/redux/createActionType'

export const PINFL_CHECK = 'PINFL_CHECK'
export const SMS_ASK = 'SMS_ASK'
export const SMS_CHECK = 'SMS_CHECK'
export const SIGN_UP = 'SIGN_UP'
export const LOGIN_GENERATE = 'LOGIN_GENERATE'
export const PASSWORD_GENERATE = 'PASSWORD_GENERATE'
export const CHECK_PASSPORT_BIRTH_DATE = 'CHECK_PASSPORT_BIRTH_DATE'

export default ({
  [PINFL_CHECK]: createActionType(PINFL_CHECK),
  [SMS_ASK]: createActionType(SMS_ASK),
  [SMS_CHECK]: createActionType(SMS_CHECK),
  [SIGN_UP]: createActionType(SIGN_UP),
  [LOGIN_GENERATE]: createActionType(LOGIN_GENERATE),
  [PASSWORD_GENERATE]: createActionType(PASSWORD_GENERATE),
  [CHECK_PASSPORT_BIRTH_DATE]: createActionType(CHECK_PASSPORT_BIRTH_DATE),
})
