import { getNotAuthInstance, getAuthInstance } from 'Util/httpClient'
import {
  OAUTH_CHECK, OAUTH_GENERATE, GET_ENTITIES, UPDATE_ENTITY
} from 'Constants/apiUrls'

export const oAuthCheck = data => getNotAuthInstance()
  .post(OAUTH_CHECK, data)

export const oAuthGenerate = data => getAuthInstance()
  .post(OAUTH_GENERATE, data)

export const getEntities = data => getAuthInstance()
  .get(GET_ENTITIES, data)

export const updateEntity = data => getAuthInstance()
  .post(UPDATE_ENTITY, data)
