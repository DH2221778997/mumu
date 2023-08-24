import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from '../views/login/login'
import { Children } from 'react'
import CommonLayout from '../components/common-layout/common-layout'
import Welcome from '../views/welcome/welcome'

const router = [
  {
    path: '/',
    element: <CommonLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='welcome' />
      },
      {
        path: 'welcome',
        element: <Welcome />
      },
      {
        path: 'dashboard',
        element: <Welcome />
      },
      {
        path: 'userList',
        element: <Welcome />
      },
      {
        path: 'menuList',
        element: <Welcome />
      },
      {
        path: 'roleList',
        element: <Welcome />
      },
      {
        path: 'deptList',
        element: <Welcome />
      },
      {
        path: 'orderList',
        element: <Welcome />
      },
      {
        path: 'cluster',
        element: <Welcome />
      },
      {
        path: 'driverList',
        element: <Welcome />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
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

export default createBrowserRouter(router)
