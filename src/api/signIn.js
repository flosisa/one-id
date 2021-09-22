import { getAuthInstance, getNotAuthInstance } from 'Util/httpClient'
import {
  SIGN_IN, UUID, DIGITAL_SIGN, PASSWORD_RESET, CHECK_TOKEN
} from 'Constants/apiUrls'

export const signIn = data => getNotAuthInstance()
  .post(SIGN_IN, data)

export const checkToken = data => getAuthInstance()
  .get(CHECK_TOKEN, data)

export const uuid = () => getNotAuthInstance()
  .get(UUID)

export const digitalSign = data => getNotAuthInstance()
  .post(DIGITAL_SIGN, data)

export const passwordReset = data => getNotAuthInstance()
  .post(PASSWORD_RESET, data)
