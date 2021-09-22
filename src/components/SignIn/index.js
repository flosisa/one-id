import React, { useState, useEffect } from 'react'
import Header from './Header.jsx'
import LoginOrPhone from './LoginOrPhone.jsx'
import DigitalSign from '../DigitalSign'
import IDCard from './IDCard.jsx'
import Modal from '../Modal/index.jsx'
import PasswordReset from './PasswordReset.jsx'
import oAuthCheck from './oAuthCheck'
import Alert from '../Alert/index.jsx'
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import { compose, path, replace, prop, join } from 'ramda'
import { loginOrPhone, digitalSign, idCard } from 'Constants/signInOptions'
import formNames from '../Form/validate/formNames'
import { reset } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { injectIntl } from 'react-intl'
import Locale from 'Components/Locale'

import style from './index.scss'

const enhance = compose(
  connect(({ signIn, sso, router, general }) => ({
    signInLoading: path(['signIn', 'loading'], signIn),
    oAuthGenerate: path(['oAuthGenerate'], sso),
    query: path(['location', 'query'], router),
    status: path(['signIn', 'error'], signIn),
    data: path(['passwordReset', 'data', 'data'], signIn),
    passwordResetCode: path(['passwordReset', 'data', 'status', 'code'], signIn),
    passwordResetLoading: path(['passwordReset', 'loading'], signIn),
    externalServicesStatus: path(['externalServicesStatus', 'data'], general),
  })),
  injectIntl
)

export default enhance(({
  dispatch,
  data,
  signInLoading,
  oAuthGenerate,
  query,
  status,
  passwordResetCode,
  passwordResetLoading,
  externalServicesStatus,
  intl
}) => {
  const { data: oAuthGenerateData, loading: oAuthGenerateLoading } = oAuthGenerate || ''
  const isPasswordResetSuccess = passwordResetCode === 0
  const hasDataNotFound = passwordResetCode === 39
  const { getPassportData, getINN, getAddress } = externalServicesStatus || {}
  const personalCenterService = (getPassportData === false || getAddress === false) && intl.formatMessage({ id: 'personal-center' })
  const taxCommitteeService = getINN === false && intl.formatMessage({ id: 'tax-committee' })
  const actualUnavailableService = taxCommitteeService || personalCenterService

  const { code, message } = status || ''
  const success = code === 0
  const [activeOption, setActiveOption] = useState(loginOrPhone)
  const [modalState, setModalState] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [captchaCode, setCaptchaCode] = useState(null)
  const [alert, setAlert] = useState(true)

  const isLoginOrPhone = activeOption === loginOrPhone

  useEffect(() => {
    oAuthCheck(dispatch, query, false)
    dispatch(actions.externalServicesStatus())
  }, [])

  const onSignIn = formValues => {
    dispatch(actions.signIn(formValues))
  }

  const onSignInID = formValues => {
    dispatch(actions.signIn(formValues))
  }

  const onPasswordReset = formValues => {
    const pinfl = prop('pinfl', formValues)
    const passSeriaNumber = prop('passSeriaNumber', formValues)
    const code = prop('captchaCode', formValues)

    if (code === join('', captchaCode)) {
      dispatch(actions.passwordReset({
        pinfl,
        passSeriaNumber: replace(/ /g, '', passSeriaNumber || '')
      }))
    } else {
      toastr.error('', { component: <Locale id="captcha-failed" /> })
    }

  }

  const onPasswordResetModalToggle = () => {
    setModalState(false)

    dispatch(reset(formNames.passwordReset))
    dispatch(actions.passwordResetClear())
  }

  const onCloseAlert = () => setAlert(false)

  const HeaderContent = ({ route }) => {
    switch (route) {
      case loginOrPhone:
        return (
          <LoginOrPhone
            success={success}
            errorMessage={message}
            onSubmit={onSignIn}
            setModalState={setModalState}
            signInLoading={
              signInLoading ||
              oAuthGenerateData ||
              oAuthGenerateLoading
            }
          />)
      case digitalSign:
        return (
          <DigitalSign />
        )
      case idCard:
        return (
          <IDCard onSubmit={onSignIn} />
        )
      default:
        return (
          <div>Default</div>
        )
    }

  }


  return (
    <div className={style.signIn}>
      {actualUnavailableService && (
        <Alert
          className={style.externalServicesStatus}
          content={<Locale id="external-service-status-msg" values={{ service: actualUnavailableService }} />}
          showAlert={alert}
          closeAlert={onCloseAlert}
        />
      )}
      {modalState && (
        <Modal
          id="p-r"
          modalState={modalState}
          toggle={onPasswordResetModalToggle}
        >
          <PasswordReset
            data={data}
            onSubmit={onPasswordReset}
            loading={passwordResetLoading}
            captchaCode={captchaCode}
            setCaptchaCode={setCaptchaCode}
            isPasswordResetSuccess={isPasswordResetSuccess}
            hasDataNotFound={hasDataNotFound}
            onPasswordResetModalToggle={onPasswordResetModalToggle}
          />
        </Modal>
      )}
      <Header
        activeOption={activeOption}
        setActiveOption={setActiveOption}
      />
      <HeaderContent route={activeOption} />
    </div>
  )
})

