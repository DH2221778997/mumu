import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import styles from './login.module.scss'
import api from '../../api/service'
import storage from '../../utils/storage'
import { useNavigate } from 'react-router-dom'
const { Item } = Form
const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (values: any) => {
    setLoading(true)
    const res = await api.login(values)
    if (res) {
      storage.set('token', res)
      setLoading(false)
      message.success('登陆成功')
      navigate('/welcome')
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles['login-wrapper']}>
        <div className={styles['login-title']}>系统登陆</div>
        <Form onFinish={handleSubmit}>
          <Item name='userName'>
            <Input></Input>
          </Item>
          <Item name='userPwd'>
            <Input.Password></Input.Password>
          </Item>
          <Item>
            <Button type='primary' htmlType='submit' loading={loading} block>
              登录
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
