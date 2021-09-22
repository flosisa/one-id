import React from 'react'
import ContinueAs from './ContinueAs.jsx'
import Locale from 'Components/Locale'
import Spinner from '../Spinner/index.jsx'

import style from './index.scss'

export default ({ setActiveEntity, onUpdateEntity, activeEntity, entities }) => (
  <div className={style.authVia}>
    <span><Locale id="auth-via" /></span>
    <div className={style.mainLogo}>
      <img src="/assets/svg/logo.svg" alt="logo" />
      <img src="/assets/svg/beta.svg" alt="beta" />
    </div>
    {entities ? (
      <ContinueAs
        activeEntity={activeEntity}
        setActiveEntity={setActiveEntity}
        onUpdateEntity={onUpdateEntity}
        entities={entities}
      />
    ) : (
        <Spinner white={true} />
      )}
  </div>
)
