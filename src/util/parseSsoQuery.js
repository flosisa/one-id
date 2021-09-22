import { split, mapObjIndexed } from 'ramda'

export default query => {
  let queryObj = {}

  mapObjIndexed((value, key) => {
    const prop = split('amp;', key)[1]

    queryObj[prop || key] = value
  })(query || {})

  return queryObj
}
