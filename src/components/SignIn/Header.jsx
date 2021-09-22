import React from 'react'
import { map } from 'ramda'
import signInOptions from 'Constants/signInOptions'
import clsx from 'clsx'
import Locale from 'Components/Locale'

import style from './index.scss'

export default ({ activeOption, setActiveOption }) => (
  <>
    <p className={clsx(style.signInTitle, style.title)}><Locale id="ent_system" /></p>
    <div className={style.options}>
      {map(({ value, label }) => (
        <div
          key={value}
          onClick={() => setActiveOption(value)}
          className={clsx(activeOption === value && style.active)}
        >
          {label}
        </div>
      ))(signInOptions)}
    </div>
  </>
)
