import { getAuthInstance } from 'Util/httpClient'
import {
  PERSONDAL_DATA,
  PERSONAL_PHOTO,
  PERSONAL_DATA_REFRESH,
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  CHANGE_EMAIL,
  CHANGE_PHONE,
  CHANGE_PHONE_SMS_CHECK,
  AUTHENTICITY,
  ENTITIES,
  ASSIGN_WORKER,
  ASSIGN_DIRECTOR,
  RELEASE_DIRECTOR,
  HISTORY,
  SESSIONS,
  SIGN_OUT,
} from 'Constants/apiUrls'

export const personalData = () => getAuthInstance()
  .get(PERSONDAL_DATA)

export const personalPhoto = data => getAuthInstance()
  .get(PERSONAL_PHOTO + data.pinfl)

export const personalDataRefresh = () => getAuthInstance()
  .get(PERSONAL_DATA_REFRESH)

export const changeEmail = data => getAuthInstance()
  .post(CHANGE_EMAIL, data)

export const changePhone = data => getAuthInstance()
  .post(CHANGE_PHONE, data)

export const changePhoneSmsCheck = data => getAuthInstance()
  .post(CHANGE_PHONE_SMS_CHECK, data)

export const changeLogin = data => getAuthInstance()
  .post(CHANGE_LOGIN, data)

export const changePassword = data => getAuthInstance()
  .post(CHANGE_PASSWORD, data)

export const authenticity = data => getAuthInstance()
  .post(AUTHENTICITY, data)

export const entities = () => getAuthInstance()
  .get(ENTITIES)

export const assignWorker = data => getAuthInstance()
  .post(ASSIGN_WORKER, data)

export const assignDirector = data => getAuthInstance()
  .post(ASSIGN_DIRECTOR, data)

export const releaseDirector = data => getAuthInstance()
  .post(RELEASE_DIRECTOR, data)

export const history = data => getAuthInstance()
  .get(HISTORY, { params: data })

export const sessions = () => getAuthInstance()
  .get(SESSIONS)

export const signOut = () => getAuthInstance()
  .post(SIGN_OUT)
