import connectDB from '../server/config/db.js'
import HealthRecord from '../server/models/HealthRecord.js'
import jwt from 'jsonwebtoken'

// Auth middleware
const authenticate = (req) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) throw new Error('No token provided')
  
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
      // Get all health records
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
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Health records error:', error)
    if (error.message === 'No token provided' || error.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Unauthorized' })
    } else {
      res.status(500).json({ message: 'Server error' })
    }
  }
}