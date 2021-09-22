import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import { reducer as toastr } from 'react-redux-toastr'
import signIn from './signIn/reducer'
import signUp from './signUp/reducer'
import cabinet from './cabinet/reducer'
import sso from './sso/reducer'
import general from './general/reducer'
import stats from './stats/reducer'
import settings from './settings/reducer'

const reducers = history => combineReducers({
  router: connectRouter(history),
  form,
  toastr,
  signIn,
  signUp,
  cabinet,
  sso,
  general,
  stats,
  settings,
})

export default reducers
