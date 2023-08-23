import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import CommonSider from '../common-sider'

const { Header, Sider, Content, Footer } = Layout
const CommonLayout = () => {
  return (
    <Layout style={{height:'100%'}}>
      <CommonSider />
      <Layout>
        <Header style={{backgroundColor:'white'}}>aaa</Header>
        <Content />
        <Footer />
      </Layout>
    </Layout>
  )
}

export default CommonLayout
