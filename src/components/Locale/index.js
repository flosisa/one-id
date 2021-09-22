import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { has, prop } from 'ramda'

export default injectIntl(props => {
  const { id, intl, values, link } = props
  const hasId = has(id, prop('messages', intl))

  return hasId ? (
    <FormattedMessage
      {...props}
      values={{
        ...values,
        a: msg => (
          <a {...link} rel="noopener noreferrer">
            {msg}
          </a>
        ),
        Link: msg => (
          <Link {...link}>
            {msg}
          </Link>
        ),
        b: msg => (
          <b style={{ fontWeight: 600 }}>
            {msg}
          </b>
        )
      }}
    />
  ) : null
})
