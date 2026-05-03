import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BadgePlus, LockKeyhole, Mail, UserRound } from 'lucide-react'
import AnimatedPageWrapper from '../components/AnimatedPageWrapper'
import Button from '../components/Button'
import api, { getApiError } from '../api/axios'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' })
  const [notice, setNotice] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    if (form.name.trim().length < 2) return setNotice({ type: 'error', text: 'Please enter your name.' })
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setNotice({ type: 'error', text: 'Please enter a valid email.' })
    if (form.password.length < 6) return setNotice({ type: 'error', text: 'Password must be at least 6 characters.' })

    try {
      setLoading(true)
      const response = await api.post('/auth/register', form)
      setNotice({ type: 'success', text: response?.data?.message || 'Account created successfully. Redirecting to login...' })
      setTimeout(() => navigate('/login'), 900)
    } catch (apiError) {
      setNotice({ type: 'error', text: getApiError(apiError, 'Registration failed. Please try again.') })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatedPageWrapper className="mx-auto grid min-h-[calc(100vh-152px)] max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <form onSubmit={submit} className="glass-card rounded-2xl p-6 sm:p-8 lg:order-2">
        <h1 className="text-3xl font-bold text-slate-950">Create account</h1>
        <div className="mt-6 grid gap-5">
          <label>
            <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><UserRound size={16} />Full Name</span>
            <input className="input-field" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Alex Morgan" />
          </label>
          <label>
            <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><Mail size={16} />Email</span>
            <input className="input-field" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="alex@email.com" />
          </label>
          <label>
            <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"><LockKeyhole size={16} />Password</span>
            <input className="input-field" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Minimum 6 characters" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-bold text-slate-700">Role</span>
            <select className="input-field" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option value="patient">Patient</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div>
        {notice.text && (
          <p className={`mt-5 rounded-2xl p-4 text-sm font-bold ${notice.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            {notice.text}
          </p>
        )}
        <Button type="submit" className="mt-6 w-full" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</Button>
      </form>
      <div>
        <span className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
          <BadgePlus size={17} />
          New clinic portal
        </span>
        <h2 className="mt-6 text-4xl font-bold text-slate-950 sm:text-5xl">Start with a clean role-based registration experience.</h2>
        <p className="mt-5 max-w-xl leading-8 text-slate-600">Create a patient or admin account and continue through the connected clinic workflow.</p>
      </div>
    </AnimatedPageWrapper>
  )
}

export default Register
