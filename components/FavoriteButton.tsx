"use client"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export function FavoriteButton({ influencerId, isFavorite: initialIsFavorite }: { influencerId: string; isFavorite: boolean }) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsFavorite(initialIsFavorite)
  }, [initialIsFavorite])

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent link navigation if inside a card link
    if (loading) return

    const previousState = isFavorite
    // Optimistic update
    setIsFavorite(!previousState)
    setLoading(true)

    try {
      const method = previousState ? 'DELETE' : 'POST'
      await fetch('/api/favorites', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ influencerId }),
      })
      router.refresh()
    } catch (error) {
      console.error('Error toggling favorite:', error)
      setIsFavorite(previousState)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
        isFavorite 
          ? 'bg-red-50 text-red-500 hover:bg-red-100' 
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
      } ${loading ? 'opacity-70 cursor-wait' : ''}`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={isFavorite ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={`w-5 h-5 transition-transform duration-200 ${isFavorite ? 'scale-110' : 'group-hover:scale-110'}`}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  )
}
