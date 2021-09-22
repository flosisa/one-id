import { has } from 'ramda'

export default (initialState, handlers) => {
  return (state = initialState, action) => {
    if (has(action.type, handlers)) {
      return handlers[action.type](state, action)
    }
    return state
  }
}
