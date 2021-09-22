import {
  takeLatest, put, fork, call
} from 'redux-saga/effects'
import { fullYear, reportABug, externalServicesStatus } from 'Api/general'
import actionTypes from './actionTypes'
import { path, propOr } from 'ramda'
import { toastr } from 'react-redux-toastr'

function* fullYearWatcher() {
  yield takeLatest(actionTypes.FULL_YEAR.request, function* ({ payload }) {
    try {
      const data = yield call(fullYear, payload)

      const date = path(['headers', 'date'], data)
      const year = new Date(date).getFullYear()

      yield put({
        type: actionTypes.FULL_YEAR.success,
        payload: year > 2020 ? `2020 - ${year}` : null
      })
    } catch (error) {
      yield put({
        type: actionTypes.FULL_YEAR.error,
        error,
      })
    }
  })
}

function* reportABugWatcher() {
  yield takeLatest(actionTypes.REPORT_A_BUG.request, function* ({ payload }) {
    try {
      const { data } = yield call(reportABug, payload)

      const { code, message } = propOr({}, 'status', data)

      if (code === 0) {
        yield put({
          type: actionTypes.REPORT_A_BUG.success,
          payload: true
        })
        toastr.success(message)
      }
    } catch (error) {
      yield put({
        type: actionTypes.REPORT_A_BUG.error,
        error,
      })
    }
  })
}

function* externalServicesStatusWatcher() {
  yield takeLatest(actionTypes.EXTERNAL_SERVICES_STATUS.request, function* ({ payload }) {
    try {
      const { data } = yield call(externalServicesStatus, payload)

      yield put({
        type: actionTypes.EXTERNAL_SERVICES_STATUS.success,
        payload: data
      })
    } catch (error) {
      yield put({
        type: actionTypes.EXTERNAL_SERVICES_STATUS.error,
        error,
      })
    }
  })
}

export default [
  fork(fullYearWatcher),
  fork(reportABugWatcher),
  fork(externalServicesStatusWatcher),
]