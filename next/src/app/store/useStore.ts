import { create } from 'zustand'

interface UserState {
  nombre: string
  rol: string
  setUser: (name: string, role: string) => void
  clearUser: () => void
}

export const useStore = create<UserState>((set) => ({
  nombre: '',
  rol: '',
  setUser: (nombre, rol) => set({ nombre, rol }),
  clearUser: () => set({ nombre: '', rol: '' })
}))