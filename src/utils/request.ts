import axios from 'axios'


const instance = axios.create({
  baseURL:'/api',
  timeout:8000,
  timeoutErrorMessage:'请求超时，请稍后再试',
  withCredentials: true
})
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization='Bearer'+token
  }
  return config
},error => {
  return Promise.reject(error)
})
instance.interceptors.response.use(res => {
  const data = res.data
  if (data.code === 50001) {}
  return res.data.data
},error => {
  return Promise.reject(error)
})
export default {
  get(url:string,params:object) {
    return instance.get(url,{params})
  },
  post(url:string,params:object) {
    return instance.post(url,{params})
  }
}
