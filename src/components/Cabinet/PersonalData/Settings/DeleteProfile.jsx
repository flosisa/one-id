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
    form: formNames.deleteProfile,
    validate
  }),
  injectIntl
)

export default enhance(({ handleSubmit, submitFailed, invalid, intl }) => (
  <form onSubmit={handleSubmit} className={style.deleteProfile}>
    <p className={style.innerHeader}><Locale id="delete_profile" /></p>
    <p className={style.warn}><Locale id="not_able_to_enter_esi" /></p>
    <span><Locale id="warning_delete_account" /></span>
    <div className={style.deleteAction}>
      <Field
        name="password"
        type="password"
        component={InputField}
        label={intl.formatMessage({ id: 'current_password' })}
        maxLength={40}
      />
      <button
        type="submit"
        disabled={submitFailed && invalid}
        className="secondary warn"
      >
        <Locale id="delete" />
      </button>
    </div>
  </form>
))
