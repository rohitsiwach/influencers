"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const res = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/',
    })
    if ((res as any)?.error) setError((res as any).error)
    setLoading(false)
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-50 to-white px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border bg-white shadow-sm p-6">
          <div className="space-y-2 text-center mb-4">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-gray-600">Sign in to continue</p>
          </div>
          {error && (
            <div className="mb-3 rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-3">
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
                placeholder="••••••••"
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
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <div className="text-center mt-3 text-sm text-gray-600">
            <a href="/register" className="underline hover:text-gray-800">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  )
}
