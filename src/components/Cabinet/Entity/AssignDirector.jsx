import React from 'react'
import { compose } from 'ramda'
import { reduxForm, Field } from 'redux-form'
import formNames from 'Components/Form/validate/formNames'
import validate from 'Components/Form/validate'
import { InputField } from 'Components/Form'
import Spinner from 'Components/Spinner/index.jsx'
import { injectIntl } from 'react-intl'
import Locale from 'Components/Locale'

import style from './index.scss'

const enhance = compose(
  reduxForm({
    form: formNames.entity,
    validate,
  }),
  injectIntl
)

export default enhance(({ handleSubmit, invalid, submitFailed, error, loading, intl }) => (
  <form onSubmit={handleSubmit} className={style.assignDirector}>
    <Field
      name="tin"
      type="text"
      component={InputField}
      label={intl.formatMessage({ id: 'inn_entity' })}
      maxLength={9}
      autoFocus={true}
      errorText={error}
    />
    <div className={style.action}>
      {loading && <Spinner />}
      <button
        type="submit"
        disabled={submitFailed && invalid}
      >
        <Locale id="add" />
      </button>
    </div>
  </form>
))
