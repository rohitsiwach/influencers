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

    if (filters.locations && filters.locations.length > 0) {
      filtered = filtered.filter((inf) =>
        filters.locations.some((loc: string) => inf.location.includes(loc))
      )
    }

    if (filters.topics && filters.topics.length > 0) {
      filtered = filtered.filter((inf) =>
        inf.topics.some(topic => filters.topics.includes(topic))
      )
    }

    if (filters.platforms && filters.platforms.length > 0) {
      filtered = filtered.filter((inf) =>
        inf.platform.some(p => filters.platforms.includes(p))
      )
    }

    if (filters.minFollowers > 0) {
      filtered = filtered.filter((inf) => inf.followers >= filters.minFollowers)
    }

    setFilteredInfluencers(filtered)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);
  }

  return (
    <>
      <InfluencerFilters onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInfluencers.map((inf) => (
          <div key={inf.id} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              {inf.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={inf.imageUrl} 
                  alt={inf.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              )}
              <div className="absolute top-3 right-3">
                <FavoriteButton influencerId={inf.id} isFavorite={inf.isFavorite} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                <h2 className="text-white text-xl font-bold truncate">{inf.name}</h2>
                <p className="text-white/90 text-sm flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.006.003.002.001.003.001a.79.79 0 00.01.003z" clipRule="evenodd" />
                  </svg>
                  {inf.location}
                </p>
              </div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                {inf.platform.map(p => (
                  <span key={p} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {p}
                  </span>
                ))}
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Followers</span>
                  <span className="text-lg font-bold text-gray-900">{formatNumber(inf.followers)}</span>
                </div>
                <Link 
                  href={`/influencers/${inf.id}`} 
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredInfluencers.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No influencers found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </>
  )
}
