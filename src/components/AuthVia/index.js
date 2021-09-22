import React, { useState, useEffect } from 'react'
import AuthVia from './index.jsx'
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import { compose, path, length } from 'ramda'
import { physicalEntity } from 'Constants/cabinet'
import oAuthCheck from '../SignIn/oAuthCheck'
import { tinLength } from '../Form/validate'

const enhance = compose(
  connect(({ sso, router }) => ({
    entities: path(['getEntites', 'data', 'data', 'legal'], sso),
    isEntitiyUpdated: path(['updateEntity', 'data'], sso),
    query: path(['location', 'query'], router),
  }))
)

export default enhance(({ dispatch, query, entities, isEntitiyUpdated }) => {

  const [activeEntity, setActiveEntity] = useState(null)

  // useEffect(() => {
  //   !entities && dispatch(actions.getEntites())
  // }, [])

  useEffect(() => {
    (entities === null || isEntitiyUpdated) &&
      oAuthCheck(dispatch, query, 'authed')
  }, [entities, isEntitiyUpdated])

  const onUpdateEntity = () => {
    if (activeEntity === physicalEntity) {
      dispatch(actions.updateEntity({ le_tin: 0 }))
    } else if (typeof activeEntity === 'string' && length(activeEntity) === tinLength) {
      dispatch(actions.updateEntity({ le_tin: activeEntity }))
    }
  }

  return (
    <AuthVia
      activeEntity={activeEntity}
      setActiveEntity={setActiveEntity}
      onUpdateEntity={onUpdateEntity}
      entities={entities}
    />
  )
})
