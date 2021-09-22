import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { InputField } from 'Components/Form'
import formNames from 'Components/Form/validate/formNames'
import validate from 'Components/Form/validate'
import { compose } from 'ramda'
import { injectIntl } from 'react-intl'
import Locale from 'Components/Locale'

import style from '../index.scss'

const enhance = compose(
  reduxForm({
    form: formNames.changePassword,
    validate
  }),
  injectIntl
)

export default enhance(({ handleSubmit, submitFailed, invalid, error, intl }) => (
  <form onSubmit={handleSubmit}>
    <p className={style.innerHeader}> <Locale id="change_password" /></p>
    <Field
      name="oldPassword"
      type="password"
      component={InputField}
      label={intl.formatMessage({ id: 'current_password' })}
      maxLength={40}
      errorText={error}
    />
    <div className={style.changePassword}>
      <Field
        name="newPassword"
        type="password"
        component={InputField}
        label={intl.formatMessage({ id: 'new_password' })}
        maxLength={40}
      />
      <Field
        name="confirmPassword"
        type="password"
        component={InputField}
        label={intl.formatMessage({ id: 'confirm_new_password' })}
        maxLength={40}
      />
    </div>
    <button
      type="submit"
      disabled={submitFailed && invalid}
    >
      <Locale id="save_changes" />
    </button>
  </form>
))
