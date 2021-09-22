import React, { useState, useEffect } from 'react'
import Locale from 'Components/Locale'
import Svg from '../Svg/index.jsx'

import style from './index.scss'

export default ({ id, modalState, toggle, children, button }) => {
  const { state: buttonState, type, text } = button || ''

  const [state, setState] = useState(false)

  const onToggle = e => {
    const modalFade = document.getElementById(`${id}-f`)
    const modalBackdrop = document.getElementById(`${id}-bd`)
    const modalContent = document.getElementById(id)
    const modalButton = document.getElementById(`${id}-b`)
    const modalExtraButton = document.getElementById(`${id}-eb`) || modalButton

    if (
      e &&
      modalContent.contains(e.target) &&
      !modalButton.contains(e.target) &&
      !modalExtraButton.contains(e.target)
    ) {
      return
    }

    if (state) {
      setTimeout(() => {
        modalBackdrop.style.opacity = '0'
        modalFade.style.display = 'none'
        setState(false)
        toggle()
      }, 500)
      modalFade.style.opacity = '0'
    } else if (modalState) {
      setTimeout(() => {
        modalFade.style.opacity = '1'
        setState(modalState)
      }, 100)
      modalBackdrop.style.opacity = '0.25'
      modalFade.style.display = 'block'
    }
  }

  useEffect(() => {
    onToggle()
  }, [modalState])

  return (
    <div id={`${id}-f`} className={style.modalAuFade}>
      <div className={style.modalAu} onMouseDown={onToggle}>
        <div
          id={id}
          className={style.modalAuContent}
        >
          <Svg
            id={`${id}-b`}
            name="close"
            className={style.close}
          />
          {children}
          {buttonState && (
            <button
              id={`${id}-eb`}
              type="button"
              className={type || "secondary"}
            >
              {text || <Locale id="continue" />}
            </button>
          )}
        </div>
      </div>
      <div id={`${id}-bd`} className={style.modalAuBackdrop} onMouseDown={onToggle} />
    </div>
  )
}
