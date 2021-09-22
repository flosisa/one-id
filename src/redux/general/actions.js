import actionTypes from './actionTypes'

export const fullYear = payload => ({
  type: actionTypes.FULL_YEAR.request, payload
})

export const reportABug = payload => ({
  type: actionTypes.REPORT_A_BUG.request, payload
})

export const externalServicesStatus = payload => ({
  type: actionTypes.EXTERNAL_SERVICES_STATUS.request, payload
})
