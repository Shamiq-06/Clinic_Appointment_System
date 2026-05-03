const express = require('express')
const {
  createDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctors,
  seedDoctors,
  updateDoctor,
} = require('../controllers/doctorController')
const { adminOnly, protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', getDoctors)
router.post('/seed/sample', protect, adminOnly, seedDoctors)
router.get('/:id', getDoctorById)
router.post('/', protect, adminOnly, createDoctor)
router.put('/:id', protect, adminOnly, updateDoctor)
router.delete('/:id', protect, adminOnly, deleteDoctor)

module.exports = router
