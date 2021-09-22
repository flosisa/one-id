import { PAGE } from 'Constants/storage'
import { getStorage } from '.'

export const getPage = () => (
  +getStorage('session').getItem(PAGE)
)

export const setPage = value => {
  getStorage('session').setItem(PAGE, value)
}
