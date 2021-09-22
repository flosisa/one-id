import React from 'react'
import {
  takeLatest, put, fork, call
} from 'redux-saga/effects'
import { personalData, personalPhoto, personalDataRefresh, changeEmail, changePhone, changePhoneSmsCheck, changeLogin, changePassword, signOut } from 'Api/cabinet'
import actionTypes from './actionTypes'
import { prop, propOr, path } from 'ramda'
import { toastr } from 'react-redux-toastr'
import { removeToken } from 'Util/storages'
import { replace } from 'connected-react-router'
import * as ROUTES from "Constants/routes"
import { stopSubmit, reset } from 'redux-form'
import formNames from 'Components/Form/validate/formNames'
import * as actions from 'Redux/actions'
import Locale from 'Components/Locale'


function* personalDataWatcher() {
  yield takeLatest(actionTypes.PERSONAL_DATA.request, function* ({ payload }) {
    try {
      const { data } = yield call(personalData, payload)

      yield put({
        type: actionTypes.PERSONAL_DATA.success,
        payload: data,
      })
    } catch (error) {
      yield put({
        type: actionTypes.PERSONAL_DATA.error,
        error,
      })
    }
  })
}

function* personalPhotoWatcher() {
  yield takeLatest(actionTypes.PERSONAL_PHOTO.request, function* ({ payload }) {
    try {
      const { data } = yield call(personalPhoto, payload)

      yield put({
        type: actionTypes.PERSONAL_PHOTO.success,
        payload: data,
      })
    } catch (error) {
      yield put({
        type: actionTypes.PERSONAL_PHOTO.error,
        error,
      })
    }
  })
}

function* personalDataRefreshWatcher() {
  yield takeLatest(actionTypes.PERSONAL_DATA_REFRESH.request, function* ({ payload }) {
    try {
      const { data } = yield call(personalDataRefresh, payload)

      const { code, message } = propOr({}, 'status', data)

      if (code === 0) {
        toastr.success(message)
      }

      yield put({
        type: actionTypes.PERSONAL_DATA_REFRESH.success,
        payload: data,
      })
    } catch (error) {
      yield put({
        type: actionTypes.PERSONAL_DATA_REFRESH.error,
        error,
      })
    }
  })
}

function* changeEmailWatcher() {
  yield takeLatest(actionTypes.CHANGE_EMAIL.request, function* ({ payload }) {
    try {
      const { data } = yield call(changeEmail, payload)

      const { code, message } = propOr({}, 'status', data)

      if (code === 0) {
        toastr.success(message)
      } else {
        message && toastr.error(message)
      }

      yield put({
        type: actionTypes.CHANGE_EMAIL.success,
        payload: code === 0,
      })
    } catch (error) {
      yield put({
        type: actionTypes.CHANGE_EMAIL.error,
        error,
      })
    }
  })
}

function* changePhoneWatcher() {
  yield takeLatest(actionTypes.CHANGE_PHONE.request, function* ({ payload }) {
    try {
      const { data } = yield call(changePhone, payload)

      yield put({
        type: actionTypes.CHANGE_PHONE.success,
        payload: data,
      })
    } catch (error) {
      yield put({
        type: actionTypes.CHANGE_PHONE.error,
        error,
      })
    }
  })
}

function* changePhoneSmsCheckWatcher() {
  yield takeLatest(actionTypes.CHANGE_PHONE_SMS_CHECK.request, function* ({ payload }) {
    try {
      const { data } = yield call(changePhoneSmsCheck, payload)

      const { newPhoneNumber } = propOr({}, 'data', data)
      const { code, message } = propOr({}, 'status', data)

      if (code === 0) {
        yield put(reset(formNames.changePhone))
        yield put(reset(formNames.changePhoneSmsCheck))
        yield put(actions.changePhoneSmsCheckClear())
        toastr.success(message)
      }

      yield put({
        type: actionTypes.CHANGE_PHONE_SMS_CHECK.success,
        payload: newPhoneNumber,
      })
    } catch (error) {
      yield put({
        type: actionTypes.CHANGE_PHONE_SMS_CHECK.error,
        error,
      })
    }
  })
}

function* changeLoginWatcher() {
  yield takeLatest(actionTypes.CHANGE_LOGIN.request, function* ({ payload }) {
    try {
      const { data } = yield call(changeLogin, payload)

      const { newLogin } = propOr({}, 'data', data)
      const { code, message } = propOr({}, 'status', data)

      if (code === 0) {
        yield put(reset(formNames.changeLogin))
        yield put(actions.personalData())
        toastr.success(message)
      }

      yield put({
        type: actionTypes.CHANGE_LOGIN.success,
        payload: newLogin,
      })

      if (code === 1997 || code === 1998 || code === 1999) {
        throw new Error(JSON.stringify(data))
      }
    } catch (error) {
      const msg = prop('message', error)
      let parsedMsg

      if (msg) {
        parsedMsg = JSON.parse(msg)

        yield put(stopSubmit(
          formNames.changeLogin,
          { _error: prop('status', parsedMsg) }
        ))
      }

      yield put({
        type: actionTypes.CHANGE_LOGIN.error,
        error: path(['data', 'oldLogin'], parsedMsg),
      })
    }
  })
}

function* changePasswordWatcher() {
  yield takeLatest(actionTypes.CHANGE_PASSWORD.request, function* ({ payload }) {
    try {
      const { data } = yield call(changePassword, payload)

      const { code, message } = propOr({}, 'status', data)

      if (code === 0) {
        yield put(reset(formNames.changePassword))
        toastr.success(message)
      } else {
        throw new Error(message)
      }

      yield put({
        type: actionTypes.CHANGE_PASSWORD.success,
        payload: null,
      })
    } catch (error) {
      yield put(stopSubmit(
        formNames.changePassword,
        { _error: error.message }
      ))

      yield put({
        type: actionTypes.CHANGE_PASSWORD.error,
        error,
      })
    }
  })
}

function* signOutWatcher() {
  yield takeLatest(actionTypes.SIGN_OUT.request, function* ({ payload }) {
    try {
      const { data } = yield call(signOut, payload)

      const { code } = propOr({}, 'status', data)

      if (code === 0) {
        yield removeToken()
        yield put(actions.personalDataClear())
        yield put(actions.signInClear())

        yield put({
          type: actionTypes.SIGN_OUT.success,
          payload: null,
        })

        yield put(replace(ROUTES.INDEX))
      } else {
        toastr.error('', { component: <Locale id="connection-failed" /> })
      }
    } catch (error) {
      yield put({
        type: actionTypes.SIGN_OUT.error,
        error,
      })
    }
  })
}

export default [
  fork(personalDataWatcher),
  fork(personalPhotoWatcher),
  fork(personalDataRefreshWatcher),
  fork(changeEmailWatcher),
  fork(changePhoneWatcher),
  fork(changePhoneSmsCheckWatcher),
  fork(changeLoginWatcher),
  fork(changePasswordWatcher),
  fork(signOutWatcher),
]