import { useState } from 'react'
import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import AnimatedPageWrapper from '../components/AnimatedPageWrapper'
import Button from '../components/Button'

function Login() {
  const [form, setForm] = useState({ email: '', password: '', role: 'Patient' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    setMessage('')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Please enter a valid email address.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    setError('')
    setMessage(`Welcome back, ${form.role}. This is a demo login success state.`)
  }

  return (
    <AnimatedPageWrapper className="mx-auto grid min-h-[calc(100vh-152px)] max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <span className="inline-flex items-center gap-2 rounded-2xl bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">
          <ShieldCheck size={17} />
          Secure portal demo
        </span>
        <h1 className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl">Sign in to manage appointments with confidence.</h1>
        <p className="mt-5 max-w-xl leading-8 text-slate-600">Patient and admin role selection is ready for future auth integration while staying fully frontend-only today.</p>
      </div>
      <form onSubmit={submit} className="glass-card rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-950">Login</h2>
        <div className="mt-6 grid gap-5">
          <label>
            <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><Mail size={16} />Email</span>
            <input className="input-field" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@clinic.com" />
          </label>
          <label>
            <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><LockKeyhole size={16} />Password</span>
            <input className="input-field" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Minimum 6 characters" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-bold text-slate-700">Role</span>
            <select className="input-field" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option>Patient</option>
              <option>Admin</option>
            </select>
          </label>
        </div>
        {error && <p className="mt-5 rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-700">{error}</p>}
        {message && <p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700">{message}</p>}
        <Button type="submit" className="mt-6 w-full">Login</Button>
      </form>
    </AnimatedPageWrapper>
  )
}

export default Login
