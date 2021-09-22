import React from 'react'
import Spinner from '../Spinner/index.jsx'
import getPersonalData from 'Util/getPersonalData'
import { reduxForm, Field } from 'redux-form'
import { InputField } from 'Components/Form'
import formNames from 'Components/Form/validate/formNames'
import validate from 'Components/Form/validate'
import { compose, addIndex, map, length } from 'ramda'
import Locale from 'Components/Locale'
import { injectIntl } from 'react-intl'
import { genericPersonalData } from 'Constants/cabinet'

import style from './index.scss'

const enhance = compose(
  reduxForm({
    form: formNames.signUp,
    validate,
    enableReinitialize: true,
  }),
  injectIntl
)

export default enhance(({
  handleSubmit,
  submitFailed,
  invalid,
  personalData,
  error,
  signUpLoading,
  loginGenerateData,
  setLogin,
  passwordGenerateData,
  passwordGenerateLoading,
  onPasswordGenerate,
  intl
}) => (
  <div className={style.creation}>
    <div className={style.personalData}>
      <p>
        <Locale id="p_info" />
      </p>
      <span>
        <Locale id="auto_recieve_info" />
      </span>
    </div>
    {getPersonalData(personalData, genericPersonalData)}
    <hr />
    <form
      onSubmit={handleSubmit}
      className={style.creationForm}
    >
      <p><Locale id="new_acc_info" /></p>
      <div>
        <div className={style.login}>
          <Field
            name="login"
            type="text"
            component={InputField}
            label={intl.formatMessage({ id: 'login' })}
            autoFocus={true}
            errorText={error}
            maxLength={40}
          />
          <div className={style.loginOptionsContainer}>
            <p><Locale id="login-generate" /></p>
            <div className={style.loginOptions}>
              {addIndex(map)((login, i) => (
                <div key={i}>
                  <span onClick={() => setLogin(login)}>{login}</span>
                  {i !== length(loginGenerateData || []) - 1 && <span>,</span>}
                </div>
              ))(loginGenerateData || [])}
            </div>
          </div>
        </div>
        <div className={style.password}>
          <Field
            name="password"
            type="password"
            component={InputField}
            label={intl.formatMessage({ id: 'password' })}
            maxLength={40}
            autoComplete="new-password"
            initialValue={passwordGenerateData}
          />
          {passwordGenerateLoading && <Spinner />}
          <button
            type="button"
            onClick={onPasswordGenerate}
            className="secondary"
          >
            <Locale id="create_password" />
          </button>
        </div>
        <Field
          name="confirmPassword"
          type="password"
          component={InputField}
          label={intl.formatMessage({ id: 'repeat_password' })}
          maxLength={40}
          autoComplete="new-password"
          initialValue={passwordGenerateData}
        />
      </div>
      <div className={style.action}>
        {signUpLoading && <Spinner width="2.375rem" />}
        <button
          type="submit"
          disabled={submitFailed && invalid}
        >
          <Locale id="m_register" />
        </button>
      </div>
    </form>
  </div>
))
