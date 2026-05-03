import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CalendarDays, Menu, Stethoscope, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from './Button'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Doctors', to: '/doctors' },
  { label: 'Admin', to: '/admin' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const activeClass = ({ isActive }) =>
    `rounded-2xl px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-white hover:text-slate-950'}`

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/72 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-400 text-white shadow-lg shadow-blue-500/20">
            <Stethoscope size={22} />
          </span>
          <span>
            <span className="block text-lg font-bold text-slate-950">MediVista</span>
            <span className="block text-xs font-semibold text-teal-600">Clinic OS</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={activeClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button to="/login" variant="secondary" className="px-4 py-2.5">Login</Button>
          <Button to="/doctors" className="px-4 py-2.5"><CalendarDays size={17} />Book</Button>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl md:hidden"
        >
          <div className="grid gap-2">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={activeClass}>
                {link.label}
              </NavLink>
            ))}
            <Button to="/login" variant="secondary" className="mt-2 w-full">Login</Button>
            <Button to="/doctors" className="w-full">Book Appointment</Button>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Navbar
