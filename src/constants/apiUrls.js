const API_URL = '/api/v1'
const API_OAUTH = '/api/oauth'


const SECURE = `${API_URL}/secure`
const LEGAL = `${API_URL}/legal`
const PROFILE = `${API_URL}/profile`
const DO = `${API_URL}/do`

// signIn
export const SIGN_IN = `${SECURE}/signIn`
export const CHECK_TOKEN = `${SECURE}/realOrFakeUser`
export const PASSWORD_RESET = `${PROFILE}/resetPasswordByPinfl`
// |-- digitalSign
export const UUID = `${SECURE}/getUUID`
export const DIGITAL_SIGN = `${SECURE}/signIn/esp`

// signUp
export const PINFL_CHECK = `${SECURE}/check/pinfl`
export const CHECK_PASSPORT_BIRTH_DATE = `${API_URL}/checkPassportBirthDate`
const SMS = `${SECURE}/sms`
export const SMS_ASK = `${SMS}/ask`
export const SMS_CHECK = `${SMS}/check`
export const SiGN_UP = `${SECURE}/signUp`
export const LOGIN_GENERATE = `${API_URL}/generateLogin`
export const PASSWORD_GENERATE = `${DO}/generate`

// signOut
export const SIGN_OUT = `${PROFILE}/logOut`

// cabinet
// !-- personalData
export const PERSONDAL_DATA = `${SECURE}/getUser`
export const PERSONAL_PHOTO = `${PROFILE}/getPhoto?pinfl=`
export const PERSONAL_DATA_REFRESH = `${PROFILE}/refresh/data`
export const CHANGE_EMAIL = `${PROFILE}/changeEmail`
export const CHANGE_PHONE = `${PROFILE}/changePhone`
export const CHANGE_PHONE_SMS_CHECK = `${PROFILE}/phone/smsCheck`
export const CHANGE_LOGIN = `${PROFILE}/changeLogin`
export const CHANGE_PASSWORD = `${PROFILE}/change/password`
// |-- authenticity
export const AUTHENTICITY = `${DO}/authenticESP`
// |-- entity
export const ENTITIES = `${LEGAL}/get`
export const ASSIGN_WORKER = `${LEGAL}/addByESP`
export const ASSIGN_DIRECTOR = `${LEGAL}/add`
export const RELEASE_DIRECTOR = `${LEGAL}/delete`
// |-- history
export const HISTORY = `${PROFILE}/getHistoryIO`
// |-- sessions
export const SESSIONS = `${PROFILE}/getCurrentSessions`

// general
export const REPORT_A_BUG = `${DO}/errorReporting`
export const EXTERNAL_SERVICES_STATUS = `${API_URL}/getServicesStatus`

// SSO
export const OAUTH_CHECK = `${API_OAUTH}/check`
export const OAUTH_GENERATE = `${API_OAUTH}/generate`
export const GET_ENTITIES = `${LEGAL}/getLE`
export const UPDATE_ENTITY = `${LEGAL}/updateLE`

// stats
export const USERS_BY_GENDER = `${API_URL}/getUsersAmount`
export const USERS_BY_REGION = `${API_URL}/getUsersByRegion`
export const TRANSITIONS = `${API_URL}/getClientsRating`
