import { RouterProvider } from 'react-router'
import './App.css'
import router from './router'
import { ConfigProvider } from 'antd'
function App() {
  return (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#eb9242'
      }
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>)
}

export default App
