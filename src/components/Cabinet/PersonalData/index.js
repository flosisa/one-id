import React, { useState, useEffect } from 'react'
import Header from './Header.jsx'
import UserProfile from './UserProfile.jsx'
import Contacts from './Contacts/index.jsx'
import Settings from './Settings/index.jsx'
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import { compose, path, isEmpty, mergeAll, map, join, props, prop, pipe, keys, pick, filter, length } from 'ramda'
import { userProfile, contacts, settings } from 'Constants/cabinet'
import { toastr } from 'react-redux-toastr'
import Locale from 'Components/Locale'
import { tinLength } from '../../Form/validate'
import axios  from 'axios'
import style from '../index.scss'

const enhance = compose(
  connect(({ cabinet }) => ({
    personalData: path(['personalData', 'data', 'data'], cabinet),
    pinNumber: path(['personalData', 'data', 'data','pinfl'], cabinet),
    photo: path(['personalPhoto', 'data', 'data','photo'], cabinet),
    personalDataStatus: path(['personalData', 'data', 'status', 'code'], cabinet),
    changedEmail: path(['changeEmail', 'data'], cabinet),
    newPhoneNumber: path(['changePhone', 'data', 'data', 'newPhoneNumber'], cabinet),
    changedPhoneNumber: path(['changePhoneSmsCheck', 'data'], cabinet),
    changePhoneStatus: path(['changePhone', 'data', 'status', 'code'], cabinet),
    changePhoneLoading: path(['changePhone', 'loading'], cabinet),
    changedLogin: path(['changeLogin', 'data'], cabinet),
    changeLoginLoading: path(['changeLogin', 'loading'], cabinet),
    personalDataRefresh: path(['personalDataRefresh', 'data', 'data'], cabinet),
    status: path(['personalDataRefresh', 'data','status'], cabinet),
    personalDataRefreshStatus: path(['personalDataRefresh', 'data', 'status', 'code'], cabinet),
    personalDataRefreshLoading: path(['personalDataRefresh', 'loading'], cabinet),
  }))
)

