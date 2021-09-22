import React from 'react'
import axios from 'axios'
import { localWebServerOrigin, devWebServerOrigin, prodWebServerOrigin } from 'Constants/appDefaults'
import { getToken, removeToken } from 'Util/storages'
import { path } from 'ramda'
import { toastr } from 'react-redux-toastr'
import getLocale from './getLocale'
import Locale from 'Components/Locale'

const axiosDefaults = () => {
  axios.defaults.baseURL = process.env.APP_ENV === 'prod' ?
    prodWebServerOrigin :
    process.env.APP_ENV === 'dev' ?
      devWebServerOrigin :
      localWebServerOrigin
}

export const getAuthInstance = () => {
  axiosDefaults()
  const token = getToken()

  const instance = axios.create({
    headers: {
      Authorization: token && typeof token === 'string' ?
        `Bearer ${token}` :
        undefined,
      'Accept-Language': getLocale()
    }
  })

  instance.interceptors.response.use(
    response => response,
    error => {
      const status = path(['response', 'status'], error)

      if (status === 401 || status === 403) {
        removeToken()
        location.href = process.env.APP_ENV === 'prod' ?
          prodWebServerOrigin :
          process.env.APP_ENV === 'dev' ?
            devWebServerOrigin :
            localWebServerOrigin
      } else {
        toastr.error('', { component: <Locale id="connection-failed" /> })
      }

      return Promise.reject(error)
    }
  )

  return instance
}

export const getNotAuthInstance = () => {
  axiosDefaults()

  const instance = axios.create({
    headers: {
      'Accept-Language': getLocale()
    }
  })

  instance.interceptors.response.use(
    response => response,
    error => {
      const status = path(['response', 'status'], error)

      if (status !== 401 && status !== 403) {
        toastr.error('', { component: <Locale id="connection-failed" /> })
      }

      return Promise.reject(error)
    }
  )

  return instance
}
