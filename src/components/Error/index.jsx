import React from 'react'
import Locale from 'Components/Locale'

import style from './index.scss'

export default () => (
  <div className={style.error}>
    <Locale id="page-not-found" />
  </div>
)
