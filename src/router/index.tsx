import { Navigate, createHashRouter } from 'react-router-dom'

const router = [
  {
    path: '/',
    element: <div>Welcome</div>
  },
  {
    path: '/login',
    element: <div>login</div>
  },
  {
    path: '*',
    element: <Navigate to='404' />
  },
  {
    path: '/404',
    element: <div>404</div>
  },
  {
    path: '/403',
    element: <div>403</div>
  }
]

export default createHashRouter(router)
