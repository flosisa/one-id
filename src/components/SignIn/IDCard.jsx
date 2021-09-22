import React from 'react'
import style from './index.scss'
import { compose } from 'ramda'
import { InputField } from '../Form'
import { reduxForm, Field } from 'redux-form'
import { injectIntl } from 'react-intl'
import formNames from '../Form/validate/formNames'
import validate from '../Form/validate'
import Locale from 'Components/Locale'


const enhance = compose(
  reduxForm({
    form: formNames.signIn,
    validate,
  }),
  injectIntl
)


export default enhance(({ handleSubmit, intl }) => (
    <div className={style.idCardContainer}>
        <form onSubmit={handleSubmit}>
          <p className={style.headerText}>Данный способ входа доступен только после получения ID-карты.</p>
          <div className={style.fields}>
            <Field
              name="login"
              type="number"
              component={InputField}
              className={style.signInInput}
              label={intl.formatMessage({ id: 'pinfl' })}
              autoFocus={true}
              maxLength={14}
              />
            <Field
              name="password"
              type="password"
              component={InputField}
              className={style.signInInput}
              autoComplete="new-password"
              label={intl.formatMessage({ id: 'password' })}
              maxLength={40}
              />
          </div>
          <p className={style.headerText}>Пароль совпадает с паролем от ЭЦП и был выслан через СМС. Если пароль не был получен, можно заново зарегистрироваться в системе.</p>
          <div className={style.action}>
            <button type="submit"><Locale id="ent" /></button>
          </div>
        </form>
    </div>
  )
)
