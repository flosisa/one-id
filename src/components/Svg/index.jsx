import React, { useState, useEffect, useRef } from 'react'
import { prop, pick } from 'ramda'

export default props => {
  const name = prop('name', props)
  const attrs = pick(['id', 'className', 'width', 'height', 'onClick'], props)

  const iconRef = useRef(null)
  const SvgIcon = prop('current', iconRef)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const importIcon = async () => {
      try {
        const { default: namedImport } = await import(`Assets/svg/${name}.svg`)
        iconRef.current = namedImport
      } catch (err) {
        throw err
      } finally {
        setLoading(false)
      }
    }

    importIcon()
  }, [name])

  return !loading && SvgIcon ?
    <SvgIcon {...attrs} /> :
    null
}
