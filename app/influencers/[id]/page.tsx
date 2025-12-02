import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

export default async function InfluencerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
        <p className="text-gray-600 mb-6">Please log in to view influencer details.</p>
        <Link href="/login" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
          Log In
        </Link>
      </div>
    )
  }

  const { id } = await params
  const influencer = await prisma.influencer.findUnique({ where: { id } })
  if (!influencer) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold mb-2">Influencer Not Found</h2>
      <Link href="/" className="text-blue-600 hover:underline">Back to Discovery</Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Discovery
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="relative h-64 sm:h-80 bg-gray-100">
          {influencer.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={influencer.imageUrl} alt={influencer.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 sm:p-8 pt-24">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{influencer.name}</h1>
            <div className="flex items-center text-white/90 gap-4 text-sm sm:text-base">
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.006.003.002.001.003.001a.79.79 0 00.01.003z" clipRule="evenodd" />
                </svg>
                {influencer.location}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span>{influencer.gender}</span>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span>{influencer.age} years old</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Followers</div>
              <div className="text-xl sm:text-2xl font-bold">{influencer.followers.toLocaleString()}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Engagement</div>
              <div className="text-xl sm:text-2xl font-bold">{influencer.engagementRate}%</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Avg. Likes</div>
              <div className="text-xl sm:text-2xl font-bold">{influencer.avgLikes.toLocaleString()}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Avg. Comments</div>
              <div className="text-xl sm:text-2xl font-bold">{influencer.avgComments.toLocaleString()}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {influencer.platform.map(p => (
                  <span key={p} className="px-3 py-1 rounded-full bg-black text-white text-sm font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {influencer.topics.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium border border-gray-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
