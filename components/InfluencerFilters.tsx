"use client"
import { useState } from 'react'

interface FilterState {
  search: string
  location: string
  topics: string[]
  platform: string
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

export function InfluencerFilters({ onFilterChange }: { onFilterChange: (filters: FilterState) => void }) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    location: '',
    topics: [],
    platform: '',
    minFollowers: 0,
  })
  const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleTopic = (topic: string) => {
    const currentTopics = filters.topics;
    const newTopics = currentTopics.includes(topic)
      ? currentTopics.filter(t => t !== topic)
      : [...currentTopics, topic];
    updateFilter('topics', newTopics);
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
          <select
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black bg-white"
          >
            <option value="">Anywhere</option>
            <option value="Berlin">Berlin</option>
            <option value="Munich">Munich</option>
            <option value="Hamburg">Hamburg</option>
            <option value="Cologne">Cologne</option>
            <option value="Frankfurt">Frankfurt</option>
            <option value="Stuttgart">Stuttgart</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">Platform</label>
          <select
            value={filters.platform}
            onChange={(e) => updateFilter('platform', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black bg-white"
          >
            <option value="">All Platforms</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="Twitch">Twitch</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">Min. Followers</label>
          <input
            type="number"
            placeholder="0"
            value={filters.minFollowers || ''}
            onChange={(e) => updateFilter('minFollowers', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
          />
        </div>

        <div className="md:col-span-2 flex items-end">
          <button
            onClick={() => {
              setFilters({ search: '', location: '', topics: [], platform: '', minFollowers: 0 })
              onFilterChange({ search: '', location: '', topics: [], platform: '', minFollowers: 0 })
            }}
            className="w-full px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-black transition-colors text-sm font-medium"
          >
            Reset
          </button>
        </div>

        <div className="md:col-span-12 border-t border-gray-100 pt-4 mt-2">
          <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={() => setIsTopicsExpanded(!isTopicsExpanded)}>
            <label className="block text-xs font-medium text-gray-500">Topics</label>
            <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
              {isTopicsExpanded ? 'Show Less' : 'Show All'}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform ${isTopicsExpanded ? 'rotate-180' : ''}`}>
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 ${isTopicsExpanded ? '' : 'max-h-24 overflow-hidden relative'}`}>
            {AVAILABLE_TOPICS.map((topic) => (
              <label key={topic} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black">
                <input
                  type="checkbox"
                  checked={filters.topics.includes(topic)}
                  onChange={() => toggleTopic(topic)}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="truncate">{topic}</span>
              </label>
            ))}
            {!isTopicsExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
