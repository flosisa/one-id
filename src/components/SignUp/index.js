import React, { useState, useEffect } from 'react'
import Agreement from './Agreement.jsx'
import UserAgreement from '../UserAgreement/index.jsx'
import Header from './Header.jsx'
import Identification from './Identification.jsx'
import Creation from './Creation.jsx'
import Modal from '../Modal/index.jsx'
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import validate, { pinflLength, passportDataLength, initialValues } from '../Form/validate'
import formNames from '../Form/validate/formNames'
import { compose, path, prop, length, mergeRight, dissoc, replace } from 'ramda'

import style from './index.scss'

const enhance = compose(
  connect(({ form, signUp, settings }) => ({
    userAgreement: path([formNames.userAgreement, 'values', 'userAgreement'], form),
    dateOfBirth: path([formNames.signUp, 'values', 'dateOfBirth'], form),
    pinfl: path([formNames.signUp, 'values', 'pinfl'], form),
    passSeriaNumber: path([formNames.signUp, 'values', 'passSeriaNumber'], form),
    email: path([formNames.signUp, 'values', 'email'], form),
    phoneNumber: path([formNames.signUp, 'values', 'phoneNumber'], form),
    pinflCheckStatus: path(['pinflCheck', 'data', 'status'], signUp),
    smsAskPinfl: path(['smsAsk', 'data', 'data', 'pinfl'], signUp),
    smsAskStatusCode: path(['smsAsk', 'data', 'status', 'code'], signUp),
    smsAskLoading: path(['smsAsk', 'loading'], signUp),
    smsAsk: path(['smsAsk', 'error'], signUp),
    smsCheckPinfl: path(['smsCheck', 'data', 'data', 'pinfl'], signUp),
    smsCheckData: path(['smsCheck', 'data', 'data', 'passportData'], signUp),
    smsCheckStatusCode: path(['smsCheck', 'data', 'status', 'code'], signUp),
    smsCheckLoading: path(['smsCheck', 'loading'], signUp),
    signUpLoading: path(['signUp', 'loading'], signUp),
    loginGenerateData: path(['loginGenerate', 'data'], signUp),
    passwordGenerateData: path(['passwordGenerate', 'data'], signUp),
    passwordGenerateLoading: path(['passwordGenerate', 'loading'], signUp),
    checkPassportBirthDateStatus: path(['checkPassportBirthDate', 'data', 'status'], signUp),
    locale: prop('locale', settings),
  }))
)

