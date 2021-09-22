import createActionType from 'Util/redux/createActionType'
import { AUTHENTICITY } from '../../actionTypes'

export default ({
  [AUTHENTICITY]: createActionType(AUTHENTICITY),
})
