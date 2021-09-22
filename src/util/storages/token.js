import { TOKEN } from 'Constants/storage'
import { getStorage } from '.'

export const getToken = () => (
  getStorage().getItem(TOKEN)
)

export const setToken = value => {
  getStorage().setItem(TOKEN, value)
}

export const removeToken = () => {
  getStorage().removeItem(TOKEN)
}
