import React, { useState, useEffect, useLayoutEffect } from 'react'
import { compose, includes, path, propOr, replace,prop, propEq, filter, pathEq, length, equals, startsWith } from 'ramda'
import { connect } from 'react-redux'
import * as actions from 'Redux/actions'
import getDigitalSign from 'Util/getDigitalSign'
import { GET_CERTS, GET_CERT_KEY, CREATE_PKCS_7, invalidPassword } from 'Constants/digitalSign'
import { toastr } from 'react-redux-toastr'
import { pinflLength } from '../Form/validate'
import { useLocation } from 'react-router-dom'
import * as ROUTES from "Constants/routes"
import CheckDigitalSign from './index.jsx'

const enhance = compose(
  connect(({ signIn, settings, cabinet }) => ({
    uuid: path(['uuid', 'data', 'data', 'uuid'], signIn),
    uuidLoading: path(['uuid', 'loading'], signIn),
    digitalSignStatus: path(['digitalSign', 'data', 'status', 'code'], signIn),
    digitalSignLoading: path(['digitalSign', 'loading'], signIn),
    pinfl: path(['personalData', 'data', 'data', 'pinfl'], cabinet),
    poorEyesight: path(['poorEyesight'], settings),
  }))
)

export default enhance(({
  dispatch,
  uuid,
  digitalSignStatus,
  uuidLoading,
  isCabinetAuthenticity,
  isCabinetEntity,
  pinfl,
  digitalSignLoading,
  authenticityComfirmLoading,
  poorEyesight
}) => {
  const isSignatureInvalid = digitalSignStatus === 94 ||
    digitalSignStatus === 95 ||
    digitalSignStatus === 96 ||
    digitalSignStatus === 97
  const { pathname } = useLocation()
  const isCabinet = startsWith(ROUTES.CABINET, pathname)

  const [targetName, setTargetName] = useState('')
  const [siganture, setSignature] = useState('')
  const [certs, setCerts] = useState(null)
  const [certKey, setCertKey] = useState(null)
  const [cert, setCert] = useState(null)
  const [uncoveredInvalidCerts, setUncoveredInvalidCerts] = useState(null)
  const [spinnerHeight, setSpinnerHeight] = useState(null)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const prompt = 'Выберите ключ'
  
  const actualCerts = certs && !propEq('type', 'error', certs) && isCabinet ?
    pinfl && equals(length(pinfl), pinflLength) ?
      filter(pathEq(['newAlias', '1.2.860.3.16.1.2'], pinfl))(certs || []) :
      null :
    certs

  if (!certs) {
    getDigitalSign(GET_CERTS, undefined)
      .then(res => res && setSpinnerHeight(false) & setCerts(res))
  }

  const onCertClick = (serialNumber, args) => {
    setCert(serialNumber)
    getDigitalSign(GET_CERT_KEY, args)
      .then(res => res && setCertKey(res))
    dispatch(actions.uuid())
  }

  useEffect(() => {
    uuid && getDigitalSign(
      CREATE_PKCS_7,
      [uuid, certKey, 'no']
    )
      .then(res => {
        const success = prop('success', res)
        const data = prop('pkcs7_64', res)
        const reason = propOr('', 'reason', res)
        const error = success === false && includes(invalidPassword, reason) && 'Вы ввели неверный пароль.'

        if (success && certKey) {
          dispatch(actions[
            isCabinetAuthenticity ?
              'authenticity' :
              isCabinetEntity ?
                'assignWorker' :
                'digitalSign'
          ]({ data }))
        } else {
          error && toastr.error(error)
        }
      })
  }, [uuid, certKey])

  useLayoutEffect(() => {
    const certContainer = document.getElementById('cert-container')

    if (certContainer) {
      setSpinnerHeight(certContainer.offsetHeight + 'px')
    }
  }, [certs, poorEyesight])

  const onRefresh = () => {
    setCerts(null)
  }

  const checkSignature = () =>{
      let filterData = filter(pathEq(['name'],targetName))(certs || [])
      setSignature(filterData)
  }

  return (
    <CheckDigitalSign
      certs={actualCerts}
      certKey={certKey}
      cert={cert}
      onChange={val=>setValue(val)}
      open={open}
      value={value}
      setOpen={setOpen}
      prompt={prompt}
      checkSignature={checkSignature}
      siganture={siganture}
      setTargetName={setTargetName}
      onCertClick={onCertClick}
      onRefresh={onRefresh}
      spinnerHeight={spinnerHeight}
      isSignatureInvalid={isSignatureInvalid}
      isCabinetAuthenticity={isCabinetAuthenticity}
      isCabinetEntity={isCabinetEntity}
      loading={uuidLoading || digitalSignLoading || authenticityComfirmLoading}
      uncoveredInvalidCerts={uncoveredInvalidCerts}
      setUncoveredInvalidCerts={setUncoveredInvalidCerts}
    />
  )
})
