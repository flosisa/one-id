import { getUserSettings, setUserSettings } from './userSettings'
import { getToken, setToken, removeToken } from './token'
import { getPage, setPage } from './pagination'

const getStorage = session => (session ? sessionStorage : localStorage)

export {
  getStorage,
  getUserSettings,
  setUserSettings,
  getToken,
  setToken,
  removeToken,
  getPage,
  setPage
}
