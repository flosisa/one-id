import createActionType from 'Util/redux/createActionType'

export const FULL_YEAR = 'FULL_YEAR'
export const REPORT_A_BUG = 'REPORT_A_BUG'
export const EXTERNAL_SERVICES_STATUS = 'EXTERNAL_SERVICES_STATUS'

export default ({
  [FULL_YEAR]: createActionType(FULL_YEAR),
  [REPORT_A_BUG]: createActionType(REPORT_A_BUG),
  [EXTERNAL_SERVICES_STATUS]: createActionType(EXTERNAL_SERVICES_STATUS),
})
