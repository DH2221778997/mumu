import { create } from 'zustand'
import { User } from '../types/api'
interface UserInfoState {
  userInfo: User.UserItem
  updateUserInfo: (userInfo: User.UserItem) => void
}

export const useUserInfoStore = create<UserInfoState>(set => ({
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: [],
    state: 0,
    mobile: 0,
    job: '',
    role: 0,
    roleList: [],
    deptName: '',
    userImg: ''
  },
  updateUserInfo: userInfo => set({ userInfo: userInfo })
}))
