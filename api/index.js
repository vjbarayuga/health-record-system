export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'GET') {
    res.status(200).json({ 
      message: 'Student Health Record System API',
      status: 'running',
      timestamp: new Date().toISOString(),
      endpoints: {
        auth: '/api/auth',
        healthRecords: '/api/health-records'
      }
    })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}