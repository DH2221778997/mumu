import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import CommonSider from '../common-sider'
import CommonHeader from '../common-header'
import styles from './index.module.scss'
import CommonFooter from '../common-footer'
import api from '../../api/service'
import { useUserInfoStore } from '../../store/useUserInfoStore'

const { Header, Sider, Content, Footer } = Layout
const CommonLayout = () => {
  const { userInfo, updateUserInfo } = useUserInfoStore()
  const getUserInfo = async () => {
    const res = await api.getUserInfo()
    updateUserInfo(res)
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <Layout className={styles['outer-layout']}>
      <CommonSider />
      <Layout>
        <CommonHeader />
        <Layout className={styles['inner-layout']}>
          <Content
            style={{
              backgroundColor: '#fff',
              minHeight: 'calc(100vh - 196px)',
              flex: 'none'
            }}
          >
            <Outlet />
          </Content>
          <CommonFooter />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default CommonLayout
