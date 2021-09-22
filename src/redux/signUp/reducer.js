import createReducer from 'Util/redux/createReducer'
import createReducerState from 'Util/redux/createReducerState'
import { PINFL_CHECK, SMS_ASK, SMS_CHECK, SIGN_UP, LOGIN_GENERATE, PASSWORD_GENERATE, CHECK_PASSPORT_BIRTH_DATE } from './actionTypes'
import * as STATES from './states'

const reducer = {
  ...createReducerState(PINFL_CHECK, STATES.PINFL_CHECK),
  ...createReducerState(SMS_ASK, STATES.SMS_ASK),
  ...createReducerState(SMS_CHECK, STATES.SMS_CHECK),
  ...createReducerState(SIGN_UP, STATES.SIGN_UP),
  ...createReducerState(LOGIN_GENERATE, STATES.LOGIN_GENERATE),
  ...createReducerState(PASSWORD_GENERATE, STATES.PASSWORD_GENERATE),
  ...createReducerState(CHECK_PASSPORT_BIRTH_DATE, STATES.CHECK_PASSPORT_BIRTH_DATE),
}

export default createReducer({}, reducer)
