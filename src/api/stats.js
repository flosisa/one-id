import { getNotAuthInstance } from 'Util/httpClient'
import {
  USERS_BY_GENDER, USERS_BY_REGION, TRANSITIONS
} from 'Constants/apiUrls'

export const usersByGender = () => getNotAuthInstance()
  .get(USERS_BY_GENDER)

export const usersByRegion = () => getNotAuthInstance()
  .get(USERS_BY_REGION)

export const transitions = () => getNotAuthInstance()
  .get(TRANSITIONS)
