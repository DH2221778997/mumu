import React from 'react'
import logo from '../../assets/imgs/logo.png'
import { Collapse, Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons'
import Sider from 'antd/es/layout/Sider'
import styles from './index.module.scss'
const CommonSider = ({collapsed}:{collapsed:boolean}) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles['logo-container']}>
          <img src={logo} alt='logo' />
          {collapsed? '' : <span>慕慕货运</span>}
        </div>
        <Menu 
        theme='dark'
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: '工作台',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: '系统管理',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: '订单管理',
          },
        ]}/>
      </Sider>
  )
}

export default CommonSider