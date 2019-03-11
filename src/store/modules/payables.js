import api from '../../lib/api/index'

const initialState = {}

export default {
  state: initialState,
  reducers: {
    ADD_PAYABLES: (state, payables) => ({
      ...state,
      ...payables.reduce((acc, elem) => ({ ...acc, [elem.id]: elem }), {}),
    }),

    SET_PAYABLES: (state, payables) =>
      payables.reduce((acc, elem) => ({ ...acc, [elem.id]: elem }), {}),

    SET_PAYABLE: (state, payable) => ({
      ...state,
      [payable.id]: payable,
    }),

    DELETE_PAYABLE: (state, id) => {
      const bucket = state
      delete bucket[id]
      return bucket
    },
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
      dispatch.payables.SET_PAYABLE(payable)
    },

    async get(id) {
      const payable = await api.get(`/payables/${id}`)
      dispatch.payables.SET_PAYABLE(payable)
    },

    async delete(id) {
      await api.delete(`/payables/${id}`)
      dispatch.payables.DELETE_PAYABLE(id)
    },
  }),
}
