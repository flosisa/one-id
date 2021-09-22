import {
  takeLatest, put, fork, call
} from 'redux-saga/effects'
import { usersByGender, usersByRegion, transitions } from 'Api/stats'
import actionTypes from './actionTypes'

function* usersByGenderWatcher() {
  yield takeLatest(actionTypes.USERS_BY_GENDER.request, function* ({ payload }) {
    try {
      const { data } = yield call(usersByGender, payload)

      yield put({
        type: actionTypes.USERS_BY_GENDER.success,
        payload: data
      })
    } catch (error) {
      yield put({
        type: actionTypes.USERS_BY_GENDER.error,
        error,
      })
    }
  })
}

function* usersByRegionWatcher() {
  yield takeLatest(actionTypes.USERS_BY_REGION.request, function* ({ payload }) {
    try {
      const { data } = yield call(usersByRegion, payload)

      yield put({
        type: actionTypes.USERS_BY_REGION.success,
        payload: data
      })
    } catch (error) {
      yield put({
        type: actionTypes.USERS_BY_REGION.error,
        error,
      })
    }
  })
}

function* transitionsWatcher() {
  yield takeLatest(actionTypes.TRANSITIONS.request, function* ({ payload }) {
    try {
      const { data } = yield call(transitions, payload)

      yield put({
        type: actionTypes.TRANSITIONS.success,
        payload: data
      })
    } catch (error) {
      yield put({
        type: actionTypes.TRANSITIONS.error,
        error,
      })
    }
  })
}

export default [
  fork(usersByGenderWatcher),
  fork(usersByRegionWatcher),
  fork(transitionsWatcher),
]