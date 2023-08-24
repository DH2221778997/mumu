import { Header } from 'antd/es/layout/layout'
import React from 'react'
import styles from './index.module.scss'
import { Breadcrumb, Button, Dropdown, MenuProps, Space, Switch } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const CommonHeader = ({collapsed,setCollapsed}:{collapsed:boolean,setCollapsed: (collapsed:boolean) => void}) => {
    const items: MenuProps['items'] = [{key:1,label:'邮箱'},{key:2,label:'退出'}]
  return (
    <Header className={styles.header}>
        <div className={styles['header-left']}>
            <Button 
                type='text' 
                icon={ collapsed? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                />
            <Breadcrumb items={[{title:'a'},{title:'b'}]}/>
        </div>
        <div className={styles['header-right']}>
            <Space>
                <Switch checkedChildren='暗黑' unCheckedChildren='默认' />
                <Dropdown menu={{ items }} placement='bottomRight'>
                    <span>JackMa</span>
                </Dropdown>
            </Space>
        </div>
    </Header>
  )
}

export default CommonHeader