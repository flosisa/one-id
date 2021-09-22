import createActionType from 'Util/redux/createActionType'
import { SESSIONS } from '../../actionTypes'

export default ({
  [SESSIONS]: createActionType(SESSIONS),
})
