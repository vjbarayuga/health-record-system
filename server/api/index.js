import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()

// ============ CORS - SIMPLE & BULLETPROOF ============
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.options('*', cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// ============ BASIC ROUTES (NO COMPLEX IMPORTS) ============
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

// ============ LOAD ROUTES ASYNCHRONOUSLY ============
(async () => {
  try {
    console.log('Loading routes...')
    
    const { default: authRoutes } = await import('../routes/authRoutes.js')
    const { default: healthRecordRoutes } = await import('../routes/healthRecordRoutes.js')
    const { default: seedRoutes } = await import('../routes/seedRoutes.js')
    
    app.use('/api/auth', authRoutes)
    app.use('/api/health-records', healthRecordRoutes)
    app.use('/api/seed', seedRoutes)
    
    console.log('Routes loaded successfully')
  } catch (error) {
    console.error('Failed to load routes:', error.message)
    console.error('Stack:', error.stack)
    
    // Provide fallback responses
    app.post('/api/auth/login', (req, res) => {
      res.status(503).json({ 
        message: 'Auth service temporarily unavailable',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    })
    
    app.post('/api/auth/register', (req, res) => {
      res.status(503).json({ 
        message: 'Auth service temporarily unavailable',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    })
    
    app.get('/api/health-records', (req, res) => {
      res.status(503).json({ 
        message: 'Health records service temporarily unavailable',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    })
  }
})()

// ============ 404 HANDLER ============
app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found',
    path: req.path,
    method: req.method
  })
})

// ============ ERROR HANDLER ============
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

export default app
