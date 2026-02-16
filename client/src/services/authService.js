import axios from 'axios'

// Use environment variable for API URL or default to relative path
const API_BASE_URL = import.meta.env.VITE_API_URL || ''
const API_URL = `${API_BASE_URL}/api/auth`

// Register user
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData)
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData)
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
export const logout = () => {
  localStorage.removeItem('user')
}

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

// Get auth header
export const getAuthHeader = () => {
  const user = getCurrentUser()
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` }
  }
  return {}
}
