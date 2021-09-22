import React from 'react'
import { personalDataTabs } from 'Constants/cabinet'
import { addIndex, map } from 'ramda'
import clsx from 'clsx'
import Locale from 'Components/Locale'

import style from './index.scss'

export default ({ activeTab, onTabChange }) => (
  <div>
    <p className={style.header}><Locale id="personal-data" /></p>
    <div className={style.tabs}>
      {addIndex(map)(({ value, label }, i) => (
        <span
          key={i}
          onClick={() => onTabChange(value)}
          className={clsx(style.tab, activeTab === value && style.active)}
        >
          {label}
        </span>
      ))(personalDataTabs)}
    </div>
  </div>
)
