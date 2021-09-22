import React from 'react'
import SystemDesc from './SystemDesc.jsx'
import Locale from 'Components/Locale'
import style from './index.scss'

export default ({ locale, showAlert, closeAlert}) => (
  <div className={style.main}>
    <SystemDesc locale={locale} showAlert={showAlert} closeAlert={closeAlert} />
    <hr />
   <div className={style.connectedResources}>
      <p className={style.header}><Locale id="list_of_resource" /></p>
      <a href={process.env.MIN_MYGOV} target="_blank" rel="noopener noreferrer" className={style.resource}>
        <span to="#">Единый портал интерактивных государственных услуг</span>
        <img src="/assets/img/uni-portal.png" alt="uni-portal" />
      </a>
      <a href={process.env.MIN_PUBLIC} target="_blank" rel="noopener noreferrer" className={style.resource}>
        <span to="#">Портал общественного мнения</span>
        <img src="/assets/img/gen-opinion.png" alt="gen-opinion" />
      </a>
      <a href={process.env.MIN_PRESIDENT} target="_blank" rel="noopener noreferrer" className={style.resource}>
        <span to="#">Виртуальная приемная Президента Республики Узбекистан</span>
        <img src="/assets/img/state.png" alt="president-cab" />
      </a>
      <a href={process.env.MIN_PROJECT} target="_blank" rel="noopener noreferrer" className={style.resource}>
        <span to="#">Обсуждение проектов нормативно-правовых документов Республики Узбекистан</span>
        <img src="/assets/img/state.png" alt="reg-docs" />
      </a>
      <button className="secondary">
        Все подключенные к системе сайты
      </button>
    </div>
  </div>
)
