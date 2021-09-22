import React, { useEffect, useLayoutEffect } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import * as ROUTES from "Constants/routes"
import Home from "./Home/index.jsx"
import Sidebar from './Sidebar/index.jsx'
import Cabinet from "./Cabinet"
import ReportABug from "./ReportABug"
import Error from "./Error/index.jsx"
import AuthVia from './AuthVia'
import UserAgreement from './UserAgreement/index.jsx'
import CheckDigitalSign from "./CheckDigitalSign/index.js"
import Help from './Help/index.jsx'
import Stats from './Stats'
import ReduxToastr from 'react-redux-toastr'
import { IntlProvider } from 'react-intl'
import locales from 'Locales'
import { getToken } from 'Util/storages'
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import { compose, path, prop, includes, toLower } from 'ramda'
import clsx from 'clsx'
import parseSsoQuery from 'Util/parseSsoQuery'
import oAuthCheck from './SignIn/oAuthCheck'
import { TOKEN } from 'Constants/storage'

import style from './index.scss'

const enhance = compose(
  connect(({ settings, router, general }) => ({
    locale: prop('locale', settings),
    poorEyesight: path(['poorEyesight'], settings),
    query: path(['location', 'query'], router),
    year: path(['fullYear', 'data'], general),
  }))
)

export default enhance(({ dispatch, locale, poorEyesight, query, location: { pathname }, year }) => {
  const isAuthed = getToken()
  const queryObj = parseSsoQuery(query)
  const { token_id } = queryObj || ''
  const isFirefox = includes('firefox', toLower(navigator.userAgent))

  useEffect(() => {
    oAuthCheck(dispatch, query, 'authed')

    !token_id && dispatch(actions.fullYear({
      url: pathname,
      header: { Accept: '*/*' }
    }))

    //
    const listener = e => {
      if (e.key === TOKEN) {
        location.href = pathname
      }
    }

    window.addEventListener('storage', listener)

    return () => {
      window.removeEventListener('storage', listener)
    }
  }, [])

  useEffect(() => {
    if (pathname) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  useLayoutEffect(() => {
    const root = document.querySelector(":root")

    root.style.fontSize = `${poorEyesight ? 22 : 16}px`
  }, [poorEyesight])

  const onSignOut = () => {
    dispatch(actions.signOut())
  }

  return (
    <div className={clsx(isFirefox && style.firefox)}>
      <IntlProvider locale={locales[locale].locale} messages={locales[locale].messages}>
        {
          isAuthed && token_id ? (
            <AuthVia />
          ) : (
              <div className={clsx(style.main, poorEyesight && style.poorEyesight)}>
                <Sidebar
                  isAuthed={isAuthed}
                  activeRoute={pathname}
                  year={year}
                  onSignOut={onSignOut}
                />
                <div className={style.components}>
                  <Switch>
                    <Route
                      exact
                      path={ROUTES.INDEX}
                      render={() => (!isAuthed || token_id) ? <Home /> : <Redirect to={ROUTES.CABINET_MAIN} />}
                    />
                    <Route
                      exact
                      path={`${ROUTES.CABINET}/:component`}
                      render={props => isAuthed ? <Cabinet {...props} locale={locale} /> : <Redirect to={ROUTES.INDEX} />}
                    />
                    <Route
                      exact
                      path={ROUTES.USER_AGREEMENT}
                      render={() => <UserAgreement locale={locale} />}
                    />
                    {/* <Route
                      exact
                      path={ROUTES.CHECK_SIGNATURE}
                      render={() => <CheckDigitalSign />}
                    /> */}
                    <Route
                      exact
                      path={ROUTES.HELP}
                      render={() => <Help locale={locale} />}
                    />
                    <Route
                      exact
                      path={ROUTES.STATS}
                      render={() => <Stats />}
                    />
                    <Route exact path={ROUTES.ERROR} render={() => <Error />} />
                    <Redirect to={ROUTES.ERROR} />
                  </Switch>
                  <ReportABug />
                </div>
              </div>
            )
        }
        <ReduxToastr
          timeOut={8000}
          preventDuplicates
          position="top-right"
          transitionIn="bounceIn"
          transitionOut="bounceOut"
          progressBar
        />
      </IntlProvider>
    </div>
  )
})
