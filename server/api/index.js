import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import authRoutes from '../routes/authRoutes.js'
import healthRecordRoutes from '../routes/healthRecordRoutes.js'
import seedRoutes from '../routes/seedRoutes.js'

dotenv.config()

const app = express()

// ============ CORS ============
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: false,
  optionsSuccessStatus: 200
}))

app.options('*', cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// ============ EXPLICIT CORS HEADERS ============
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')
  next()
})

// ============ ROUTES ============
app.get('/api', (req, res) => {
  res.json({
    message: 'Student Health Record System API',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

app.get('/', (req, res) => {
  res.json({
    message: 'Student Health Record System API',
    status: 'running',
    timestamp: new Date().toISOString()
  })
})

// Import and use routes
try {
  app.use('/api/auth', authRoutes)
  app.use('/api/health-records', healthRecordRoutes)
  app.use('/api/seed', seedRoutes)
  console.log('Routes loaded successfully')
} catch (error) {
  console.error('Failed to load routes:', error.message)
}

// ============ 404 ============
app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found',
    path: req.path
  })
})

// ============ ERROR HANDLER ============
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  })
})

export default app


