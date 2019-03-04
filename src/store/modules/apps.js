import api from '../../lib/api/index'

const initialState = {
  data: [],
}

export default {
  state: initialState,
  reducers: {
    SET_APPS: (state, apps) => ({ ...state, data: apps }),
  },

  effects: dispatch => ({
    async loadApps(payload, rootState) {
      const apps = await api.get('/apps')
      dispatch.apps.SET_APPS(apps)
    },
  }),
}
