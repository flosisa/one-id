import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { InputField } from 'Components/Form'
import validate from 'Components/Form/validate'
import { compose, prop } from 'ramda'
import clsx from 'clsx'
import Spinner from 'Components/Spinner/index.jsx'
import { injectIntl } from 'react-intl'
import Locale from 'Components/Locale'

import style from './index.scss'

const enhance = compose(
  reduxForm({
    validate,
    enableReinitialize: true
  }),
  injectIntl
)

export default enhance(({
  handleSubmit,
  onSubmit,
  profileEdit,
  submitFailed,
  invalid,
  formField: { name, label, type, maxLength },
  changeProfileLoading,
  loginEdit,
  error,
  intl
}) => (
  <form className={clsx(style.changeProfile, name === 'newLogin' && style.changeLogin)}>
    <Field
      name={name}
      type={type || 'text'}
      component={InputField}
      label={label}
      autoFocus={true}
      disabled={!profileEdit}
      maxLength={maxLength}
      errorText={(prop('code', error) === 1997 || prop('code', error) === 1998) && prop('message', error)}
    />
    {name === 'newLogin' && loginEdit && (
      <Field
        name="password"
        type="password"
        component={InputField}
        label={intl.formatMessage({ id: 'password' })}
        info={intl.formatMessage({ id: 'login-change-info' })}
        disabled={!profileEdit}
        errorText={prop('code', error) === 1999 && prop('message', error)}
      />
    )}
    <div className={style.action}>
      {changeProfileLoading && <Spinner />}
      <button
        type="submit"
        disabled={submitFailed && invalid}
        className="secondary"
        onClick={profileEdit ? handleSubmit(onSubmit) : onSubmit}
      >
        <Locale id="change" />
      </button>
    </div>
  </form>
))
