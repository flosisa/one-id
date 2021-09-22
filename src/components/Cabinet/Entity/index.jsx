import React from 'react'
import DigitalSign from 'Components/DigitalSign'
import Radio from 'Components/Radio/index.jsx'
import AssignDirector from './AssignDirector.jsx'
import AssignedEntities from './AssignedEntities.jsx'
import Spinner from 'Components/Spinner/index.jsx'
import { worker, director } from "Constants/digitalSign"
import clsx from 'clsx'
import { isEmpty } from 'ramda'
import Locale from 'Components/Locale'
import Svg from 'Components/Svg/index.jsx'

import style from './index.scss'

export default ({ onSubmit, onDirectorRelease, locale, assignedEntities, entitiesLoading, assignDirectorLoading, isWorker, isDirector, entityMember, setEntityMember }) => {

  const getMembers = mem => {
    const isActive = entityMember === mem

    return (
      <div
        className={clsx(style.member, isActive && style.memberActive)}
        onClick={() => setEntityMember(mem)}
      >
        <Radio isActive={isActive} />
        <span>
          {
            mem === worker ?
              <Locale id="i_have_ids" /> :
              <Locale id="head_of_organization" />
          }
        </span>
      </div>
    )
  }


  return (
    <div className={style.entity}>
      <p className={style.header}><Locale id="entity" /></p>
      {entitiesLoading ? (
        <Spinner />
      ) : (
          <>
            {assignedEntities && !isEmpty(assignedEntities) && (
              <div className={style.entities}>
                <AssignedEntities
                  assignedEntities={assignedEntities}
                  onDirectorRelease={onDirectorRelease}
                />
                <hr />
              </div>
            )}
            <div className={style.juridicalInstruction}><Svg  name="text-instruction" /><Locale id="how-to-add-juridical-person" link={{ href: `https://my.gov.uz/${locale === 'ru' ? 'ru' : 'uz'}/pages/instruction-legal?new=1`, target: "_blank"}} /></div>
            {getMembers(worker)}
            <p className={style.title}><Locale id="add_entity" /></p>
            {isWorker && <DigitalSign
              isCabinetEntity={true}
            />}
            <hr />
            {getMembers(director)}
            {isDirector && (
              <AssignDirector
                onSubmit={onSubmit}
                loading={assignDirectorLoading}
              />
            )}
          </>
        )}
    </div>
  )
}
