import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connectDB from './config/db.js'
import healthRecordRoutes from './routes/healthRecordRoutes.js'
import authRoutes from './routes/authRoutes.js'
import seedRoutes from './routes/seedRoutes.js'

dotenv.config()

const app = express()

// Connect to MongoDB (with error handling for serverless)
connectDB().catch(err => {
  console.error('MongoDB connection error:', err.message)
})

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
}

// Middleware
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/health-records', healthRecordRoutes)
app.use('/api/seed', seedRoutes)

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Student Health Record System API',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!', error: err.message })
})

const PORT = process.env.PORT || 5000

// Export for Vercel serverless
export default app

// Only start server if not in serverless environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}
