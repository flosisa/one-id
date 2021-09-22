import React from 'react'
import Locale from 'Components/Locale'
import Svg from '../Svg/index.jsx'
import style from './index.scss'
import clsx from 'clsx'

export default ({ className, showAlert, closeAlert, localeId, localeIdBase, svgWidth = 41, content }) => {
  return showAlert ? (
    <div className={clsx(style.alert, className)}>
      <div className={style.iconType}><Svg name="info" width={svgWidth} /></div>
      <div className={style.message}>
        {content || (
          <>
            <Locale id={localeId} />
            {localeIdBase && <div id="m-b" className={style.messageBase}><Locale id={localeIdBase} /></div>}
          </>
        )}
      </div>
      <div className={style.closeIcon} onClick={closeAlert}><Svg name="close" width="11" /></div>
    </div>
  ) : null
}
