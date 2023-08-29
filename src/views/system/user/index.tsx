import { Button, Form, Input, Select, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import '../../../index.scss'
import { ColumnsType } from 'antd/es/table'
import { PageParams, User } from '../../../types/api'
import api from '../../../api/service'
import dayjs from 'dayjs'
import CreateUser from './create-user'
import { IAction } from '../../../types/modal'
const { Item } = Form
const UserList = () => {
  const [data, setData] = useState<User.UserItem[]>()
  const [form] = Form.useForm()
  const [total, setTotal] = useState(0)
  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void
  }>()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })
  const getTableData = async (params: PageParams) => {
    const values = form.getFieldsValue()
    const res = await api.getUserList({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    })

    setData(res.list)
    setTotal(res.list.length)
    setPagination({
      current: res.page.pageNum,
      pageSize: res.page.pageSize
    })
  }
  useEffect(() => {
    getTableData({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [pagination.current, pagination.pageSize])

  const handleSearch = () => {
    getTableData({
      pageNum: 1,
      pageSize: pagination.pageSize
    })
  }

  const handleReset = () => {
    form.resetFields()
  }

  const handleEdit = (value: User.UserItem) => {
    userRef.current?.open('edit', value)
  }

  const handleCreate = () => {
    userRef.current?.open('create')
  }
  const dataSource = [
    {
      _id: '',
      userId: 0,
      userName: '',
      userEmail: '',
      deptId: '',
      state: 0,
      mobile: '',
      job: '',
      role: 0,
      roleList: [],
      deptName: '',
      userImg: ''
    }
  ]
  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render: (value: number) => {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[value]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render: (value: number) => {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[value]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (value: string) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: (value, record) => {
        return (
          <>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text'>删除</Button>
          </>
        )
      }
    }
  ]
  return (
    <div className='user-list'>
      <div className='search-form'>
        <Form form={form} layout='inline' initialValues={{ state: 1 }}>
          <Item label='用户ID' name='userId'>
            <Input placeholder='请输入用户ID' />
          </Item>
          <Item label='用户名称' name='userName'>
            <Input placeholder='请输入用户名称' />
          </Item>
          <Item label='状态' name='state'>
            <Select
              style={{ width: 120 }}
              options={[
                { value: 0, label: '所有' },
                { value: 1, label: '在职' },
                { value: 2, label: '离职' },
                { value: 3, label: '试用期' }
              ]}
            />
          </Item>
          <Item>
            <Button type='primary' onClick={handleSearch}>
              搜索
            </Button>
          </Item>
          <Item>
            <Button onClick={handleReset}>重置</Button>
          </Item>
        </Form>
      </div>
      <div className='base-form'>
        <div className='header'>
          <div className='title'>
            <span>用户列表</span>
          </div>
          <div className='right'>
            <Button
              type='primary'
              style={{ marginRight: '20px' }}
              onClick={handleCreate}
            >
              新增
            </Button>
            <Button type='primary' danger>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey='userId'
          rowSelection={{ type: 'checkbox' }}
          dataSource={data}
          columns={columns}
          pagination={{
            position: ['bottomRight'],
            current: pagination.current,
            pageSize: pagination.pageSize,
            total,
            showSizeChanger: true,
            showTotal: total => `共${total}条`,
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize
              })
            }
          }}
        />
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          getTableData({
            pageNum: 1,
            pageSize: pagination.pageSize
          })
        }}
      />
    </div>
  )
}

export default UserList
