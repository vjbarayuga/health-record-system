export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Simple test without any imports
  res.status(200).json({
    message: 'Test function working!',
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown'
  })
}