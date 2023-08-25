import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import storage from './storage'
import { Result } from '../types/api'

const instance = axios.create({
  baseURL: '/api',
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true,
  headers: {
    icode: ''
  }
})
instance.interceptors.request.use((value: InternalAxiosRequestConfig<any>) => {
  const token = storage.get('token')
  value.headers.icode = '36596D115B26C3BE'
  if (token) {
    value.headers.Authorization = 'Bearer ' + token
  }
  return value
})
instance.interceptors.response.use(
  (value: AxiosResponse<Result, any>) => {
    const data = value.data
    return data.data
  },
  (error: any) => {
    return Promise.reject(error)
  }
)
export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get<T>(url, { params })
  },
  post<T>(url: string, params: object): Promise<T> {
    return instance.post<T>(url, params)
  }
}
