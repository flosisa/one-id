import { getNotAuthInstance } from 'Util/httpClient'
import {
  REPORT_A_BUG, EXTERNAL_SERVICES_STATUS
} from 'Constants/apiUrls'
import { prop } from 'ramda'

export const fullYear = data => getNotAuthInstance()
  .get(prop('url', data), { headers: prop('header', data) })

export const reportABug = data => getNotAuthInstance()
  .post(REPORT_A_BUG, data)

export const externalServicesStatus = () => getNotAuthInstance()
  .get(EXTERNAL_SERVICES_STATUS)
