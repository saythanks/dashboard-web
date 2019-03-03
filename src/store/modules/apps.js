import api from '../../lib/api/index'

const initialState = []

export default {
  state: initialState,
  reducers: {
    SET_APPS: (state, apps) => apps,
  },

  effects: dispatch => ({
    async loadApps(payload, rootState) {
      console.log(api.getToken())
      const apps = await api.get('/apps')
      dispatch.apps.SET_APPS(apps)
    },
  }),
}
