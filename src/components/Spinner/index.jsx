import React from 'react'
import clsx from 'clsx'

import style from './index.scss'

export default ({ size, className, width, height, white }) => {
  const isMobile = window.innerWidth < 850

  return (
    <div
      className={clsx(style.spinner, white && style.white, className)}
      style={{ width: isMobile ? 20 : width, height: isMobile ? 20 : height }}
    >
      <img
        src="/assets/img/spinner.png"
        alt="spinner"
        width={size || "20"}
      />
    </div>
  )
}
