import { LOCALE, POOR_EYESIGHT } from './actionTypes'
import * as STATES from './states'
import { mergeRight, prop } from 'ramda'
import { getUserSettings, setUserSettings } from 'Util/storages'
import getLocale from 'Util/getLocale'

const userSettings = getUserSettings() || {}
const poorEyesight = userSettings[STATES.POOR_EYESIGHT]

const INIT_STATE = {
  [STATES.LOCALE]: getLocale(),
  [STATES.POOR_EYESIGHT]: poorEyesight,
}

export default (state = INIT_STATE, action) => {
  const userSettings = getUserSettings() || {}

  switch (action.type) {
    case LOCALE:
      setUserSettings(mergeRight(userSettings, { [STATES.LOCALE]: action.payload }))

      return { ...state, [STATES.LOCALE]: action.payload }

    case POOR_EYESIGHT:
      setUserSettings(mergeRight(userSettings, { [STATES.POOR_EYESIGHT]: !prop([STATES.POOR_EYESIGHT], userSettings) }))

      return { ...state, [STATES.POOR_EYESIGHT]: !prop([STATES.POOR_EYESIGHT], userSettings) }

    default:
      return { ...state }
  }
}
