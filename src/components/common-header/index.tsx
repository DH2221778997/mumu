import { Header } from 'antd/es/layout/layout'
import React from 'react'
import styles from './index.module.scss'
import { Breadcrumb, Button, Dropdown, MenuProps, Space, Switch } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import { useMenuStore } from '../../store/useMenuStore'
const CommonHeader = () => {
  const userInfo = useUserInfoStore(state => state.userInfo)
  const isFold = useMenuStore(state => state.isFold)
  const setIsFold = useMenuStore(state => state.setIsFold)
  const items: MenuProps['items'] = [
    { key: 1, label: `邮箱：${userInfo.userEmail}` },
    { key: 2, label: '退出' }
  ]
  return (
    <Header className={styles.header}>
      <div className={styles['header-left']}>
        <Button
          type='text'
          icon={isFold ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={setIsFold}
        />
        <Breadcrumb items={[{ title: 'a' }, { title: 'b' }]} />
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
