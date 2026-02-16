import React, { useState } from 'react'
import { login } from '../services/authService'

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const userData = await login(formData)
      onLoginSuccess(userData)
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md border border-white/30">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🏥</div>
          <h2 className="text-3xl font-bold text-ispsc-maroon mb-2">Welcome Back</h2>
          <p className="text-lg text-gray-700 font-semibold">Ilocos Sur Polytechnic State College</p>
          <p className="text-sm text-gray-500 mt-1">Student Health Record System</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <div className="flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              📧 Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              🔒 Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all duration-300"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-ispsc-maroon text-white py-3 rounded-lg font-bold text-base shadow-lg hover:bg-ispsc-dark-maroon hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              '🚀 Login'
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-ispsc-maroon/5 rounded-lg border border-ispsc-maroon/20">
          <p className="text-center font-semibold text-gray-700 mb-2">💡 Demo Credentials</p>
          <p className="text-center text-sm text-gray-600">
            📧 Email: admin@health.com<br />
            🔑 Password: admin123
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
