import { HeartPulse } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/76">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <HeartPulse size={18} className="text-teal-500" />
          MediVista Clinic Appointment System
        </div>
        <p>Premium demo frontend using dummy data only.</p>
      </div>
    </footer>
  )
}

export default Footer
