import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { Button, Card } from 'antd'

const option = {
  legend: {
    show: true
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      name: '订单'
    },
    {
      data: [10, 200, 230, 240, 180, 190, 300],
      type: 'line',
      name: '流水'
    }
  ]
}
const BaseEcharts = () => {
  const ref = useRef(null)
  useEffect(() => {
    const myChart = echarts.init(ref.current)
    myChart.setOption(option)
  }, [])
  return (
    <Card title='订单和流水走势图' extra={<Button type='primary'>刷新</Button>}>
      <div
        className='content'
        ref={ref}
        style={{ width: '1100px', height: '400px' }}
      ></div>
    </Card>
  )
}

export default BaseEcharts
