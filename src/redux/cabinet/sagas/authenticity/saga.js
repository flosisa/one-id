import {
  takeLatest, put, fork, call
} from 'redux-saga/effects'
import { authenticity } from 'Api/cabinet'
import actionTypes from './actionTypes'
import { propOr } from 'ramda'
import { toastr } from 'react-redux-toastr'

function* authenticityWatcher() {
  yield takeLatest(actionTypes.AUTHENTICITY.request, function* ({ payload }) {
    try {
      const { data } = yield call(authenticity, payload)

      const { authenticESP } = propOr({}, 'data', data)
      const { code, message } = propOr({}, 'status', data)

      if (code === 0) {
        toastr.success(message)
      }

      yield put({
        type: actionTypes.AUTHENTICITY.success,
        payload: authenticESP,
      })
    } catch (error) {
      yield put({
        type: actionTypes.AUTHENTICITY.error,
        error,
      })
    }
  })
}

export default [
  fork(authenticityWatcher),
]