import React, { useEffect, useRef, useState } from 'react'

const useDebounce = <T>(val: T, ms: number): T => {
  const [de, setDe] = useState(val)
  const timer = useRef<number>()
  useEffect(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        setDe(val)
      }, ms)
    }
    return () => clearTimeout(timer.current)
  }, [])
  return de
}

export default useDebounce

const deleteEmptyKeys = (obj: Record<string, unknown>) => {
  const objArr = Object.entries(obj)
  const newObjArr = []
  objArr.forEach(item => {
    const [key, value] = item
    if (value === '' || value === undefined || value === null) {
    } else {
      newObjArr.push(item)
    }
  })
}
