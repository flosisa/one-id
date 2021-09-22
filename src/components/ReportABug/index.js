import React, { useState, useEffect } from 'react'
import ReportABug from './index.jsx'
import Modal from '../Modal/index.jsx'
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import { compose, prop, path } from 'ramda'
import { reset } from 'redux-form'
import formNames from 'Components/Form/validate/formNames'

const enhance = compose(
  connect(({ sso }) => ({
    isBugReported: path(['reportABug', 'data'], sso),
  }))
)

export default enhance(({ dispatch, isBugReported }) => {

  const [modalState, setModalState] = useState(false)

  const listener = e => {
    const orientation = window.screen.orientation
    const angle = orientation.angle
    const type = orientation.type
    const desktop = angle === 0 && type === 'landscape-primary'

    if (desktop && e.ctrlKey && e.keyCode === 13) {
      setModalState(true)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', listener)

    return () => {
      document.removeEventListener("keydown", listener)
    }
  }, [])

  useEffect(() => {
    isBugReported &&
      setModalState(false) &
      dispatch(reset(formNames.reportABug))
  }, [isBugReported])

  const onSubmit = formValues => {
    dispatch(actions.reportABug({ text: prop('desc', formValues) }))
    setModalState(false)
  }

  return (
    <>
      {modalState && (
        <Modal
          id="r-a-b"
          modalState={modalState}
          toggle={() => setModalState(false)}
        >
          <ReportABug
            onSubmit={onSubmit}
          />
        </Modal>
      )}
    </>
  )
})
