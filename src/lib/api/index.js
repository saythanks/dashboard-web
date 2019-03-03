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
    const header = `Bearer ${await this.getToken()}`
    console.log(header)
    axios.defaults.headers.common['Authorization'] = header
  }

  get = (url, token, ...args) => {
    this.updateHeaders()
    return this.instance.get(...args)
  }

  post = (...args) => {
    this.updateHeaders()
    return this.instance.post(...args)
  }

  put = (...args) => {
    this.updateHeaders()
    return this.instance.put(...args)
  }

  patch = (...args) => {
    this.updateHeaders()
    return this.instance.patch(...args)
  }

  delete = (...args) => {
    this.updateHeaders()
    return this.instance.delete(...args)
  }
}

const api = new ApiClient()
export default api
