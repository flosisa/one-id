import React from 'react'
import ChangeProfile from '../ChangeProfile.jsx'
import ChangePassword from './ChangePassword.jsx'
import DeleteProfile from './DeleteProfile.jsx'
import formNames from 'Components/Form/validate/formNames'
import { injectIntl } from 'react-intl'

import style from '../index.scss'

export default injectIntl(({ loginEdit, onLoginEdit, onPasswordEdit, onProfileDelete, initialValues, changeProfileLoading, intl }) => (
  <div className={style.settings}>
    <ChangeProfile
      profileEdit={loginEdit}
      onSubmit={onLoginEdit}
      form={formNames.changeLogin}
      formField={{ name: 'newLogin', label: intl.formatMessage({ id: 'login' }) }}
      initialValues={initialValues}
      maxLength={40}
      loginEdit={loginEdit}
      changeProfileLoading={changeProfileLoading}
    />
    <hr />
    <ChangePassword onSubmit={onPasswordEdit} />
    <hr />
    <DeleteProfile onSubmit={onProfileDelete} />
  </div>
))
