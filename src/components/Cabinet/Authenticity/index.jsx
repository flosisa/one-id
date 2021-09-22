import React from 'react'
import DigitalSign from 'Components/DigitalSign'
import Svg from 'Components/Svg/index.jsx'
import Locale from 'Components/Locale'

import style from './index.scss'

export default ({ userPinfl, authenticityComfirmLoading, isAuthenticityConfirmed }) => userPinfl ? (
  <div className={style.authenticity}>
    <p className={style.header}><Locale id="authenticity" /></p>
    {!isAuthenticityConfirmed ? (
      <div className={style.unconfirmed}>
        <Svg name="info" width="16" />
        <span><Locale id="not_verified_eds" /></span>
      </div>
    ) : (
        <p className={style.confirmed}><Locale id="verified_eds" /></p>
      )}
    {!isAuthenticityConfirmed && (
      <DigitalSign
        isCabinetAuthenticity={true}
        authenticityComfirmLoading={authenticityComfirmLoading}
      />
    )}
  </div>
) : (
    <span className={style.noTinData}><Locale id="digital-sign-data-error" /></span>
  )
