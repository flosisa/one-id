import React from 'react'
import Radio from 'Components/Radio/index.jsx'
import Locale from 'Components/Locale'
import { map } from 'ramda'
import { physicalEntity } from 'Constants/cabinet'
import clsx from 'clsx'

import style from './index.scss'

export default ({ activeEntity, setActiveEntity, onUpdateEntity, entities }) => (
  <div className={style.transfer}>
    <div className={style.transferList}>
      <div
        className={clsx(style.transferPhysicalEntity, activeEntity === physicalEntity && style.active)}
        onClick={() => setActiveEntity(physicalEntity)}
      >
        <div className={style.transferItemControl}>
          <Radio isActive={activeEntity === physicalEntity} />
        </div>
        <p className={style.transferTitle}><Locale id="continue_as_physical_person"/>:</p>
      </div>
      {/* <label className={style.transferItem}>
        <div className={style.transferItemBody}>
          <div className={style.transferItemTitle}>Фамилия Имя Отчество</div>
        </div>
      </label> */}

      <p className={style.transferTitle}><Locale id="continue_as_legal_person"/>:</p>
      {map(entity => {
        const { le_tin, le_name } = entity || ''

        return (
          <label
            key={le_tin}
            className={clsx(style.transferItem, activeEntity === le_tin && style.active)}
            onClick={() => setActiveEntity(le_tin)}
          >
            <div className={style.transferItemControl}>
              <Radio isActive={activeEntity === le_tin} />
            </div>
            <div className={style.transferItemBody}>
              <p className={style.transferItemTitle}>{le_name}</p>
              <span className={style.transferItemText}>
                &mdash; <Locale id="inn" />:
               <span>{le_tin}</span>
              </span>
            </div>
          </label>
        )
      })(entities || [])}
    </div>

    <button
      type="button"
      disabled={!activeEntity}
      onClick={onUpdateEntity}
    >
      <Locale id="continue" />
    </button>
  </div>
)
