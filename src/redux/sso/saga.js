import React from 'react'
import {
  takeLatest, put, fork, call
} from 'redux-saga/effects'
import { oAuthCheck, oAuthGenerate as oAuth, getEntities, updateEntity } from 'Api/sso'
import actionTypes from './actionTypes'
import { prop, propEq, path} from 'ramda'
import oAuthGenerate from '../signIn/oAuthGenerate'
import { getToken } from 'Util/storages'
import * as actions from 'Redux/actions'
import { toastr } from 'react-redux-toastr'
import Locale from 'Components/Locale'

function* oAuthCheckWatcher() {
  yield takeLatest(actionTypes.OAUTH_CHECK.request, function* ({ payload }) {
    try {
      const { data } = yield call(oAuthCheck, payload)

      const scope = prop('scope', data)

      const oAuthData = {
        uuid: prop('uuid', payload),
        scope,
      }

      yield put({
        type: actionTypes.OAUTH_CHECK.success,
        payload: oAuthData
      })

      const token = getToken()
      if (token && scope) {
         yield put(actions.getEntites())
      }
    } catch (error) {
      yield put({
        type: actionTypes.OAUTH_CHECK.error,
        error,
      })
    }
  })
}

function* oAuthGenerateWatcher() {
  yield takeLatest(actionTypes.OAUTH_GENERATE.request, function* ({ payload }) {
    try {
      const { data } = yield call(oAuth, payload)

      const callbackUrl = prop('callbackUrl', data)
      const code = prop('code', data)
      const state = prop('state', data)

      if (callbackUrl && code && state) {
        yield put({
          type: actionTypes.OAUTH_GENERATE.success,
          payload: true
        })
        // console.log(callbackUrl)
        location.replace(`${callbackUrl}?code=${code}&state=${state}`)
      } else {
        toastr.error('', { component: <Locale id="not-enough-data" /> })
      }
    } catch (error) {
      yield put({
        type: actionTypes.OAUTH_GENERATE.error,
        error,
      })
    }
  })
}

function* getEntitiesWatcher() {
  yield takeLatest(actionTypes.GET_ENTITIES.request, function* ({ payload }) {
    try {
      const { data } = yield call(getEntities, payload)
      const code = path(['status', 'code'], data)
      //console.log('here2', code);
      if (code==308){
        yield oAuthGenerate()
      }
      yield put({
        type: actionTypes.GET_ENTITIES.success,
        payload: data
      })
    } catch (error) {
      yield put({
        type: actionTypes.GET_ENTITIES.error,
        error,
      })
    }
  })
}

function* updateEntityWatcher() {
  yield takeLatest(actionTypes.UPDATE_ENTITY.request, function* ({ payload }) {
    try {
      const data = yield call(updateEntity, payload)
      const status = propEq('status', 200, data)
      if(status){
        yield oAuthGenerate()
      }
      yield put({
        type: actionTypes.UPDATE_ENTITY.success,
        payload: propEq('status', 200, data)
      })
    } catch (error) {
      yield put({
        type: actionTypes.UPDATE_ENTITY.error,
        error,
      })
    }
  })
}

export default [
  fork(oAuthCheckWatcher),
  fork(oAuthGenerateWatcher),
  fork(getEntitiesWatcher),
  fork(updateEntityWatcher),
]