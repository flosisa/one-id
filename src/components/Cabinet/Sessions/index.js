import React, { useEffect } from 'react'
import Sessions from './index.jsx'
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import { compose, path } from 'ramda'

const enhance = compose(
  connect(({ cabinet }) => ({
    sessions: path(['sessions', 'data', 'data', 'userActions'], cabinet),
    sessionsLoading: path(['sessions', 'loading'], cabinet),
  }))
)

export default enhance(({ dispatch, sessions, sessionsLoading }) => {

  useEffect(() => {
    !sessions && dispatch(actions.sessions())
  }, [])

  return (
    <Sessions
      sessions={sessions}
      sessionsLoading={sessionsLoading}
    />
  )
})
