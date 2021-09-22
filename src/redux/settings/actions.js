import { LOCALE, POOR_EYESIGHT } from './actionTypes'

export const locale = payload => ({
  type: LOCALE, payload
})

export const poorEyesight = payload => ({
  type: POOR_EYESIGHT, payload
})
