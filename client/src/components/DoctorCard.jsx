import { CalendarDays, Clock, Star, Stethoscope } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from './Button'

function DoctorCard({ doctor }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="glass-card overflow-hidden rounded-2xl"
    >
      <div className="relative h-56 overflow-hidden">
        <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
        <div className="absolute left-4 top-4 rounded-2xl bg-white/88 px-3 py-2 text-sm font-bold text-blue-700 backdrop-blur">
          {doctor.specialty}
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-950">{doctor.name}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500"><Stethoscope size={16} />{doctor.experience} experience</p>
          </div>
          <span className="flex items-center gap-1 rounded-2xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-600">
            <Star size={15} fill="currentColor" />{doctor.rating}
          </span>
        </div>
        <p className="mb-5 min-h-16 text-sm leading-7 text-slate-600">{doctor.bio}</p>
        <div className="mb-5 flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
          <Clock size={17} />
          {doctor.availability}
        </div>
        <Button to={`/book/${doctor.id}`} className="w-full">
          <CalendarDays size={18} />
          Book Appointment
        </Button>
      </div>
    </motion.article>
  )
}

export default DoctorCard
