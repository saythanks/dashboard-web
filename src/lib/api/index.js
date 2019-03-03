import axios from 'axios'

export default class ApiClient {
  constructor(getToken) {
    this.getToken = getToken
  }
}
