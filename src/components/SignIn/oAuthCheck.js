import * as actions from 'Redux/actions'
import parseSsoQuery from 'Util/parseSsoQuery'

export default (dispatch, query, isAuthed) => {
  const queryObj = parseSsoQuery(query)
  const { token_id, client_id, method } = queryObj || ''

  if (isAuthed && token_id && client_id && method) {
    dispatch(actions.oAuthCheck({
      uuid: token_id,
      clientId: client_id,
      method
    }))
  }
}
