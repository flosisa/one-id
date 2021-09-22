import actionTypes from './actionTypes'

export const usersByGender = payload => ({
  type: actionTypes.USERS_BY_GENDER.request, payload
})

export const usersByRegion = payload => ({
  type: actionTypes.USERS_BY_REGION.clear, payload
})

export const transitions = payload => ({
  type: actionTypes.TRANSITIONS.request, payload
})