export default enhance(({
  dispatch,
  personalData,
  personalDataRefresh,
  personalDataStatus,
  personalDataRefreshStatus,
  changedEmail,
  newPhoneNumber,
  status,
  photo,
  pinNumber,
  changedPhoneNumber,
  changePhoneStatus,
  changePhoneLoading,
  changedLogin,
  changeLoginLoading,
  personalDataRefreshLoading
}) => {
  
  
  const hasData = personalDataRefreshStatus === 0 || personalDataStatus === 0
  let actualData
  if (personalDataRefresh && Object.keys(personalDataRefresh).length > 1){
    actualData = personalDataRefresh || personalData
  } else{
    actualData =  personalData
  }

  const pinfl = prop('pinfl', actualData)
  const passportData = prop('passportData', actualData)
  const data = mergeAll([
    ...props(['addressData', 'innData', 'passportData'], actualData),
    { pinfl }
  ])

  const {tin} = data
  const tinChecked = (typeof tin === 'string' && length(tin) === tinLength)
  const name = join(
    '',
    [
      prop('name_latin', passportData) || prop('name_engl', passportData) || '',
      prop('surname_latin', passportData) || prop('surname_engl', passportData) || ''
    ],
    passportData)
  const login = prop('login', personalData)
  const email = prop('email', personalData)
  const phoneNumber = prop('phoneNumber', personalData)
  const addressData = prop('addressData', personalData)
  const address = personalData && pipe(
    pick([
      'pRegion',
      'pDistrict',
      'pAddress',
      'pHouse',
      'pFlat',
    ]),
    keys(),
    map(item => prop(item, addressData)),
    filter(i => i),
    join(', ')
  )(addressData || {})
  const changeProfileLoading = changePhoneLoading || changeLoginLoading
 
  const [activeTab, setActiveTab] = useState(email == '1' || phoneNumber == '1' ? contacts : userProfile)
  const [loginEdit, setLoginEdit] = useState(false)
  const [emailEdit, setEmailEdit] = useState(false)
  const [phoneEdit, setPhoneEdit] = useState(false)
  const [innAlert, setInnAlert] = useState(!tinChecked)
  const [userInfoAlert, setUserInfoAlert] = useState(name.length==0)
  const [registrationAlert, setRegistrationAlert] = useState(true)
  const [modalState, setModalState] = useState(false)
  const [base64, setBase64] = useState('')
  const isUserProfileActive = activeTab === userProfile
  const isContactsActive = activeTab === contacts
  const isSettingsActive = activeTab === settings
  const hasSmsCodeSent = phoneEdit && changePhoneStatus === 0

  useEffect(() => {
    changedEmail && setEmailEdit(false)
  }, [changedEmail])

  useEffect(() => {
    changedPhoneNumber && setPhoneEdit(false)
  }, [changedPhoneNumber])

  useEffect(() => {
    changedLogin && setLoginEdit(false)
  }, [changedLogin])

  useEffect(()=>{
    onPersonalPhoto()
  },[])

  const onTabChange = tab => {
    setLoginEdit(false)
    setEmailEdit(false)
    setPhoneEdit(false)
    setActiveTab(tab)
  }

  const onPersonalDataRefresh = () => {
    dispatch(actions.personalDataRefresh())
  }

  const onPersonalPhoto = () => {
    dispatch(actions.personalPhoto({ pinfl: pinNumber }))
  }

  const onCloseInnAlert = () => setInnAlert(!innAlert)
  const onCloseUserInfoAlert = () => setUserInfoAlert(!userInfoAlert)
  const onCloseRegistationAlert = () => setRegistrationAlert(!registrationAlert)

  const onEmailEdit = item => {
    if (emailEdit) {
      const newEmail = prop('email', item)

      email !== newEmail ?
        dispatch(actions.changeEmail({ newMail: newEmail })) :
        toastr.error('', { component: <Locale id="same-email" /> })
    } else {
      item.preventDefault() & setEmailEdit(true)
    }
  }

  const onPhoneEdit = item => {
    if (phoneEdit) {
      const newPhoneNumber = prop('newPhoneNumber', item)

      phoneNumber !== newPhoneNumber ?
        dispatch(actions.changePhone({ newPhoneNumber })) :
        toastr.error('', { component: <Locale id="same-phone-numbers" /> })
    } else {
      item.preventDefault() & setPhoneEdit(true)
    }
  }

  const onPhoneEditSmsCheck = formValues => {
    dispatch(actions.changePhoneSmsCheck({
      newPhoneNumber,
      smsCode: +prop('smsCode', formValues)
    }))
  }

  const onLoginEdit = item => {
    if (loginEdit) {
      dispatch(actions.changeLogin(item))
    } else {
      item.preventDefault() & setLoginEdit(true)
    }
  }

  const onPasswordEdit = formValues => {
    dispatch(actions.changePassword(formValues))
  }

  const onProfileDelete = formValues => {
    //console.log(formValues)
  }

  
  return (
    <>
      <Header
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <div className={style.gradient} />
      {hasData && data && !isEmpty(data) && (
        isUserProfileActive ? (
          <UserProfile
            data={data}
            status={status}
            photo={photo}
            showInnAlert={innAlert}
            modalState={modalState}
            setModalState={setModalState}
            showUserInfoAlert={userInfoAlert}
            onCloseInnAlert={onCloseInnAlert}
            onCloseUserInfoAlert={onCloseUserInfoAlert}
            onPersonalDataRefresh={onPersonalDataRefresh}
            personalDataRefreshLoading={personalDataRefreshLoading}
          />
        ) : isContactsActive ? (
          <Contacts
            onEmailEdit={onEmailEdit}
            onPhoneEdit={onPhoneEdit}
            onPhoneEditSmsCheck={onPhoneEditSmsCheck}
            emailEdit={emailEdit}
            phoneEdit={phoneEdit}
            address={address}
            email={email}
            phone={phoneNumber}
            showAlert={registrationAlert}
            onCloseAlert={onCloseRegistationAlert}
            initialValues={{ email, newPhoneNumber: changedPhoneNumber || phoneNumber }}
            hasSmsCodeSent={hasSmsCodeSent}
            changeProfileLoading={changeProfileLoading}
            onPersonalDataRefresh={onPersonalDataRefresh}
            personalDataRefreshLoading={personalDataRefreshLoading}
          />
        ) : isSettingsActive && (
          <Settings
            initialValues={{ newLogin: login }}
            loginEdit={loginEdit}
            onLoginEdit={onLoginEdit}
            onPasswordEdit={onPasswordEdit}
            onProfileDelete={onProfileDelete}
            changeProfileLoading={changeProfileLoading}
          />
        )
      )}
    </>
  )
})
