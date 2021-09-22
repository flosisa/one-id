import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { CheckboxField } from '../Form'
import formNames from '../Form/validate/formNames'
import { compose } from 'ramda'
import Locale from 'Components/Locale'
import Svg from 'Components/Svg/index.jsx'
import style from './index.scss'

const enhance = compose(
  reduxForm({
    form: formNames.userAgreement,
  }),
)



export default enhance(({ userAgreement, locale, onReadAgreement, onUserAgreement }) => (
  <div className={style.agreement}>
    <img src="/assets/img/avatar.png" alt="avatar" />
    <div className={style.container}>
      <p className={style.agreementTitle}><Locale id="reg" /></p>
      <p className={style.label}><Locale id="reg_sub_title" /></p>
      <p className={style.desc}><Locale id="auth_title_desc" /></p>
      <p className={style.info}>
        <Locale id="reg_ent_passport_details" />
      </p>
      <form>
        <div className={style.userAgreement}>
          <Field
            name="userAgreement"
            component={CheckboxField}
          />
          <span><Locale id="reg_privacy" link={{ to: "#", onClick: onReadAgreement }} /></span>
         
        </div>
        <div className={style.agreementButton}>
          <button
            type="button"
            disabled={!userAgreement}
            onClick={onUserAgreement}
          >
            <Locale id="m_register" />
          </button>
          
        </div>
        <div/>
        <div className={style.instructionButton}>
          <div className={style.textInstruction}><Svg  name="text-instruction" /><Locale id="instruction-link" link={{ href: `https://my.gov.uz/${locale === 'ru' ? 'ru' : 'uz'}/pages/instruction-ind?new=1`, target:"_blank" }} /></div>
          <div className={style.videoInstruction}><Svg name="video-instruction"/><Locale id="how-to-register" link={{ href:'https://www.youtube.com/watch?v=NnIOnwodeIs', target:'_blank' }} /></div>
        </div>
      </form>
    </div>
  </div>
))
