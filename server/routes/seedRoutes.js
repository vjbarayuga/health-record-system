import express from 'express'
import { seedDatabase, seedDatabaseForce } from '../controllers/seedController.js'

const router = express.Router()

// Handle both POST / and POST /?force=true
router.post('/', (req, res, next) => {
  if (req.query.force === 'true') {
    seedDatabaseForce(req, res)
  } else {
    seedDatabase(req, res)
  }
})

export default router
