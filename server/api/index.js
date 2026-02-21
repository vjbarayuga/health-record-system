import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()

// ============ CRITICAL: CORS FIRST - EVERYTHING ELSE DEPENDS ON THIS ============
// Set CORS headers BEFORE any other middleware
app.use((req, res, next) => {
  // Allow all origins
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Max-Age', '86400')
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  
  next()
})

// Redundant but safe
app.use(cors({ origin: '*', credentials: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// ============ HEALTH CHECKS ============
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

// ============ AUTH ROUTES - BUILT IN (NO IMPORTS) ============
app.post('/api/auth/login', (req, res) => {
  try {
    res.status(500).json({
      message: 'Login route not yet implemented',
      details: 'Auth routes module failed to load'
    })
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message })
  }
})

app.post('/api/auth/register', (req, res) => {
  try {
    res.status(500).json({
      message: 'Register route not yet implemented',
      details: 'Auth routes module failed to load'
    })
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message })
  }
})

app.get('/api/auth/me', (req, res) => {
  try {
    res.status(500).json({
      message: 'Auth routes not yet implemented',
      details: 'Auth routes module failed to load'
    })
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message })
  }
})

app.post('/api/auth/logout', (req, res) => {
  try {
    res.status(500).json({
      message: 'Logout route not yet implemented',
      details: 'Auth routes module failed to load'
    })
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message })
  }
})

// ============ HEALTH RECORDS ROUTES - BUILT IN (NO IMPORTS) ============
app.get('/api/health-records', (req, res) => {
  try {
    res.status(500).json({
      message: 'Health records not yet implemented',
      details: 'Health records module failed to load'
    })
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message })
  }
})

app.post('/api/health-records', (req, res) => {
  try {
    res.status(500).json({
      message: 'Create health record not yet implemented',
      details: 'Health records module failed to load'
    })
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message })
  }
})

// ============ SEED ROUTE - BUILT IN (NO IMPORTS) ============
app.post('/api/seed', (req, res) => {
  try {
    res.status(500).json({
      message: 'Seeding not yet implemented',
      details: 'Seed module failed to load'
    })
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message })
  }
})

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
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  })
})

export default app
