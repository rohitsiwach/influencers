"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function FavoriteButton({ influencerId, isFavorite }: { influencerId: string; isFavorite: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const toggleFavorite = async () => {
    setLoading(true)
    try {
      const method = isFavorite ? 'DELETE' : 'POST'
      await fetch('/api/favorites', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ influencerId }),
      })
      router.refresh()
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`px-4 py-2 rounded ${
        isFavorite ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
      } ${loading ? 'opacity-50' : ''}`}
    >
      {loading ? '...' : isFavorite ? '❤️ Unfavorite' : '🤍 Favorite'}
    </button>
  )
}
