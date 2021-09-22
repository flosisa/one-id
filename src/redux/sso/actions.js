import actionTypes from './actionTypes'

export const oAuthCheck = payload => ({
  type: actionTypes.OAUTH_CHECK.request, payload
})

export const oAuthCheckClear = payload => ({
  type: actionTypes.OAUTH_CHECK.clear, payload
})

export const oAuthGenerate = payload => ({
  type: actionTypes.OAUTH_GENERATE.request, payload
})

export const getEntites = payload => ({
  type: actionTypes.GET_ENTITIES.request, payload
})

export const updateEntity = payload => ({
  type: actionTypes.UPDATE_ENTITY.request, payload
})
