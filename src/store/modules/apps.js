import api from '../../lib/api/index'

const initialState = {
  data: [],
  payables: [],
  currentApp: null,
}

export default {
  state: initialState,
  reducers: {
    SET_APPS: (state, apps) => ({ ...state, data: apps }),
    SET_CURRENT_APP: (state, app) => ({ ...state, currentApp: app }),
    SET_PAYABLES: (state, app) => ({ ...state, payables: app }),
  },

  effects: dispatch => ({
    async loadApps() {
      const apps = await api.get('/apps')
      dispatch.apps.SET_APPS(apps)
    },

    async create({ name, description, url }) {
      const app = await api.post('/apps', { name, description, url })
      dispatch.apps.SET_CURRENT_APP(app)
      dispatch.apps.SET_PAYABLES([])

      return
    },

    async getApp(id) {
      const app = await api.get(`/apps/${id}`)
      const payables = await api.get(`/apps/${id}/payables`)
      dispatch.apps.SET_CURRENT_APP(app)
      dispatch.apps.SET_PAYABLES(payables)
    },
  }),
}
