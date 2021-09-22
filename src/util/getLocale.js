import { locales } from 'Constants/localeOptions'
import { getUserSettings } from 'Util/storages'

export default () => {
  const { locale } = getUserSettings() || {}
  const defLocale = locales.kr

  return locale || defLocale
}
