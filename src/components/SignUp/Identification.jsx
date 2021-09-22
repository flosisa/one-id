import React from 'react'
import SmsCodeSent from './SmsCodeSent.jsx'
import Spinner from '../Spinner/index.jsx'
import { reduxForm, Field } from 'redux-form'
import { InputField, DateField } from '../Form'
import formNames from '../Form/validate/formNames'
import validate from '../Form/validate'
import { compose } from 'ramda'
import Locale from 'Components/Locale'
import { injectIntl } from 'react-intl'
import style from './index.scss'
import Tooltip from 'Components/Tooltip/index.jsx'

const enhance = compose(
  reduxForm({
    form: formNames.signUp,
    validate
  }),
  injectIntl
)

export default enhance(({
  handleSubmit,
  invalid,
  showAlert,
  submitFailed,
  smsAskLoading,
  smsCheckLoading,
  isPinflCheckSucceeded,
  isPinflAlreadyHas,
  message,
  onSmsCheck,
  hasSmsCodeSent,
  unknownPinfl,
  timer,
  error,
  smsAsk,
  onSmsAsk,
  isIdentificationSucceeded,
  intl,
  locale,
  isCheckPassportBirthDateSucceeded,
  isCheckPassportBirthDateFailed,
  checkPassportBirthDateMessage,
  closeAlert
}) => (
  <div className={style.identification}>
    <form onSubmit={handleSubmit(onSmsAsk)}>
      <div className={style.identificationFields}>
        <div>
          <Field
            name="pinfl"
            type="number"
            component={InputField}
            label={intl.formatMessage({ id: 'pinfl' })}
            autoFocus={true}
            errorText={(unknownPinfl || isPinflAlreadyHas) && message}
            maxLength={14}
            disabled={hasSmsCodeSent}
          />
          <Field
            name="passSeriaNumber"
            type="text"
            component={InputField}
            label={intl.formatMessage({ id: 'passport' })}
            errorText={unknownPinfl}
            maxLength={10}
            disabled={hasSmsCodeSent}
          />
          <Field
            name="dateOfBirth"
            component={DateField}
            label={intl.formatMessage({ id: 'date-of-birth' })}
            errorText={isCheckPassportBirthDateFailed && checkPassportBirthDateMessage}
            disabled={hasSmsCodeSent}
            locale={locale}
          />
          <Field
            name="email"
            type="text"
            component={InputField}
            label={intl.formatMessage({ id: 'email' })}
            maxLength={40}
            disabled={hasSmsCodeSent}
          />
          <p>
            <Locale id="reg_phone_desc" />
          </p>
          <Field
            name="phoneNumber"
            type="tel"
            component={InputField}
            label={intl.formatMessage({ id: 'phone' })}
            containerClassName={style.marginTop}
            maxLength={17}
            disabled={hasSmsCodeSent}
          />
        </div>
        <img src={`/assets/img/passport-${locale}.jpg`} alt="passport" />
      </div>
      {!hasSmsCodeSent ? (
        smsAskLoading ? (
          <div className={style.smsCodeSending}>
            <span><Locale id="processing" /></span>
            <Spinner />
          </div>
        ) : (
            <div className={style.errorLocale}>
              <button
                type="submit"
                disabled={!isPinflCheckSucceeded || !isCheckPassportBirthDateSucceeded || (submitFailed && invalid)}
                className="secondary"
              >
                <Locale id="reg_sms" />
              </button>
              {smsAsk && <Tooltip className={style.errorTooltip} content={<Locale id="error-register-pinfl" />} />}
            </div>
          )
      ) : (
          <div className={style.smsCodeSent}>
            <SmsCodeSent
              timer={timer}
              onSmsAsk={onSmsAsk}
              error={error}
            />
            <div className={style.submit}>
              <p><Locale id="reg_confirm_next_desc" /></p>
              {smsCheckLoading && <Spinner />}
              {!isIdentificationSucceeded && (
                <button
                  type="submit"
                  disabled={!hasSmsCodeSent || (submitFailed && invalid)}
                  onClick={handleSubmit(onSmsCheck)}
                >
                  <Locale id="next" />
                </button>
              )}
            </div>
          </div>
        )}
    </form>
  </div>
))
