import { Button, Form, Input, Select, Table } from 'antd'
import React from 'react'
import '../../../index.scss'
const { Item } = Form
const UserList = () => {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }
  ]
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    }
  ]
  return (
    <div className='user-list'>
      <div className='search-form'>
        <Form layout='inline'>
          <Item label='用户ID'>
            <Input placeholder='请输入用户ID' />
          </Item>
          <Item label='用户名称'>
            <Input placeholder='请输入用户名称' />
          </Item>
          <Item label='状态'>
            <Select
              defaultValue='Jack'
              style={{ width: 120 }}
              options={[
                { value: 'Jack', label: '所有' },
                { value: 'Lucy', label: '在职' },
                { value: 'yiminghe', label: '离职' },
                { value: 'Disabled', label: '试用期' }
              ]}
            />
          </Item>
          <Item>
            <Button type='primary'>搜索</Button>
          </Item>
          <Item>
            <Button>重置</Button>
          </Item>
        </Form>
      </div>
      <div className='base-form'>
        <div className='header'>
          <div className='title'>
            <span>用户列表</span>
          </div>
          <div className='right'>
            <Button type='primary' style={{ marginRight: '20px' }}>
              新增
            </Button>
            <Button type='primary' danger>
              批量删除
            </Button>
          </div>
        </div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  )
}

export default UserList
