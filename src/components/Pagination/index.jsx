import React from 'react'
import Svg from '../Svg/index.jsx'
import clsx from 'clsx'
import Locale from 'Components/Locale'

import style from './index.scss'

export default ({ activePage = 1, defaultSize = 10, total = 10, onPageChange }) => {
  const totalPages = Math.ceil(total / defaultSize)
  const pages = []
  const to = activePage * defaultSize
  const from = to - (defaultSize - 1)

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <div
        key={i}
        className={clsx(
          style.page,
          (activePage - 3 < i && activePage + 3 > i) && style.pageShow,
          activePage === i && style.pageActive
        )}
        onClick={() => onPageChange(i)}
      >
        <span>{i}</span>
      </div>
    )
  }

  return (
    <div className={style.pagination}>
      <div
        className={clsx(style.arrows, style.margin, activePage === 1 && style.arrowsDisable)}
        onClick={() => onPageChange(1)}
      >
        <Svg name="double-arrow" />
      </div>
      <div
        className={clsx(style.arrows, activePage === 1 && style.arrowsDisable)}
        onClick={() => onPageChange(activePage - 1)}
      >
        <Svg name="arrow-mini" />
      </div>

      {pages}

      <div
        className={clsx(style.arrows, style.margin, activePage === totalPages && style.arrowsDisable)}
        onClick={() => onPageChange(activePage + 1)}
      >
        <Svg
          name="arrow-mini"
          className={style.end}
        />
      </div>
      <div
        className={clsx(style.arrows, activePage === totalPages && style.arrowsDisable)}
        onClick={() => onPageChange(totalPages)}
      >
        <Svg
          name="double-arrow"
          className={style.end}
        />
      </div>

      <div className={style.countInfo}>
        <span><Locale id="pagination" values={{ from, to, total }} /></span>
      </div>
    </div>
  )
}
