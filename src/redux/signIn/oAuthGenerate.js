import React from 'react'
import { put, select } from 'redux-saga/effects'
import { path, pathOr, prop } from 'ramda'
import * as actions from 'Redux/actions'
import parseSsoQuery from 'Util/parseSsoQuery'
import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import * as ROUTES from 'Constants/routes'
import Locale from 'Components/Locale'

export default function* oAuthGenerate(signIn) {
  const { sso, router } = yield select()
  const { uuid, scope } = pathOr({}, ['oAuthCheck', 'data'], sso)

  const query = path(['location', 'query'], router)
  const queryObj = parseSsoQuery(query)
  const tokenId = prop('token_id', queryObj)

  if (uuid && scope && tokenId) {
    yield put(actions.oAuthGenerate({ uuid, scope }))

    yield put(actions.oAuthCheckClear())
  } else {
    if (signIn) {
      yield put(push(ROUTES.CABINET_MAIN))
    } else {
      toastr.error('', { component: <Locale id="not-enough-data" /> })
    }
  }
}
