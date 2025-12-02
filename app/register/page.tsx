"use client"
import { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Registration failed')
    } else {
      setSuccess('Registration successful. You can now log in.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-50 to-white px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border bg-white shadow-sm p-6">
          <div className="space-y-2 text-center mb-4">
            <h1 className="text-2xl font-semibold">Create your account</h1>
            <p className="text-sm text-gray-600">Join to manage favorites</p>
          </div>
          {error && (
            <div className="mb-3 rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-3 rounded-md bg-green-50 text-green-700 px-3 py-2 text-sm">
              {success}
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="block text-sm text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-300 focus:border-black focus:ring-black/20 rounded-md p-2 w-full"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:border-black focus:ring-black/20 rounded-md p-2 w-full"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm text-gray-700">Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 focus:border-black focus:ring-black/20 rounded-md p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-black text-white px-4 py-2 rounded-md w-full hover:bg-black/90 transition-colors disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Registering…' : 'Create account'}
            </button>
          </form>
          <div className="text-center mt-3 text-sm text-gray-600">
            <a href="/login" className="underline hover:text-gray-800">Already have an account?</a>
          </div>
        </div>
      </div>
    </div>
  )
}
