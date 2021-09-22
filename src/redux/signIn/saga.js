import {
  takeLatest, put, fork, call
} from 'redux-saga/effects'
import { signIn, checkToken, uuid, digitalSign, passwordReset } from 'Api/signIn'
import actionTypes from './actionTypes'
import { prop, propOr, pathEq, propEq } from 'ramda'
import { setToken } from 'Util/storages'
import { DIGITAL_SIGN } from 'Constants/apiUrls'
import { toastr } from 'react-redux-toastr'
import oAuthGenerate from './oAuthGenerate'
import { stopSubmit } from 'redux-form'
import formNames from 'Components/Form/validate/formNames'

function* signInWatcher() {
  yield takeLatest(actionTypes.SIGN_IN.request, function* ({ payload }) {
    try {
      const { data } = yield call(signIn, payload)

      const status = prop('status', data)
      const { code } = status || ''

      if (code === 0) {
        const { accessToken } = propOr({}, 'data', data)
        setToken(accessToken)

        yield oAuthGenerate('signIn')

        yield put({
          type: actionTypes.SIGN_IN.success,
          payload: code
        })
      } else {
        if (code === 1 || code === 2) {
          throw new Error(JSON.stringify(status))
        }
      }
    } catch (error) {
      try {
        const status = JSON.parse(error.message)
        const { code, message } = status || ''

        if (code === 1 || code === 2) {
          yield put(stopSubmit(
            formNames.signIn,
            { _error: message }
          ))
        }

        yield put({
          type: actionTypes.SIGN_IN.error,
          error: status,
        })
      } catch (error) {
        const status = JSON.parse(error.message)
        yield put({
          type: actionTypes.SIGN_IN.error,
          error: status,
        })
      }
    }
  })
}

function* checkTokenWatcher() {
  yield takeLatest(actionTypes.CHECK_TOKEN.request, function* ({ payload }) {
    try {
      const data = yield call(checkToken, payload)

      const success = propEq('status', 200, data)
      if (success) {
        // yield oAuthGenerate()
      }

      yield put({
        type: actionTypes.CHECK_TOKEN.success,
        payload: null,
      })
    } catch (error) {
      yield put({
        type: actionTypes.CHECK_TOKEN.error,
        error,
      })
    }
  })
}

function* uuidWatcher() {
  yield takeLatest(actionTypes.UUID.request, function* ({ payload }) {
    try {
      const { data } = yield call(uuid, payload)

      yield put({
        type: actionTypes.UUID.success,
        payload: data,
      })
    } catch (error) {
      yield put({
        type: actionTypes.UUID.error,
        error,
      })
    }
  })
}

function* digitalSignWatcher() {
  yield takeLatest(actionTypes.DIGITAL_SIGN.request, function* ({ payload }) {
    try {
      const response = yield call(digitalSign, payload)
      const data = prop('data', response)

      const { code, message } = propOr({}, 'status', data)
      const isSignedIn = pathEq(['config', 'url'], DIGITAL_SIGN, response)

      if (code === 0 && isSignedIn) {
        const { accessToken } = propOr({}, 'data', data)
        setToken(accessToken)

        yield oAuthGenerate('signIn')
      }

      if (code === 98) {
        toastr.error(message)
      }

      yield put({
        type: actionTypes.DIGITAL_SIGN.success,
        payload: data,
      })
    } catch (error) {
      yield put({
        type: actionTypes.DIGITAL_SIGN.error,
        error,
      })
    }
  })
}

function* passwordResetWatcher() {
  yield takeLatest(actionTypes.PASSWORD_RESET.request, function* ({ payload }) {
    try {
      const { data } = yield call(passwordReset, payload)

      const { code, message } = propOr({}, 'status', data)

      if (code !== 0 && code !== 39) {
        throw new Error(message)
      }

      yield put({
        type: actionTypes.PASSWORD_RESET.success,
        payload: data,
      })
    } catch (error) {
      yield put(stopSubmit(
        formNames.passwordReset,
        { _error: error.message }
      ))

      yield put({
        type: actionTypes.PASSWORD_RESET.error,
        error,
      })
    }
  })
}

export default [
  fork(signInWatcher),
  fork(checkTokenWatcher),
  fork(uuidWatcher),
  fork(digitalSignWatcher),
  fork(passwordResetWatcher),
]