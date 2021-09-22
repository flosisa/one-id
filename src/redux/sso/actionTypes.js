import createActionType from 'Util/redux/createActionType'

export const OAUTH_CHECK = 'OAUTH_CHECK'
export const OAUTH_GENERATE = 'OAUTH_GENERATE'
export const GET_ENTITIES = 'GET_ENTITIES'
export const UPDATE_ENTITY = 'UPDATE_ENTITY'

export default ({
  [OAUTH_CHECK]: createActionType(OAUTH_CHECK),
  [OAUTH_GENERATE]: createActionType(OAUTH_GENERATE),
  [GET_ENTITIES]: createActionType(GET_ENTITIES),
  [UPDATE_ENTITY]: createActionType(UPDATE_ENTITY),
})
