export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  return res.status(200).json({
    message: 'Hello from Vercel API!',
    timestamp: new Date().toISOString(),
    status: 'working',
    method: req.method,
    url: req.url
  })
}