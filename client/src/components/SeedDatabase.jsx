import React, { useState } from 'react'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000')

export default function SeedDatabase() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [seedSecret, setSeedSecret] = useState('')
  const [showSecretInput, setShowSecretInput] = useState(false)
  const [result, setResult] = useState(null)

  const handleSeed = async (force = false) => {
    setLoading(true)
    setMessage('')
    setResult(null)

    try {
      const headers = {}
      if (seedSecret) {
        headers['x-seed-secret'] = seedSecret
      }

      const url = force
        ? `${API_BASE_URL}/api/seed?force=true`
        : `${API_BASE_URL}/api/seed`

      const response = await axios.post(url, {}, { headers })

      setResult(response.data)
      setMessage(response.data.message)
      setSeedSecret('')
      setShowSecretInput(false)
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to seed database'
      setMessage(errorMessage)
      setResult({
        success: false,
        message: errorMessage
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Seed Database</h2>

      <div className="space-y-4">
        {/* Seed Secret Input */}
        {showSecretInput && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seed Secret (if required)
            </label>
            <input
              type="password"
              value={seedSecret}
              onChange={(e) => setSeedSecret(e.target.value)}
              placeholder="Enter seed secret..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Secret Toggle */}
        <button
          onClick={() => setShowSecretInput(!showSecretInput)}
          className="text-sm text-blue-600 hover:text-blue-700 underline"
        >
          {showSecretInput ? 'Hide secret input' : 'Use seed secret?'}
        </button>

        {/* Seed Button */}
        <button
          onClick={() => handleSeed(false)}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-md font-medium transition"
        >
          {loading ? 'Seeding...' : 'Seed Database'}
        </button>

        {/* Force Reseed Button */}
        <button
          onClick={() => {
            if (
              window.confirm(
                'This will DELETE all existing records. Are you sure?'
              )
            ) {
              handleSeed(true)
            }
          }}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-2 rounded-md font-medium transition"
        >
          {loading ? 'Reseeding...' : 'Force Reseed (Clear & Refill)'}
        </button>

        {/* Status Message */}
        {message && (
          <div
            className={`p-3 rounded-md text-sm ${
              result?.success
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {message}
          </div>
        )}

        {/* Result Details */}
        {result?.success && result.records && (
          <div className="bg-gray-50 p-3 rounded-md text-sm">
            <p className="font-semibold text-gray-700 mb-2">Inserted Records:</p>
            <ul className="space-y-1 text-gray-600">
              {result.records.map((record, index) => (
                <li key={index}>
                  • {record.name} - {record.courseAndYear}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result?.existingCount && (
          <div className="bg-yellow-50 p-3 rounded-md text-sm border border-yellow-200">
            <p className="text-yellow-800">
              Database contains {result.existingCount} records. Use "Force Reseed"
              to overwrite.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
