import React from 'react'
import Spinner from '../Spinner/index.jsx'
import { isEmpty, map, propEq, replace } from 'ramda'
import Locale from 'Components/Locale'
import clsx from 'clsx'
import style from './index.scss'

export default ({
  isCabinetAuthenticity,
  isCabinetEntity,
  certs,
  cert,
  onCertClick,
  setTargetName,
  checkSignature,
  spinnerHeight,
  siganture,
  loading,
  onChange,
  setOpen,
  prompt,
  open,
  value,
  isSignatureInvalid,
  uncoveredInvalidCerts,
  setUncoveredInvalidCerts,
}) => {
  return (
    <div className={style.container}>
      <div id="digital-sign" className={style.digitalSign}>
        <div className={style.content}>
          <div className={style.innerContainer}>
            <div className={style.headerText}>Сервис проверки ЭЦП</div>
              
              <div className={style.dropdown}>
              <div className={style.control} onClick={() => setOpen(prev => !prev)}>
                <div className={style.selectedValue}>
                  {value ? `${value.cn}` : prompt}
                </div>
                <div className={clsx(style.arrow, open && style.open)}></div>
              </div>
              <div className={clsx(style.options, open && style.open)}>
                {certs && map(({ name, newAlias: { uid, cn, businesscategory, validfrom, validto } }) => {
                      let selectedData = {uid,cn}
                      const validFrom = Date.parse( replace(/\./g, " ", validfrom || ""))
                      const validTo = Date.parse(replace(/\./g, " ", validto || ""))
                      const currentTime = new Date().getTime()
                      let valid

                      if (validFrom <= currentTime && currentTime <= validTo) {
                         valid = true
                       }
                    return (
                      <div
                        className={clsx(style.option)}
                        onClick={() => {
                          onChange(selectedData)
                          setTargetName(name)
                          setOpen(false)
                        }}>
                        <div key={uid} className={style.dropDownContainer}>
                          <div>
                            <b>№ СЕРТИФИКАТА:</b> {name} 
                          </div>
                          <div>
                            <b>СТАТУС:</b> {businesscategory ? 'ЮРИДИЧЕСКОЕ ЛИЦО':'ФИЗИЧЕСКОЕ ЛИЦО'}
                          </div>
                          <div>
                            <b>ИНН:</b> {uid}
                          </div>
                          <div>
                            <b>Ф.И.О:</b> {cn}
                          </div>
                          <div>
                            <b>Срок действия: </b>
                            <span className={clsx(!valid && style.notValidDate)}>{validto.slice(0,10)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })(certs)}
              </div>
            </div>
           <button onClick={checkSignature}>Проверить</button>
            
            {siganture &&
              map(({ name, newAlias: { uid, validfrom, validto } }) => {
                const validFrom = Date.parse(
                  replace(/\./g, " ", validfrom || "")
                )
                const validTo = Date.parse(replace(/\./g, " ", validto || ""))
                const currentTime = new Date().getTime()
                let valid
                if (validFrom <= currentTime && currentTime <= validTo) {
                  valid = true
                }
                return (
                  <div key={uid} value={name}>
                    <Locale id={"status"}/>: {<Locale id={(valid && "status_active") || "status_not_active"}/>}
                  </div>
                )
              })(siganture)}

          </div>
        </div>
        {propEq("type", "error", certs || {}) ? (
          <div id="cert-container" className={style.install}>
            <p>
              <Locale
                id="install_imzo"
                link={{
                  href: "https://e-imzo.uz/main/downloads",
                  target: "_blank",
                }}
                values={{ br: <br /> }}
              />
            </p>
            <p>
              <Locale
                id="learn_install_imzo"
                link={{
                  href: "https://e-imzo.uz/#instructions",
                  target: "_blank",
                }}
                values={{ br: <br /> }}
              />
            </p>
          </div>
        ) : isEmpty(certs) ? (
          <div id="cert-container" className={style.digitalSignNotFound}>
            <p>
              <Locale id="brawser_error_imzo" />
            </p>
            <p className={style.indent}>
              <span>1</span>
              <Locale id="1_ids_keys" />
            </p>
            <p className={style.indent}>
              <span>2</span>
              <Locale id="2_antivirus" />
            </p>
            <p className={style.indent}>
              <span>3</span>
              <Locale id="3_korporativ" />
            </p>
            {isCabinetAuthenticity && (
              <p className={style.indent}>
                <span>4</span>
                <Locale id="4_use-your-own" />
              </p>
            )}
            <p>
              <Locale
                id="learn_instruction_imzo"
                link={{
                  href: "https://e-imzo.uz/#instructions",
                  target: "_blank",
                }}
              />
            </p>
          </div>
        ) : (
          <div id="cert-container">
            {certs ? <div /> : <Spinner height={spinnerHeight} />}
          </div>
        )}
      </div>
    </div>
  )
    }
