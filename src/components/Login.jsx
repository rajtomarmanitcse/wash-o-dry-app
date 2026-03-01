import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (login(username, password)) {
      return
    }
    setError('Invalid username or password.')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Wash-O-Dry</h1>
        <p className="login-subtitle">Sign in to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="primary-button login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
