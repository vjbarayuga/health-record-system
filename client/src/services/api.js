import axios from 'axios'
import { getAuthHeader } from './authService'

// Use environment variable for API URL or default to relative path
const API_BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD ? '' : 'http://localhost:5000'
)
const API_URL = `${API_BASE_URL}/api/health-records`

export const getHealthRecords = async () => {
  try {
    const response = await axios.get(API_URL, { headers: getAuthHeader() })
    return response.data
  } catch (error) {
    console.error('Error fetching health records:', error)
    throw error
  }
}

export const getHealthRecordById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() })
    return response.data
  } catch (error) {
    console.error('Error fetching health record:', error)
    throw error
  }
}

export const createHealthRecord = async (data) => {
  try {
    const response = await axios.post(API_URL, data, { headers: getAuthHeader() })
    return response.data
  } catch (error) {
    console.error('Error creating health record:', error)
    throw error
  }
}

export const updateHealthRecord = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data, { headers: getAuthHeader() })
    return response.data
  } catch (error) {
    console.error('Error updating health record:', error)
    throw error
  }
}

export const deleteHealthRecord = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() })
    return response.data
  } catch (error) {
    console.error('Error deleting health record:', error)
    throw error
  }
}
