import createReducer from 'Util/redux/createReducer'
import createReducerState from 'Util/redux/createReducerState'
import { OAUTH_CHECK, OAUTH_GENERATE, GET_ENTITIES, UPDATE_ENTITY } from './actionTypes'
import * as STATES from './states'

const reducer = {
  ...createReducerState(OAUTH_CHECK, STATES.OAUTH_CHECK),
  ...createReducerState(OAUTH_GENERATE, STATES.OAUTH_GENERATE),
  ...createReducerState(GET_ENTITIES, STATES.GET_ENTITIES),
  ...createReducerState(UPDATE_ENTITY, STATES.UPDATE_ENTITY),
}

export default createReducer({}, reducer)
