import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg shadow-blue-500/20',
  secondary: 'border border-blue-200 bg-white/80 text-blue-700 shadow-sm',
  subtle: 'bg-slate-100 text-slate-700',
  danger: 'bg-rose-50 text-rose-700 border border-rose-100',
}

function Button({ children, to, type = 'button', variant = 'primary', className = '', ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
        <Link to={to} className={classes} {...props}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} type={type} className={classes} {...props}>
      {children}
    </motion.button>
  )
}

export default Button
