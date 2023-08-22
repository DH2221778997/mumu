import React from 'react'
import { Button, Form, Input } from 'antd'

const { Item } = Form
const Login = () => {
  return (
    <div>
      <Form>
        <h1>系统登陆</h1>
        <Item>
          <Input></Input>
        </Item>
        <Item>
          <Input.Password></Input.Password>
        </Item>
        <Button htmlType='submit'>登录</Button>
      </Form>
    </div>
  )
}

export default Login
