import { CalendarClock, ClipboardCheck, LayoutDashboard, Stethoscope, UserCheck, UsersRound } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import AnimatedPageWrapper from '../components/AnimatedPageWrapper'
import AppointmentCard from '../components/AppointmentCard'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'
import StatCard from '../components/StatCard'
import api, { getApiError } from '../api/axios'

function AdminDashboard() {
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState('')

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const [appointmentsResponse, doctorsResponse] = await Promise.all([
        api.get('/appointments'),
        api.get('/doctors'),
      ])
      const appointmentList = Array.isArray(appointmentsResponse?.data?.appointments)
        ? appointmentsResponse.data.appointments
        : Array.isArray(appointmentsResponse?.data?.data)
          ? appointmentsResponse.data.data
          : Array.isArray(appointmentsResponse?.data)
            ? appointmentsResponse.data
            : []
      const doctorList = Array.isArray(doctorsResponse?.data?.doctors)
        ? doctorsResponse.data.doctors
        : Array.isArray(doctorsResponse?.data?.data)
          ? doctorsResponse.data.data
          : Array.isArray(doctorsResponse?.data)
            ? doctorsResponse.data
            : []

      setAppointments(appointmentList)
      setDoctors(doctorList)
    } catch (apiError) {
      setError(getApiError(apiError, 'Unable to load dashboard data. Please login as an admin.'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      loadDashboard()
    }, 0)

    return () => clearTimeout(timer)
  }, [loadDashboard])

  const statusCounts = useMemo(() => {
    return appointments.reduce((counts, appointment) => {
      counts[appointment.status] = (counts[appointment.status] || 0) + 1
      return counts
    }, {})
  }, [appointments])

  const stats = [
    { icon: CalendarClock, label: 'Total Appointments', value: String(appointments.length), trend: 'Live', color: 'text-blue-600' },
    { icon: UserCheck, label: 'Approved', value: String(statusCounts.approved || 0), trend: 'Real data', color: 'text-emerald-600' },
    { icon: ClipboardCheck, label: 'Pending Review', value: String(statusCounts.pending || 0), trend: 'Queue', color: 'text-amber-600' },
    { icon: Stethoscope, label: 'Active Doctors', value: String(doctors.filter((doctor) => doctor.status !== 'inactive').length), trend: 'Roster', color: 'text-teal-600' },
  ]

  const statusRows = [
    ['Approved', statusCounts.approved || 0, 'bg-emerald-500'],
    ['Pending', statusCounts.pending || 0, 'bg-amber-400'],
    ['Rejected', statusCounts.rejected || 0, 'bg-rose-400'],
  ]

  const updateStatus = async (appointmentId, status) => {
    try {
      setUpdatingId(appointmentId)
      setError('')
      await api.put(`/appointments/${appointmentId}/status`, { status })
      await loadDashboard()
    } catch (apiError) {
      setError(getApiError(apiError, 'Unable to update appointment status.'))
    } finally {
      setUpdatingId('')
    }
  }

  return (
    <AnimatedPageWrapper className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="dashboard-grid gap-6">
        <aside className="glass-card h-fit rounded-2xl p-5 lg:sticky lg:top-28">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <LayoutDashboard size={21} />
            </span>
            <div>
              <h1 className="text-xl font-bold text-slate-950">Admin Hub</h1>
              <p className="text-sm font-semibold text-teal-600">Demo workspace</p>
            </div>
          </div>
          <div className="mt-7 grid gap-2">
            {['Overview', 'Appointments', 'Doctors', 'Patients', 'Reports'].map((item, index) => (
              <button key={item} className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${index === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-600 hover:bg-white'}`}>
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className="min-w-0">
          <SectionTitle align="left" eyebrow="Admin dashboard" title="Clinic operations at a glance." description="Approve appointments, monitor status, and review doctor capacity from backend data." />
          {error && <div className="mb-5 rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-700">{error}</div>}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => <StatCard key={stat.label} {...stat} delay={index * 0.08} />)}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="soft-panel rounded-2xl p-5 sm:p-6">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">Today appointments</h2>
                  <p className="mt-1 text-sm text-slate-500">Pending, approved, and rejected appointment records.</p>
                </div>
                <Button variant="secondary" className="px-4 py-2.5">Export Demo</Button>
              </div>
              <div className="grid gap-4">
                {loading && <div className="glass-card rounded-2xl p-8 text-center font-bold text-blue-700">Loading appointments...</div>}
                {!loading && appointments.length === 0 && <div className="rounded-2xl bg-white p-8 text-center font-semibold text-slate-500">No appointments found.</div>}
                {!loading && appointments.map((appointment, index) => (
                  <motion.div key={appointment._id || appointment.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                    <AppointmentCard appointment={appointment} actions onStatusChange={updateStatus} updating={updatingId === (appointment._id || appointment.id)} />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="glass-card rounded-2xl p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-950">Status mix</h2>
                    <p className="mt-1 text-sm text-slate-500">Dummy appointment categories</p>
                  </div>
                  <UsersRound className="text-teal-500" size={24} />
                </div>
                {statusRows.map(([label, count, color]) => {
                  const width = appointments.length ? `${Math.round((count / appointments.length) * 100)}%` : '0%'
                  return (
                  <div key={label} className="mb-4">
                    <div className="mb-2 flex justify-between text-sm font-bold text-slate-600"><span>{label}</span><span>{width}</span></div>
                    <div className="h-3 rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{ width }} /></div>
                  </div>
                  )
                })}
              </div>

              <div className="soft-panel rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-slate-950">Doctor management</h2>
                <p className="mt-1 text-sm text-slate-500">Demo roster controls only.</p>
                <div className="mt-5 grid gap-3">
                  {doctors.slice(0, 4).map((doctor) => (
                    <div key={doctor._id || doctor.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <img src={doctor.image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80'} alt={doctor.name} className="h-11 w-11 rounded-2xl object-cover" />
                        <div className="min-w-0">
                          <p className="truncate font-bold text-slate-800">{doctor.name}</p>
                          <p className="truncate text-sm text-slate-500">{doctor.specialty}</p>
                        </div>
                      </div>
                      <button className="rounded-2xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700">Edit</button>
                    </div>
                  ))}
                  {doctors.length === 0 && <p className="rounded-2xl bg-white p-4 text-sm font-semibold text-slate-500">No doctors loaded.</p>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AnimatedPageWrapper>
  )
}

export default AdminDashboard
