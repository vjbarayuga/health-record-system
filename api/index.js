import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connectDB from '../server/config/db.js'
import healthRecordRoutes from '../server/routes/healthRecordRoutes.js'
import authRoutes from '../server/routes/authRoutes.js'

// Load environment variables
dotenv.config()

const app = express()

// Connect to MongoDB
connectDB()

// CORS Configuration for Vercel
const corsOptions = {
  origin: true, // Allow all origins for serverless
  credentials: true,
  optionsSuccessStatus: 200
}

// Middleware
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/health-records', healthRecordRoutes)

// Health check
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Student Health Record System API',
    status: 'running',
    timestamp: new Date().toISOString()
  })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!', error: err.message })
})

// Export for Vercel
export default app