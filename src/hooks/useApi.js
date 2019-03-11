import { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config'

const request = axios.create({
  baseURL: config.api.baseUrl,
})

const useApi = (url, params, { method = 'GET', authenticated = true } = {}) => {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState(null)

  useEffect(() => {
    request({
      url,
      method,
      data: params,
    }).then(res => {
      setLoading(false)
      setResponse(res)
    })
  }, [url, params, method])

  return { data: response, loading }
}

export default useApi
