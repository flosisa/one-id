import createReducer from 'Util/redux/createReducer'
import createReducerState from 'Util/redux/createReducerState'
import { SIGN_IN, CHECK_TOKEN, UUID, DIGITAL_SIGN, PASSWORD_RESET } from './actionTypes'
import * as STATES from './states'

const reducer = {
  ...createReducerState(SIGN_IN, STATES.SIGN_IN),
  ...createReducerState(CHECK_TOKEN, STATES.CHECK_TOKEN),
  ...createReducerState(UUID, STATES.UUID),
  ...createReducerState(DIGITAL_SIGN, STATES.DIGITAL_SIGN),
  ...createReducerState(PASSWORD_RESET, STATES.PASSWORD_RESET),
}

export default createReducer({}, reducer)
