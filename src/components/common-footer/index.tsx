import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import styles from './index.module.scss'
const CommonFooter = () => {
  return (
    <Footer className={styles.footer}>
        <div>海峰主页｜React18+Ts开发通用后台（新课）｜Vue3全栈后台｜Vue全家桶开发小米商城项目</div>
        <div>Copyright@2023 React18通用后台课程 All Rights Reserved</div>
    </Footer>
  )
}

export default CommonFooter