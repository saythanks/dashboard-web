import api from '../../lib/api/index'

const initialState = {
  data: [],
  current: null,
}

export default {
  state: initialState,
  reducers: {
    SET_PAYABLES: (state, payables) => ({ ...state, data: payables }),
    SET_CURRENT_PAYABLE: (state, payable) => ({ ...state, current: payable }),
  },

  effects: dispatch => ({
    async list(id) {
      const payables = await api.get(`/apps/${id}/payables`)
      dispatch.payables.SET_PAYABLES(payables)
    },

    async create({ appId, name, price, url }) {
      const payable = await api.post(`/apps/${appId}/payables`, {
        display_name: name,
        display_price: price,
        permalink: url,
      })
      dispatch.payables.SET_CURRENT_PAYABLE(payable)
      dispatch.payables.SET_PAYABLES([])

      return
    },

    async get(id) {
      const payable = await api.get(`/payables/${id}`)
      dispatch.payables.SET_CURRENT_PAYABLE(payable)

      return
    },
  }),
}
