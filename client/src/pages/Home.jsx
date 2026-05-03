import { Activity, ArrowRight, BadgeCheck, CalendarCheck, ClipboardList, HeartPulse, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedPageWrapper from '../components/AnimatedPageWrapper'
import Button from '../components/Button'
import SectionTitle from '../components/SectionTitle'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

function Home() {
  const features = [
    { icon: CalendarCheck, title: 'Smart Scheduling', text: 'Book visits faster with guided slots, clear availability, and patient-ready flows.' },
    { icon: ShieldCheck, title: 'Admin Control', text: 'Review, approve, and manage appointment activity from a calm dashboard.' },
    { icon: HeartPulse, title: 'Patient Experience', text: 'Give patients a polished path from doctor discovery to confirmation.' },
  ]

  const steps = ['Choose a specialist', 'Pick a convenient slot', 'Submit patient details', 'Receive confirmation']
  const reasons = ['Role-ready interface', 'Mobile-first appointment flow', 'Operational dashboard clarity', 'Reusable React components']

  return (
    <AnimatedPageWrapper>
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 rounded-2xl border border-teal-100 bg-white/80 px-4 py-2 text-sm font-bold text-teal-700 shadow-sm">
            <Sparkles size={16} />
            Premium healthcare SaaS frontend
          </span>
          <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Clinic appointments, beautifully coordinated.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A modern demo experience for patients, doctors, and clinic admins with glassmorphism panels, smooth motion, and responsive workflows.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/doctors"><CalendarCheck size={19} />Book Appointment</Button>
            <Button to="/admin" variant="secondary"><Activity size={19} />Admin Dashboard</Button>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {['24/7 demo access', '6 specialists', '98% satisfaction'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/80 bg-white/70 p-4 text-center shadow-sm">
                <p className="text-sm font-bold text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="glass-card rounded-2xl p-4">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-teal-400 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-50">Today at MediVista</p>
                <h2 className="mt-2 text-3xl font-bold">42 appointments</h2>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/18">
                <ClipboardList size={26} />
              </div>
            </div>
            <div className="mt-8 grid gap-3">
              {['Dr. Ava Silva - Cardiology review', 'Dr. Mia Roberts - Child wellness', 'Dr. Ethan Chen - Recovery plan'].map((visit, index) => (
                <motion.div
                  key={visit}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.12 }}
                  className="rounded-2xl bg-white/18 p-4 backdrop-blur"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold">{visit}</span>
                    <ArrowRight size={18} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Features" title="Everything feels calm, fast, and intentional." description="The interface is built for clarity across patient booking and clinic administration." />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={card} className="glass-card rounded-2xl p-7">
              <feature.icon className="text-teal-500" size={28} />
              <h3 className="mt-5 text-xl font-bold text-slate-950">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="soft-panel rounded-2xl p-8">
          <SectionTitle align="left" eyebrow="How it works" title="A simple flow for every patient." />
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <motion.div key={step} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white">{index + 1}</span>
                <span className="font-semibold text-slate-700">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="soft-panel rounded-2xl p-8">
          <SectionTitle align="left" eyebrow="Why clinics choose us" title="Designed for operational confidence." />
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason} className="flex items-center gap-3 rounded-2xl bg-white p-4">
                <BadgeCheck className="text-teal-500" size={20} />
                <span className="font-semibold text-slate-700">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Demo feedback" title="Testimonials for the product experience." />
        <div className="grid gap-6 md:grid-cols-3">
          {['The booking flow feels effortless.', 'The dashboard makes triage obvious.', 'This looks ready for a premium clinic.'].map((quote, index) => (
            <motion.div key={quote} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card rounded-2xl p-6">
              <UsersRound className="text-blue-600" size={24} />
              <p className="mt-5 text-lg font-bold text-slate-950">{quote}</p>
              <p className="mt-3 text-sm text-slate-500">Clinic team demo card</p>
            </motion.div>
          ))}
        </div>
      </section>
    </AnimatedPageWrapper>
  )
}

export default Home
