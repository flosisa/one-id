import React from 'react'
import Captcha from '../Captcha/index.jsx'
import { reduxForm, Field } from 'redux-form'
import { InputField } from '../Form'
import formNames from '../Form/validate/formNames'
import validate from '../Form/validate'
import { compose } from 'ramda'
import Spinner from '../Spinner/index.jsx'
import Locale from 'Components/Locale'
import { injectIntl } from 'react-intl'

import style from './index.scss'

const enhance = compose(
  reduxForm({
    form: formNames.passwordReset,
    validate,
  }),
  injectIntl
)

export default enhance(({
  handleSubmit,
  onSubmit,
  loading,
  captchaCode,
  setCaptchaCode,
  submitFailed,
  invalid,
  intl,
  data,
  isPasswordResetSuccess,
  hasDataNotFound,
  onPasswordResetModalToggle,
  error
}) =>(
  <form onSubmit={handleSubmit} className={style.passwordReset}>
    {isPasswordResetSuccess ? (
      <>
        <p><Locale id="password-send-to" /></p>
        <div className={style.passwordResetResponse}>
          <span>На телефон: <b>{data.phone}</b></span>
          <span>и на электронную почту: <b>{data.email}</b></span>
        </div>
      </>
    ) : hasDataNotFound ? (
      <>
        <p><Locale id="password-reset-title-b" /></p>
        <span><Locale id="password-reset-msg-b" /></span>
      </>
    ) : !hasDataNotFound && !isPasswordResetSuccess && (
      <>
        <p><Locale id="password-reset" /></p>
        <Field
          name="pinfl"
          type="number"
          component={InputField}
          label={intl.formatMessage({ id: 'pinfl' })}
          autoFocus={true}
          maxLength={14}
          errorText={error}
        />
        <Field
          name="passSeriaNumber"
          type="text"
          component={InputField}
          label={intl.formatMessage({ id: 'passport' })}
          maxLength={10}
          errorText={!!error}
        />
        <div className={style.captchaCode}>
          <Field
            name="captchaCode"
            type="text"
            component={InputField}
            label={intl.formatMessage({ id: 'captchaCode' })}
            className={style.inputWidth}
            maxLength={5}
          />
          <Captcha
            captchaCode={captchaCode}
            setCaptchaCode={setCaptchaCode}
            error={error}
          />
        </div>
      </>
    )}
    <div className={style.action}>
      {loading && <Spinner width={20} />}
      <button
        type="submit"
        disabled={submitFailed && invalid}
        onClick={(isPasswordResetSuccess || hasDataNotFound) ? onPasswordResetModalToggle : handleSubmit(onSubmit)}
      >
        {isPasswordResetSuccess ? 'Закрыть' : hasDataNotFound ? 'Зарегистрироваться' : <Locale id="reg_reestablish" />}
      </button>
    </div>
  </form>
  ))
