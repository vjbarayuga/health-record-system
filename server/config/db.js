import mongoose from 'mongoose'

let isConnected = false

// Fail fast if DB is unavailable instead of buffering operations
mongoose.set('bufferCommands', false)

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection')
    return
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 20000,
      connectTimeoutMS: 20000
    })
    isConnected = conn.connection.readyState === 1
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`)
    throw error
  }
}
export default connectDB