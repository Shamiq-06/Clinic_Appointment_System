const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Clinic Appointment System API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/appointments', appointmentRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((error, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode).json({
    message: error.message || 'Server error',
  })
})

module.exports = app
