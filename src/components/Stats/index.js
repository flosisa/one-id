import React, { useEffect } from 'react'
import Stats from './index.jsx'
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import { compose, path, mapObjIndexed } from 'ramda'
import { injectIntl } from 'react-intl'

const enhance = compose(
  connect(({ stats }) => ({
    usersByGender: path(['usersByGender', 'data'], stats),
    usersByRegion: path(['usersByRegion', 'data'], stats),
    transitions: path(['transitions', 'data'], stats),
  })),
  injectIntl
)

export default enhance(({ dispatch, usersByGender, usersByRegion, transitions, intl }) => {

  useEffect(() => {
    dispatch(actions.usersByGender())
    dispatch(actions.usersByRegion())
    dispatch(actions.transitions())
  }, [])

  const getData = data => {
    const items = []

    mapObjIndexed((value, key) => {
      items.push({
        label: key === 'amount' ?
          intl.formatMessage({ id: 'total' }) :
          key === 'M' ?
            intl.formatMessage({ id: 'men' }) :
            key === 'F' ?
              intl.formatMessage({ id: 'women' }) :
              key,
        value
      })
    })(data || {})

    return items
  }

  const usersByGenderData = getData(usersByGender)
  const usersByRegionData = getData(usersByRegion)
  const transitionsData = getData(transitions)

  return (
    <Stats
      usersByGender={usersByGenderData}
      usersByRegion={usersByRegionData}
      transitions={transitionsData}
    />
  )
})
