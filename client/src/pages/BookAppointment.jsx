import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, Clock, Mail, Phone, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedPageWrapper from '../components/AnimatedPageWrapper'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import { doctors, timeSlots } from '../data/clinicData'

function BookAppointment() {
  const { doctorId } = useParams()
  const doctor = useMemo(() => doctors.find((item) => item.id === doctorId), [doctorId])
  const [form, setForm] = useState({ date: '', time: '', name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.date) next.date = 'Choose a date.'
    if (!form.time) next.time = 'Choose a time slot.'
    if (form.name.trim().length < 2) next.name = 'Enter the patient name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (form.phone.trim().length < 7) next.phone = 'Enter a valid phone number.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (event) => {
    event.preventDefault()
    if (validate()) setSuccess(true)
  }

  if (!doctor) {
    return (
      <AnimatedPageWrapper className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="soft-panel rounded-2xl p-10">
          <h1 className="text-3xl font-bold text-slate-950">Doctor not found</h1>
          <p className="mt-3 text-slate-600">Please return to the doctors list and choose another specialist.</p>
          <Button to="/doctors" className="mt-6">View Doctors</Button>
        </div>
      </AnimatedPageWrapper>
    )
  }

  return (
    <AnimatedPageWrapper className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Book appointment" title={`Schedule with ${doctor.name}`} description="This is a frontend-only booking demo with local validation and a confirmation state." />
      {success ? (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass-card mx-auto max-w-2xl rounded-2xl p-10 text-center">
          <CheckCircle2 className="mx-auto text-emerald-500" size={58} />
          <h2 className="mt-5 text-3xl font-bold text-slate-950">Appointment request received</h2>
          <p className="mt-4 leading-7 text-slate-600">{form.name}, your demo appointment with {doctor.name} is set for {form.date} at {form.time}.</p>
          <Button to="/doctors" className="mt-7">Book Another</Button>
        </motion.div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="glass-card h-fit rounded-2xl p-5">
            <img src={doctor.image} alt={doctor.name} className="h-72 w-full rounded-2xl object-cover" />
            <h2 className="mt-5 text-2xl font-bold text-slate-950">{doctor.name}</h2>
            <p className="mt-2 font-semibold text-blue-700">{doctor.specialty}</p>
            <p className="mt-4 leading-7 text-slate-600">{doctor.bio}</p>
            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-teal-50 px-4 py-3 text-sm font-bold text-teal-700">
              <Clock size={17} />
              {doctor.availability}
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
                    <button key={slot} type="button" onClick={() => update('time', slot)} className={`rounded-2xl border px-3 py-3 text-sm font-bold transition ${form.time === slot ? 'border-teal-400 bg-teal-50 text-teal-700' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'}`}>
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="mt-2 text-sm font-semibold text-rose-600">{errors.time}</p>}
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
            </div>
            <Button type="submit" className="mt-8 w-full">Confirm Appointment</Button>
          </form>
        </div>
      )}
    </AnimatedPageWrapper>
  )
}

export default BookAppointment
