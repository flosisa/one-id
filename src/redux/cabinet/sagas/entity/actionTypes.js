import createActionType from 'Util/redux/createActionType'
import { ENTITIES, ASSIGN_WORKER, ASSIGN_DIRECTOR, RELEASE_DIRECTOR } from '../../actionTypes'

export default ({
  [ENTITIES]: createActionType(ENTITIES),
  [ASSIGN_WORKER]: createActionType(ASSIGN_WORKER),
  [ASSIGN_DIRECTOR]: createActionType(ASSIGN_DIRECTOR),
  [RELEASE_DIRECTOR]: createActionType(RELEASE_DIRECTOR),
})
