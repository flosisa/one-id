import React from 'react'
import { Field } from 'redux-form'
import { InputField } from '../Form'
import Locale from 'Components/Locale'
import { injectIntl } from 'react-intl'

import style from './index.scss'

export default injectIntl(({ timer, onSmsAsk, error, intl }) => (
  <div id="sms-code-sent" className={style.smsCodeSent}>
    <p><Locale id="sms_to_phone" /></p>
    <div className={style.smsCodeSentBlock}>
      <Field
        name="smsCode"
        type="number"
        component={InputField}
        label={intl.formatMessage({ id: 'sms-code' })}
        className={style.inputWidth}
        containerClassName={style.noMargin}
        maxLength={6}
        errorText={error}
      />
      <p><Locale id="sms_time" values={{ timer: `00:${timer < 10 ? '0' : ''}${timer}` }} /></p>
      <button
        type="button"
        className="secondary"
        disabled={timer !== 0}
        onClick={onSmsAsk}
      >
        <Locale id="resend" />
      </button>
    </div>
  </div>
))
