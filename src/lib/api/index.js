import axios from 'axios'
import config from '../../config'

class ApiClient {
  constructor() {
    this.getToken = () => null
    this.instance = axios.create({
      baseURL: config.api.baseUrl,
    })
  }

  setTokenGetter(fn) {
    this.getToken = fn
  }

  get authenticated() {
    return !!this.token
  }

  updateHeaders = async () => {
    const header = `Bearer ${this.getToken()}`
    this.instance.defaults.headers.common['Authorization'] = header
  }

  get = async (...args) => {
    this.updateHeaders()
    return (await this.instance.get(...args)).data
  }

  post = async (...args) => {
    this.updateHeaders()
    return (await this.instance.post(...args)).data
  }

  put = async (...args) => {
    this.updateHeaders()
    return (await this.instance.put(...args)).data
  }

  patch = async (...args) => {
    this.updateHeaders()
    return (await this.instance.patch(...args)).data
  }

  delete = async (...args) => {
    this.updateHeaders()
    return (await this.instance.delete(...args)).data
  }
}

const api = new ApiClient()
export default api

// const restify = (url, nested = {}) => api => ({
//   list: () => api.get(url),
//   get: id => api.get(`${url}/${id}`),
//   create: id => api.post(`${url}`),
//   update: id => api.patch(`${url}/${id}`),
//   delete: id => api.delete(`${url}/${id}`),
//   ...nested,
// })
// class RestApi extends ApiClient {
//   constructor({ url, ...endpoints }) {}
// }

// const api = RestApi({
//   url: 'http://localhost:5000',
// })
