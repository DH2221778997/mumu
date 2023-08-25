import { create } from 'zustand'
import storage from '../utils/storage'
interface UserTokenState {
  token: string | null
  updateToken: (newToken: string) => void
  deleteToken: () => void
}

export const useTokenStore = create<UserTokenState>(set => ({
  token: storage.get('token'),
  updateToken: newToken => {
    storage.set('token', newToken)
    set(() => ({ token: newToken }))
  },
  deleteToken: () => {
    storage.remove('token')
    set(() => ({ token: '' }))
  }
}))
