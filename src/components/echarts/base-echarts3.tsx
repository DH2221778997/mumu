import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { Button, Card } from 'antd'
import useEcharts from './useEcharts'

const option = {
  legend: {
    data: ['司机模型诊断']
  },
  radar: {
    indicator: [
      { name: '服务态度', max: 6500 },
      { name: '在线时长', max: 16000 },
      { name: '接单率', max: 30000 },
      { name: '评分', max: 38000 },
      { name: '关注度', max: 52000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [5000, 14000, 28000, 26000, 42000],
          name: '司机模型诊断'
        }
      ]
    }
  ]
}
const BaseEcharts3 = () => {
  const ref = useRef(null)
  useEcharts(ref, option)
  return (
    <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
      <div
        className='content'
        ref={ref}
        style={{ width: '1100px', height: '400px' }}
      ></div>
    </Card>
  )
}

export default BaseEcharts3
