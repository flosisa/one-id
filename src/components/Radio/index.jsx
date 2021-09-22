import React from 'react'

export default ({ isActive }) => (
  <img
    src={`/assets/svg/${isActive ? '' : 'un'}checked-radio.svg`} alt="radio"
  />
)
