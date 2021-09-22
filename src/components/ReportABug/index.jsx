import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextareaField } from '../Form'
import formNames from '../Form/validate/formNames'
import validate from '../Form/validate'
import { compose } from 'ramda'
import Locale from 'Components/Locale'
import { injectIntl } from 'react-intl'

import style from './index.scss'

const enhance = compose(
  reduxForm({
    form: formNames.reportABug,
    validate,
  }),
  injectIntl
)

export default enhance(({ handleSubmit, submitFailed, invalid, intl }) => (
  <form onSubmit={handleSubmit} className={style.reportABug}>
    <p><Locale id="report-a-bug" /></p>
    <Field
      name="description"
      component={TextareaField}
      label={intl.formatMessage({ id: 'report-a-bug-desc' })}
      autoFocus={true}
      maxLength={200}
    />
    <button type="submit" disabled={submitFailed && invalid}><Locale id="send" /></button>
  </form>
))
