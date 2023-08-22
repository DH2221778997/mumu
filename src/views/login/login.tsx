import React from 'react'
import { Button, Form, Input } from 'antd'
import styles from './login.module.scss'
const { Item } = Form
const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles['login-wrapper']}>
        <div className={styles['login-title']}>系统登陆</div>
        <Form>
          <Item>
            <Input></Input>
          </Item>
          <Item>
            <Input.Password></Input.Password>
          </Item>
          <Item>
            <Button htmlType='submit' block>登录</Button>
          </Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
