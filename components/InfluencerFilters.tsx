"use client"
import { useState, useRef, useEffect } from 'react'

interface FilterState {
  search: string
  locations: string[]
  topics: string[]
  platforms: string[]
  minFollowers: number
}

const AVAILABLE_TOPICS = [
  "Adventure", "Beauty", "Bodybuilding", "Budget Trips", "Choreography", "Cinematography", 
  "Crafts", "Culture", "Dance", "DIY", "Eco Living", "Esports", "Fashion", "Filmmaking", 
  "Fitness", "Food", "Gadgets", "Game Reviews", "Gaming", "Home", "Home Improvement", 
  "Lifestyle", "Live Performances", "Meditation", "Mindfulness", "Motivation", "Music", 
  "Nutrition", "Parenting", "Photography", "Productivity", "Self-Care", "Skincare", 
  "Software Reviews", "Songwriting", "Sustainability", "Tech", "Travel", "Upcycling", 
  "Vegan", "Vlogs", "Wellness", "Woodworking", "Yoga", "Zero Waste"
];

const AVAILABLE_LOCATIONS = [
  "Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt", "Stuttgart"
];

const AVAILABLE_PLATFORMS = [
  "Instagram", "YouTube", "TikTok", "Twitch"
];

function MultiSelect({ label, options, selected, onChange }: { label: string, options: string[], selected: string[], onChange: (val: string[]) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleOption = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option]
    onChange(newSelected)
  }

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2.5 text-left border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white flex justify-between items-center min-h-[44px]"
      >
        <span className="truncate text-sm block mr-2">
          {selected.length === 0 ? 'All' : `${selected.length} selected`}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map(option => (
            <label key={option} className="flex items-center px-3 py-3 hover:bg-gray-50 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="rounded border-gray-300 text-primary focus:ring-primary mr-3 w-5 h-5"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export function InfluencerFilters({ onFilterChange }: { onFilterChange: (filters: FilterState) => void }) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    locations: [],
    topics: [],
    platforms: [],
    minFollowers: 0,
  })
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const hasActiveFilters = filters.locations.length > 0 || filters.topics.length > 0 || filters.platforms.length > 0 || filters.minFollowers > 0;

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 mb-8">
      <div className="flex flex-col gap-4">
        {/* Search Bar - Full Width */}
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Find influencers..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors min-h-[44px]"
            />
          </div>
        </div>
        
        {/* Toggle Button */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="text-sm font-medium text-gray-600 hover:text-primary flex items-center gap-1 py-2"
          >
            {isFiltersOpen ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01.02 1.06z" clipRule="evenodd" />
                </svg>
                Less Filters
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
                More Filters
              </>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={() => {
                const resetState = { search: filters.search, locations: [], topics: [], platforms: [], minFollowers: 0 };
                setFilters(resetState)
                onFilterChange(resetState)
              }}
              className="text-sm text-red-500 hover:text-red-700 font-medium py-2"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Collapsible Filters Grid */}
        {isFiltersOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
            <MultiSelect 
              label="Location" 
              options={AVAILABLE_LOCATIONS} 
              selected={filters.locations} 
              onChange={(val) => updateFilter('locations', val)} 
            />

            <MultiSelect 
              label="Platform" 
              options={AVAILABLE_PLATFORMS} 
              selected={filters.platforms} 
              onChange={(val) => updateFilter('platforms', val)} 
            />

            <MultiSelect 
              label="Topics" 
              options={AVAILABLE_TOPICS} 
              selected={filters.topics} 
              onChange={(val) => updateFilter('topics', val)} 
            />

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Min. Followers</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minFollowers || ''}
                onChange={(e) => updateFilter('minFollowers', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[44px]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
