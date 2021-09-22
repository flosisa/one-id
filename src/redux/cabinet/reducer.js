import createReducer from 'Util/redux/createReducer'
import createReducerState from 'Util/redux/createReducerState'
import {
  PERSONAL_DATA,
  PERSONAL_PHOTO,
  PERSONAL_DATA_REFRESH,
  CHANGE_EMAIL,
  CHANGE_PHONE,
  CHANGE_PHONE_SMS_CHECK,
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  AUTHENTICITY,
  ENTITIES,
  ASSIGN_WORKER,
  ASSIGN_DIRECTOR,
  RELEASE_DIRECTOR,
  HISTORY,
  SESSIONS,
  SIGN_OUT
} from './actionTypes'
import * as STATES from './states'

const reducer = {
  ...createReducerState(PERSONAL_DATA, STATES.PERSONAL_DATA),
  ...createReducerState(PERSONAL_PHOTO, STATES.PERSONAL_PHOTO),
  ...createReducerState(PERSONAL_DATA_REFRESH, STATES.PERSONAL_DATA_REFRESH),
  ...createReducerState(CHANGE_EMAIL, STATES.CHANGE_EMAIL),
  ...createReducerState(CHANGE_PHONE, STATES.CHANGE_PHONE),
  ...createReducerState(CHANGE_PHONE_SMS_CHECK, STATES.CHANGE_PHONE_SMS_CHECK),
  ...createReducerState(CHANGE_LOGIN, STATES.CHANGE_LOGIN),
  ...createReducerState(CHANGE_PASSWORD, STATES.CHANGE_PASSWORD),
  ...createReducerState(AUTHENTICITY, STATES.AUTHENTICITY),
  ...createReducerState(ENTITIES, STATES.ENTITIES),
  ...createReducerState(ASSIGN_WORKER, STATES.ASSIGN_WORKER),
  ...createReducerState(ASSIGN_DIRECTOR, STATES.ASSIGN_DIRECTOR),
  ...createReducerState(RELEASE_DIRECTOR, STATES.RELEASE_DIRECTOR),
  ...createReducerState(HISTORY, STATES.HISTORY),
  ...createReducerState(SESSIONS, STATES.SESSIONS),
  ...createReducerState(SIGN_OUT, STATES.SIGN_OUT),
}

export default createReducer({}, reducer)
