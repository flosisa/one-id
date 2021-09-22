import createActionType from 'Util/redux/createActionType'

export const USERS_BY_GENDER = 'USERS_BY_GENDER'
export const USERS_BY_REGION = 'USERS_BY_REGION'
export const TRANSITIONS = 'TRANSITIONS'

export default ({
  [USERS_BY_GENDER]: createActionType(USERS_BY_GENDER),
  [USERS_BY_REGION]: createActionType(USERS_BY_REGION),
  [TRANSITIONS]: createActionType(TRANSITIONS),
})
