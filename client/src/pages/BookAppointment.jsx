import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, Clock, Mail, Phone, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedPageWrapper from '../components/AnimatedPageWrapper'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import api, { getApiError } from '../api/axios'
import { getStoredToken, getStoredUser } from '../utils/auth'

const fallbackTimeSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM']

function BookAppointment() {
  const { doctorId } = useParams()
  const navigate = useNavigate()
  const storedUser = getStoredUser()
  const [doctor, setDoctor] = useState(null)
  const [form, setForm] = useState({ date: '', timeSlot: '', name: storedUser?.name || '', email: storedUser?.email || '', phone: '', reason: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const timeSlots = useMemo(() => {
    return Array.isArray(doctor?.timeSlots) && doctor.timeSlots.length > 0 ? doctor.timeSlots : fallbackTimeSlots
  }, [doctor])
  const availability = Array.isArray(doctor?.availabilityDays) && doctor.availabilityDays.length > 0
    ? doctor.availabilityDays.join(', ')
    : 'Availability pending'

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        setLoading(true)
        setLoadError('')
        const response = await api.get(`/doctors/${doctorId}`)
        setDoctor(response?.data?.doctor || response?.data?.data || response?.data || null)
      } catch (apiError) {
        setLoadError(getApiError(apiError, 'Unable to load this doctor.'))
      } finally {
        setLoading(false)
      }
    }

    loadDoctor()
  }, [doctorId])

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
      setErrors((current) => ({ ...current, [field]: '' }))
    setSubmitError('')
  }

  const validate = () => {
    const next = {}
    if (!form.date) next.date = 'Choose a date.'
    if (!form.timeSlot) next.timeSlot = 'Choose a time slot.'
    if (form.name.trim().length < 2) next.name = 'Enter the patient name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (form.phone.trim().length < 7) next.phone = 'Enter a valid phone number.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!getStoredToken()) {
      setSubmitError('Please login before booking an appointment.')
      navigate('/login')
      return
    }
    if (!validate()) return

    try {
      setSubmitting(true)
      setSubmitError('')
      await api.post('/appointments', {
        doctor: doctorId,
        date: form.date,
        timeSlot: form.timeSlot,
        name: form.name,
        email: form.email,
        phone: form.phone,
        reason: form.reason,
      })
      setSuccess(true)
    } catch (apiError) {
      setSubmitError(getApiError(apiError, 'Unable to book appointment.'))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <AnimatedPageWrapper className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="glass-card rounded-2xl p-10 font-bold text-blue-700">Loading doctor details...</div>
      </AnimatedPageWrapper>
    )
  }

  if (!doctor || loadError) {
    return (
      <AnimatedPageWrapper className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="soft-panel rounded-2xl p-10">
          <h1 className="text-3xl font-bold text-slate-950">Doctor not found</h1>
          <p className="mt-3 text-slate-600">{loadError || 'Please return to the doctors list and choose another specialist.'}</p>
          <Button to="/doctors" className="mt-6">View Doctors</Button>
        </div>
      </AnimatedPageWrapper>
    )
  }

  return (
    <AnimatedPageWrapper className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Book appointment" title={`Schedule with ${doctor.name}`} description="Choose a slot and submit your appointment request to the clinic backend." />
      {success ? (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass-card mx-auto max-w-2xl rounded-2xl p-10 text-center">
          <CheckCircle2 className="mx-auto text-emerald-500" size={58} />
          <h2 className="mt-5 text-3xl font-bold text-slate-950">Appointment request received</h2>
          <p className="mt-4 leading-7 text-slate-600">{form.name}, your appointment request with {doctor.name} is set for {form.date} at {form.timeSlot}.</p>
          <Button to="/doctors" className="mt-7">Book Another</Button>
        </motion.div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="glass-card h-fit rounded-2xl p-5">
            <img src={doctor.image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80'} alt={doctor.name} className="h-72 w-full rounded-2xl object-cover" />
            <h2 className="mt-5 text-2xl font-bold text-slate-950">{doctor.name}</h2>
            <p className="mt-2 font-semibold text-blue-700">{doctor.specialty}</p>
            <p className="mt-4 leading-7 text-slate-600">{doctor.bio || `${doctor.name} provides ${doctor.specialty} care with ${doctor.experience} of experience.`}</p>
            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-teal-50 px-4 py-3 text-sm font-bold text-teal-700">
              <Clock size={17} />
              {availability}
            </div>
            <Link to="/doctors" className="mt-5 inline-block text-sm font-bold text-blue-700">Change doctor</Link>
          </aside>
          <form onSubmit={submit} className="soft-panel rounded-2xl p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-bold text-slate-700">Date</span>
                <input className="input-field" type="date" value={form.date} onChange={(event) => update('date', event.target.value)} />
                {errors.date && <p className="mt-2 text-sm font-semibold text-rose-600">{errors.date}</p>}
              </label>
              <div>
                <span className="mb-2 block text-sm font-bold text-slate-700">Time Slot</span>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button key={slot} type="button" onClick={() => update('timeSlot', slot)} className={`rounded-2xl border px-3 py-3 text-sm font-bold transition ${form.timeSlot === slot ? 'border-teal-400 bg-teal-50 text-teal-700' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'}`}>
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.timeSlot && <p className="mt-2 text-sm font-semibold text-rose-600">{errors.timeSlot}</p>}
              </div>
            </div>
            <div className="mt-6 grid gap-5">
              <label>
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><UserRound size={16} />Patient Name</span>
                <input className="input-field" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Enter full name" />
                {errors.name && <p className="mt-2 text-sm font-semibold text-rose-600">{errors.name}</p>}
              </label>
              <label>
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><Mail size={16} />Email</span>
                <input className="input-field" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="patient@email.com" />
                {errors.email && <p className="mt-2 text-sm font-semibold text-rose-600">{errors.email}</p>}
              </label>
              <label>
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><Phone size={16} />Phone</span>
                <input className="input-field" value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+1 555 0199" />
                {errors.phone && <p className="mt-2 text-sm font-semibold text-rose-600">{errors.phone}</p>}
              </label>
              <label>
                <span className="mb-2 block text-sm font-bold text-slate-700">Reason</span>
                <textarea className="input-field min-h-28 resize-none" value={form.reason} onChange={(event) => update('reason', event.target.value)} placeholder="Tell the doctor what you need help with" />
              </label>
            </div>
            {submitError && <p className="mt-5 rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-700">{submitError}</p>}
            <Button type="submit" className="mt-8 w-full" disabled={submitting}>{submitting ? 'Booking...' : 'Confirm Appointment'}</Button>
          </form>
        </div>
      )}
    </AnimatedPageWrapper>
  )
}

export default BookAppointment
