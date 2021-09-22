import {
  takeLatest, put, fork, call
} from 'redux-saga/effects'
import { entities, assignWorker, assignDirector, releaseDirector } from 'Api/cabinet'
import actionTypes from './actionTypes'
import { propOr } from 'ramda'
import { toastr } from 'react-redux-toastr'
import { stopSubmit } from 'redux-form'
import formNames from 'Components/Form/validate/formNames'
import * as actions from 'Redux/actions'

function* entitiesWatcher() {
  yield takeLatest(actionTypes.ENTITIES.request, function* ({ payload }) {
    try {
      const { data } = yield call(entities, payload)

      const { code, message } = propOr({}, 'status', data)

      if (code !== 0) {
        message && toastr.error(message)
      }

      yield put({
        type: actionTypes.ENTITIES.success,
        payload: data,
      })
    } catch (error) {
      yield put({
        type: actionTypes.ENTITIES.error,
        error,
      })
    }
  })
}

function* assignWorkerWatcher() {
  yield takeLatest(actionTypes.ASSIGN_WORKER.request, function* ({ payload }) {
    try {
      const { data } = yield call(assignWorker, payload)

      const { code, message } = propOr({}, 'status', data)

      if (code === 0) {
        toastr.success(message)
      } else {
        message && toastr.error(message)
      }

      yield put({
        type: actionTypes.ASSIGN_WORKER.success,
        payload: data,
      })
    } catch (error) {
      yield put({
        type: actionTypes.ASSIGN_WORKER.error,
        error,
      })
    }
  })
}

function* assignDirectorWatcher() {
  yield takeLatest(actionTypes.ASSIGN_DIRECTOR.request, function* ({ payload }) {
    try {
      const { data } = yield call(assignDirector, payload)

      const { code, message } = propOr({}, 'status', data)

      if (code === 0) {
        yield put(actions.entities())

        yield put({
          type: actionTypes.ASSIGN_DIRECTOR.success,
          payload: data,
        })
      } else {
        throw new Error(message)
      }
    } catch (error) {
      yield put(stopSubmit(
        formNames.entity,
        { _error: error.message }
      ))

      yield put({
        type: actionTypes.ASSIGN_DIRECTOR.error,
        error,
      })
    }
  })
}

function* releaseDirectorWatcher() {
  yield takeLatest(actionTypes.RELEASE_DIRECTOR.request, function* ({ payload }) {
    try {
      const { data } = yield call(releaseDirector, payload)

      const { code, message } = propOr({}, 'status', data)

      if (code === 0) {
        yield put(actions.entities())
        toastr.success(message)
      } else {
        message && toastr.error(message)
      }

      yield put({
        type: actionTypes.RELEASE_DIRECTOR.success,
        payload: null,
      })
    } catch (error) {
      yield put({
        type: actionTypes.RELEASE_DIRECTOR.error,
        error,
      })
    }
  })
}

export default [
  fork(entitiesWatcher),
  fork(assignWorkerWatcher),
  fork(assignDirectorWatcher),
  fork(releaseDirectorWatcher),
]