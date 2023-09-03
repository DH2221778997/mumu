import { Button, Form, Input, Modal, Select, Table, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import '../../../index.scss'
import { ColumnsType } from 'antd/es/table'
import { PageParams, User } from '../../../types/api'
import api from '../../../api/service'
import dayjs from 'dayjs'
import CreateUser from './create-user'
import { IAction } from '../../../types/modal'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useAntdTable } from 'ahooks'
import service from '../../../api/service'
const { Item } = Form
const UserList = () => {
  const [form] = Form.useForm()
  const [selectedUserIds, setSlectedUserIds] = useState<number[]>([])
  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void
  }>()

  const getTableData = async (
    { current, pageSize }: { current: number; pageSize: number },
    formData: User.Params
  ) => {
    return api
      .getUserList({
        ...formData,
        pageNum: current,
        pageSize: pageSize
      })
      .then(res => ({
        total: res.page.total,
        list: res.list
      }))
  }
  const { tableProps, search } = useAntdTable(getTableData, {
    form: form
  })
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })

  const handleSearch = () => {
    search.submit()
  }

  const handleReset = () => {
    search.reset()
  }

  const handleEdit = (value: User.UserItem) => {
    userRef.current?.open('edit', value)
  }

  const handleCreate = () => {
    userRef.current?.open('create')
  }

  //单个用户删除
  const handleDelete = (params: { userIds: number[] }) => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleFilled />,
      content: '确认删除该用户吗？',
      onOk: () => {
        deleteUser(params)
      }
    })
  }
  //批量用户删除
  const handlePatchDelete = (params: { userIds: number[] }) => {
    if (params.userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleFilled />,
      content: '确认删除该批用户吗？',
      onOk: () => {
        deleteUser(params)
      }
    })
  }

  //删除用户公共方法
  const deleteUser = async (params: { userIds: number[] }) => {
    try {
      await api.userDel(params)
      message.success('删除成功')
      setSlectedUserIds([])
      search.reset()
    } catch (error) {
      console.log(error)
    }
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSlectedUserIds(newSelectedRowKeys as number[])
  }
  const rowSelection = {
    selectedRowKeys: selectedUserIds,
    onChange: onSelectChange
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
      key: 'userName',
      render: (record, index) => {
        console.log(index)
        return <span></span>
      }
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
            <Button
              type='text'
              onClick={() => handleDelete({ userIds: [record.userId] })}
            >
              删除
            </Button>
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
            <Button
              type='primary'
              danger
              onClick={() => handlePatchDelete({ userIds: selectedUserIds })}
            >
              批量删除
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey='userId'
          rowSelection={{ type: 'radio', ...rowSelection }}
          columns={columns}
          {...tableProps}
        />
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          search.reset()
        }}
      />
    </div>
  )
}

export default UserList
