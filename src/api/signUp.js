import { getNotAuthInstance } from 'Util/httpClient'
import {
  PINFL_CHECK, CHECK_PASSPORT_BIRTH_DATE, SMS_ASK, SMS_CHECK, SiGN_UP, LOGIN_GENERATE, PASSWORD_GENERATE
} from 'Constants/apiUrls'

export const pinflCheck = data => getNotAuthInstance()
  .post(PINFL_CHECK, data)

export const checkPassportBirthDate = data => getNotAuthInstance()
  .post(CHECK_PASSPORT_BIRTH_DATE, data)

export const smsAsk = data => getNotAuthInstance()
  .post(SMS_ASK, data)

export const smsCheck = data => getNotAuthInstance()
  .post(SMS_CHECK, data)

export const signUp = data => getNotAuthInstance()
  .post(SiGN_UP, data)

export const loginGenerate = () => getNotAuthInstance()
  .get(LOGIN_GENERATE)

export const passwordGenerate = () => getNotAuthInstance()
  .get(PASSWORD_GENERATE)
