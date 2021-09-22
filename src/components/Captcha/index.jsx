import React, { useEffect } from "react"
import { addIndex, map } from 'ramda'
import Svg from 'Components/Svg/index.jsx'

import style from './index.scss'

export default ({ captchaCode, setCaptchaCode, error }) => {

  useEffect(() => {
    onRefresh()
  }, [])

  useEffect(() => {
    error && onRefresh()
  }, [error])

  const onRefresh = () => {
    const code = Math.random()
      .toString(34)
      .slice(4, 9)
      .toUpperCase()
      .split('')

    setCaptchaCode(code)
  }

  return captchaCode && (
    <div className={style.captcha}>
      <div className={style.captchaCode}>
        {addIndex(map)((item, i) => (
          <span
            key={i}
          >
            {item}
          </span>
        ))(captchaCode || [])}
      </div>
      <Svg name="refresh" onClick={onRefresh} />
    </div>
  )
}
