import React from 'react'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

import style from './index.scss'

export default () => (
  <div className={style.home}>
    <SignIn />
    <SignUp />
  </div>
)
