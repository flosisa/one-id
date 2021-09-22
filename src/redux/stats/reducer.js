import createReducer from 'Util/redux/createReducer'
import createReducerState from 'Util/redux/createReducerState'
import { USERS_BY_GENDER, USERS_BY_REGION, TRANSITIONS } from './actionTypes'
import * as STATES from './states'

const reducer = {
  ...createReducerState(USERS_BY_GENDER, STATES.USERS_BY_GENDER),
  ...createReducerState(USERS_BY_REGION, STATES.USERS_BY_REGION),
  ...createReducerState(TRANSITIONS, STATES.TRANSITIONS),
}

export default createReducer({}, reducer)
