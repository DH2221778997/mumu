import { create } from 'zustand'

interface MenuState {
  isFold: boolean
  setIsFold: () => void
}

export const useMenuStore = create<MenuState>(set => ({
  isFold: false,
  setIsFold: () => set(state => ({ isFold: !state.isFold }))
}))
