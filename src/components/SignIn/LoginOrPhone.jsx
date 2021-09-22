import React from 'react'
import Spinner from '../Spinner/index.jsx'
import { reduxForm, Field } from 'redux-form'
import { InputField } from '../Form'
import formNames from '../Form/validate/formNames'
import validate from '../Form/validate'
import { compose } from 'ramda'
import Locale from 'Components/Locale'
import { injectIntl } from 'react-intl'

import style from './index.scss'

const enhance = compose(
  reduxForm({
    form: formNames.signIn,
    validate,
  }),
  injectIntl
)

const error2 = true
export default enhance(({ handleSubmit, success, errorMessage, setModalState, submitFailed, invalid, error, signInLoading, intl }) => (
    <div className={style.loginOrPhone}>
      <form onSubmit={handleSubmit}>
        <div className={style.fields}>
          <Field
            name="login"
            type="text"
            component={InputField}
            className={style.signInInput}
            label={intl.formatMessage({ id: 'login' })}
            autoFocus={true}
            errorText={!!errorMessage}
            maxLength={40}
          />
          <Field
            name="password"
            type="password"
            component={InputField}
            className={style.signInInput}
            label={intl.formatMessage({ id: 'password' })}
            errorText={errorMessage}
            maxLength={40}
          />
        </div>
        <div className={style.actions}>
          <div className={style.action}>
            {signInLoading && <Spinner width={20} />}
            <button type="submit" disabled={submitFailed && invalid}><Locale id="ent" /></button>
          </div>
          <div className={style.forgot}>
            <Locale id="forgot" link={{ to: "#", onClick: () => setModalState(true) }} />
            <span>?</span>
          </div>
        </div>
      </form>
    </div>
  ))
