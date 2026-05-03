const express = require('express')
const {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getMyAppointments,
  updateAppointmentStatus,
} = require('../controllers/appointmentController')
const { adminOnly, protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, createAppointment)
router.get('/', protect, adminOnly, getAppointments)
router.get('/my', protect, getMyAppointments)
router.put('/:id/status', protect, adminOnly, updateAppointmentStatus)
router.delete('/:id', protect, deleteAppointment)

module.exports = router
