import 'Assets/js/e-imzo'
import { EIMZOClient } from 'Assets/js/e-imzo-client'
import { split, mergeAll, addIndex, map, pipe, propOr, filter, prop, mergeRight } from 'ramda'
import { GET_CERTS, GET_CERT_KEY, CREATE_PKCS_7 } from 'Constants/digitalSign'

export default (req, args) => {
  return new Promise(resolve => {

    const success = () => {
      const getAttrs = () => {
        switch (req) {
          case GET_CERTS:
            return {
              plugin: 'pfx',
              name: 'list_all_certificates',
            }
          case GET_CERT_KEY:
            return {
              plugin: 'pfx',
              name: 'load_key',
              arguments: [
                ...args
              ]
            }
          case CREATE_PKCS_7:
            return {
              plugin: 'pkcs7',
              name: 'create_pkcs7',
              arguments: [
                ...args
              ]
            }
        }
      }

      const getData = data => {
        const success = prop('success', data)
        const certificates = propOr([], 'certificates', data)
        // console.log(data)

        switch (req) {
          case GET_CERTS:
            return success ?
              map(cert =>
                mergeRight(
                  cert,
                  {
                    newAlias: pipe(
                      propOr('', 'alias'),
                      split(/[=,]/g),
                      items => addIndex(map)((s, i) =>
                        i % 2 === 0 && {
                          [s]: items[i + 1]
                        }
                      )(items),
                      filter(v => v),
                      mergeAll()
                    )(cert)
                  }
                )
              )(certificates) :
              []
          case GET_CERT_KEY:
            return success && prop('keyId', data)
          case CREATE_PKCS_7:
            return data
        }
      }

      CAPIWS.callFunction(
        getAttrs(),
        (_, data) => {
          resolve(getData(data))
        },
        error => {
          resolve(error)
        }
      )
    }

    const fail = (e, reason) => {
      if (reason && process.env.APP_ENV === 'dev') {
        console.error(reason)
      }

      return resolve(e)
    }

    EIMZOClient.installApiKeys(success, fail)
  })
}
