import React from 'react'
import clsx from 'clsx'

import style from './index.scss'

export default ({ content, className }) => (
  <div className={clsx(style.tooltip, className)}>
    <span id="t-p-c">{content}</span>
  </div>
)
