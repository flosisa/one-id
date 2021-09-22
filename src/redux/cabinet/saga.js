import { all } from 'redux-saga/effects'

import authenticity from './sagas/authenticity/saga'
import entity from './sagas/entity/saga'
import history from './sagas/history/saga'
import personalData from './sagas/personalData/saga'
import sessions from './sagas/sessions/saga'

export default function* rootSaga() {
  yield all([
    ...authenticity,
    ...entity,
    ...history,
    ...personalData,
    ...sessions,
  ])
}
