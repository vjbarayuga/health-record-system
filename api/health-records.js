import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

// Database connection
const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return
    }
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Database connection error:', error)
    throw error
  }
}

// Health Record model
const healthRecordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicalHistory: { type: String },
  allergies: { type: String },
  currentMedications: { type: String },
  emergencyContact: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phoneNumber: { type: String, required: true }
  },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true })

const HealthRecord = mongoose.models.HealthRecord || mongoose.model('HealthRecord', healthRecordSchema)

// Auth middleware
const authenticate = (req) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided')
  }
  
  const token = authHeader.replace('Bearer ', '')
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  return decoded.userId
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    await connectDB()
    
    if (req.method === 'GET') {
      // Get all health records for authenticated user
      const userId = authenticate(req)
      const records = await HealthRecord.find({ studentId: userId }).sort({ createdAt: -1 })
      res.status(200).json(records)
    } 
    else if (req.method === 'POST') {
      // Create new health record
      const userId = authenticate(req)
      const recordData = { ...req.body, studentId: userId }
      
      const newRecord = new HealthRecord(recordData)
      await newRecord.save()
      
      res.status(201).json(newRecord)
    } 
    else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Health records error:', error)
    if (error.message === 'No token provided' || error.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Unauthorized' })
    } else {
      res.status(500).json({ message: 'Server error', error: error.message })
    }
  }
}