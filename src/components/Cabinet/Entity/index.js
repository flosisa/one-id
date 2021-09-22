import React, { useState, useEffect, useLayoutEffect } from 'react'
import Entity from './index.jsx'
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import { compose, prop, path, isEmpty } from 'ramda'
import { worker, director } from "Constants/digitalSign"

const enhance = compose(
  connect(({ cabinet }) => ({
    entities: path(['entities', 'data'], cabinet),
    entitiesLoading: path(['entities', 'loading'], cabinet),
    assignDirectorLoading: path(['assignDirector', 'loading'], cabinet),
  }))
)

export default enhance(({ dispatch, assignDirectorLoading, locale, entities, entitiesLoading }) => {
  const assignedEntities = path(['data', 'juridicalUsers'], entities)

  const [entityMember, setEntityMember] = useState(null)

  const isWorker = entityMember === worker
  const isDirector = entityMember === director

  useEffect(() => {
    !entities && dispatch(actions.entities())
  }, [])

  useLayoutEffect(() => {
    setEntityMember((!assignedEntities || isEmpty(assignedEntities)) && worker)
  }, [assignedEntities])

  useEffect(() => {
    if (entityMember && isDirector) {
      window.scrollTo(0, 0)
    }
  }, [entityMember])

  const onDirectorAdd = formValues => {
    dispatch(actions.assignDirector({ tin: +prop('tin', formValues) }))
  }

  const onDirectorRelease = tin => {
    dispatch(actions.releaseDirector({ tin: +tin }))
  }

  return (
    <Entity
      onSubmit={onDirectorAdd}
      onDirectorRelease={onDirectorRelease}
      entitiesLoading={entitiesLoading}
      assignDirectorLoading={assignDirectorLoading}
      assignedEntities={assignedEntities}
      entityMember={entityMember}
      setEntityMember={setEntityMember}
      isWorker={isWorker}
      isDirector={isDirector}
      locale={locale}
    />
  )
})
