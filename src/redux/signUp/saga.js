import {
  takeLatest, put, fork, call
} from 'redux-saga/effects'
import { pinflCheck, smsAsk, smsCheck, signUp, loginGenerate, passwordGenerate, checkPassportBirthDate } from 'Api/signUp'
import actionTypes from './actionTypes'
import { push } from 'connected-react-router'
import { setToken } from 'Util/storages'
import * as ROUTES from 'Constants/routes'
import { path, propOr } from 'ramda'
import { stopSubmit, reset } from 'redux-form'
import formNames from 'Components/Form/validate/formNames'

function* pinflCheckWatcher() {
  yield takeLatest(actionTypes.PINFL_CHECK.request, function* ({ payload }) {
    try {
      const { data } = yield call(pinflCheck, payload)

      yield put({
        type: actionTypes.PINFL_CHECK.success,
        payload: data,
      })
    } catch (error) {
      yield put(reset(formNames.signUp))

      yield put({
        type: actionTypes.PINFL_CHECK.error,
        error,
      })
    }
  })
}

function* smsAskWatcher() {
  yield takeLatest(actionTypes.SMS_ASK.request, function* ({ payload }) {
    try {
      const { data } = yield call(smsAsk, payload)

      const { code, message } = propOr({}, 'status', data)

      yield put({
        type: actionTypes.SMS_ASK.success,
        payload: data,
      })

      if (code !== 0 && code !== 123) {
        throw new Error(message)
      }
    } catch (error) {
      yield put(stopSubmit(
        formNames.signUp,
        { _error: error.message }
      ))

      yield put({
        type: actionTypes.SMS_ASK.error,
        error,
      })
    }
  })
}

function* smsCheckWatcher() {
  yield takeLatest(actionTypes.SMS_CHECK.request, function* ({ payload }) {
    try {
      const { data } = yield call(smsCheck, payload)

      const { code, message } = propOr({}, 'status', data)

      if (code !== 0) {
        throw new Error(message)
      }

      yield put({
        type: actionTypes.SMS_CHECK.success,
        payload: data,
      })
    } catch (error) {
      yield put(stopSubmit(
        formNames.signUp,
        { _error: error.message }
      ))

      yield put({
        type: actionTypes.SMS_CHECK.error,
        error,
      })
    }
  })
}

function* signUpWatcher() {
  yield takeLatest(actionTypes.SIGN_UP.request, function* ({ payload }) {
    try {
      const { data } = yield call(signUp, payload)

      const { code, message } = propOr({}, 'status', data)

      if (code === 0) {
        const accessToken = path(['data', 'accessToken'], data)

        setToken(accessToken)
        yield put(push(ROUTES.CABINET_MAIN))

        yield put({
          type: actionTypes.SIGN_UP.success,
          payload: data
        })
      } else {
        throw new Error(message)
      }
    } catch (error) {
      yield put(stopSubmit(
        formNames.signUp,
        { _error: error.message }
      ))

      yield put({
        type: actionTypes.SIGN_UP.error,
        error,
      })
    }
  })
}

function* loginGenerateWatcher() {
  yield takeLatest(actionTypes.LOGIN_GENERATE.request, function* ({ payload }) {
    try {
      const { data } = yield call(loginGenerate, payload)

      yield put({
        type: actionTypes.LOGIN_GENERATE.success,
        payload: data
      })
    } catch (error) {
      yield put({
        type: actionTypes.LOGIN_GENERATE.error,
        error,
      })
    }
  })
}

function* passwordGenerateWatcher() {
  yield takeLatest(actionTypes.PASSWORD_GENERATE.request, function* ({ payload }) {
    try {
      const { data } = yield call(passwordGenerate, payload)

      yield put({
        type: actionTypes.PASSWORD_GENERATE.success,
        payload: data
      })
    } catch (error) {
      yield put({
        type: actionTypes.PASSWORD_GENERATE.error,
        error,
      })
    }
  })
}

function* checkPassportBirthDateWatcher() {
  yield takeLatest(actionTypes.CHECK_PASSPORT_BIRTH_DATE.request, function* ({ payload }) {
    try {
      const { data } = yield call(checkPassportBirthDate, payload)

      yield put({
        type: actionTypes.CHECK_PASSPORT_BIRTH_DATE.success,
        payload: data
      })
    } catch (error) {
      yield put({
        type: actionTypes.CHECK_PASSPORT_BIRTH_DATE.error,
        error,
      })
    }
  })
}

export default [
  fork(pinflCheckWatcher),
  fork(smsAskWatcher),
  fork(smsCheckWatcher),
  fork(signUpWatcher),
  fork(loginGenerateWatcher),
  fork(passwordGenerateWatcher),
  fork(checkPassportBirthDateWatcher),
]