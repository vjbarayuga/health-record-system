import React, { useState, useEffect } from 'react'
import HealthRecordForm from './components/HealthRecordForm'
import HealthRecordsList from './components/HealthRecordsList'
import HealthRecordDetail from './components/HealthRecordDetail'
import Login from './components/Login'
import Register from './components/Register'
import SeedDatabase from './components/SeedDatabase'
import { getHealthRecords, deleteHealthRecord } from './services/api'
import { getCurrentUser, logout } from './services/authService'

function App() {
  const [user, setUser] = useState(null)
  const [showRegister, setShowRegister] = useState(false)
  const [records, setRecords] = useState([])
  const [editingRecord, setEditingRecord] = useState(null)
  const [viewingRecord, setViewingRecord] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showAdminMenu, setShowAdminMenu] = useState(false)
  const [showSeedPanel, setShowSeedPanel] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  useEffect(() => {
    if (user) {
      fetchRecords()
    }
  }, [user])

  const fetchRecords = async () => {
    try {
      const data = await getHealthRecords()
      setRecords(data)
    } catch (error) {
      console.error('Error fetching records:', error)
      if (error.response?.status === 401) {
        handleLogout()
      }
    }
  }

  const handleLoginSuccess = (userData) => {
    setUser(userData)
  }

  const handleRegisterSuccess = (userData) => {
    setUser(userData)
    setShowRegister(false)
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    setRecords([])
    setShowForm(false)
    setViewingRecord(null)
    setEditingRecord(null)
    setShowAdminMenu(false)
    setShowSeedPanel(false)
  }

  const handleEdit = (record) => {
    setEditingRecord(record)
    setViewingRecord(null)
    setShowForm(true)
  }

  const handleView = (record) => {
    setViewingRecord(record)
    setShowForm(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteHealthRecord(id)
        setViewingRecord(null)
        fetchRecords()
      } catch (error) {
        console.error('Error deleting record:', error)
      }
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingRecord(null)
    fetchRecords()
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingRecord(null)
  }

  const handleBackToList = () => {
    setViewingRecord(null)
  }

  // Show login/register if not authenticated
  if (!user) {
    return showRegister ? (
      <Register 
        onRegisterSuccess={handleRegisterSuccess}
        onSwitchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <Login onLoginSuccess={handleLoginSuccess} />
    )
  }

  return (
    <div className="min-h-screen p-5 relative">
      {/* Header */}
      <header className="relative z-50 bg-gradient-to-r from-white/98 to-white/95 p-6 px-10 rounded-2xl shadow-xl mb-8 border border-white/30 backdrop-blur-md hover:shadow-2xl transition-all duration-300 max-w-7xl mx-auto">
        <div className="flex justify-between items-center gap-5 flex-wrap">
          <h1 className="text-ispsc-maroon text-3xl font-bold tracking-tight flex items-center gap-3">
            <span className="text-4xl drop-shadow-md">🏥</span>
            Student Health Record System
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            {(showForm || viewingRecord) && (
              <button 
                className="bg-gray-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:bg-gray-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-300 whitespace-nowrap" 
                onClick={() => {
                  setShowForm(false)
                  setViewingRecord(null)
                  setEditingRecord(null)
                }}
              >
                ← View All Records
              </button>
            )}
            <div className="relative">
              <button
                className="bg-ispsc-maroon text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow hover:bg-ispsc-dark-maroon hover:-translate-y-0.5 transition-all duration-300"
                onClick={() => setShowAdminMenu((prev) => !prev)}
              >
                Admin Menu
              </button>
                {showAdminMenu && (
                  <div className="absolute right-0 mt-3 w-[360px] bg-white/98 border border-ispsc-maroon/10 rounded-2xl shadow-xl p-5 z-[200]">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-bold text-gray-800">Admin Menu</h2>
                    <button
                      className="text-xs text-gray-600 hover:text-gray-900 font-semibold"
                      onClick={() => setShowAdminMenu(false)}
                    >
                      Close
                    </button>
                  </div>
                  <button
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-ispsc-maroon/10 hover:text-ispsc-maroon transition"
                    onClick={() => {
                      setShowSeedPanel(true)
                      setShowAdminMenu(false)
                    }}
                  >
                    Seed Database
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full border border-ispsc-maroon/10 shadow-md">
              <span className="font-semibold text-gray-800 text-sm">👤 {user.name}</span>
              <span className="text-ispsc-maroon text-xs uppercase font-semibold tracking-wide px-2 py-1 bg-ispsc-maroon/10 rounded-xl">
                {user.role}
              </span>
              <button 
                className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow hover:bg-red-700 hover:-translate-y-0.5 transition-all duration-300" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {showSeedPanel && (
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white/95 border border-ispsc-maroon/10 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Seed Database</h2>
              <button
                className="text-sm text-gray-600 hover:text-gray-900 font-semibold"
                onClick={() => setShowSeedPanel(false)}
              >
                Close
              </button>
            </div>
            <SeedDatabase />
          </div>
        </div>
      )}


      {/* Main Content */}
      <main className="bg-white/98 p-10 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md min-h-[400px] max-w-7xl mx-auto">
        {viewingRecord ? (
          <HealthRecordDetail 
            record={viewingRecord}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBack={handleBackToList}
          />
        ) : !showForm ? (
          <>
            <button 
              className="bg-ispsc-maroon text-white px-6 py-3 rounded-lg font-semibold text-base shadow-lg hover:bg-ispsc-dark-maroon hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 transition-all duration-300 mb-6" 
              onClick={() => setShowForm(true)}
            >
              Add New Health Record
            </button>
            <HealthRecordsList 
              records={records} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              onView={handleView}
            />
          </>
        ) : (
          <HealthRecordForm 
            record={editingRecord} 
            onSuccess={handleFormSuccess}
            onCancel={handleCancel}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <p className="text-gray-700">
            © 2026 <span className="text-ispsc-maroon font-bold">Ilocos Sur Polytechnic State College</span>
          </p>
          <div className="mt-2">
            <span className="text-sm text-gray-600">Student Health Record System</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
