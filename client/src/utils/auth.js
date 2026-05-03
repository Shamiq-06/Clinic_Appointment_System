export const getStoredUser = () => {
  try {
    const value = localStorage.getItem('user')
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

export const getStoredToken = () => localStorage.getItem('token')

export const saveSession = ({ token, user }) => {
  if (token) localStorage.setItem('token', token)
  if (user) localStorage.setItem('user', JSON.stringify(user))
  window.dispatchEvent(new Event('authChanged'))
}

export const clearSession = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.dispatchEvent(new Event('authChanged'))
}
