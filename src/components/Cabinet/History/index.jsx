import React from 'react'
import Pagination from 'Components/Pagination/index.jsx'
import Spinner from 'Components/Spinner/index.jsx'
import { isEmpty, map } from 'ramda'
import Locale from 'Components/Locale'
import parseUserAgent from 'Util/parseUserAgent'

import style from './index.scss'

export default ({ history, total, historyLoading, activePage, defaultSize, onPageChange }) => (
  <div className={style.history}>
    <p className={style.header}><Locale id="history" /></p>
    {
      historyLoading ? (
        <Spinner />
      ) : history && (
        <div>
          <table className={style.table}>
            <tbody>
              <tr>
                <th><Locale id="resource" /></th>
                <th><Locale id="enter_ip" /></th>
                <th><Locale id="user_agent" /></th>
                <th><Locale id="method" /></th>
                <th><Locale id="active_time" /></th>
              </tr>
              {map(({ id, remoteIp, userAgent, loginTime, loginMethods, resource }) => {
                const { browserName, osName } = parseUserAgent(userAgent)

                return (
                  <tr key={id}>
                    <td>{resource}</td>
                    <td>{remoteIp}</td>
                    <td>{browserName}, {osName}</td>
                    <td>{loginMethods}</td>
                    <td>{`${new Date(loginTime).toLocaleDateString()} ${new Date(loginTime).toLocaleTimeString()}`}</td>
                  </tr>
                )
              })(history || [])}
            </tbody>
          </table>
          {!isEmpty(history) && (
            <Pagination
              total={total}
              activePage={activePage}
              defaultSize={defaultSize}
              onPageChange={onPageChange}
            />
          )}
        </div>
      )}
  </div>
)
