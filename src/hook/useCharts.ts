import React, { RefObject, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
const useCharts = ():[RefObject<HTMLDivElement>,echarts.ECharts | undefined] => {
  const domRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.ECharts>()
  useEffect(() => {
    if (domRef.current) {
      const myChart = echarts.init(domRef.current)
      setChartInstance(myChart)
    }
  },[])
  return [domRef, chartInstance]
}

export default useCharts
