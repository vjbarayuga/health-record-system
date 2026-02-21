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

// ============ CRITICAL: CORS MUST BE FIRST ============
// Handle preflight OPTIONS requests immediately
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: false,
  optionsSuccessStatus: 200
}))

// Explicit CORS headers as backup
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.set('Access-Control-Max-Age', '86400')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

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
    console.error('DB init failed:', error.message)
  }
}

// Connect DB on first request
app.use(async (req, res, next) => {
  if (!dbConnected) {
    await initDB()
  }
  next()
})

// ============ ROOT & HEALTH CHECK ============
app.get('/', (req, res) => {
  res.json({
    message: 'Student Health Record System API',
    status: 'running',
    timestamp: new Date().toISOString()
  })
})

app.get('/api', (req, res) => {
  res.json({
    message: 'Student Health Record System API',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// ============ ROUTES ============
app.use('/api/auth', authRoutes)
app.use('/api/health-records', healthRecordRoutes)
app.use('/api/seed', seedRoutes)

// ============ 404 & ERROR HANDLERS ============
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Endpoint not found', 
    path: req.path,
    method: req.method
  })
})

app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  res.status(500).json({ 
    message: 'Internal server error', 
    error: err.message 
  })
})

export default app
