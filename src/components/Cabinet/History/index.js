import React, { useState, useEffect } from 'react'
import History from './index.jsx'
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import { compose, path } from 'ramda'
import { getPage, setPage } from 'Util/storages'

const enhance = compose(
  connect(({ cabinet }) => ({
    history: path(['history', 'data', 'data', 'userActions'], cabinet),
    total: path(['history', 'data', 'data', 'totalElements'], cabinet),
    historyLoading: path(['history', 'loading'], cabinet),
  }))
)

export default enhance(({ dispatch, history, total, historyLoading }) => {
  const defaultPage = getPage() || 1
  const defaultSize = 10

  const [activePage, setActivePage] = useState(defaultPage)

  useEffect(() => {
    if (activePage > 0) {
      dispatch(actions.history({
        page: activePage,
        size: defaultSize
      }))

      return () => {
        setPage(1)
      }
    }
  }, [activePage])

  const onPageChange = page => {
    setPage(page)
    setActivePage(page)
  }

  return (
    <History
      history={history}
      total={total}
      historyLoading={historyLoading}
      activePage={activePage}
      defaultSize={defaultSize}
      onPageChange={onPageChange}
    />
  )
})
