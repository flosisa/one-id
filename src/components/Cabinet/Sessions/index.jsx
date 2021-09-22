import React from 'react'
import { map } from 'ramda'
import Spinner from 'Components/Spinner/index.jsx'
import Locale from 'Components/Locale'
import parseUserAgent from 'Util/parseUserAgent'

import style from './index.scss'

export default ({ sessions, sessionsLoading }) => (
  <div className={style.sessions}>
    <p className={style.header}><Locale id="sessions" /></p>
    {
      sessionsLoading ? (
        <Spinner />
      ) : sessions && (
        <table className={style.table}>
          <tbody>
            <tr>
              <th><Locale id="enter_ip" /></th>
              <th><Locale id="user_agent" /></th>
              <th><Locale id="active_time" /></th>
              {false && <th></th>}
            </tr>
            {map(({ id, remoteIp, userAgent, loginTime }) => {
              const { browserName, osName } = parseUserAgent(userAgent)

              return (
                <tr key={id}>
                  <td>{remoteIp}</td>
                  <td>{browserName}, {osName}</td>
                  <td>{`${new Date(loginTime).toLocaleDateString()} ${new Date(loginTime).toLocaleTimeString()}`}</td>
                  {false && <td>
                    <button className="secondary">
                      <Locale id="delete" />
                    </button>
                  </td>}
                </tr>
              )
            })(sessions || [])}
          </tbody>
        </table>
      )}
  </div>
)
