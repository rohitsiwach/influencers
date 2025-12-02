"use client"
import { useState } from 'react'
import Link from 'next/link'
import { InfluencerFilters } from '@/components/InfluencerFilters'
import { FavoriteButton } from '@/components/FavoriteButton'

interface Influencer {
  id: string
  name: string
  location: string
  followers: number
  platform: string[]
  topics: string[]
  imageUrl: string | null
  isFavorite: boolean
}

export function InfluencerList({ influencers }: { influencers: Influencer[] }) {
  const [filteredInfluencers, setFilteredInfluencers] = useState(influencers)

  const handleFilterChange = (filters: any) => {
    let filtered = influencers

    if (filters.search) {
      filtered = filtered.filter((inf) =>
        inf.name.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.location) {
      filtered = filtered.filter((inf) =>
        inf.location.includes(filters.location)
      )
    }

    if (filters.platform) {
      filtered = filtered.filter((inf) =>
        inf.platform.includes(filters.platform)
      )
    }

    if (filters.minFollowers > 0) {
      filtered = filtered.filter((inf) => inf.followers >= filters.minFollowers)
    }

    setFilteredInfluencers(filtered)
  }

  return (
    <>
      <InfluencerFilters onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInfluencers.map((inf) => (
          <div key={inf.id} className="border rounded p-4">
            {inf.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={inf.imageUrl} alt={inf.name} className="w-full h-40 object-cover rounded" />
            )}
            <h2 className="text-lg font-semibold mt-2">{inf.name}</h2>
            <p className="text-sm text-gray-600">{inf.location}</p>
            <p className="text-sm">Followers: {inf.followers.toLocaleString()}</p>
            <p className="text-sm">Platforms: {inf.platform.join(', ')}</p>
            <div className="flex gap-2 mt-3">
              <Link href={`/influencers/${inf.id}`} className="underline">
                View Details
              </Link>
              <FavoriteButton influencerId={inf.id} isFavorite={inf.isFavorite} />
            </div>
          </div>
        ))}
      </div>
      {filteredInfluencers.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No influencers match your filters.</p>
      )}
    </>
  )
}
