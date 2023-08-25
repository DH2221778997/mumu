import React, { useEffect } from 'react'
import * as echarts from 'echarts'
const useEcharts = (domRef, option) => {
  useEffect(() => {
    if (domRef.current) {
      const myChart = echarts.init(domRef.current)
      myChart.setOption(option)
    }
  }, [])
}

export default useEcharts
