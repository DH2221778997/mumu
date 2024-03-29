import { Form, Input, InputNumber, Modal, Select, Upload, message } from 'antd'
import React, { useImperativeHandle, useRef, useState } from 'react'
import {
  ExclamationCircleFilled,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons'
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps
} from 'antd/es/upload/interface'
import storage from '../../../utils/storage'
import { User } from '../../../types/api'
import { IAction, IModalProp } from '../../../types/modal'
import api from '../../../api/service'
import { useAntdTable } from 'ahooks'

const { Item } = Form
const CreateUser = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<IAction>('create')
  const ref = useRef(null)

  const handleSubmit = async () => {
    const valid = await form.validateFields()
    console.log(valid)
    if (valid) {
      const params = {
        ...form.getFieldsValue(),
        userImg: img
      }
      if (type === 'create') {
        await api.userCreate(params)
        message.success('创建成功')
      } else {
        await api.userEdit(params)
        message.success('修改成功')
      }

      handleCancel()
      props.update()
    }
  }
  const handleCancel = () => {
    setImg('')
    setVisible(false)
    form.resetFields()
  }

  //上传之前处理
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  //上传后处理
  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj as RcFile, (url) => {
      //   setLoading(false);
      //   setImageUrl(url);
      // });
      setLoading(false)
      const { code, data, msg } = info.file.response
      if (code !== 0) {
        message.error(msg)
      } else {
        setImg(data.file)
      }
    } else if (info.file.status === 'error') {
      setLoading(false)
      message.error('上传失败')
    }
  }
  //向父组件暴露open方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })
  //打开子组件的方法
  const open = (type: IAction, data?: User.UserItem) => {
    setType(type)
    setVisible(true)
    if (type === 'edit' && data) {
      form.setFieldsValue(data)
      setImg(data.userImg)
    }
  }

  return (
    <Modal
      title={type === 'create' ? '新增用户' : '编辑用户'}
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }}>
        <Item name='userId' hidden>
          <Input />
        </Item>
        <Item
          label='用户名称'
          name='userName'
          rules={[{ required: true, message: '请输入用户名称' }]}
        >
          <Input placeholder='请输入用户名称' />
        </Item>
        <Item
          label='邮箱'
          name='userEmail'
          rules={[{ required: true, message: '请输入邮箱' }]}
        >
          <Input placeholder='请输入邮箱：XXX@mars.com' />
        </Item>
        <Item label='手机号' name='mobile'>
          <InputNumber placeholder='请输入手机号' style={{ width: '100%' }} />
        </Item>
        <Item label='部门' name='deptId'>
          <Input placeholder='请选择部门' />
        </Item>
        <Item label='岗位' name='job'>
          <Input placeholder='请输入岗位' />
        </Item>
        <Item label='状态' name='state'>
          <Select>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Item>
        <Item label='系统角色' name='roleList'>
          <Input placeholder='请选择系统角色' />
        </Item>
        <Item label='用户头像'>
          <Upload
            showUploadList={false}
            listType='picture-card'
            headers={{
              Authorization: 'Bearer ' + storage.get('token'),
              icode: '36596D115B26C3BE'
            }}
            action='/api/users/upload'
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {img ? (
              <img src={img} alt='avatar' width='100%' />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: '5px' }}>上传头像</div>
              </div>
            )}
          </Upload>
        </Item>
      </Form>
    </Modal>
  )
}

export default CreateUser
