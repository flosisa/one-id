import createReducer from 'Util/redux/createReducer'
import createReducerState from 'Util/redux/createReducerState'
import { FULL_YEAR, REPORT_A_BUG, EXTERNAL_SERVICES_STATUS } from './actionTypes'
import * as STATES from './states'

const reducer = {
  ...createReducerState(FULL_YEAR, STATES.FULL_YEAR),
  ...createReducerState(REPORT_A_BUG, STATES.REPORT_A_BUG),
  ...createReducerState(EXTERNAL_SERVICES_STATUS, STATES.EXTERNAL_SERVICES_STATUS),
}

export default createReducer({}, reducer)
