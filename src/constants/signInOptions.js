import React from 'react'
import Locale from 'Components/Locale'

export const loginOrPhone = 'loginOrPhone'
export const digitalSign = 'digitalSign'
export const idCard = 'idCard'

export default ([
  // { value: loginOrPhone, label: <span>Логин <span>или</span> Номер телефона</span> },
  { value: loginOrPhone, label: <span><Locale id="sign_in_login_phone" /></span> },
  { value: digitalSign, label: <span><Locale id="help_EDS" /></span> },
  //{ value: idCard, label: <span><Locale id="id_card" /></span> }
])
