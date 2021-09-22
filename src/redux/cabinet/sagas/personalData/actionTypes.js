import createActionType from 'Util/redux/createActionType'
import {
  PERSONAL_DATA,
  PERSONAL_DATA_REFRESH,
  PERSONAL_PHOTO,
  CHANGE_EMAIL,
  CHANGE_PHONE,
  CHANGE_PHONE_SMS_CHECK,
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  SIGN_OUT
} from '../../actionTypes'

export default ({
  [PERSONAL_DATA]: createActionType(PERSONAL_DATA),
  [PERSONAL_PHOTO]: createActionType(PERSONAL_PHOTO),
  [PERSONAL_DATA_REFRESH]: createActionType(PERSONAL_DATA_REFRESH),
  [CHANGE_EMAIL]: createActionType(CHANGE_EMAIL),
  [CHANGE_PHONE]: createActionType(CHANGE_PHONE),
  [CHANGE_PHONE_SMS_CHECK]: createActionType(CHANGE_PHONE_SMS_CHECK),
  [CHANGE_LOGIN]: createActionType(CHANGE_LOGIN),
  [CHANGE_PASSWORD]: createActionType(CHANGE_PASSWORD),
  [SIGN_OUT]: createActionType(SIGN_OUT),
})
