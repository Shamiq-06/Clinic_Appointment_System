import { motion } from 'framer-motion'

function StatCard({ icon: Icon, label, value, trend, color = 'text-blue-600', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white ${color}`}>
          <Icon size={22} />
        </span>
        <span className="rounded-2xl bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">{trend}</span>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.18 }}
        className="mt-6 text-3xl font-bold text-slate-950"
      >
        {value}
      </motion.p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{label}</p>
    </motion.div>
  )
}

export default StatCard
