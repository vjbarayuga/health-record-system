import React, { useState } from 'react'

const HealthRecordsList = ({ records, onEdit, onDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRecords = records.filter(record => {
    const searchLower = searchTerm.toLowerCase()
    return (
      record.personalInfo.lastname.toLowerCase().includes(searchLower) ||
      record.personalInfo.firstname.toLowerCase().includes(searchLower) ||
      record.personalInfo.middlename.toLowerCase().includes(searchLower) ||
      record.personalInfo.courseAndYear.toLowerCase().includes(searchLower) ||
      record.personalInfo.phoneNumber.includes(searchTerm)
    )
  })

  if (records.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-6xl mb-5">📋</div>
        <p className="text-2xl text-gray-700 font-semibold mb-2">No health records found</p>
        <p className="text-gray-500">Click "Add New Health Record" above to create your first record.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-ispsc-maroon flex items-center gap-2">
          <span>📋</span> Health Records
        </h2>
        <div className="relative w-full sm:w-auto sm:min-w-[400px]">
          <input
            type="text"
            placeholder="🔍 Search by name, course, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all duration-300"
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl font-bold" 
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-600">No records found matching "{searchTerm}"</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Showing <strong className="text-ispsc-maroon">{filteredRecords.length}</strong> of <strong className="text-ispsc-maroon">{records.length}</strong> record(s)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record) => (
              <div key={record._id} className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-ispsc-maroon to-ispsc-dark-maroon p-4 text-white">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                    <span>👤</span>
                    {record.personalInfo.lastname}, {record.personalInfo.firstname} {record.personalInfo.middlename}
                  </h3>
                  <div className="flex gap-2">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                      {record.personalInfo.age} yrs
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                      {record.personalInfo.sex}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm">
                  <p className="flex items-start gap-2">
                    <strong className="text-gray-700 min-w-[80px]">📚 Course:</strong>
                    <span className="text-gray-600">{record.personalInfo.courseAndYear}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <strong className="text-gray-700 min-w-[80px]">📱 Contact:</strong>
                    <span className="text-gray-600">{record.personalInfo.phoneNumber}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <strong className="text-gray-700 min-w-[80px]">📍 Address:</strong>
                    <span className="text-gray-600 line-clamp-2">{record.personalInfo.permanentAddress}</span>
                  </p>
                  {record.assessment && (
                    <p className="flex items-start gap-2">
                      <strong className="text-gray-700 min-w-[80px]">🏥 Assessment:</strong>
                      <span className="text-gray-600 line-clamp-2">{record.assessment}</span>
                    </p>
                  )}
                </div>
                <div className="p-4 pt-0 flex gap-2">
                  <button 
                    className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-300 shadow hover:shadow-md" 
                    onClick={() => onView(record)}
                  >
                    👁️ View
                  </button>
                  <button 
                    className="flex-1 bg-ispsc-maroon text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-ispsc-dark-maroon hover:-translate-y-0.5 transition-all duration-300 shadow hover:shadow-md" 
                    onClick={() => onEdit(record)}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-red-600 hover:-translate-y-0.5 transition-all duration-300 shadow hover:shadow-md" 
                    onClick={() => onDelete(record._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default HealthRecordsList
