import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import healthRecordRoutes from '../routes/healthRecordRoutes.js'
import authRoutes from '../routes/authRoutes.js'
import seedRoutes from '../routes/seedRoutes.js'
import connectDB from '../config/db.js'

dotenv.config()

const app = express()

// ============ CORS SETUP (CRITICAL - MUST BE FIRST) ============
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With')
  res.header('Access-Control-Max-Age', '86400')
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(cors({ origin: '*', credentials: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// ============ DATABASE ============
let dbConnected = false

const initDB = async () => {
  if (dbConnected) return
  
  try {
    await connectDB()
    dbConnected = true
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
  }
}

// Connect DB on first request
app.use(async (req, res, next) => {
  if (!dbConnected) {
    await initDB()
  }
  next()
})

// ============ ROUTES ============
// Health check - no DB needed
app.get('/api', (req, res) => {
  res.json({
    message: 'Student Health Record System API',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// Import actual routes
app.use('/api/auth', authRoutes)
app.use('/api/health-records', healthRecordRoutes)
app.use('/api/seed', seedRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found', path: req.path })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ message: 'Internal server error', error: err.message })
})

export default app
