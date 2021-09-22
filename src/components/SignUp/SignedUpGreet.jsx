import React from 'react'
import Locale from 'Components/Locale'

import style from './index.scss'

export default ({ login }) => (
  <div className={style.signedUpGreet}>
    <p><Locale id="reg_congratulations" /></p>
    <div>
      <p><Locale id="reg_one_id" /></p>
    </div>
    <div id="s-u-g-l">
      <p><Locale id="p_login" /></p> <span>{login}</span>
    </div>
    <div>
      <p><Locale id="not_verified_account" /></p>
    </div>
    <div>
      <p><Locale id="to_verify_data" /></p>
    </div>
    <a href="https://soliqservis.uz" target="_blank" rel="noopener noreferrer">
      <Locale id="more_about" />
    </a>
  </div>
)
