import { CheckCircle2, Clock3, UserRound, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const statusStyles = {
  approved: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  rejected: 'bg-rose-50 text-rose-700',
}

const statusIcons = {
  approved: CheckCircle2,
  pending: Clock3,
  rejected: XCircle,
}

function AppointmentCard({ appointment, actions = false }) {
  const Icon = statusIcons[appointment.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="soft-panel rounded-2xl p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <UserRound size={20} />
          </span>
          <div>
            <h4 className="font-bold text-slate-950">{appointment.patient}</h4>
            <p className="mt-1 text-sm text-slate-500">{appointment.type} with {appointment.doctor}</p>
            <p className="mt-2 text-sm font-semibold text-teal-600">{appointment.time}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold capitalize ${statusStyles[appointment.status]}`}>
            <Icon size={16} />
            {appointment.status}
          </span>
          {actions && appointment.status === 'pending' && (
            <>
              <button className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">Approve</button>
              <button className="rounded-2xl bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700">Reject</button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default AppointmentCard
