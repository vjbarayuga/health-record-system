import express from 'express'
import {
  getHealthRecords,
  getHealthRecordById,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord
} from '../controllers/healthRecordController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getHealthRecords)
router.get('/:id', protect, getHealthRecordById)
router.post('/', protect, createHealthRecord)
router.put('/:id', protect, updateHealthRecord)
router.delete('/:id', protect, deleteHealthRecord)

export default router
