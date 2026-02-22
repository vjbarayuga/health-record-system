import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connectDB from '../config/db.js'
import authRoutes from '../routes/authRoutes.js'
import healthRecordRoutes from '../routes/healthRecordRoutes.js'

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

// Connect to DB once per cold start in serverless
let dbConnected = false
app.use(async (req, res, next) => {
  if (!dbConnected && process.env.MONGODB_URI) {
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection failed:', error.message)
      req.dbError = error
    }
  }
  next()
})

app.use((req, res, next) => {
  if (req.path.startsWith('/api') && req.path !== '/api' && !dbConnected) {
    return res.status(503).json({
      message: 'Database unavailable',
      error: req.dbError?.message || 'MongoDB connection not ready'
    })
  }
  next()
})

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

app.get('/favicon.ico', (req, res) => {
  res.status(204).end()
})

// Seed endpoint - direct handler
app.post('/api/seed', async (req, res) => {
  try {
    console.log('Seed endpoint called')
    
    // Try to connect to DB and seed
    const connectDB = (await import('../config/db.js')).default
    const HealthRecord = (await import('../models/HealthRecord.js')).default
    
    // Connect DB
    await connectDB()
    
    // Check if records exist
    const count = await HealthRecord.countDocuments()
    if (count > 0) {
      return res.status(400).json({
        success: false,
        message: `Database already contains ${count} records`
      })
    }
    
    // Sample data
    const sampleRecords = [
      {
        personalInfo: {
          lastname: 'Dela Cruz',
          firstname: 'Maria',
          middlename: 'Santos',
          age: 20,
          courseAndYear: 'BS Nursing - 2nd Year',
          birthday: '2005-05-15',
          sex: 'Female',
          permanentAddress: '123 Main Street, Manila, Philippines',
          phoneNumber: '09171234567',
          civilStatus: 'Single',
          religion: 'Roman Catholic',
          contactPerson: 'Juan Dela Cruz',
          contactAddress: '123 Main Street, Manila, Philippines',
          contactNumber: '09189876543'
        },
        assessment: 'Healthy female student',
        remarks: 'No concerns'
      },
      {
        personalInfo: {
          lastname: 'Santos',
          firstname: 'Juan',
          middlename: 'Reyes',
          age: 22,
          courseAndYear: 'BS Information Technology - 3rd Year',
          birthday: '2003-08-22',
          sex: 'Male',
          permanentAddress: '456 Oak Avenue, Quezon City, Philippines',
          phoneNumber: '09095551234',
          civilStatus: 'Single',
          religion: 'Roman Catholic',
          contactPerson: 'Rosa Santos',
          contactAddress: '456 Oak Avenue, Quezon City, Philippines',
          contactNumber: '09215556789'
        },
        assessment: 'Healthy male student',
        remarks: 'Follow up recommended'
      }
    ]
    
    // Insert
    const result = await HealthRecord.insertMany(sampleRecords)
    
    res.json({
      success: true,
      message: `Successfully seeded ${result.length} health records`,
      insertedCount: result.length,
      records: result.map(r => ({
        id: r._id,
        name: `${r.personalInfo.firstname} ${r.personalInfo.lastname}`,
        courseAndYear: r.personalInfo.courseAndYear
      }))
    })
  } catch (error) {
    console.error('Seed error:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to seed database',
      error: error.message
    })
  }
})

// Import and use routes
try {
  app.use('/api/auth', authRoutes)
  app.use('/api/health-records', healthRecordRoutes)
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

// Export for Vercel
export default app



