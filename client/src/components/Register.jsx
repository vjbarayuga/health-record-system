import React, { useState } from 'react'
import { register } from '../services/authService'

const Register = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'staff'
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const { confirmPassword, ...registerData } = formData
      const userData = await register(registerData)
      onRegisterSuccess(userData)
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md border border-white/30">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-3xl font-bold text-ispsc-maroon mb-2">Register</h2>
          <p className="text-gray-600">Create a new account</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
            <div className="flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Email Address</label>
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
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password (min. 6 characters)"
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all duration-300 bg-white"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-ispsc-maroon text-white py-3 rounded-lg font-bold text-base shadow-lg hover:bg-ispsc-dark-maroon hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button 
              className="text-ispsc-maroon font-semibold hover:underline focus:outline-none" 
              onClick={onSwitchToLogin}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
