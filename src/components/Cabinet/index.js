import React, { useState, useEffect, useLayoutEffect } from 'react'
import Profile from './Profile/index.jsx'
import Main from './Main'
import PersonalData from './PersonalData'
import Authenticity from './Authenticity'
import WorkHistory from './WorkHistory'
import Entity from './Entity'
import History from './History'
import Sessions from './Sessions'
import * as ROUTES from "Constants/routes"
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import { compose, path, props, join, prop } from 'ramda'
import { removeToken } from 'Util/storages'

import style from './index.scss'

const enhance = compose(
  connect(({ cabinet }) => ({
    personalData: path(['personalData', 'data', 'data'], cabinet),
    photo: path(['personalPhoto', 'data', 'data', 'photo'], cabinet),
    pinNumber: path(['personalData', 'data', 'data', 'pinfl'], cabinet),
    authStatus: path(['personalData', 'data', 'status', 'code'], cabinet),
    loading: path(['personalData', 'loading'], cabinet),
  }))
)

export default enhance(({ dispatch, history, photo, pinNumber, locale, location: { pathname }, personalData, authStatus, loading }) => {
  const login = prop('login', personalData)
  const passportData = prop('passportData', personalData)
  
  const name = join(
    ' ',
    [
      prop('name_latin', passportData) || prop('name_engl', passportData) || ' ',
      prop('surname_latin', passportData) || prop('surname_engl', passportData) || ' '
    ],
    passportData)

  const [auth, setAuth] = useState(null)
  const [profile, setProfile] = useState(true)

  useEffect(() => {
    dispatch(actions.personalData())
  }, [])

  useEffect(() => {
    dispatch(actions.personalPhoto({ pinfl: pinNumber }))
  }, [pinNumber])

 
  useEffect(() => {
    if (typeof authStatus === 'number') {
      setAuth(authStatus === 0)
    }
  }, [authStatus])

  useLayoutEffect(() => {
    const profile = () => {
      if (window.innerWidth < 850) {
        setProfile(false)
      } else {
        setProfile(true)
      }
    }

    profile()
    window.addEventListener('resize', profile)

    return () => window.removeEventListener('resize', profile)
  }, [])

  if (auth === false) {
    removeToken()
    history.replace(ROUTES.INDEX)
  }

  const onProfileClick = () => {
    history.push(ROUTES.CABINET_PERSONAL_DATA)
  }

  const getComponent = () => {
    switch (pathname) {
      case ROUTES.CABINET_MAIN:
        return <Main />
      case ROUTES.CABINET_PERSONAL_DATA:
        return <PersonalData />
      case ROUTES.CABINET_AUTHENTICITY:
        return <Authenticity />
      case ROUTES.CABINET_WORK_HISTORY:
        return <WorkHistory />
      case ROUTES.CABINET_ENTITY:
        return <Entity locale={locale} />
      case ROUTES.CABINET_HISTORY:
        return <History />
      case ROUTES.CABINET_SESSIONS:
        return <Sessions />
    }
  }
  const Component = getComponent()

  return (
    <>
      {Component && (
        <div id="cabinet" className={style.cabinet}>
          {profile && (
            <Profile
              login={login}
              name={name}
              photo={photo}
              onProfileClick={onProfileClick}
              loading={loading || auth === null || auth === false}
            />
          )}
          <div className={style.container}>
            {auth && Component}
          </div>
        </div>
      )}
    </>
  )
})
