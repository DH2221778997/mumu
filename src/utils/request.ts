import axios from 'axios'
import storage from './storage'

const instance = axios.create({
  baseURL: '/api',
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    icode: ''
  }
})
instance.interceptors.request.use(
  config => {
    const token = storage.get('token')
    console.log(token)
    config.headers.icode = '36596D115B26C3BE'
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  res => {
    const data = res.data
    if (data.code === 50001) {
    }
    console.log(data, res.data.data)
    return res.data.data
  },
  error => {
    return Promise.reject(error)
  }
)
export default {
  get(url: string, params: object) {
    return instance.get(url, { params })
  },
  post(url: string, params: object) {
    return instance.post(url, params)
  }
}
