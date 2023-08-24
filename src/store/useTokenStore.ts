import { create } from 'zustand'

interface TokenState {
  token: string;
  updateToken: (newToken: string) => void;
}

const useTokenStore = create<TokenState>((set) => ({
  token: '',
  updateToken:(newToken) => set(() => ({token: newToken})),
  deleteToken:() => set(() => ({token:''}))
}))
