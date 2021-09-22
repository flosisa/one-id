import React from 'react'
import ChangeProfile from '../ChangeProfile.jsx'
import formNames from 'Components/Form/validate/formNames'
import { reduxForm, Field } from 'redux-form'
import { InputField } from 'Components/Form'
import validate from 'Components/Form/validate'
import { compose } from 'ramda'
import Locale from 'Components/Locale'
import Alert from './../../../Alert/index.jsx'
import { injectIntl } from 'react-intl'
import Spinner from 'Components/Spinner/index.jsx'

import style from '../index.scss'

const enhance = compose(
  reduxForm({
    form: formNames.changePhoneSmsCheck,
    validate
  }),
  injectIntl
)

export default enhance(({
  emailEdit,
  phoneEdit,
  onEmailEdit,
  onPhoneEdit,
  onCloseAlert,
  initialValues,
  address,
  showAlert,
  hasSmsCodeSent,
  submitFailed,
  invalid,
  changeProfileLoading,
  handleSubmit,
  onPhoneEditSmsCheck,
  intl,
  email,
  phone,
  onPersonalDataRefresh,
  personalDataRefreshLoading
}) => (
  <div className={style.contacts}>
    <div className={style.address}>
      <p><Locale id="registration-address" /></p>
      <p>{address}</p>
      {personalDataRefreshLoading && <Spinner width={20} />}
      <button
            type="button"
            className="secondary"
            onClick={onPersonalDataRefresh}
            disabled={personalDataRefreshLoading}>
            <Locale id="reload_info" />
       </button>
      {showAlert && <Alert className={style.registrationAlert} localeId="alert-registration" closeAlert={onCloseAlert}/>}
    </div>
    <hr />
    {(email == '1' || phone == '1') && (<div className={style.alertUsers}>
      <p className={style.warn}><Locale id="add_your_phone_or_email" /></p>
    </div>)
    }
    <ChangeProfile
      profileEdit={emailEdit}
      onSubmit={onEmailEdit}
      form={formNames.changeEmail}
      formField={{ name: 'email', label: intl.formatMessage({ id: 'email' }), maxLength: 40 }}
      initialValues={initialValues}
    />
    <ChangeProfile
      profileEdit={phoneEdit}
      onSubmit={onPhoneEdit}
      form={formNames.changePhone}
      formField={{ name: 'newPhoneNumber', label: intl.formatMessage({ id: 'phone' }), maxLength: 13 }}
      initialValues={initialValues}
      changeProfileLoading={changeProfileLoading}
    />
    {hasSmsCodeSent && (
      <form onSubmit={handleSubmit(onPhoneEditSmsCheck)}>
        <Field
          name="smsCode"
          type="text"
          component={InputField}
          label="Код из SMS"
          className={style.inputWidth}
          containerClassName={style.noMargin}
          maxLength={6}
        />
        <button
          type="submit"
          disabled={submitFailed && invalid}
        >
          <Locale id="change" />
        </button>
      </form>
    )}
  </div>
  )
)
