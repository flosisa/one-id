import { all } from 'redux-saga/effects'

import signIn from './signIn/saga'
import signUp from './signUp/saga'
import cabinet from './cabinet/saga'
import sso from './sso/saga'
import general from './general/saga'
import stats from './stats/saga'

export default function* rootSaga() {
  yield all([
    ...signIn,
    ...signUp,
    ...sso,
    ...general,
    ...stats,
    cabinet(),
  ])
}
