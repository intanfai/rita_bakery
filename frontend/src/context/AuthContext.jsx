import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('admin_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = async (email, password) => {
    const res = await api.post('/admin/login', { email, password })
    localStorage.setItem('admin_token', res.data.token)
    localStorage.setItem('admin_user', JSON.stringify(res.data.user))
    setAdmin(res.data.user)
  }

  const logout = async () => {
    try {
      await api.post('/admin/logout')
    } catch {
      // biarin aja kalau gagal, tetep lanjut hapus token lokal
    }
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, isLoggedIn: !!admin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  }
  return context
}