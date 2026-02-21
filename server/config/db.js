import mongoose from 'mongoose'

let isConnected = false

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection')
    return
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    })
    isConnected = conn.connection.readyState === 1
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`)
    throw error
  }
}
