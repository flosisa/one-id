import React from 'react'
import clsx from 'clsx'
import Svg from '../Svg/index.jsx'
import Locale from 'Components/Locale'

import style from './index.scss'

export default ({ creationStage }) => (
  <>
    <div className={style.signUpTitle}>
      <p><Locale id="reg" /></p>
      <span><Locale id="star_field_fill" /></span>
    </div>
    <div id="stages" className={style.stages}>
      <div className={clsx(style.stage)}>
        <div className={style.stageId}>
          <Svg name="ellipse" />
          {
            creationStage ?
              <img
                src="/assets/svg/tick.svg"
                alt="tick"
                width="11"
              /> :
              <span>1</span>
          }
        </div>
        <span><Locale id="identification" /></span>
      </div>
      <div className={clsx(style.stage, !creationStage && style.passive)}>
        <div className={style.stageId}>
          <Svg name="ellipse" />
          <span>2</span>
        </div>
        <span><Locale id="confirmation" /></span>
      </div>
    </div>
  </>
)
