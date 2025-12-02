import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { FavoriteButton } from '@/components/FavoriteButton'

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Please login to view favorites</h2>
        <Link href="/login" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          Go to Login
        </Link>
      </div>
    )
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: { influencer: true },
  })

  if (favorites.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
        <p className="text-gray-500 mb-6">Start exploring influencers and save your favorites here.</p>
        <Link href="/influencers" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          Discover Influencers
        </Link>
      </div>
    )
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(({ influencer }) => (
          <div key={influencer.id} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              {influencer.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={influencer.imageUrl} 
                  alt={influencer.name} 
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
                <FavoriteButton influencerId={influencer.id} isFavorite={true} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                <h2 className="text-white text-xl font-bold truncate">{influencer.name}</h2>
                <p className="text-white/90 text-sm flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.006.003.002.001.003.001a.79.79 0 00.01.003z" clipRule="evenodd" />
                  </svg>
                  {influencer.location}
                </p>
              </div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                {influencer.platform.map(p => (
                  <span key={p} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {p}
                  </span>
                ))}
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Followers</span>
                  <span className="text-lg font-bold text-gray-900">{formatNumber(influencer.followers)}</span>
                </div>
                <Link 
                  href={`/influencers/${influencer.id}`} 
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
