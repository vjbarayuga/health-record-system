import HealthRecord from '../models/HealthRecord.js'

// @desc    Get all health records
// @route   GET /api/health-records
// @access  Public
export const getHealthRecords = async (req, res) => {
  try {
    const records = await HealthRecord.find().sort({ createdAt: -1 })
    res.json(records)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching health records', error: error.message })
  }
}

// @desc    Get single health record
// @route   GET /api/health-records/:id
// @access  Public
export const getHealthRecordById = async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id)
    
    if (!record) {
      return res.status(404).json({ message: 'Health record not found' })
    }
    
    res.json(record)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching health record', error: error.message })
  }
}

// @desc    Create new health record
// @route   POST /api/health-records
// @access  Public
export const createHealthRecord = async (req, res) => {
  try {
    const record = new HealthRecord(req.body)
    const savedRecord = await record.save()
    res.status(201).json(savedRecord)
  } catch (error) {
    res.status(400).json({ message: 'Error creating health record', error: error.message })
  }
}

// @desc    Update health record
// @route   PUT /api/health-records/:id
// @access  Public
export const updateHealthRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!record) {
      return res.status(404).json({ message: 'Health record not found' })
    }
    
    res.json(record)
  } catch (error) {
    res.status(400).json({ message: 'Error updating health record', error: error.message })
  }
}

// @desc    Delete health record
// @route   DELETE /api/health-records/:id
// @access  Public
export const deleteHealthRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findByIdAndDelete(req.params.id)
    
    if (!record) {
      return res.status(404).json({ message: 'Health record not found' })
    }
    
    res.json({ message: 'Health record deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting health record', error: error.message })
  }
}
