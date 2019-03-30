import axios from 'axios'
import config from '../../config'
import jwtDecode from 'jwt-decode'

class ApiClient {
  constructor() {
    this.getToken = () => null
    this.instance = axios.create({
      baseURL: config.api.baseUrl,
    })
    this.expires = new Date()

    // Make sure token is authenticated
    this.instance.interceptors.request.use(
      req => {
        const original = req
        console.log('intercepting')
        if (this.isExpired()) {
          console.log('token expired')
          this.updateHeaders()
          const token = this.getToken()
          const header = `Bearer ${token}`
          original.headers['Authorization'] = header
          console.log('setting headers: ' + header)
          return Promise.resolve(original)
        }

        return original
      },
      err => Promise.reject(err)
    )
  }

  setTokenGetter(fn) {
    this.getToken = fn
  }

  get authenticated() {
    return !!this.token
  }

  isExpired() {
    return new Date() - this.expires >= 0
  }

  updateHeaders = async () => {
    const token = this.getToken()
    const header = `Bearer ${token}`
    this.expires = new Date(jwtDecode(token).exp * 1000)
    this.instance.defaults.headers.common['Authorization'] = header
  }

  get = async (...args) => (await this.instance.get(...args)).data
  post = async (...args) => (await this.instance.post(...args)).data
  put = async (...args) => (await this.instance.put(...args)).data
  patch = async (...args) => (await this.instance.patch(...args)).data
  delete = async (...args) => (await this.instance.delete(...args)).data
}

const api = new ApiClient()
export default api
