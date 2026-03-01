import { createContext, useContext, useState, useEffect } from 'react'

const AUTH_KEY = 'wash-o-dry-auth'

// Valid users (username / password)
const VALID_USERS = [
  { username: 'wash-o-dry', password: 'ddnagar@2026' },
  { username: 'doctrdang', password: 'Rajtomar@1234' },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.username) setUser(parsed)
      } catch {
        localStorage.removeItem(AUTH_KEY)
      }
    }
  }, [])

  const login = (username, password) => {
    const u = (username || '').trim()
    const p = (password || '').trim()
    const found = VALID_USERS.find((u2) => u2.username === u && u2.password === p)
    if (found) {
      const data = { username: u }
      setUser(data)
      localStorage.setItem(AUTH_KEY, JSON.stringify(data))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
