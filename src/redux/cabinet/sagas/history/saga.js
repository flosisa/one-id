import {
  takeLatest, put, fork, call
} from 'redux-saga/effects'
import { history } from 'Api/cabinet'
import actionTypes from './actionTypes'

function* historyWatcher() {
  yield takeLatest(actionTypes.HISTORY.request, function* ({ payload }) {
    try {
      const { data } = yield call(history, payload)

      yield put({
        type: actionTypes.HISTORY.success,
        payload: data,
      })
    } catch (error) {
      yield put({
        type: actionTypes.HISTORY.error,
        error,
      })
    }
  })
}

export default [
  fork(historyWatcher),
]