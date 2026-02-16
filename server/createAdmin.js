import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@health.com' })
    
    if (adminExists) {
      console.log('Admin user already exists!')
      console.log('Email: admin@health.com')
      process.exit(0)
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@health.com',
      password: 'admin123',
      role: 'admin'
    })

    console.log('Admin user created successfully!')
    console.log('Email: admin@health.com')
    console.log('Password: admin123')
    console.log('\nPlease change the password after first login!')

    process.exit(0)
  } catch (error) {
    console.error('Error creating admin user:', error)
    process.exit(1)
  }
}

createAdminUser()
