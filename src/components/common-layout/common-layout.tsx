import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import CommonSider from '../common-sider'
import CommonHeader from '../common-header'
import styles from './index.module.scss'
import CommonFooter from '../common-footer'
import api from '../../api/service'
const { Header, Sider, Content, Footer } = Layout
const CommonLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const getUserInfo = async () => {
    const res = await api.getUserInfo()
    console.log(res)
  }
  useEffect(() => {
    getUserInfo()
  },[])
  return (
    <Layout className={styles['outer-layout']}>
      <CommonSider collapsed={collapsed}/>
      <Layout >
        <CommonHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Layout className={styles['inner-layout']}>
          <Content style={{backgroundColor:'#fff',height:'800px',flex:'none'}}>
            <Outlet />
          </Content>
          <CommonFooter />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default CommonLayout
