import React, { useState, useLayoutEffect } from 'react'
import Svg from 'Components/Svg/index.jsx'
import localeOptions from 'Constants/localeOptions'
import menuItems, { contacts } from 'Constants/sidebar'
import { compose, path, map, addIndex, toLower, includes, startsWith } from 'ramda'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import * as ROUTES from "Constants/routes"
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import Tooltip from 'Components/Tooltip/index.jsx'
import Locale from 'Components/Locale'

import style from './index.scss'

const enhance = compose(
  connect(({ settings }) => ({
    locale: path(['locale'], settings),
  }))
)

export default enhance(({ activeRoute, onSignOut, dispatch, locale, isAuthed, year }) => {
  const history = useHistory()
  const isMobile = window.innerWidth < 850
  const isCabinet = startsWith(ROUTES.CABINET, activeRoute)
  const isSafari = includes('safari', toLower(navigator.userAgent))
  const [sidebarState, setSidebarState] = useState(true)
  const [betaTooltip, setBetaTooltip] = useState(false)

  useLayoutEffect(() => {
    const width = window.innerWidth

    const reduce = () => {
      if (width !== window.innerWidth) {
        if (window.innerWidth < 1199) {
          setSidebarState(false)
        } else {
          setSidebarState(true)
        }
      }
    }

    reduce()
    window.addEventListener('orientationchange', reduce)

    return () => window.removeEventListener('orientationchange', reduce)
  }, [])

  useLayoutEffect(() => {
    if (isMobile) {
      setSidebarState(false)
    }
  }, [activeRoute])

  return (
    <>
      <div id="sb-c" className={clsx(style.sidebar, sidebarState ? isMobile && style.expanded : style.reduced)}>
        <div className={clsx(style.poorEyesightBlock, !sidebarState && style.reduced)}>
          {sidebarState && (
            <div
              className={style.poorEyesight}
              onClick={() => dispatch(actions.poorEyesight())}
            >
              <img src="/assets/svg/glasses.svg" alt="glasses" />
              <span><Locale id="s_sight_weak" /></span>
            </div>
          )}
          <Svg
            id="sb-r"
            name="reduce"
            onClick={() => setSidebarState(!sidebarState)}
          />
        </div>

        <div className={style.locales}>
          {sidebarState && map(({ value, label }) => {
            if (value !== locale) {
              return (
                <span
                  key={value}
                  onClick={() => dispatch(actions.locale(value))}
                >
                  {label}
                </span>
              )
            }
          })(localeOptions)}
        </div>

        <div className={style.mainLogo}>
          <img
            src={`/assets/svg/logo${!sidebarState ? '-mini' : ''}.svg`}
            alt="logo"
            onClick={() => !isCabinet && history.push(ROUTES.INDEX)}
            style={{ cursor: isCabinet ? 'default' : null }}
          />
          {sidebarState && (
            <div>
              <img src="/assets/svg/beta.svg" alt="beta" onMouseEnter={() => setBetaTooltip(true)} onMouseLeave={() => setBetaTooltip(false)} />
              {!isMobile && betaTooltip && (
                <Tooltip className={style.betaTooltip} content={<Locale id="beta-version" />} />
              )}
            </div>
          )}
        </div>

        <div className={clsx(style.menuItems, !sidebarState && style.reduced)}>
          {addIndex(map)(({ value, label, route, auth, disabled }, i) => {

            if ((auth && !isAuthed) || (isAuthed && auth === false) || disabled) {
              return
            }

            return (
              <div
                key={i}
                className={clsx(style.menuItem,activeRoute === route && style.menuItemActive, isSafari && style.menuSafari )}
                onClick={() => value === 'exit' ? onSignOut() : history.push(route)}
              >
                <Svg name={value} width="16" />
                {sidebarState && (
                  <>
                    <span>{label}</span>
                    <Svg id="arrow" name="arrow" />
                  </>
                )}
              </div>
            )
          })(menuItems)}
        </div>
        {sidebarState && (
          <>
            <div className={style.info}>
              <p><Locale id="s_title" /></p>
              <p><Locale id="get_access_account" /></p>
            </div>
            <div className={style.contactsBlock}>
              <p><Locale id="on-question" /></p>
              {map(({ key, value, label }) => (
                <div key={key} className={style.contacts}>
                  <span>{label}</span>
                  <p>{value}</p>
                </div>
              ))(contacts)}
            </div>

            <div className={style.logos}>
              <img src="/assets/img/logo2.png" alt="logo2" />
              <span><Locale id="mitc" /></span>
            </div>

            <p className={style.copyright}><Locale id="inc_desc" values={{ year }} /></p>
            <p className={style.reportABug}><Locale id="report-a-bug-info" /></p>
            <a href="https://id.gov.uz" target="_blank" rel="noopener noreferrer" className={style.oldVersion}><Locale id="old-version" /></a>
          </>
        )}
      </div>
    </>
  )
})