export default enhance(({
  dispatch,
  userAgreement,
  pinfl,
  dateOfBirth,
  passSeriaNumber,
  email,
  phoneNumber,
  smsAskLoading,
  pinflCheckStatus,
  smsAskPinfl,
  smsAskStatusCode,
  smsCheckPinfl,
  smsCheckData,
  smsCheckStatusCode,
  smsCheckLoading,
  signUpLoading,
  loginGenerateData,
  passwordGenerateData,
  passwordGenerateLoading,
  locale,
  smsAsk,
  checkPassportBirthDateStatus
}) => {
  const { code, message } = pinflCheckStatus || ''
  const isPinflCheckSucceeded = code === 101 || code === 100
  const isPinflAlreadyHas = code === 103
  const { code: checkPassportBirthDateCode, message: checkPassportBirthDateMessage } = checkPassportBirthDateStatus || ''
  const isCheckPassportBirthDateSucceeded = checkPassportBirthDateCode === 0
  const isCheckPassportBirthDateFailed = checkPassportBirthDateCode === 101
  const hasSmsCodeSent = smsAskStatusCode === 0 || smsAskStatusCode === 123
  const unknownPinfl = smsAskStatusCode === 10001
  const isIdentificationSucceeded = smsCheckStatusCode === 0 || smsCheckStatusCode === 123
  const oneMinute = 59    // sec
  const oneSecond = 1000  // msec
  const [signUpStart, setSignUpStart] = useState(false)
  const [agreementRead, setAgreementRead] = useState(false)
  const [identificationStage, setIdentificationStage] = useState(false)
  const [creationStage, setCreationStage] = useState(false)
  const [timer, setTimer] = useState(oneMinute)
  const [alert, setAlert] = useState(true)
  const [login, setLogin] = useState(null)

  useEffect(() => {
    if (length(pinfl) === pinflLength) {
      const isPinflValid = validate({ pinfl, pinflCheck: true })
      isPinflValid && dispatch(actions.pinflCheck({ pinfl }))
    }
  }, [pinfl])

  useEffect(() => {
    if (passSeriaNumber && length(passSeriaNumber) >= passportDataLength && dateOfBirth) {
      const pValue = replace(/ /g, '', passSeriaNumber)
      const isPassportDataValid = validate({ passportData: pValue, passportDataCheck: true })
      const DateObj = new Date(dateOfBirth)
      const year = DateObj.getFullYear()
      const month = DateObj.getMonth()
      const actualMonth = month + 1
      const date = DateObj.getDate()
      const actualDateOfBirth = `${year}-${actualMonth < 10 ? '0' + actualMonth : actualMonth}-${date < 10 ? '0' + date : date}`

      isPassportDataValid && dispatch(actions.checkPassportBirthDate({
        passport: pValue,
        birthDate: actualDateOfBirth
      }))
    }
  }, [passSeriaNumber, dateOfBirth])

  useEffect(() => {
    dispatch(actions.smsAskClear())
  }, [code])

  useEffect(() => {
    isIdentificationSucceeded &&
      smsCheckData &&
      dispatch(actions.smsAskClear()) &
      dispatch(actions.loginGenerate()) &
      setIdentificationStage(false) &
      setCreationStage(true)
  }, [isIdentificationSucceeded])

  useEffect(() => {
    if (hasSmsCodeSent || smsCheckData) {
      const modal = document.getElementById('s-u')

      modal && modal.scrollTo(0, hasSmsCodeSent ? modal.clientHeight : 0)
    }
    hasSmsCodeSent && setTimer(oneMinute)
  }, [hasSmsCodeSent, smsCheckData])

  const onUserAgreement = () => {
    setSignUpStart(true)
    setIdentificationStage(true)
  }

  const onCloseAlert = () => setAlert(false)

  const onReadAgreement = () => {
    setAgreementRead(true)
  }

  const onSmsAsk = () => {
    dispatch(actions.smsAsk({
      pinfl,
      passSeriaNumber: replace(/ /g, '', passSeriaNumber || ''),
      email,
      phoneNumber: replace(/ /g, '', phoneNumber || '')
    }))
  }

  if (hasSmsCodeSent) {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), oneSecond)
    }
  }

  const onSmsCheck = formValues => {
    const smsCode = +prop('smsCode', formValues)

    dispatch(actions.smsCheck({ pinfl: smsAskPinfl, smsCode }))
  }

  const onPasswordGenerate = () => {
    dispatch(actions.passwordGenerate())
  }

  const onCreation = formValues => {
    dispatch(actions.signUp(mergeRight(
      dissoc('confirmPassword', formValues),
      { pinfl: smsCheckPinfl }
    )))
  }

  const onModalToggle = () => {
    setSignUpStart(false)
    dispatch(actions.smsAskClear())
  }

  return (
    <div>
      {signUpStart && (
        <Modal
          id="s-u"
          modalState={signUpStart}
          toggle={onModalToggle}
        >
          <div className={style.signUp}>
            <Header creationStage={creationStage} />
            {identificationStage ? (
              <Identification
                smsAskLoading={smsAskLoading}
                isPinflCheckSucceeded={isPinflCheckSucceeded}
                message={message}
                smsAsk={smsAsk}
                showAlert={alert}
                closeAlert={onCloseAlert}
                onSmsAsk={onSmsAsk}
                onSmsCheck={onSmsCheck}
                hasSmsCodeSent={hasSmsCodeSent}
                timer={timer}
                initialValues={initialValues}
                unknownPinfl={unknownPinfl}
                isPinflAlreadyHas={isPinflAlreadyHas}
                smsCheckLoading={smsCheckLoading}
                isIdentificationSucceeded={isIdentificationSucceeded}
                isCheckPassportBirthDateSucceeded={isCheckPassportBirthDateSucceeded}
                isCheckPassportBirthDateFailed={isCheckPassportBirthDateFailed}
                checkPassportBirthDateMessage={checkPassportBirthDateMessage}
                locale={locale}
              />
            ) : creationStage && (
              <Creation
                onSubmit={onCreation}
                personalData={smsCheckData}
                signUpLoading={signUpLoading}
                loginGenerateData={loginGenerateData}
                onPasswordGenerate={onPasswordGenerate}
                passwordGenerateData={passwordGenerateData}
                passwordGenerateLoading={passwordGenerateLoading}
                initialValues={{ login }}
                setLogin={setLogin}
              />
            )}
          </div>
        </Modal>
      )}
      {agreementRead && (
        <Modal
          id="u-a"
          modalState={agreementRead}
          toggle={() => setAgreementRead(false)}
        >
          <UserAgreement locale={locale} />
        </Modal>
      )}
      <Agreement
        userAgreement={userAgreement}
        locale={locale}
        onReadAgreement={onReadAgreement}
        onUserAgreement={onUserAgreement}
      />
    </div>
  )
})
