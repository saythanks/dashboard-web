import api from '../../lib/api/index'

const initialState = {}

export default {
  state: initialState,
  reducers: {
    // SET_APPS: (state, apps) => ({ ...state, data: apps }),
    // SET_CURRENT_APP: (state, app) => ({ ...state, currentApp: app }),
    // SET_PAYABLES: (state, app) => ({ ...state, payables: app }),

    SET_APP: (state, app) => ({
      ...state,
      [app.id]: app,
    }),

    DELETE_APP: (state, id) => {
      const all = state
      delete all[id]
      return all
    },

    INSERT_APPS: (state, apps) => ({
      ...state,
      ...apps.reduce((elem, acc) => ({ ...acc, id: elem }), {}),
    }),

    SET_APPS: (_, apps) =>
      apps.reduce((acc, elem) => ({ ...acc, [elem.id]: elem }), {}),
  },

  effects: dispatch => ({
    async list() {
      const apps = await api.get('/apps')
      dispatch.apps.SET_APPS(apps)
    },

    async create({ name, description, url }) {
      const app = await api.post('/apps', { name, description, url })

      dispatch.apps.SET_APP(app)
      return
    },

    async get(id) {
      const app = await api.get(`/apps/${id}`)
      // const payables = await api.get(`/apps/${id}/payables`)

      dispatch.apps.SET_APP(app)
    },

    async delete(id) {
      await api.delete(`/apps/${id}`)
      dispatch.apps.DELETE_APP(id)
    },
  }),
}
