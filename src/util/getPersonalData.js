import React from 'react'
import { map, addIndex, prop, has, replace, slice, includes } from 'ramda'
import clsx from 'clsx'
import Svg from 'Components/Svg/index.jsx'
import style from 'Components/index.scss'
import Locale from 'Components/Locale'

export default (personalData, personalDataFields, className, cert, setModalState) =>
  addIndex(map)((fields, i) => (
    <div key={i} className={clsx(style.personalDataRow, className)}>
      {addIndex(map)(({ label, key, validfrom, validto, width, id }, i) => {
        const v = prop(key, personalData) || ''
        const isJuridical = has('1.2.860.3.16.1.1', personalData)
        const pinFl = has('1.2.860.3.16.1.2', personalData)
        const isPassportGivePlace = key === 'doc_give_place'
        const actualValue = key === 'name' ?
          (prop('name_latin', personalData) || prop('name_engl', personalData) || '-') :
          key === 'surname' ?
            (prop('surname_latin', personalData) || prop('surname_engl', personalData) || '-') :
            key === '1.2.860.3.16.1.2' && !pinFl ?
              <Locale id="pinfl-not-available" /> :
              key === 'businesscategory' && !isJuridical ?
                'Частное лицо' :
                key === 'o' && includes('не указан', v) ?
                  <Locale id="organization-not-available" /> :
                  key === 'sex' ?
                    v === '1' ?
                      'Мужской' :
                      v === '2' &&
                      'Женский' :
                    v

        const validFrom = Date.parse(replace(/\./g, ' ', slice(0, 11, prop('expirationDate', personalData) || '')))
        const validTo = Date.parse(replace(/\./g, ' ', slice(-10, Infinity, prop('expirationDate', personalData) || '')))
        const currentTime = new Date().getTime()
        let valid
        if (validFrom <= currentTime && currentTime <= validTo) {
          valid = true
        }
        const hiddenField = cert && !actualValue
        return !hiddenField ? (
          <div key={i} style={{ width, minWidth: width }}>
            <p className={clsx(id && !valid && style.pnflNotAvailable)}>{label}</p>
            {actualValue && (
              <p className={clsx(id && !valid && style.pnflNotAvailable)}>
                {actualValue}
              </p>
            )}
          </div>
        ) : null
      })(fields)}
    </div>
  ))(personalDataFields)

// { key == 'tin' && <span className={style.reloadTin}><Svg name="reload" /><span className={''}>Обновить</span></span> }
// { key == 'document' && <span className={style.reloadTin} onClick={() => setModalState(true)}><Svg name="edit" /><span>Изменить</span></span> }
 
