const Appointment = require('../models/Appointment')
const Doctor = require('../models/Doctor')

const createAppointment = async (req, res, next) => {
  try {
    const { doctor, date, timeSlot, name, email, phone, reason } = req.body

    if (!doctor || !date || !timeSlot || !name || !email || !phone) {
      return res.status(400).json({ message: 'Doctor, date, timeSlot, name, email, and phone are required' })
    }

    const doctorExists = await Doctor.findById(doctor)
    if (!doctorExists) {
      return res.status(404).json({ message: 'Doctor not found' })
    }

    const duplicateBooking = await Appointment.findOne({ doctor, date, timeSlot })
    if (duplicateBooking) {
      return res.status(409).json({ message: 'This doctor is already booked for the selected date and time slot' })
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      date,
      timeSlot,
      name,
      email,
      phone,
      reason,
      status: 'pending',
    })

    const populatedAppointment = await appointment.populate([
      { path: 'patient', select: 'name email role' },
      { path: 'doctor', select: 'name specialty email phone' },
    ])

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: populatedAppointment,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'This doctor is already booked for the selected date and time slot' })
    }
    next(error)
  }
}

const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email role')
      .populate('doctor', 'name specialty email phone')
      .sort({ createdAt: -1 })

    res.json({ count: appointments.length, appointments })
  } catch (error) {
    next(error)
  }
}

const getMyAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate('doctor', 'name specialty email phone')
      .sort({ createdAt: -1 })

    res.json({ count: appointments.length, appointments })
  } catch (error) {
    next(error)
  }
}

const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const allowedStatuses = ['pending', 'approved', 'rejected', 'cancelled']

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Status must be pending, approved, rejected, or cancelled' })
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate('patient', 'name email role')
      .populate('doctor', 'name specialty email phone')

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    res.json({ message: 'Appointment status updated successfully', appointment })
  } catch (error) {
    next(error)
  }
}

const deleteAppointment = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, patient: req.user._id }

    const appointment = await Appointment.findOneAndDelete(query)

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found or access denied' })
    }

    res.json({ message: 'Appointment deleted successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createAppointment,
  getAppointments,
  getMyAppointments,
  updateAppointmentStatus,
  deleteAppointment,
}
