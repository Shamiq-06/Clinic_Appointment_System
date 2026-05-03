import { Search, SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import AnimatedPageWrapper from '../components/AnimatedPageWrapper'
import DoctorCard from '../components/DoctorCard'
import SectionTitle from '../components/SectionTitle'
import { doctors } from '../data/clinicData'

function Doctors() {
  const [query, setQuery] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const specialties = ['All', ...new Set(doctors.map((doctor) => doctor.specialty))]

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch = `${doctor.name} ${doctor.specialty}`.toLowerCase().includes(query.toLowerCase())
      const matchesSpecialty = specialty === 'All' || doctor.specialty === specialty
      return matchesSearch && matchesSpecialty
    })
  }, [query, specialty])

  return (
    <AnimatedPageWrapper className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Doctors" title="Find the right specialist and book instantly." description="Search by name or specialty, then choose a dummy slot for the appointment flow." />
      <div className="glass-card mb-8 grid gap-4 rounded-2xl p-4 md:grid-cols-[1fr_260px]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
          <input className="input-field pl-12" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search doctors or specialties" />
        </label>
        <label className="relative">
          <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
          <select className="input-field pl-12" value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
            {specialties.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <motion.div key={doctor.id} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <DoctorCard doctor={doctor} />
          </motion.div>
        ))}
      </motion.div>
      {filteredDoctors.length === 0 && (
        <div className="soft-panel rounded-2xl p-10 text-center font-semibold text-slate-600">No doctors match this filter.</div>
      )}
    </AnimatedPageWrapper>
  )
}

export default Doctors
