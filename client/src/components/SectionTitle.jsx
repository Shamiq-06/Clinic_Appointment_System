import { motion } from 'framer-motion'

function SectionTitle({ eyebrow, title, description, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45 }}
      className={`mx-auto mb-10 max-w-3xl ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {eyebrow && <p className="mb-3 text-sm font-bold uppercase text-teal-600">{eyebrow}</p>}
      <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>}
    </motion.div>
  )
}

export default SectionTitle
