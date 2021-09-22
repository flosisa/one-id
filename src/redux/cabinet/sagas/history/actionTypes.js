import createActionType from 'Util/redux/createActionType'
import { HISTORY } from '../../actionTypes'

export default ({
  [HISTORY]: createActionType(HISTORY),
})
