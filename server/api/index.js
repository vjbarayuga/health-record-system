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

// ============ MOST CRITICAL: CORS FIRST ============
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
}

// Apply CORS globally
app.use(cors(corsOptions))

// Explicitly handle OPTIONS for all routes
app.options('*', cors(corsOptions))

// Raw header fallback
app.use((req, res, next) => {
  const origin = req.headers.origin || '*'
  res.header('Access-Control-Allow-Origin', origin)
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With')
  res.header('Access-Control-Max-Age', '86400')
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

// ============ ROUTES (WITH EXPLICIT CORS) ============
// Wrapped with CORS to be absolutely sure
app.use('/api/auth', cors(corsOptions), authRoutes)
app.use('/api/health-records', cors(corsOptions), healthRecordRoutes)
app.use('/api/seed', cors(corsOptions), seedRoutes)

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
