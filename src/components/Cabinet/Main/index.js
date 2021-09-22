import React, { useState, useEffect } from 'react'
import Main from './index.jsx'
import { useHistory } from 'react-router-dom'
import Modal from 'Components/Modal/index.jsx'
import SignedUpGreet from 'Components/SignUp/SignedUpGreet.jsx'
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import { compose, path, prop } from 'ramda'
import * as ROUTES from "Constants/routes"

const enhance = compose(
  connect(({ signUp, settings, cabinet }) => ({
    login: path(['signUp', 'data', 'data', 'login'], signUp),
    locale: path(['locale'], settings),
    personalData: path(['personalData', 'data', 'data'], cabinet),
    sessions: path(['sessions', 'data', 'data', 'userActions'], cabinet),
  }))
)

export default enhance(({ dispatch, sessions, personalData, login, locale }) => {

  const [modalState, setModalState] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const email = prop('email', personalData || [])
  const phone = prop('phoneNumber', personalData || [])
  const history = useHistory()

  const myCurrentTime = new Date().getTime()

  useEffect(() => {
    login && setModalState(true)
  }, [login])

  useEffect(() => {
    !sessions && dispatch(actions.sessions())
  }, [])

  useEffect(() => {
    sessions && sessions[0].loginTime < myCurrentTime && personalData && (email == '1' || phone == '1') && history.push(ROUTES.CABINET_PERSONAL_DATA)
  }, [sessions])

  const onModalToggle = () => {
    dispatch(actions.signUpClear())
    setModalState(false)
  }

  const onAlertToggle = () => setShowAlert(!showAlert)

  return (
    <>
      <Modal
        id="s-u-g"
        modalState={modalState}
        toggle={onModalToggle}
        button={{ state: true }}
      >
        <SignedUpGreet login={login} />
      </Modal>
      <Main locale={locale} showAlert={showAlert} closeAlert={onAlertToggle} />
    </>
  )
})
