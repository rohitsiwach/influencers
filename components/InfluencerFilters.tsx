"use client"
import { useState } from 'react'

interface FilterState {
  search: string
  location: string
  topic: string
  platform: string
  minFollowers: number
}

export function InfluencerFilters({ onFilterChange }: { onFilterChange: (filters: FilterState) => void }) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    location: '',
    topic: '',
    platform: '',
    minFollowers: 0,
  })

  const updateFilter = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by name..."
        value={filters.search}
        onChange={(e) => updateFilter('search', e.target.value)}
        className="border rounded px-3 py-2"
      />
      <select
        value={filters.location}
        onChange={(e) => updateFilter('location', e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">All Locations</option>
        <option value="Berlin">Berlin</option>
        <option value="Munich">Munich</option>
        <option value="Hamburg">Hamburg</option>
        <option value="Cologne">Cologne</option>
        <option value="Frankfurt">Frankfurt</option>
        <option value="Stuttgart">Stuttgart</option>
      </select>
      <select
        value={filters.platform}
        onChange={(e) => updateFilter('platform', e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">All Platforms</option>
        <option value="Instagram">Instagram</option>
        <option value="YouTube">YouTube</option>
        <option value="TikTok">TikTok</option>
        <option value="Twitch">Twitch</option>
      </select>
      <input
        type="number"
        placeholder="Min Followers"
        value={filters.minFollowers || ''}
        onChange={(e) => updateFilter('minFollowers', parseInt(e.target.value) || 0)}
        className="border rounded px-3 py-2"
      />
      <button
        onClick={() => {
          setFilters({ search: '', location: '', topic: '', platform: '', minFollowers: 0 })
          onFilterChange({ search: '', location: '', topic: '', platform: '', minFollowers: 0 })
        }}
        className="border rounded px-3 py-2 bg-gray-100 hover:bg-gray-200"
      >
        Clear Filters
      </button>
    </div>
  )
}
