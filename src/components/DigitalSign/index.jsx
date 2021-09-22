import React from 'react'
import Spinner from '../Spinner/index.jsx'
import Svg from '../Svg/index.jsx'
import getPersonalData from 'Util/getPersonalData'
import { mergeRight, split, isEmpty, addIndex, map, propEq, includes, replace } from 'ramda'
import Locale from 'Components/Locale'

import style from './index.scss'

const digitalSignFields = [
  [
    { label: <Locale id="pinfl" />, key: '1.2.860.3.16.1.2', id: 'pinfl'},
    { label: <Locale id="inn" />, key: 'uid' }
   
  ],
  [
    { label: <Locale id="org" />, key: 'o' },
    { label: <Locale id="type_of_ownership" />, key: 'businesscategory' },
  ],
  [
    { label: <Locale id="cert-serial" />, key: 'serialNumber' },
    { label: <Locale id="cert-expiration" />, key: 'expirationDate' },
  ]
]

export default ({
  isCabinetAuthenticity,
  isCabinetEntity,
  certs,
  cert,
  onCertClick,
  onRefresh,
  spinnerHeight,
  loading,
  isSignatureInvalid,
  uncoveredInvalidCerts,
  setUncoveredInvalidCerts,
}) => (
  <div id="digital-sign" className={style.digitalSign}>
    {
      propEq('type', 'error', certs || {}) ? (
        <div id="cert-container" className={style.install}>
          <p>
            <Locale id="install_imzo" link={{ href: "https://e-imzo.uz/main/downloads", target: "_blank" }} values={{ br: <br /> }} />
          </p>
          <p>
            <Locale id="learn_install_imzo" link={{ href: "https://e-imzo.uz/#instructions", target: "_blank" }} values={{ br: <br /> }} />
          </p>
        </div>
      ) : isEmpty(certs) ? (
        <div id="cert-container" className={style.digitalSignNotFound}>
          <p><Locale id="brawser_error_imzo" /></p>
          <p className={style.indent}><span>1</span><Locale id="1_ids_keys" /></p>
          <p className={style.indent}><span>2</span><Locale id="2_antivirus" /></p>
          <p className={style.indent}><span>3</span><Locale id="3_korporativ" /></p>
          {isCabinetAuthenticity && <p className={style.indent}><span>4</span><Locale id="4_use-your-own" /></p>}
          <p>
            <Locale id="learn_instruction_imzo" link={{ href: "https://e-imzo.uz/#instructions", target: "_blank" }} />
          </p>
        </div>
      ) : (
            <div id="cert-container">
              {
                certs ? (
                  <div className={style.certContainer}>
                    {!isCabinetAuthenticity && !isCabinetEntity && <p><Locale id="ids-select" /></p>}
                    {
                      addIndex(map)(({ disk, path, name, alias, newAlias: { cn, validfrom, validto, serialnumber, ...rest } }, i) => {
                        const validFrom = Date.parse(replace(/\./g, ' ', validfrom || ''))
                        const validTo = Date.parse(replace(/\./g, ' ', validto || ''))
                        const currentTime = new Date().getTime()
                        let valid
                        const isInvalid = isSignatureInvalid && cert && cert === serialnumber
                        if (validFrom <= currentTime && currentTime <= validTo) {
                          valid = true
                        }
                        return (
                          <div key={i} id="cert-block" className={style.certBlock}>
                            <div className={style.cert}>
                              <div className={style.certData}>
                                <p>{cn}</p>
                                {getPersonalData(
                                  mergeRight(rest, {
                                    expirationDate: (validfrom && validto) ? `${split(' ', validfrom)[0]} - ${split(' ', validto)[0]}` : undefined,
                                    serialNumber: serialnumber ? serialnumber.toUpperCase() : undefined
                                  }),
                                  digitalSignFields,
                                  style.certFields,
                                  'cert'
                                )}
                                {valid && !isInvalid && (
                                  <span className={style.action}>
                                    {loading && cert === serialnumber && <Spinner />}
                                    <button
                                      type="button"
                                      onClick={() => onCertClick(serialnumber, [disk, path, name, alias])}
                                    >
                                      {
                                        isCabinetAuthenticity ?
                                          <Locale id="confirm" /> :
                                          isCabinetEntity ?
                                            <Locale id="add" /> :
                                            <Locale id="select" />
                                      }
                                    </button>
                                  </span>
                                )}
                              </div>
                            </div>
                            {!includes(serialnumber, uncoveredInvalidCerts || []) && (!valid || isInvalid) && (
                              <div className={style.certBlockInvalid}>
                                <Svg
                                  name="close"
                                  className="close"
                                  onClick={() => setUncoveredInvalidCerts(
                                    uncoveredInvalidCerts ?
                                      [...uncoveredInvalidCerts, serialnumber] :
                                      [serialnumber]
                                  )}
                                />
                                <span><Locale id="sign_not_valid" /></span>
                              </div>
                            )}
                          </div>
                        )
                      })(certs)
                    }
                  </div>
                ) : (
                    <Spinner height={spinnerHeight} />
                  )}
            </div>
          )
    }
    <button
      type="button"
      className="secondary"
      onClick={onRefresh}
    >
      <Locale id="refresh" />
    </button>
  </div>
)
