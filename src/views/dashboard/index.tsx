import { Avatar, Button, Card, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import { stateFormatter } from '../../utils'
import api from '../../api/service'
import { OrderType } from '../../types/api'
import useCharts from '../../hook/useCharts'
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
  const [lineChartRef, lineChartInstance] = useCharts()
  const [pieChart1Ref, pieChart1Instance] = useCharts()
  const [pieChart2Ref, pieChart2Instance] = useCharts()
  const [radarChartRef, radarChartInstance] = useCharts()
  //渲染折线图
  const renderLinechart = async () => {
    const res = await api.getLineData()
    lineChartInstance?.setOption({
      legend: {
        show: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: res.label
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20
      },
      series: [
        {
          data: res.order,
          type: 'line',
          name: '订单'
        },
        {
          data: res.money,
          type: 'line',
          name: '流水'
        }
      ]
    })
  }
  //渲染饼图1
  const renderPiechart1 = async () => {
    const res = await api.getPieCityData()
    pieChart1Instance?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          data: res,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
  //渲染饼图2
  const renderPiechart2 = async () => {
    const res = await api.getPieAgeData()
    pieChart2Instance?.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: [50, 170],
          roseType: 'area',
          data: res,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
  //渲染雷达图
  const renderRadarchart = async () => {
    const res = await api.getRadarData()
    radarChartInstance?.setOption({
      legend: {
        data: ['司机模型诊断']
      },
      radar: {
        indicator: res.indicator
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: res.data
        }
      ]
    })
  }
  useEffect(() => {
    renderLinechart()
    renderPiechart1()
    renderPiechart2()
    renderRadarchart()
  }, [
    lineChartInstance,
    pieChart1Instance,
    pieChart2Instance,
    radarChartInstance
  ])

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
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={renderLinechart}>
              刷新
            </Button>
          }
        >
          <div
            className='content'
            ref={lineChartRef}
            style={{ width: '1100px', height: '400px' }}
          ></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='司机分布'
          extra={
            <Button
              type='primary'
              onClick={() => {
                renderPiechart1()
                renderPiechart2()
              }}
            >
              刷新
            </Button>
          }
        >
          <div style={{ display: 'flex' }}>
            <div
              className='content'
              ref={pieChart1Ref}
              style={{ width: '550px', height: '400px' }}
            ></div>
            <div
              className='content'
              ref={pieChart2Ref}
              style={{ width: '550px', height: '400px' }}
            ></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='模型诊断'
          extra={
            <Button type='primary' onClick={renderRadarchart}>
              刷新
            </Button>
          }
        >
          <div
            className='content'
            ref={radarChartRef}
            style={{ width: '1100px', height: '400px' }}
          ></div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
