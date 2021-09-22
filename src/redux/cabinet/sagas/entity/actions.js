import actionTypes from './actionTypes'

export const entities = payload => ({
  type: actionTypes.ENTITIES.request, payload
})

export const assignWorker = payload => ({
  type: actionTypes.ASSIGN_WORKER.request, payload
})

export const assignDirector = payload => ({
  type: actionTypes.ASSIGN_DIRECTOR.request, payload
})

export const releaseDirector = payload => ({
  type: actionTypes.RELEASE_DIRECTOR.request, payload
})
