import auth from '../../lib/auth'
import api from '../../lib/api'

const initialState = {
  authenticated: false,
  user: null,
  error: null,
  tmpEmail: null,
  unsub: () => null,
}

export default {
  state: initialState,
  reducers: {
    RESET_AUTH: () => initialState,
    SET_USER: (state, user) => ({ ...state, user, authenticated: !!user }),
    SET_ERROR: (state, error) => ({ ...state, error }),
    CLEAR_ERROR: state => ({ ...state, error: null }),

    SET_TMP_EMAIL: (state, tmpEmail) => ({ ...state, tmpEmail }),
    CLEAR_TMP_EMAIL: state => ({ tmpEmail: null }),

    SET_UNSUB: (state, fn) => ({ ...state, unsub: fn }),
  },

  effects: dispatch => ({
    listen: (payload, rootState) => {
      // Let our API client know how to set our token
      api.setTokenGetter(() => rootState.auth.user.idToken)

      const unsub = auth.listen(user => {
        if (!user) dispatch.auth.RESET_AUTH()
        else {
          // api.setTokenGetter(user.getIdToken)
          user
            .getIdToken()
            .then(idToken => {
              dispatch.auth.SET_USER({
                email: user.emaill,
                uid: user.uid,
                idToken,
              })
            })
            .catch(dispatch.auth.RESET_AUTH)
        }
      })

      dispatch.auth.SET_UNSUB(unsub)
    },

    logout: () => auth.logout().then(() => dispatch.auth.RESET_AUTH()),

    requestEmailLink: email => {
      dispatch.auth.SET_TMP_EMAIL(email)
      return auth.requestEmailLink(email)
    },

    verifyEmailLink: ({ email, url }, rootState) => {
      if (!email) email = rootState.auth.tmpEmail
      return auth.verifyEmail(email, url)
    },
  }),
}
