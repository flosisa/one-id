import { USER_SETTINGS } from 'Constants/storage'
import { getStorage } from '.'

export const getUserSettings = () => (
  JSON.parse(getStorage().getItem(USER_SETTINGS))
)

export const setUserSettings = value => {
  getStorage().setItem(USER_SETTINGS, JSON.stringify(value))
}
