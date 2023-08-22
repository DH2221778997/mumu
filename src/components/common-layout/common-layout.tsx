import React from 'react'
import { Outlet } from 'react-router-dom'
const CommonLayout = () => {
  return (
    <>
      <div>CommonLayout</div>
      <Outlet />
    </>
  )
}

export default CommonLayout
