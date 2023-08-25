import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { Button, Card } from 'antd'
import useEcharts from './useEcharts'

const option1 = {
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
      data: [
        { value: 1048, name: '北京' },
        { value: 735, name: '上海' },
        { value: 580, name: '深圳' },
        { value: 484, name: '广州' },
        { value: 300, name: '杭州' },
        { value: 300, name: '武汉' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
const option2 = {
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
      data: [
        { value: 1048, name: '北京' },
        { value: 735, name: '上海' },
        { value: 580, name: '深圳' },
        { value: 484, name: '广州' },
        { value: 300, name: '杭州' },
        { value: 300, name: '武汉' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
const BaseEcharts2 = () => {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  useEcharts(ref1, option1)
  useEcharts(ref2, option2)
  return (
    <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
      <div style={{ display: 'flex' }}>
        <div
          className='content'
          ref={ref1}
          style={{ width: '550px', height: '400px' }}
        ></div>
        <div
          className='content'
          ref={ref2}
          style={{ width: '550px', height: '400px' }}
        ></div>
      </div>
    </Card>
  )
}

export default BaseEcharts2
