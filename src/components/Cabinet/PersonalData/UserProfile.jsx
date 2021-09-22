import React from 'react'
import Spinner from 'Components/Spinner/index.jsx'
import getPersonalData from 'Util/getPersonalData'
import Locale from 'Components/Locale'
import { compose,isEmpty } from 'ramda'
import formNames from 'Components/Form/validate/formNames'
import { reduxForm, Field } from 'redux-form'
import validate from 'Components/Form/validate'
import { injectIntl } from 'react-intl'
import { InputField } from 'Components/Form'
import { genericPersonalData } from 'Constants/cabinet'
import Alert from 'Components/Alert/index.jsx'
import style from './index.scss'
import Modal from '../../Modal/index.jsx'
import clsx from 'clsx'
const personalDataFields = [
  [
    { label: <Locale id="pinfl" />, key: 'pinfl' },
    { label: <Locale id="passport" />, key: 'document' },
    { label: <Locale id="inn" />, key: 'tin' },
  ],
  ...genericPersonalData
]


const enhance = compose(
  reduxForm({
    form: formNames.entity,
    validate,
  }),
  injectIntl
)

export default enhance(({ data, status, photo, showInnAlert, modalState, setModalState,showUserInfoAlert, onCloseInnAlert, onCloseUserInfoAlert, onPersonalDataRefresh, personalDataRefreshLoading, intl }) => {
 
  return(
    <div className={style.userProfile}>
      { showInnAlert && <Alert closeAlert={onCloseInnAlert} localeId="alert-error" localeIdBase="alert-base"/>}
      { showUserInfoAlert && <Alert closeAlert={onCloseUserInfoAlert} localeId="alert-user-info"/>}
      {modalState && (
          <Modal
            id="p-r"
            modalState={modalState}
            toggle={() => setModalState(false)}>
            <form>
              <div className={style.changePassportName}>
                <div>{intl.formatMessage({ id: 'change-passport-seria-number' })}</div>
                <div className={style.changePassportNameBox}>
                  <Field
                    name="passSeriaNumber"
                    containerClassName={style.passportChangeField}
                    type="text"
                    component={InputField}
                    label={intl.formatMessage({ id: 'new-passport-seria-number' })}
                    maxLength={9}
                    autoFocus={true}
                  />
                  <button type="submit"><Locale id="change-seria-number" /></button>
                </div>
                <div><Alert localeId="change-password-number-success" svgWidth="31" className={style.changePasswordAlertSuccess} /></div> 
              </div>
            </form>
          </Modal>
        )}
    
      <div className={clsx(style.userProfileColumn, photo && style.userProfileColumnPhoto)}>
        {photo && <div className={style.userProfileAvatar}><img className={style.img} src={`data:image/jpeg;base64,${photo}`}/></div> }
        {status && status.code===999 &&
        <Alert closeAlert={onCloseInnAlert} localeId="refresh_data_error" className={style.changePasswordAlertError}/>}
        {/* <div className={style.errorMessage}>{status.message}</div> */}
        <div className={style.userProfileData}>{getPersonalData(data, !isEmpty(data) && personalDataFields, style.userProfileDataItem, null, setModalState)}</div>
      </div>
      <div className={clsx(style.action, photo && style.actionPhoto)}>
        {personalDataRefreshLoading && <Spinner width={20} />}
            <button
              type="button"
              className="secondary"
              onClick={onPersonalDataRefresh}
              disabled={personalDataRefreshLoading}>
              <Locale id="reload_info" />
            </button>
          </div>
    </div>
    )
  }
) 


/*
  <Alert  localeId="alert-error" localeIdBase="alert-base"/>
*/