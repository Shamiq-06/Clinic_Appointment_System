const Doctor = require('../models/Doctor')

const createDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body)
    res.status(201).json({ message: 'Doctor created successfully', doctor })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Doctor email already exists' })
    }
    next(error)
  }
}

const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 })
    res.json({ count: doctors.length, doctors })
  } catch (error) {
    next(error)
  }
}

const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }
    res.json({ doctor })
  } catch (error) {
    next(error)
  }
}

const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }

    res.json({ message: 'Doctor updated successfully', doctor })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Doctor email already exists' })
    }
    next(error)
  }
}

const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id)
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }
    res.json({ message: 'Doctor deleted successfully' })
  } catch (error) {
    next(error)
  }
}

const seedDoctors = async (req, res, next) => {
  try {
    const sampleDoctors = [
      {
        name: 'Dr. Ava Silva',
        specialty: 'Cardiology',
        experience: '12 years',
        phone: '+1 555 0101',
        email: 'ava.silva@clinic.test',
        availabilityDays: ['Monday', 'Wednesday', 'Friday'],
        timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM'],
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
        status: 'active',
      },
      {
        name: 'Dr. Noah Bennett',
        specialty: 'Dermatology',
        experience: '9 years',
        phone: '+1 555 0102',
        email: 'noah.bennett@clinic.test',
        availabilityDays: ['Tuesday', 'Thursday'],
        timeSlots: ['10:00 AM', '12:30 PM', '04:00 PM'],
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
        status: 'active',
      },
      {
        name: 'Dr. Mia Roberts',
        specialty: 'Pediatrics',
        experience: '14 years',
        phone: '+1 555 0103',
        email: 'mia.roberts@clinic.test',
        availabilityDays: ['Monday', 'Tuesday', 'Friday'],
        timeSlots: ['08:30 AM', '01:00 PM', '03:30 PM'],
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54',
        status: 'active',
      },
    ]

    await Doctor.deleteMany({ email: { $in: sampleDoctors.map((doctor) => doctor.email) } })
    const doctors = await Doctor.insertMany(sampleDoctors)
    res.status(201).json({ message: 'Sample doctors seeded successfully', doctors })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  seedDoctors,
}
