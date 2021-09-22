import React from 'react'
import { addIndex, map } from 'ramda'
import getPersonalData from 'Util/getPersonalData'
import Locale from 'Components/Locale'

import style from './index.scss'

const assignedEntityFields = [
  [
    { label: <Locale id="inn" />, key: 'tin', width: 90 },
    { label: <Locale id="registration-number" />, key: 'reg_NO' },
    { label: <Locale id="entity-registration-date" />, key: 'reg_DATE' },
  ],
  [
    { label: <Locale id="director-name" />, key: 'head_NM' },
  ]
]

export default ({ assignedEntities, onDirectorRelease }) => (
  <div className={style.assignedEntities}>
    {addIndex(map)(({ le_NM_UZ, tin, reg_NO, reg_DATE, le_STATUS, head_NM }, i) => (
      <div key={i} className={style.certBlock}>
        <div className={style.cert}>
          <div className={style.certData}>
            <p>{le_NM_UZ}</p>
            {getPersonalData(
              { tin, reg_NO, reg_DATE, le_STATUS, head_NM },
              assignedEntityFields,
              style.certFields,
              'cert'
            )}
            <span className={style.action}>
              <button
                type="button"
                onClick={() => onDirectorRelease(tin)}
              >
                <Locale id="disable" />
              </button>
            </span>
          </div>
        </div>
      </div>
    ))(assignedEntities)}
  </div>
)
