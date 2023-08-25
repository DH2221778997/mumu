import { Avatar, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import BaseEcharts1 from '../../components/echarts/base-echarts1'
import BaseEcharts2 from '../../components/echarts/base-echarts2'
import BaseEcharts3 from '../../components/echarts/base-echarts3'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import { stateFormatter } from '../../utils'
import api from '../../api/service'
import { OrderType } from '../../types/api'
const Dashboard = () => {
  const userInfo = useUserInfoStore(state => state.userInfo)
  const [reportData, setReportData] = useState<OrderType.ReportData>()
  const getReportData = async () => {
    const res = await api.getReportData()
    setReportData(res)
  }
  useEffect(() => {
    getReportData()
  }, [])
  return (
    <div className={styles.dashboard}>
      <div className={styles['user-info']}>
        <img src={userInfo.userImg} alt='' />
        <Descriptions title={`欢迎${userInfo.userName}同学，每天都要开心`}>
          <Descriptions.Item label='用户ID'>
            {userInfo.userId}
          </Descriptions.Item>
          <Descriptions.Item label='邮箱'>
            {userInfo.userEmail}
          </Descriptions.Item>
          <Descriptions.Item label='状态'>
            {stateFormatter(userInfo.state)}
          </Descriptions.Item>
          <Descriptions.Item label='手机号'>
            {userInfo.mobile}
          </Descriptions.Item>
          <Descriptions.Item label='岗位'>{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label='部门'>
            {userInfo.deptName}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className={styles.title}>司机数量</div>
          <div className={styles.data}>{reportData?.driverCount}个</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>总流水</div>
          <div className={styles.data}>{reportData?.totalMoney}元</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>总订单</div>
          <div className={styles.data}>{reportData?.orderCount}单</div>
        </div>
        <div className={styles.card}>
          <div className={styles.title}>开通城市</div>
          <div className={styles.data}>{reportData?.cityNum}座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <BaseEcharts1 />
      </div>
      <div className={styles.chart}>
        <BaseEcharts2 />
      </div>
      <div className={styles.chart}>
        <BaseEcharts3 />
      </div>
    </div>
  )
}

export default Dashboard
