import React from 'react'
import Authenticity from './index.jsx'
import { connect } from 'react-redux'
import { compose, path, prop } from 'ramda'

const enhance = compose(
  connect(({ cabinet }) => ({
    personalData: path(['personalData', 'data', 'data'], cabinet),
    isAuthenticityConfirmed: path(['authenticity', 'data'], cabinet),
    authenticityComfirmLoading: path(['authenticity', 'loading'], cabinet),
  }))
)

export default enhance(({ personalData, authenticityComfirmLoading, isAuthenticityConfirmed }) => {
  const userPinfl = prop('pinfl', personalData)
  const personalDataAuthenticity = prop('authenticESP', personalData)

  return (
    <Authenticity
      userPinfl={userPinfl}
      authenticityComfirmLoading={authenticityComfirmLoading}
      isAuthenticityConfirmed={personalDataAuthenticity || isAuthenticityConfirmed}
    />
  )
})
