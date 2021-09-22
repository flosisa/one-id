import createActionType from 'Util/redux/createActionType'

export const SIGN_IN = 'SIGN_IN'
export const CHECK_TOKEN = 'CHECK_TOKEN'
export const UUID = 'UUID'
export const DIGITAL_SIGN = 'DIGITAL_SIGN'
export const PASSWORD_RESET = 'PASSWORD_RESET'

export default ({
  [SIGN_IN]: createActionType(SIGN_IN),
  [CHECK_TOKEN]: createActionType(CHECK_TOKEN),
  [UUID]: createActionType(UUID),
  [DIGITAL_SIGN]: createActionType(DIGITAL_SIGN),
  [PASSWORD_RESET]: createActionType(PASSWORD_RESET),
})
