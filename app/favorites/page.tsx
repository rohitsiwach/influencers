import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return (
      <div>
        <p>Please login to view favorites.</p>
        <Link href="/login" className="underline">Go to Login</Link>
      </div>
    )
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: { influencer: true },
  })

  if (favorites.length === 0) return <div>No favorites yet.</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map(({ influencer }) => (
        <div key={influencer.id} className="border rounded p-4">
          {influencer.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={influencer.imageUrl} alt={influencer.name} className="w-full h-40 object-cover rounded" />
          )}
          <h2 className="text-lg font-semibold mt-2">{influencer.name}</h2>
          <p className="text-sm text-gray-600">{influencer.location}</p>
          <p className="text-sm">Followers: {influencer.followers.toLocaleString()}</p>
          <button className="underline mt-2" formAction="/api/favorites" data-id={influencer.id}>Remove</button>
          <Link href={`/influencers/${influencer.id}`} className="underline mt-2 inline-block">View Details</Link>
        </div>
      ))}
    </div>
  )
}
