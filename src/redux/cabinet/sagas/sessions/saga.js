import {
  takeLatest, put, fork, call
} from 'redux-saga/effects'
import { sessions } from 'Api/cabinet'
import actionTypes from './actionTypes'

function* sessionsWatcher() {
  yield takeLatest(actionTypes.SESSIONS.request, function* ({ payload }) {
    try {
      const { data } = yield call(sessions, payload)

      yield put({
        type: actionTypes.SESSIONS.success,
        payload: data,
      })
    } catch (error) {
      yield put({
        type: actionTypes.SESSIONS.error,
        error,
      })
    }
  })
}

export default [
  fork(sessionsWatcher),
]