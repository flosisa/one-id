import React from 'react'
import Locale from 'Components/Locale'
import * as ROUTES from "Constants/routes"

export const contacts = [
  { key: 'email', label: <Locale id="s-email" />, value: 'iduzsupport@egov.uz' },
  //{ key: 'telegram', label: 'Telegram', value: '@iduzsupport' },
  { key: 'phone', label: <Locale id="s-phone" />, value: '71-202-30-12' }
]

export default [
  { value: 'main', label: <Locale id="main" />, route: ROUTES.INDEX, auth: false },
  { value: 'main', label: <Locale id="main" />, route: ROUTES.CABINET_MAIN, auth: true },
  { value: 'personal-data', label: <Locale id="personal-data" />, route: ROUTES.CABINET_PERSONAL_DATA, auth: true },
  { value: 'authenticity', label: <Locale id="authenticity" />, route: ROUTES.CABINET_AUTHENTICITY, auth: true },
  // { value: 'work-history', label: <Locale id="work-history" />, route: ROUTES.CABINET_WORK_HISTORY, auth: true },
  { value: 'entity', label: <Locale id="entity" />, route: ROUTES.CABINET_ENTITY, auth: true },
  { value: 'history', label: <Locale id="history" />, route: ROUTES.CABINET_HISTORY, auth: true },
  { value: 'sessions', label: <Locale id="sessions" />, route: ROUTES.CABINET_SESSIONS, auth: true },
  { value: 'info', label: <Locale id="about" />, route: ROUTES.INDEX, disabled: true },
  { value: 'con-res', label: <Locale id="connecting_resources" />, route: ROUTES.INDEX, disabled: true },
  { value: 'agreement', label: <Locale id="user-agreement" />, route: ROUTES.USER_AGREEMENT },
  { value: 'help', label: <Locale id="help" />, route: ROUTES.HELP },
  { value: 'exit', label: <Locale id="log_out" />, route: '#', auth: true },
]
