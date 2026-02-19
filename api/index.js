export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  res.status(200).json({ 
    message: 'Student Health Record System API',
    status: 'running', 
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /api - this endpoint',
      'GET /api/test - test function',
      'POST /api/auth/login - user login',
      'POST /api/auth/register - user registration', 
      'GET|POST /api/health-records - health records'
    ],
    environment: {
      nodeEnv: process.env.NODE_ENV,
      hasMongoUri: !!process.env.MONGODB_URI,
      hasJwtSecret: !!process.env.JWT_SECRET
    }
  })
}